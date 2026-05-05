-- Account: rename is_mandatory → is_optional (flip boolean), drop is_class
ALTER TABLE table_account RENAME COLUMN is_mandatory TO is_optional;
UPDATE table_account SET is_optional = NOT is_optional;
ALTER TABLE table_account DROP COLUMN is_class;

-- Agent session: rename prompt/completion tokens, drop total_tokens
ALTER TABLE table_agent_session RENAME COLUMN total_prompt_tokens TO total_input_tokens;
ALTER TABLE table_agent_session RENAME COLUMN total_completion_tokens TO total_output_tokens;
ALTER TABLE table_agent_session DROP COLUMN total_tokens;

-- Agent message: rename prompt/completion tokens, drop total_tokens
ALTER TABLE table_agent_message RENAME COLUMN prompt_tokens TO input_tokens;
ALTER TABLE table_agent_message RENAME COLUMN completion_tokens TO output_tokens;
ALTER TABLE table_agent_message DROP COLUMN total_tokens;

-- Invoice: rename invoice_number → reference, period_start → starting_at, period_end → ending_at
ALTER TABLE table_invoice RENAME COLUMN invoice_number TO reference;
ALTER TABLE table_invoice RENAME COLUMN period_start TO starting_at;
ALTER TABLE table_invoice RENAME COLUMN period_end TO ending_at;

-- Organization: drop Mollie subscription fields
ALTER TABLE table_organization DROP COLUMN mollie_subscription_id;
ALTER TABLE table_organization DROP COLUMN subscription_ending_at;

-- Drop unused document table
DROP TABLE IF EXISTS table_document;
