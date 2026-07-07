#!/bin/sh
# arrhes - Arrhes API CLI
# Requires: curl
# Config:   ~/.arrhes/config  (ARRHES_URL, ARRHES_API_KEY)
set -e

VERSION="1.3.5"
DEFAULT_URL="https://api.arrhes.com"
CONFIG_FILE="${ARRHES_CONFIG:-${HOME}/.arrhes/config}"

# ── Utilities ─────────────────────────────────────────────────────────────────

_die()      { printf 'arrhes: %s\n' "$*" >&2; exit 1; }
_need_cmd() { command -v "$1" >/dev/null 2>&1 || _die "'$1' is required but not found"; }
_jesc()     { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }

_check_version() {
    latest=$(curl -fsSL --max-time 5 "https://arrhes.com/cli/version" 2>/dev/null) || return 0
    latest=$(printf '%s' "$latest" | tr -d '[:space:]')
    # Ignore response if it doesn't look like a semver (e.g. HTML fallback)
    case "$latest" in
        [0-9]*.[0-9]*.[0-9]*) ;;
        *) return 0 ;;
    esac
    [ "$latest" = "$VERSION" ] || _die "CLI is outdated (installed: $VERSION, latest: $latest). Update: curl -fsSL https://arrhes.com/cli/install.sh | sh"
}

# JSON body accumulator
_JBODY=''
_jbody_reset() { _JBODY=''; }
_jbody_raw() {
    [ -n "$_JBODY" ] && _JBODY="${_JBODY},"
    _JBODY="${_JBODY}\"$1\":$2"
}
# _jstr: add "key":"value" - skip if value is empty
_jstr()      { [ -n "$2" ] && _jbody_raw "$1" "\"$(_jesc "$2")\"" || true; }
# _jstr_null: add "key":"value" or "key":null
_jstr_null() {
    if [ -n "$2" ]; then _jbody_raw "$1" "\"$(_jesc "$2")\""; else _jbody_raw "$1" "null"; fi
}
# _jnum: add "key":number - skip if value is empty
_jnum()  { [ -n "$2" ] && _jbody_raw "$1" "$2" || true; }
# _jbool: add "key":true|false
_jbool() { _jbody_raw "$1" "$2"; }
# _jbody: emit the accumulated JSON object
_jbody() { printf '{%s}' "$_JBODY"; }

# ── Config ────────────────────────────────────────────────────────────────────

_cfg_read() {
    ARRHES_URL="$DEFAULT_URL"
    ARRHES_API_KEY=''
    [ -f "$CONFIG_FILE" ] && . "$CONFIG_FILE"
}

_cfg_write() {
    # $1=url  $2=api_key
    mkdir -p "$(dirname "$CONFIG_FILE")"
    printf 'ARRHES_URL=%s\nARRHES_API_KEY=%s\n' "$1" "$2" > "$CONFIG_FILE"
    chmod 600 "$CONFIG_FILE"
}

_require_cfg() {
    _cfg_read
    [ -n "$ARRHES_API_KEY" ] || _die "Not logged in. Run: arrhes login --api-key <key>"
}

# ── HTTP ──────────────────────────────────────────────────────────────────────

_RESP=$(mktemp)
trap 'rm -f "$_RESP"' EXIT INT TERM

_api() {
    # _api METHOD /path [json_body]
    method="$1"; path="$2"; body="${3:-}"
    url="${ARRHES_URL}${path}"
    if [ -n "$body" ]; then
        HTTP_CODE=$(curl -sS -o "$_RESP" -w "%{http_code}" \
            -X "$method" \
            -H "Authorization: Bearer ${ARRHES_API_KEY}" \
            -H "Content-Type: application/json" \
            -d "$body" "$url")
    else
        HTTP_CODE=$(curl -sS -o "$_RESP" -w "%{http_code}" \
            -X "$method" \
            -H "Authorization: Bearer ${ARRHES_API_KEY}" \
            "$url")
    fi
    case "$HTTP_CODE" in
        2??) cat "$_RESP" ;;
        *)   cat "$_RESP" >&2; exit 1 ;;
    esac
}

# The API key is scoped to an org; the server uses its own org ID from the key.
# 'me' is just a valid URL placeholder for :idOrganization.
_org_path()  { printf '/v1/organizations/me'; }
_year_path() { printf '/v1/organizations/me/years/%s' "$1"; }

# ── login / whoami / logout ───────────────────────────────────────────────────

_cmd_login() {
    api_key=''; base_url=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --api-key) api_key="$2"; shift ;;
            --url)     base_url="$2"; shift ;;
            *) _die "Unknown option: $1" ;;
        esac; shift
    done
    [ -n "$api_key" ] || _die "--api-key is required"
    base_url="${base_url:-$DEFAULT_URL}"; base_url="${base_url%/}"
    ARRHES_URL="$base_url" ARRHES_API_KEY="$api_key" _api GET "/v1/users/me" > /dev/null
    _cfg_write "$base_url" "$api_key"
    printf 'Logged in. Config saved to %s\n' "$CONFIG_FILE"
}

