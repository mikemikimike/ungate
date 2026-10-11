-- Migration 0009: Claude Code client version for OAuth User-Agent
ALTER TABLE app_settings ADD COLUMN claude_cli_version_mode text NOT NULL DEFAULT 'stable';
--> statement-breakpoint
ALTER TABLE app_settings ADD COLUMN claude_cli_version_custom text;
