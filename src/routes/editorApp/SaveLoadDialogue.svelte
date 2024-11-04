<script>
//@ts-nocheck
import { onMount } from 'svelte';
// Props
export let slides;


// Local state
let fileName = '';
let savedFiles = [];
let selectedFile = '';
let showNotification = false;
let notificationMessage = '';
let notificationTimeout;

function onload(slidesToBeLoaded) {
        slides = slidesToBeLoaded;
        // console.log("load");
    }
// Load saved presentations on mount
onMount(() => {
    updateDropdown();
    loadLastSavedPresentation();
});

// Function to show notification
function showToast(message, duration = 2000) {
    // Clear any existing timeout
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
    
    notificationMessage = message;
    showNotification = true;
    
    notificationTimeout = setTimeout(() => {
        showNotification = false;
        notificationMessage = '';
    }, duration);
}

// Function to load the last saved presentation
function loadLastSavedPresentation() {
    const lastSavedName = localStorage.getItem('lastSavedPresentation');
    if (lastSavedName) {
        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        const lastPresentation = presentations.find(p => p.name === lastSavedName);
        
        if (lastPresentation) {
            onload(lastPresentation.slides);
            fileName = lastSavedName;
            selectedFile = lastSavedName;
        }
    }
}

// Function to save presentation
function savePresentation() {
    if (!fileName.trim()) {
        alert('Please enter a file name');
        return;
    }
    
    // Get existing presentations or initialize empty array
    const existingPresentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
    
    // Find index of presentation with the same name
    const existingIndex = existingPresentations.findIndex(
        presentation => presentation.name.toLowerCase() === fileName.toLowerCase()
    );

    // If presentation exists, update it; otherwise add new one
    if (existingIndex !== -1) {
        existingPresentations[existingIndex] = {
            name: fileName,
            slides: slides
        };
        showToast(`Updated presentation "${fileName}"`);
    } else {
        existingPresentations.push({
            name: fileName,
            slides: slides
        });
        showToast(`Saved new presentation "${fileName}"`);
    }

    // Save back to localStorage
    localStorage.setItem('taleemPresentations', JSON.stringify(existingPresentations));
    
    // Save the name as last saved presentation
    localStorage.setItem('lastSavedPresentation', fileName);
    console.log("slides" , slides);
    // Update dropdown
    updateDropdown();
}

// Function to update dropdown with saved files
function updateDropdown() {
    const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
    savedFiles = presentations.map(p => p.name);
}

// Function to handle file selection
function handleFileSelection(event) {
    const selectedValue = event.target.value;
    if (!selectedValue) return;

    const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
    const selectedPresentation = presentations.find(p => p.name === selectedValue);
    
    if (selectedPresentation) {
        onload(selectedPresentation.slides);
        fileName = selectedValue; // Update the file name input to match selected file
        // Update last saved presentation when loading a different file
        localStorage.setItem('lastSavedPresentation', selectedValue);
    }
}

// Function to delete selected presentation
function deletePresentation() {
    if (!selectedFile) {
        alert('Please select a file to delete');
        return;
    }

    if (confirm(`Are you sure you want to delete "${selectedFile}"?`)) {
        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        const updatedPresentations = presentations.filter(p => p.name !== selectedFile);
        localStorage.setItem('taleemPresentations', JSON.stringify(updatedPresentations));
        
        // If we're deleting the last saved presentation, remove that reference
        if (localStorage.getItem('lastSavedPresentation') === selectedFile) {
            localStorage.removeItem('lastSavedPresentation');
        }
        
        // Clear selection and update dropdown
        selectedFile = '';
        fileName = '';
        updateDropdown();
        showToast(`Deleted presentation "${selectedFile}"`);
    }
}
</script>

<!-- Toast Notification -->
{#if showNotification}
    <div 
        class="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg text-sm transition-opacity duration-300"
        style="opacity: {showNotification ? '1' : '0'}"
    >
        {notificationMessage}
    </div>
{/if}

<div class='flex justify-center items-center text-xs p-1 rounded-md'
style="background-color: #15803D;">
    <!-- Group 1: Save Controls -->
    <div class="flex flex-col mr-4">
        <input
            type="text"
            bind:value={fileName}
            placeholder="Enter file name"
            class="mb-2 px-2 py-1 rounded bg-green-900 text-white"
        />
        <button
            on:click={savePresentation}
            class="bg-red-900 hover:bg-green-800 text-white px-2 rounded"
        >
            Save
        </button>
    </div>

    <!-- Group 2: Load Controls -->
    <div class="flex flex-col">
        {#if savedFiles.length > 0}
            <select
                bind:value={selectedFile}
                on:change={handleFileSelection}
                class="mb-2 px-2 py-1 rounded bg-green-900 text-white"
            >
                <option value="">Select file to load</option>
                {#each savedFiles as file}
                    <option value={file}>{file}</option>
                {/each}
            </select>
            <button
                on:click={deletePresentation}
                class="bg-orange-700 hover:bg-orange-800 text-white px-2 rounded"
            >
                Delete
            </button>
        {:else}
            <div class="mb-2 px-2 py-1 rounded bg-green-900 text-white">
                No saved files
            </div>
        {/if}
    </div>
</div>