_cmd_whoami() {
    _require_cfg
    _api GET "/v1/users/me"
}

_cmd_logout() {
    _cfg_read
    _cfg_write "${ARRHES_URL:-$DEFAULT_URL}" ""
    printf 'Logged out.\n'
}

# ── org ───────────────────────────────────────────────────────────────────────

_cmd_org() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        get)
            _require_cfg; _api GET "$(_org_path)"
            ;;
        update)
            _org_update "$@"
            ;;
        delete)
            _require_cfg
            _api DELETE "$(_org_path)" > /dev/null
            printf 'Organization deleted.\n'
            ;;
        *) _die "arrhes org: unknown subcommand '$subcmd'. Use: get, update, delete" ;;
    esac
}

_org_update() {
    name=''; email=''; siren=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --name)  name="$2";  shift ;;
            --email) email="$2"; shift ;;
            --siren) siren="$2"; shift ;;
            *) _die "Unknown option: $1" ;;
        esac; shift
    done
    _require_cfg
    _jbody_reset; _jstr name "$name"; _jstr email "$email"; _jstr siren "$siren"
    _api PATCH "$(_org_path)" "$(_jbody)"
}

# ── years ─────────────────────────────────────────────────────────────────────

_cmd_years() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)                    _require_cfg; _api GET "$(_org_path)/years" ;;
        get)                     _years_get "$@" ;;
        create)                  _years_create "$@" ;;
        update)                  _years_update "$@" ;;
        delete)                  _years_delete "$@" ;;
        close)                   _years_close "$@" ;;
        open)                    _years_open "$@" ;;
        settle-balance-sheet)    _years_settle_bs "$@" ;;
        settle-income-statement) _years_settle_is "$@" ;;
        *) _die "arrhes years: unknown subcommand '$subcmd'" ;;
    esac
}

_years_get() {
    id="${1:?Usage: arrhes years get <idYear>}"
    _require_cfg; _api GET "$(_year_path "$id")"
}

_years_create() {
    start=''; end=''; label=''
    while [ $# -gt 0 ]; do
        case "$1" in --start) start="$2"; shift ;; --end) end="$2"; shift ;; --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$start" ] || _die "--start is required"
    [ -n "$end"   ] || _die "--end is required"
    _require_cfg; _jbody_reset; _jstr startingAt "$start"; _jstr endingAt "$end"; _jstr label "$label"
    _api POST "$(_org_path)/years" "$(_jbody)"
}

_years_update() {
    id="${1:?Usage: arrhes years update <idYear>}"; shift
    start=''; end=''; label=''
    while [ $# -gt 0 ]; do
        case "$1" in --start) start="$2"; shift ;; --end) end="$2"; shift ;; --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    _require_cfg; _jbody_reset; _jstr startingAt "$start"; _jstr endingAt "$end"; _jstr label "$label"
    _api PATCH "$(_year_path "$id")" "$(_jbody)"
}

_years_delete() {
    id="${1:?Usage: arrhes years delete <idYear>}"
    _require_cfg; _api DELETE "$(_year_path "$id")" > /dev/null
    printf 'Year %s deleted.\n' "$id"
}

_years_close() {
    id="${1:?Usage: arrhes years close <idYear>}"
    _require_cfg; _api POST "$(_year_path "$id")/close"
}

_years_open() {
    id="${1:?Usage: arrhes years open <idYear>}"; shift
    journal_opening=''
    while [ $# -gt 0 ]; do
        case "$1" in --journal-opening) journal_opening="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$journal_opening" ] || _die "--journal-opening is required"
    _require_cfg; _jbody_reset; _jstr idJournalOpening "$journal_opening"
    _api POST "$(_year_path "$id")/open" "$(_jbody)"
}

_years_settle_bs() {
    id="${1:?Usage: arrhes years settle-balance-sheet <idYear>}"; shift
    journal_closing=''
    while [ $# -gt 0 ]; do
        case "$1" in --journal-closing) journal_closing="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$journal_closing" ] || _die "--journal-closing is required"
    _require_cfg; _jbody_reset; _jstr idJournalClosing "$journal_closing"
    _api POST "$(_year_path "$id")/settle-balance-sheet" "$(_jbody)"
}

_years_settle_is() {
    id="${1:?Usage: arrhes years settle-income-statement <idYear>}"; shift
    journal_closing=''
    while [ $# -gt 0 ]; do
        case "$1" in --journal-closing) journal_closing="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$journal_closing" ] || _die "--journal-closing is required"
    _require_cfg; _jbody_reset; _jstr idJournalClosing "$journal_closing"
    _api POST "$(_year_path "$id")/settle-income-statement" "$(_jbody)"
}

# ── journals ──────────────────────────────────────────────────────────────────

