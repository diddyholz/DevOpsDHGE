<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps(['songs']);

    const vote = ref([]);

    vote.value = props.songs.map((song, index) => ({
        id: song.id,
        name: song.name,
        priority: index
    }));

    function getSongVotes() {
        return vote.value.map(song => ({
            id: song.id,
            priority: song.priority
        }));
    }

    function sortSongs() {
        vote.value.sort((a, b) => a.priority - b.priority);
    }

    function handleDragStart(event, id) {
        event.dataTransfer.setData('text/plain', id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event, id) {
        const draggedId = event.dataTransfer.getData('text/plain');

        if (draggedId === id) {
            return;
        }

        // Get indexes of the song beeing dragged and the song beeing dropped on
        const draggedIndex = vote.value.findIndex(song => song.id == draggedId);
        const droppedIndex = vote.value.findIndex(song => song.id == id);

        // Update priority of dragged song and all other songs after/before it
        vote.value[draggedIndex].priority = droppedIndex;

        const startIndex = Math.min(draggedIndex + 1, droppedIndex);
        const endIndex = Math.max(draggedIndex, droppedIndex + 1);
        const increment = droppedIndex < draggedIndex ? 1 : -1;

        for (let i = startIndex; i < endIndex; i++) {
            vote.value[i].priority += increment;
        }

        sortSongs();
    }

    defineExpose({ getSongVotes });
</script>

<template>
    <div class="song-list">
        <div 
            v-for="song in vote" 
            :key="song.id" 
            class="song-item" 
            draggable="true" 
            @dragstart="(e) => handleDragStart(e, song.id)"
            @dragover="handleDragOver"
            @drop="(e) => handleDrop(e, song.id)">
            <b class="ms-2">{{ song.name }}</b>
        </div>
    </div>
</template>

<style scoped>
    .song-list {
        border-radius: calc(var(--bs-border-radius) + 0.5rem);
        padding: 0.5rem 1rem;
        background-color: rgb(230, 230, 230);
    }

    .song-item {
        border-radius: var(--bs-border-radius);
        padding: 0.5rem;
        background-color: white;
        margin: 0.5rem 0;
        border: var(--bs-border-width) solid var(--bs-border-color);
    }
</style>