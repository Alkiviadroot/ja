<script>
	import { SpeechSettings, SpeechStore } from 'talk2svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { filter } from 'rxjs';
	import { enhance } from '$app/forms';

	export let form;

	let keywords = [];
	let progress = 0;
	let listening = false;
	let lastDetectedKeyword = '';
	let maxProgress;

	let email = '';
	let emailSubject = '';
	let emailBody = '';

	function loadEmailData() {
		const storedEmail = localStorage.getItem('email');
		const storedSubject = localStorage.getItem('emailSubject');
		const storedBody = localStorage.getItem('emailBody');

		if (storedEmail) email = storedEmail;
		if (storedSubject) emailSubject = storedSubject;
		if (storedBody) emailBody = storedBody;
	}
	onMount(() => {
		if (browser) {
			SpeechSettings.init();
			loadAppSettings();
			loadEmailData();
			initializeKeywordDetection();
		}
	});

	function toggleListening() {
		listening = !listening;
		listening ? SpeechSettings.start() : SpeechSettings.stop();
	}

	function initializeKeywordDetection() {
		keywords.forEach((keyword) => {
			SpeechSettings.declareCommand(keyword);
		});

		SpeechStore.currentCommand
			.pipe(filter((command) => keywords.includes(command)))
			.subscribe((command) => {
				lastDetectedKeyword = command;
				if (progress < maxProgress) {
					progress += 1;
				}
				if (progress == maxProgress) {
					document.getElementById('emailForm').submit();
					progress = 0;
				}
				console.log(progress);
			});
	}

	function loadAppSettings() {
		try {
			const savedKeywords = localStorage.getItem('keywords');
			const savedMaxProgress = localStorage.getItem('maxProgress');
			if (savedKeywords) {
				keywords = JSON.parse(savedKeywords);
			}
			if (savedMaxProgress) {
				maxProgress = parseInt(savedMaxProgress, 10);
			}
		} catch (error) {
			console.error('Error loading app settings:', error);
		}
	}
</script>

<!-- The rest of your component here, including buttons for start/stop listening and the progress bar -->
<div class="container center-div">
	<div class="audio-recorder ">
		<button on:click={toggleListening}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10em"
				height="10em"
				viewBox="0 0 24 24"
				{...$$props}
				><path
					fill={listening ? 'green' : 'red'}
					d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3m5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72z"
				/></svg
			>
			{listening ? 'Stop Listening' : 'Start Listening'}
		</button>
	</div>
	<br />
	<div class="progress-bar">
		{#each Array(maxProgress) as _, index}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
				{...$$props}
				><path
					fill={index < progress ? 'red' : 'grey'}
					d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
				/></svg
			>
		{/each}
	</div>

	{#if lastDetectedKeyword}
		<p>Detected: {lastDetectedKeyword}</p>
	{/if}

	<form method="POST" id="emailForm" use:enhance hidden>
		<input name="to" type="email" bind:value={email} />
		<input name="subject" type="text" bind:value={emailSubject} />
		<input name="body" bind:value={emailBody} />
		<button type="submit" id="emailSubmit"></button>
	</form>
	<p class="success">{form?.success || ''}</p>
</div>

<style>
	.progress-bar {
		display: flex;
	}

    .center-div {
    margin: 0 auto;
    width: 10em; /* or any specific width */
  }
</style>