_cmd_journals() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _journals_list "$@" ;; get)    _journals_get "$@" ;;
        create) _journals_create "$@" ;; update) _journals_update "$@" ;;
        delete) _journals_delete "$@" ;;
        *) _die "arrhes journals: unknown subcommand '$subcmd'" ;;
    esac
}

_journals_base() { printf '%s/journals' "$(_year_path "$1")"; }

_journals_list() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api GET "$(_journals_base "$year")"
}

_journals_get() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes journals get <idJournal> --year <id>"
    _require_cfg; _api GET "$(_journals_base "$year")/$id"
}

_journals_create() {
    year=''; code=''; label=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; --code) code="$2"; shift ;; --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$year" ] && [ -n "$code" ] && [ -n "$label" ] || _die "--year, --code, and --label are required"
    _require_cfg; _jbody_reset; _jstr code "$code"; _jstr label "$label"
    _api POST "$(_journals_base "$year")" "$(_jbody)"
}

_journals_update() {
    id=''; year=''; code=''; label=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; --code) code="$2"; shift ;; --label) label="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift
    done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes journals update <idJournal> --year <id>"
    _require_cfg; _jbody_reset; _jstr code "$code"; _jstr label "$label"
    _api PATCH "$(_journals_base "$year")/$id" "$(_jbody)"
}

_journals_delete() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes journals delete <idJournal> --year <id>"
    _require_cfg; _api DELETE "$(_journals_base "$year")/$id" > /dev/null
    printf 'Journal %s deleted.\n' "$id"
}

# ── accounts ──────────────────────────────────────────────────────────────────

_cmd_accounts() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _accounts_list "$@" ;; get)    _accounts_get "$@" ;;
        create) _accounts_create "$@" ;; update) _accounts_update "$@" ;;
        delete) _accounts_delete "$@" ;;
        *) _die "arrhes accounts: unknown subcommand '$subcmd'" ;;
    esac
}

_accounts_base() { printf '%s/accounts' "$(_year_path "$1")"; }

_accounts_list() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api GET "$(_accounts_base "$year")"
}

_accounts_get() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes accounts get <idAccount> --year <id>"
    _require_cfg; _api GET "$(_accounts_base "$year")/$id"
}

_accounts_create() {
    year=''; number=''; label=''; type=''; parent=''; selectable='true'
    while [ $# -gt 0 ]; do
        case "$1" in
            --year)          year="$2";   shift ;;
            --number)        number="$2"; shift ;;
            --label)         label="$2";  shift ;;
            --type)          type="$2";   shift ;;
            --parent)        parent="$2"; shift ;;
            --no-selectable) selectable='false' ;;
            *) _die "Unknown: $1" ;;
        esac; shift
    done
    [ -n "$year" ] && [ -n "$number" ] && [ -n "$label" ] && [ -n "$type" ] && [ -n "$parent" ] || \
        _die "--year, --number, --label, --type, and --parent are required"
    _require_cfg; _jbody_reset
    _jstr number "$number"; _jstr label "$label"; _jstr type "$type"
    _jstr idAccountParent "$parent"; _jbool isSelectable "$selectable"
    _api POST "$(_accounts_base "$year")" "$(_jbody)"
}

_accounts_update() {
    id=''; year=''; number=''; label=''; type=''; parent=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --year) year="$2"; shift ;; --number) number="$2"; shift ;; --label) label="$2"; shift ;;
            --type) type="$2"; shift ;; --parent) parent="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;;
        esac; shift
    done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes accounts update <idAccount> --year <id>"
    _require_cfg; _jbody_reset; _jstr number "$number"; _jstr label "$label"; _jstr type "$type"; _jstr idAccountParent "$parent"
    _api PATCH "$(_accounts_base "$year")/$id" "$(_jbody)"
}

_accounts_delete() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes accounts delete <idAccount> --year <id>"
    _require_cfg; _api DELETE "$(_accounts_base "$year")/$id" > /dev/null
    printf 'Account %s deleted.\n' "$id"
}

# ── tags ──────────────────────────────────────────────────────────────────────

_cmd_tags() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _tags_list "$@" ;; get)    _tags_get "$@" ;;
        create) _tags_create "$@" ;; update) _tags_update "$@" ;;
        delete) _tags_delete "$@" ;;
        *) _die "arrhes tags: unknown subcommand '$subcmd'" ;;
    esac
}

_tags_base() { printf '%s/tags' "$(_year_path "$1")"; }

_tags_list() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api GET "$(_tags_base "$year")"
}

_tags_get() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes tags get <idTag> --year <id>"
    _require_cfg; _api GET "$(_tags_base "$year")/$id"
}

_tags_create() {
    year=''; label=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] && [ -n "$label" ] || _die "--year and --label are required"
    _require_cfg; _jbody_reset; _jstr label "$label"
    _api POST "$(_tags_base "$year")" "$(_jbody)"
}

_tags_update() {
    id=''; year=''; label=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; --label) label="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes tags update <idTag> --year <id>"
    _require_cfg; _jbody_reset; _jstr label "$label"
    _api PATCH "$(_tags_base "$year")/$id" "$(_jbody)"
}

