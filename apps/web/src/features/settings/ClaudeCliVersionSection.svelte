<script lang="ts">
import InfoTooltip from '$shared/InfoTooltip.svelte';

import { CLAUDE_CLI_VERSION_OPTIONS } from './claude-cli-version-options';
import { getSettingsFormStore } from './settings-form-store.svelte';

import type { ClaudeCliVersionMode } from '@ungate/shared/frontend';

const formStore = getSettingsFormStore();

const applyHint = 'Takes effect after Save & Restart in Server Configuration.';

function buttonClass(optionMode: ClaudeCliVersionMode): string {
	if (formStore.claudeCliVersionMode === optionMode) {
		return 'preset-filled-primary-500';
	}

	return 'hover:preset-tonal-surface';
}
</script>

<div class="space-y-2 border-t border-surface-700/40 pt-4">
	<div class="space-y-1">
		<p class="text-xs text-surface-400">Claude Code version</p>
		<p class="text-xs text-surface-500">{applyHint}</p>
	</div>

	<div class="flex flex-wrap items-center gap-2">
		<div class="inline-flex rounded-lg border border-surface-600 p-0.5">
			{#each CLAUDE_CLI_VERSION_OPTIONS as option}
				<InfoTooltip text={option.tooltip}>
					<button
						type="button"
						class="btn btn-sm h-auto gap-1.5 rounded-md px-3 py-1 {buttonClass(option.mode)}"
						aria-pressed={formStore.claudeCliVersionMode === option.mode}
						onclick={() => formStore.setClaudeCliVersionMode(option.mode)}>
						{option.label}
						{#if option.version}
							<span class="font-mono text-xs opacity-70">{option.version}</span>
						{/if}
					</button>
				</InfoTooltip>
			{/each}
		</div>

		{#if formStore.claudeCliVersionMode === 'custom'}
			<input
				class="input w-32 font-mono text-sm"
				type="text"
				placeholder="2.1.280"
				value={formStore.claudeCliVersionCustom}
				oninput={(event) => formStore.setClaudeCliVersionCustom(event.currentTarget.value)} />
		{/if}
	</div>
</div>
