<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import Logo from '$lib/images/logo.jpg';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="w-10"></div>
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"
				><a href="/">
					<img style="height: 60px; border-radius:10px" src={Logo} alt="Logo" />
				</a></svelte:fragment
			>
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
		<TabGroup
			justify="justify-center"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			flex="flex-1 lg:flex-none"
			rounded=""
			border=""
			class="bg-surface-100-800-token w-full"
		>
			<TabAnchor href="/contacts" selected={$page.url.pathname === '/contacts'}>
				<svelte:fragment slot="lead">
					<svg
						style="display: block;margin: auto"
						xmlns="http://www.w3.org/2000/svg"
						width="3em"
						height="3em"
						viewBox="0 0 24 24"
						{...$$props}
						><path
							fill="currentColor"
							d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
						/></svg
					>
				</svelte:fragment>
				<span>Contact</span>
			</TabAnchor>
			<TabAnchor href="/" selected={$page.url.pathname === '/'}>
				<svelte:fragment slot="lead">
					<svg
						style="display: block;margin: auto"
						xmlns="http://www.w3.org/2000/svg"
						width="3em"
						height="3em"
						viewBox="0 0 24 24"
						{...$$props}
						><path
							fill="currentColor"
							d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3m5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72z"
						/></svg
					>
				</svelte:fragment>
				<span>Microphone</span>
			</TabAnchor>
			<TabAnchor href="/settings" selected={$page.url.pathname === '/settings'}>
				<svelte:fragment slot="lead">
					<svg
						style="display: block;margin: auto"
						xmlns="http://www.w3.org/2000/svg"
						width="3em"
						height="3em"
						viewBox="0 0 24 24"
						{...$$props}
						><path
							fill="currentColor"
							d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6"
						/></svg
					>
				</svelte:fragment>
				<span>Settings</span>
			</TabAnchor>
			<!-- ... -->
		</TabGroup>
	</svelte:fragment>
</AppShell>