_tags_delete() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes tags delete <idTag> --year <id>"
    _require_cfg; _api DELETE "$(_tags_base "$year")/$id" > /dev/null
    printf 'Tag %s deleted.\n' "$id"
}

# ── entries ───────────────────────────────────────────────────────────────────

_cmd_entries() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)      _entries_list "$@" ;;      get)       _entries_get "$@" ;;
        create)    _entries_create "$@" ;;    update)    _entries_update "$@" ;;
        duplicate) _entries_duplicate "$@" ;; reverse)   _entries_reverse "$@" ;;
        delete)    _entries_delete "$@" ;;    compute)   _entries_compute "$@" ;;
        lines)     _cmd_entry_lines "$@" ;;   tags)      _cmd_entry_tags "$@" ;;
        *) _die "arrhes entries: unknown subcommand '$subcmd'" ;;
    esac
}

_entries_base() { printf '%s/entries' "$(_year_path "$1")"; }

_entries_list() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api GET "$(_entries_base "$year")"
}

_entries_get() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes entries get <idEntry> --year <id>"
    _require_cfg; _api GET "$(_entries_base "$year")/$id"
}

_entries_create() {
    year=''; journal=''; label=''; date=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; --journal) journal="$2"; shift ;; --label) label="$2"; shift ;; --date) date="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$year" ] && [ -n "$journal" ] || _die "--year and --journal are required"
    date="${date:-$(date +%Y-%m-%d)}"
    _require_cfg; _jbody_reset; _jstr idJournal "$journal"; _jstr label "$label"; _jstr date "$date"
    _api POST "$(_entries_base "$year")" "$(_jbody)"
}

_entries_update() {
    id=''; year=''; label=''; date=''; journal=''; file=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --year)    year="$2";    shift ;; --label)   label="$2";   shift ;;
            --date)    date="$2";    shift ;; --journal) journal="$2"; shift ;;
            --file)    file="$2";    shift ;; -*)         _die "Unknown: $1" ;; *) id="$1" ;;
        esac; shift
    done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes entries update <idEntry> --year <id>"
    _require_cfg; _jbody_reset; _jstr label "$label"; _jstr date "$date"; _jstr idJournal "$journal"; _jstr idFile "$file"
    _api PATCH "$(_entries_base "$year")/$id" "$(_jbody)"
}

_entries_duplicate() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes entries duplicate <idEntry> --year <id>"
    _require_cfg; _api POST "$(_entries_base "$year")/$id/duplicate"
}

_entries_reverse() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes entries reverse <idEntry> --year <id>"
    _require_cfg; _api POST "$(_entries_base "$year")/$id/reverse"
}

_entries_delete() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes entries delete <idEntry> --year <id>"
    _require_cfg; _api DELETE "$(_entries_base "$year")/$id" > /dev/null
    printf 'Entry %s deleted.\n' "$id"
}

_entries_compute() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes entries compute <idEntry> --year <id>"
    _require_cfg; _api POST "$(_entries_base "$year")/$id/compute"
}

# ── entries lines ─────────────────────────────────────────────────────────────

_cmd_entry_lines() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _lines_list "$@" ;; get)    _lines_get "$@" ;;
        create) _lines_create "$@" ;; update) _lines_update "$@" ;;
        delete) _lines_delete "$@" ;;
        *) _die "arrhes entries lines: unknown subcommand '$subcmd'" ;;
    esac
}

_lines_base() { printf '%s/%s/lines' "$(_entries_base "$1")" "$2"; }

_lines_list() {
    entry=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) entry="$1" ;; esac; shift; done
    [ -n "$entry" ] && [ -n "$year" ] || _die "Usage: arrhes entries lines list <idEntry> --year <id>"
    _require_cfg; _api GET "$(_lines_base "$year" "$entry")"
}

_lines_get() {
    entry=''; line=''; year=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;;
            *) if [ -z "$entry" ]; then entry="$1"; else line="$1"; fi ;;
        esac; shift
    done
    [ -n "$entry" ] && [ -n "$line" ] && [ -n "$year" ] || _die "Usage: arrhes entries lines get <idEntry> <idLine> --year <id>"
    _require_cfg; _api GET "$(_lines_base "$year" "$entry")/$line"
}

_lines_create() {
    entry=''; year=''; account=''; label=''; debit=''; credit=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --year)    year="$2";    shift ;; --account) account="$2"; shift ;;
            --label)   label="$2";   shift ;; --debit)   debit="$2";   shift ;;
            --credit)  credit="$2";  shift ;; -*)         _die "Unknown: $1" ;; *) entry="$1" ;;
        esac; shift
    done
    [ -n "$entry" ] && [ -n "$year" ] && [ -n "$account" ] || \
        _die "Usage: arrhes entries lines create <idEntry> --year <id> --account <id>"
    _require_cfg; _jbody_reset; _jstr idAccount "$account"; _jstr label "$label"; _jnum debit "$debit"; _jnum credit "$credit"
    _api POST "$(_lines_base "$year" "$entry")" "$(_jbody)"
}

