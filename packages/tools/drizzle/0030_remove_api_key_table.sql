-- Migration 0030: Remove API key system
-- Authentication is now cookie-only for all interfaces (Dashboard, API, CLI)

DROP TABLE IF EXISTS table_api_key;
