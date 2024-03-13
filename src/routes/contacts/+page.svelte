<script>
    import { onMount } from 'svelte';

    let email = '';
    let emailSubject = '';
    let emailBody = '';

    // Load saved email data from local storage on component mount
    onMount(() => {
        loadEmailData();
    });

    // Function to save email data to local storage
    function saveEmailData() {
        localStorage.setItem('email', email);
        localStorage.setItem('emailSubject', emailSubject);
        localStorage.setItem('emailBody', emailBody);
    }

    // Function to load email data from local storage
    function loadEmailData() {
        const storedEmail = localStorage.getItem('email');
        const storedSubject = localStorage.getItem('emailSubject');
        const storedBody = localStorage.getItem('emailBody');

        if (storedEmail) email = storedEmail;
        if (storedSubject) emailSubject = storedSubject;
        if (storedBody) emailBody = storedBody;
    }
</script>
<div style="padding: 20px;">
<form on:submit|preventDefault={saveEmailData}>
    <div>
        <label class="label" for="email">Email</label>
        <input class="input" type="email" id="email" bind:value={email} />
    </div>
    <br>
    <div>
        <label class="label" for="emailSubject">Email Subject:</label>
        <input class="input" type="text" id="emailSubject" bind:value={emailSubject} />
    </div>
<br>
    <div>
        <label class="label" for="emailBody">Email Body:</label>
        <textarea class="textarea" rows=4 id="emailBody" bind:value={emailBody}></textarea>
    </div>
<br>
    <button class="btn variant-filled" type="submit">Save Contact Information</button>
</form>
</div>
<style>
    /* Add your styles here */
</style>