_lines_update() {
    entry=''; line=''; year=''; label=''; debit=''; credit=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --year)   year="$2";   shift ;; --label)  label="$2";  shift ;;
            --debit)  debit="$2";  shift ;; --credit) credit="$2"; shift ;;
            -*) _die "Unknown: $1" ;; *) if [ -z "$entry" ]; then entry="$1"; else line="$1"; fi ;;
        esac; shift
    done
    [ -n "$entry" ] && [ -n "$line" ] && [ -n "$year" ] || _die "Usage: arrhes entries lines update <idEntry> <idLine> --year <id>"
    _require_cfg; _jbody_reset; _jstr label "$label"; _jnum debit "$debit"; _jnum credit "$credit"
    _api PATCH "$(_lines_base "$year" "$entry")/$line" "$(_jbody)"
}

_lines_delete() {
    entry=''; line=''; year=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;;
            *) if [ -z "$entry" ]; then entry="$1"; else line="$1"; fi ;;
        esac; shift
    done
    [ -n "$entry" ] && [ -n "$line" ] && [ -n "$year" ] || _die "Usage: arrhes entries lines delete <idEntry> <idLine> --year <id>"
    _require_cfg; _api DELETE "$(_lines_base "$year" "$entry")/$line" > /dev/null
    printf 'Line %s deleted.\n' "$line"
}

# ── entries tags ──────────────────────────────────────────────────────────────

_cmd_entry_tags() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        add)    _entry_tag_add "$@" ;;
        remove) _entry_tag_remove "$@" ;;
        *) _die "arrhes entries tags: use 'add' or 'remove'" ;;
    esac
}

_entry_tag_add() {
    entry=''; year=''; tag=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; --tag) tag="$2"; shift ;; -*) _die "Unknown: $1" ;; *) entry="$1" ;; esac; shift
    done
    [ -n "$entry" ] && [ -n "$year" ] && [ -n "$tag" ] || \
        _die "Usage: arrhes entries tags add <idEntry> --year <id> --tag <id>"
    _require_cfg; _jbody_reset; _jstr idTag "$tag"
    _api POST "$(_entries_base "$year")/$entry/tags" "$(_jbody)"
}

_entry_tag_remove() {
    entry=''; tag=''; year=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;;
            *) if [ -z "$entry" ]; then entry="$1"; else tag="$1"; fi ;;
        esac; shift
    done
    [ -n "$entry" ] && [ -n "$tag" ] && [ -n "$year" ] || \
        _die "Usage: arrhes entries tags remove <idEntry> <idTag> --year <id>"
    _require_cfg; _api DELETE "$(_entries_base "$year")/$entry/tags/$tag" > /dev/null
    printf 'Tag removed.\n'
}

# ── files ─────────────────────────────────────────────────────────────────────

_cmd_files() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)         _files_list "$@" ;;         get)    _files_get "$@" ;;
        create)       _files_create "$@" ;;        update) _files_update "$@" ;;
        delete)       _files_delete "$@" ;;        download-url) _files_download_url "$@" ;;
        folders)      _cmd_folders "$@" ;;
        *) _die "arrhes files: unknown subcommand '$subcmd'" ;;
    esac
}

_files_base() { printf '%s/files' "$(_year_path "$1")"; }

_files_list() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api GET "$(_files_base "$year")"
}

_files_get() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes files get <idFile> --year <id>"
    _require_cfg; _api GET "$(_files_base "$year")/$id"
}

_files_create() {
    year=''; name=''; reference=''; hash=''; folder=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --year)      year="$2";      shift ;; --name)      name="$2";      shift ;;
            --reference) reference="$2"; shift ;; --hash)      hash="$2";      shift ;;
            --folder)    folder="$2";    shift ;; *) _die "Unknown: $1" ;;
        esac; shift
    done
    [ -n "$year" ] && [ -n "$name" ] && [ -n "$reference" ] && [ -n "$hash" ] || \
        _die "--year, --name, --reference, and --hash are required"
    _require_cfg; _jbody_reset; _jstr name "$name"; _jstr reference "$reference"; _jstr hash "$hash"; _jstr idFolder "$folder"
    _api POST "$(_files_base "$year")" "$(_jbody)"
}

_files_update() {
    id=''; year=''; name=''; reference=''; date=''; folder=''
    while [ $# -gt 0 ]; do
        case "$1" in
            --year)      year="$2";      shift ;; --name)      name="$2";      shift ;;
            --reference) reference="$2"; shift ;; --date)      date="$2";      shift ;;
            --folder)    folder="$2";    shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;;
        esac; shift
    done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes files update <idFile> --year <id>"
    _require_cfg; _jbody_reset; _jstr name "$name"; _jstr reference "$reference"; _jstr date "$date"; _jstr idFolder "$folder"
    _api PATCH "$(_files_base "$year")/$id" "$(_jbody)"
}

