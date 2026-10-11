import { eq } from 'drizzle-orm';

import { isClaudeCliVersionMode, type AppSettings, type ClaudeCliVersionMode } from '@ungate/shared';

import { ModelMappings } from './model-mappings';
import { appSettings } from './schema';

import { getDb } from './index';

export class Settings {
	private static generateApiKey(): string {
		return crypto.randomUUID().replace(/-/g, '').slice(0, 15);
	}

	static get(): AppSettings {
		const db = getDb();
		let row = db.select().from(appSettings).where(eq(appSettings.id, 1)).get();
		if (!row) {
			[row] = db
				.insert(appSettings)
				.values({
					id: 1,
					apiKey: this.generateApiKey()
				})
				.returning()
				.all();
		}

		let claudeCliVersionMode: ClaudeCliVersionMode = 'stable';

		if (isClaudeCliVersionMode(row.claudeCliVersionMode)) {
			claudeCliVersionMode = row.claudeCliVersionMode;
		}

		const settings: AppSettings = {
			port: row.port,
			apiKey: row.apiKey,
			quiet: row.quiet,
			extraInstruction: row.extraInstruction,
			claudeCliVersionMode,
			claudeCliVersionCustom: row.claudeCliVersionCustom,
			models: ModelMappings.list()
		};

		return settings;
	}

	static update(settings: Partial<AppSettings>): void {
		const db = getDb();

		db.insert(appSettings)
			.values({ id: 1 })
			.onConflictDoUpdate({
				target: appSettings.id,
				set: {
					...(settings.port !== undefined && { port: settings.port }),
					...(settings.apiKey !== undefined && { apiKey: settings.apiKey }),
					...(settings.quiet !== undefined && { quiet: settings.quiet }),
					...(settings.extraInstruction !== undefined && { extraInstruction: settings.extraInstruction }),
					...(settings.claudeCliVersionMode !== undefined && { claudeCliVersionMode: settings.claudeCliVersionMode }),
					...(settings.claudeCliVersionCustom !== undefined && { claudeCliVersionCustom: settings.claudeCliVersionCustom })
				}
			})
			.run();

		if (settings.models !== undefined) {
			ModelMappings.replace(settings.models);
		}
	}
}
