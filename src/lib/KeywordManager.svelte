<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { SpeechSettings } from 'talk2svelte';

	let newKeyword = '';
	let keywords = [];
	let maxProgress = 5;
	onMount(() => {
		if (browser) {
			SpeechSettings.init();
			loadAppSettings();
		}
	});

	function addKeyword() {
		if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
			keywords = [...keywords, newKeyword.trim()];
			saveAppSettings();
			newKeyword = '';
		}
	}

	function removeKeyword(keywordToRemove) {
		keywords = keywords.filter((keyword) => keyword !== keywordToRemove);
		saveAppSettings();
	}

	function loadAppSettings() {
		try {
			const savedKeywords = localStorage.getItem('keywords');
			const savedMaxProgress = localStorage.getItem('maxProgress');
			if (savedKeywords) {
				keywords = JSON.parse(savedKeywords);
			}
			if (savedMaxProgress) {
				maxProgress = parseInt(savedMaxProgress);
			}
		} catch (error) {
			console.error('Error loading app settings:', error);
		}
	}

	function saveAppSettings() {
		try {
			localStorage.setItem('keywords', JSON.stringify(keywords));
			localStorage.setItem('maxProgress', maxProgress.toString());
		} catch (error) {
			console.error('Error saving app settings:', error);
		}
	}

	function updateMaxProgress(newMaxProgress) {
		maxProgress = newMaxProgress;
		saveAppSettings();
	}
</script>

<div style="padding: 20px;">
	<div>
		<input
			style="margin-bottom:20px"
			class="input"
			type="text"
			bind:value={newKeyword}
			placeholder="Enter new keyword"
		/>
		<button class="btn variant-filled" on:click={addKeyword}>Add Keyword</button>
	</div>

	<br />
	<br />
	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Keyword</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{#each keywords as row, i}
					<tr>
						<td>{row}</td>
						<button
							style="margin:10px"
							type="button"
							class="btn variant-filled-error"
							on:click={() => removeKeyword(row)}>Remove</button
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<br />

	<div>
		<label for="max-progress">Maximum Progress: </label>
		<input
			class="input"
			type="number"
			id="max-progress"
			min="1"
			bind:value={maxProgress}
			on:change={() => updateMaxProgress(parseInt(maxProgress, 10))}
		/>
	</div>
</div>

<style>
	/* Add your styles here */
</style>