_files_delete() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes files delete <idFile> --year <id>"
    _require_cfg; _api DELETE "$(_files_base "$year")/$id" > /dev/null
    printf 'File %s deleted.\n' "$id"
}

_files_download_url() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes files download-url <idFile> --year <id>"
    _require_cfg
    _api POST "$(_files_base "$year")/$id/download-url" | sed 's/.*"url":"\([^"]*\)".*/\1/'
}

# ── files folders ─────────────────────────────────────────────────────────────

_cmd_folders() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _folders_list "$@" ;; get)    _folders_get "$@" ;;
        create) _folders_create "$@" ;; update) _folders_update "$@" ;;
        delete) _folders_delete "$@" ;;
        *) _die "arrhes files folders: unknown subcommand '$subcmd'" ;;
    esac
}

_folders_base() { printf '%s/folders' "$(_year_path "$1")"; }

_folders_list() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api GET "$(_folders_base "$year")"
}

_folders_get() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes files folders get <idFolder> --year <id>"
    _require_cfg; _api GET "$(_folders_base "$year")/$id"
}

_folders_create() {
    year=''; name=''; parent=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; --name) name="$2"; shift ;; --parent) parent="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$year" ] && [ -n "$name" ] || _die "--year and --name are required"
    _require_cfg; _jbody_reset; _jstr name "$name"; _jstr idFolderParent "$parent"
    _api POST "$(_folders_base "$year")" "$(_jbody)"
}

_folders_update() {
    id=''; year=''; name=''; parent=''
    while [ $# -gt 0 ]; do
        case "$1" in --year) year="$2"; shift ;; --name) name="$2"; shift ;; --parent) parent="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift
    done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes files folders update <idFolder> --year <id>"
    _require_cfg; _jbody_reset; _jstr name "$name"; _jstr idFolderParent "$parent"
    _api PATCH "$(_folders_base "$year")/$id" "$(_jbody)"
}

_folders_delete() {
    id=''; year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift; done
    [ -n "$id" ] && [ -n "$year" ] || _die "Usage: arrhes files folders delete <idFolder> --year <id>"
    _require_cfg; _api DELETE "$(_folders_base "$year")/$id" > /dev/null
    printf 'Folder %s deleted.\n' "$id"
}

# ── members ───────────────────────────────────────────────────────────────────

_cmd_members() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _require_cfg; _api GET "$(_org_path)/users" ;;
        get)    _members_get "$@" ;;
        invite) _members_invite "$@" ;;
        update) _members_update "$@" ;;
        remove) _members_remove "$@" ;;
        *) _die "arrhes members: unknown subcommand '$subcmd'" ;;
    esac
}

_members_get() {
    id="${1:?Usage: arrhes members get <idMember>}"
    _require_cfg; _api GET "$(_org_path)/users/$id"
}

_members_invite() {
    email=''; is_admin='false'
    while [ $# -gt 0 ]; do
        case "$1" in --email) email="$2"; shift ;; --admin) is_admin='true' ;; *) _die "Unknown: $1" ;; esac; shift
    done
    [ -n "$email" ] || _die "--email is required"
    _require_cfg
    _api POST "$(_org_path)/users" \
        "{\"isAdmin\":${is_admin},\"user\":{\"email\":\"$(_jesc "$email")\"}}"
}

_members_update() {
    id=''; is_admin=''
    while [ $# -gt 0 ]; do
        case "$1" in --admin) is_admin='true' ;; --no-admin) is_admin='false' ;; -*) _die "Unknown: $1" ;; *) id="$1" ;; esac; shift
    done
    [ -n "$id" ] || _die "Usage: arrhes members update <idMember> [--admin|--no-admin]"
    _require_cfg; _jbody_reset; [ -n "$is_admin" ] && _jbool isAdmin "$is_admin" || true
    _api PATCH "$(_org_path)/users/$id" "$(_jbody)"
}

_members_remove() {
    id="${1:?Usage: arrhes members remove <idMember>}"
    _require_cfg; _api DELETE "$(_org_path)/users/$id" > /dev/null
    printf 'Member %s removed.\n' "$id"
}

# ── api-keys ──────────────────────────────────────────────────────────────────

_cmd_api_keys() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _require_cfg; _api GET "$(_org_path)/api-keys" ;;
        create) _api_keys_create "$@" ;;
        delete) _api_keys_delete "$@" ;;
        *) _die "arrhes api-keys: unknown subcommand '$subcmd'" ;;
    esac
}

_api_keys_create() {
    name=''
    while [ $# -gt 0 ]; do case "$1" in --name) name="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    _require_cfg; _jbody_reset; _jstr name "$name"
    _api POST "$(_org_path)/api-keys" "$(_jbody)"
}

_api_keys_delete() {
    id="${1:?Usage: arrhes api-keys delete <idApiKey>}"
    _require_cfg; _api DELETE "$(_org_path)/api-keys/$id" > /dev/null
    printf 'API key %s deleted.\n' "$id"
}

# ── exports ───────────────────────────────────────────────────────────────────

_cmd_exports() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        fec)                   _exports_fec "$@" ;;
        xbrl-balance-sheet)    _exports_xbrl_bs "$@" ;;
        xbrl-income-statement) _exports_xbrl_is "$@" ;;
        *) _die "arrhes exports: unknown subcommand '$subcmd'" ;;
    esac
}

