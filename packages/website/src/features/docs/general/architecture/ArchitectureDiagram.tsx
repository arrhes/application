import { css } from "@arrhes/ui/utilities/cn.js"

export function ArchitectureDiagram() {
    return (
        <div
            className={css({
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
                overflow: "hidden",
            })}
        >
            <svg
                viewBox="0 0 620 320"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Diagramme d'architecture d'Arrhes : Utilisateurs et Développeurs/Agent IA vers Dashboard, CLI et API, puis Database"
                style={{ width: "100%", height: "auto", display: "block" }}
            >
                <defs>
                    <marker id="arch-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#d1d5db" />
                    </marker>
                </defs>

                {/* ── Layout constants
                     Total drawable width: x=15..605 (590px)
                     1/3 unit = 190px, gap = 10px
                     Row 1: Utilisateurs(x=15,w=190,cx=110) | Développeurs(x=215,w=390,cx=410)
                     Row 2: Dashboard(x=15,w=190,cx=110)    |    [gap 210px]    | CLI(x=415,w=190,cx=510)
                     Row 3: API      (x=15, w=590, h=36)
                     Row 4: Database (x=15, w=590, h=36)
                ── */}

                {/* ── Connector lines (drawn first, behind boxes) ───────── */}

                {/* Utilisateurs → Dashboard */}
                <line x1="110" y1="62" x2="110" y2="108" stroke="#e5e7eb" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                {/* Développeurs → API (straight down through the gap in row 2) */}
                <line x1="310" y1="62" x2="310" y2="190" stroke="#e5e7eb" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                {/* Développeurs → CLI */}
                <line x1="510" y1="62" x2="510" y2="108" stroke="#e5e7eb" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                {/* Dashboard → API */}
                <line x1="110" y1="144" x2="110" y2="190" stroke="#e5e7eb" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                {/* CLI → API */}
                <line x1="510" y1="144" x2="510" y2="190" stroke="#e5e7eb" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                {/* API → Database */}
                <line x1="310" y1="226" x2="310" y2="258" stroke="#e5e7eb" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />

                {/* ── Row 1 : 1/3 Utilisateurs + 2/3 Développeurs ──────── */}

                {/* Utilisateurs — 1/3 (x=15, w=190, cx=110) */}
                <rect x="15" y="12" width="190" height="50" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="110" y="33" fontSize="13" fontWeight="600" fill="#374151" textAnchor="middle" fontFamily="system-ui, sans-serif">
                    Utilisateurs
                </text>
                <text x="110" y="49" fontSize="9.5" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui, sans-serif">
                    Utilisation simple
                </text>

                {/* Développeurs — 2/3 (x=215, w=390, cx=410) */}
                <rect x="215" y="12" width="390" height="50" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="410" y="33" fontSize="13" fontWeight="600" fill="#374151" textAnchor="middle" fontFamily="system-ui, sans-serif">
                    Développeurs
                </text>
                <text x="410" y="49" fontSize="9.5" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui, sans-serif">
                    Intégrations · Automatisations · IA
                </text>

                {/* ── Row 2 : 1/3 Dashboard + gap + 1/3 CLI ────────────── */}

                {/* Dashboard — 1/3 (x=15, w=190, cx=110) */}
                <rect x="15" y="108" width="190" height="36" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <text x="110" y="131" fontSize="13" fontWeight="600" fill="#1d4ed8" textAnchor="middle" fontFamily="system-ui, sans-serif">
                    Dashboard
                </text>

                {/* CLI — 1/3 (x=415, w=190, cx=510) */}
                <rect x="415" y="108" width="190" height="36" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <text x="510" y="131" fontSize="13" fontWeight="600" fill="#1d4ed8" textAnchor="middle" fontFamily="system-ui, sans-serif">
                    CLI
                </text>

                {/* ── Row 3 : API full width (h=36) ────────────────────── */}
                <rect x="15" y="190" width="590" height="36" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
                <text x="310" y="208" fontSize="13" fontWeight="600" fill="#15803d" textAnchor="middle" dominantBaseline="central" fontFamily="system-ui, sans-serif">
                    API
                </text>

                {/* ── Row 4 : Database full width (h=36, same as API) ───── */}
                <rect x="15" y="258" width="590" height="36" rx="8" fill="#fafafa" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="310" y="276" fontSize="13" fontWeight="600" fill="#6b7280" textAnchor="middle" dominantBaseline="central" fontFamily="system-ui, sans-serif">
                    Database
                </text>
            </svg>
        </div>
    )
}
