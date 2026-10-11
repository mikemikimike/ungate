<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
	text: string;
	children: Snippet;
}

let { text, children }: Props = $props();
</script>

<span class="group relative inline-flex">
	{@render children()}
	<span
		role="tooltip"
		class="pointer-events-none absolute top-[calc(100%+0.5rem)] left-1/2 z-20 w-60 -translate-x-1/2 translate-y-1 rounded-lg border border-surface-600/60 bg-surface-900/95 px-3 py-2 text-xs leading-relaxed text-surface-200 opacity-0 shadow-xl backdrop-blur transition duration-150 group-hover:translate-y-0 group-hover:opacity-100">
		{text}
	</span>
</span>