_exports_fec() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api POST "$(_year_path "$year")/exports/fec" | sed 's/.*"url":"\([^"]*\)".*/\1/'
}

_exports_xbrl_bs() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api POST "$(_year_path "$year")/exports/balance-sheet" | sed 's/.*"url":"\([^"]*\)".*/\1/'
}

_exports_xbrl_is() {
    year=''
    while [ $# -gt 0 ]; do case "$1" in --year) year="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$year" ] || _die "--year is required"
    _require_cfg; _api POST "$(_year_path "$year")/exports/income-statement" | sed 's/.*"url":"\([^"]*\)".*/\1/'
}

# ── balance-sheets ────────────────────────────────────────────────────────────

_cmd_balance_sheets() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _bs_list "$@" ;; get)    _bs_get "$@" ;;
        create) _bs_create "$@" ;; update) _bs_update "$@" ;;
        delete) _bs_delete "$@" ;;
        *) _die "arrhes balance-sheets: unknown subcommand '$subcmd'" ;;
    esac
}

_bs_base() { printf '%s/balance-sheets' "$(_year_path "$1")"; }

_bs_list() {
    year="${1:?Usage: arrhes balance-sheets list <idYear>}"
    _require_cfg; _api GET "$(_bs_base "$year")"
}

_bs_get() {
    year="${1:?Usage: arrhes balance-sheets get <idYear> <id>}"
    bs="${2:?missing <idBalanceSheet>}"
    _require_cfg; _api GET "$(_bs_base "$year")/$bs"
}

_bs_create() {
    year="${1:?Usage: arrhes balance-sheets create <idYear>}"; shift
    parent=''; label=''
    while [ $# -gt 0 ]; do case "$1" in --parent) parent="$2"; shift ;; --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    _require_cfg; _jbody_reset; _jstr_null idBalanceSheetParent "$parent"; _jstr label "$label"
    _api POST "$(_bs_base "$year")" "$(_jbody)"
}

_bs_update() {
    year="${1:?Usage: arrhes balance-sheets update <idYear> <id>}"
    bs="${2:?missing <idBalanceSheet>}"; shift 2
    parent=''; label=''
    while [ $# -gt 0 ]; do case "$1" in --parent) parent="$2"; shift ;; --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    _require_cfg; _jbody_reset; _jstr idBalanceSheetParent "$parent"; _jstr label "$label"
    _api PATCH "$(_bs_base "$year")/$bs" "$(_jbody)"
}

_bs_delete() {
    year="${1:?Usage: arrhes balance-sheets delete <idYear> <id>}"
    bs="${2:?missing <idBalanceSheet>}"
    _require_cfg; _api DELETE "$(_bs_base "$year")/$bs" > /dev/null
    printf 'Balance sheet node %s deleted.\n' "$bs"
}

# ── income-statements ─────────────────────────────────────────────────────────

_cmd_income_statements() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)         _is_list "$@" ;; get)          _is_get "$@" ;;
        create)       _is_create "$@" ;; update)      _is_update "$@" ;;
        delete)       _is_delete "$@" ;; computations) _cmd_computations "$@" ;;
        *) _die "arrhes income-statements: unknown subcommand '$subcmd'" ;;
    esac
}

_is_base() { printf '%s/income-statements' "$(_year_path "$1")"; }

_is_list() {
    year="${1:?Usage: arrhes income-statements list <idYear>}"
    _require_cfg; _api GET "$(_is_base "$year")"
}

_is_get() {
    year="${1:?Usage: arrhes income-statements get <idYear> <id>}"
    is="${2:?missing <idIncomeStatement>}"
    _require_cfg; _api GET "$(_is_base "$year")/$is"
}

_is_create() {
    year="${1:?Usage: arrhes income-statements create <idYear>}"; shift
    label=''; parent=''
    while [ $# -gt 0 ]; do case "$1" in --label) label="$2"; shift ;; --parent) parent="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$label" ] || _die "--label is required"
    _require_cfg; _jbody_reset; _jstr label "$label"; _jstr_null idIncomeStatementParent "$parent"
    _api POST "$(_is_base "$year")" "$(_jbody)"
}

_is_update() {
    year="${1:?Usage: arrhes income-statements update <idYear> <id>}"
    is="${2:?missing <idIncomeStatement>}"; shift 2
    label=''; parent=''
    while [ $# -gt 0 ]; do case "$1" in --label) label="$2"; shift ;; --parent) parent="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    _require_cfg; _jbody_reset; _jstr label "$label"; _jstr idIncomeStatementParent "$parent"
    _api PATCH "$(_is_base "$year")/$is" "$(_jbody)"
}

_is_delete() {
    year="${1:?Usage: arrhes income-statements delete <idYear> <id>}"
    is="${2:?missing <idIncomeStatement>}"
    _require_cfg; _api DELETE "$(_is_base "$year")/$is" > /dev/null
    printf 'Income statement node %s deleted.\n' "$is"
}

# ── computations ──────────────────────────────────────────────────────────────

_cmd_computations() {
    subcmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$subcmd" in
        list)   _comp_list "$@" ;; get)    _comp_get "$@" ;;
        create) _comp_create "$@" ;; update) _comp_update "$@" ;;
        delete) _comp_delete "$@" ;;
        *) _die "arrhes income-statements computations: unknown subcommand '$subcmd'" ;;
    esac
}

_comp_base() { printf '%s/computations' "$(_year_path "$1")"; }

_comp_list() {
    year="${1:?Usage: arrhes income-statements computations list <idYear>}"
    _require_cfg; _api GET "$(_comp_base "$year")"
}

_comp_get() {
    year="${1:?Usage: arrhes income-statements computations get <idYear> <id>}"
    comp="${2:?missing <idComputation>}"
    _require_cfg; _api GET "$(_comp_base "$year")/$comp"
}

_comp_create() {
    year="${1:?Usage: arrhes income-statements computations create <idYear>}"; shift
    label=''
    while [ $# -gt 0 ]; do case "$1" in --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    [ -n "$label" ] || _die "--label is required"
    _require_cfg; _jbody_reset; _jstr label "$label"
    _api POST "$(_comp_base "$year")" "$(_jbody)"
}

_comp_update() {
    year="${1:?Usage: arrhes income-statements computations update <idYear> <id>}"
    comp="${2:?missing <idComputation>}"; shift 2
    label=''
    while [ $# -gt 0 ]; do case "$1" in --label) label="$2"; shift ;; *) _die "Unknown: $1" ;; esac; shift; done
    _require_cfg; _jbody_reset; _jstr label "$label"
    _api PATCH "$(_comp_base "$year")/$comp" "$(_jbody)"
}

_comp_delete() {
    year="${1:?Usage: arrhes income-statements computations delete <idYear> <id>}"
    comp="${2:?missing <idComputation>}"
    _require_cfg; _api DELETE "$(_comp_base "$year")/$comp" > /dev/null
    printf 'Computation %s deleted.\n' "$comp"
}

# ── usage ─────────────────────────────────────────────────────────────────────

_usage() {
    cat << 'EOF'
Usage: arrhes <command> [subcommand] [options]

Authentication:
  login --api-key <key> [--url <url>]
  whoami
  logout

Commands:
  org             get | update | delete
  years           list | get | create | update | delete | close | open
                  settle-balance-sheet | settle-income-statement
  journals        list | get | create | update | delete
  accounts        list | get | create | update | delete
  tags            list | get | create | update | delete
  entries         list | get | create | update | duplicate | reverse | delete | compute
    entries lines   list | get | create | update | delete
    entries tags    add | remove
  files           list | get | create | update | delete | download-url
    files folders   list | get | create | update | delete
  members         list | get | invite | update | remove
  api-keys        list | create | delete
  exports         fec | xbrl-balance-sheet | xbrl-income-statement
  balance-sheets  list | get | create | update | delete
  income-statements list | get | create | update | delete
    income-statements computations  list | get | create | update | delete

Options:
  --help, -h      Show this help
  --version, -v   Show version ($VERSION)

Output is JSON. Pipe through jq for filtering:
  arrhes years list --year yr_xxx | jq '.[].id'
EOF
}

# ── main ──────────────────────────────────────────────────────────────────────

main() {
    _need_cmd curl
    cmd="${1:-}"; [ $# -gt 0 ] && shift
    case "$cmd" in
        --version|-v) printf 'arrhes %s\n' "$VERSION"; return ;;
        --help|-h|''|help) _usage; return ;;
    esac
    _check_version
    case "$cmd" in
        login)             _cmd_login "$@" ;;
        whoami)            _cmd_whoami ;;
        logout)            _cmd_logout ;;
        org)               _cmd_org "$@" ;;
        years)             _cmd_years "$@" ;;
        journals)          _cmd_journals "$@" ;;
        accounts)          _cmd_accounts "$@" ;;
        tags)              _cmd_tags "$@" ;;
        entries)           _cmd_entries "$@" ;;
        files)             _cmd_files "$@" ;;
        members)           _cmd_members "$@" ;;
        api-keys)          _cmd_api_keys "$@" ;;
        exports)           _cmd_exports "$@" ;;
        balance-sheets)    _cmd_balance_sheets "$@" ;;
        income-statements) _cmd_income_statements "$@" ;;
        *) printf 'arrhes: unknown command "%s". Run "arrhes --help" for usage.\n' "$cmd" >&2; exit 1 ;;
    esac
}

main "$@"
