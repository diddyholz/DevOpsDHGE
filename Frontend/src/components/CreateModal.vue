<script setup>
    import BootstrapModal from './bootstrap-wrappers/BootstrapModal.vue';
    import { useTemplateRef, ref } from 'vue';
    import SurveyService from '../services/SurveyService.js';
    import {v4 as uuidv4} from 'uuid';

    const modalRef = useTemplateRef("modal");
    const isSaving = ref(false);
    const newSurvey = ref({
        name: '',
        date: '',
        status: 'draft',
        songs: []
    });
    const statusOptions = [
        { value: 'draft', text: 'Entwurf', colorClass: 'warning' },
        { value: 'open', text: 'Offen', colorClass: 'success' },
        { value: 'closed', text: 'Abgeschlossen', colorClass: 'danger' }
    ];
    const newSong = ref('');
    const emit = defineEmits(['saved']);

    function reset() {
        isSaving.value = false;
        newSurvey.value = {
            name: '',
            date: '',
            status: 'draft',
            songs: []
        };
    }

    function show() {
        reset();
        
        modalRef.value.show();
    }

    function removeSong(songId) {
        newSurvey.value.songs = newSurvey.value.songs.filter(song => song.id !== songId);
    }

    function addSong() {
        if (newSong.value.trim() === '') {
            return;
        }

        newSurvey.value.songs.push({
            id: uuidv4(),
            name: newSong.value
        });

        newSong.value = '';
    }

    function setSurveyStatus(event, status) {
        newSurvey.value.status = status;

        // Remove the 'show' class from the dropdown menu
        event.currentTarget.parentElement.parentElement.classList.remove('show');
    }

    function isValid() {
        return newSurvey.value.name.trim() !== '' 
            && newSurvey.value.date.trim() !== '';
    }

    function handleCancel() {
        modalRef.value.hide();
    }

    async function handleSave() {
        if (isSaving.value) {
            return;
        }

        if (!isValid()) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }

        isSaving.value = true;

        try {
            await SurveyService.createSurvey(newSurvey.value);
            emit('saved');
        } catch (error) {
            console.error(error);
            alert('Fehler beim Erstellen der Umfrage.');
        }

        modalRef.value.hide();
    }

    defineExpose({ show });
</script>

<template>
    <BootstrapModal ref="modal" size="lg" @success="handleSave" @failure="handleCancel">
        <template #header>
            <h5 class="modal-title">
                Neue Umfrage erstellen
            </h5>
        </template>
        <template #body>
            <div class="mb-3">
                <label for="surveyTitle" class="form-label">Titel</label>
                <input type="text" class="form-control" id="surveyTitle" v-model="newSurvey.name">
            </div>
            <div class="mb-3">
                <label for="surveyDate" class="form-label">Datum</label>
                <input type="date" class="form-control" id="surveyDate" v-model="newSurvey.date">
            </div>
            <div class="mb-3">
                <label class="form-label">Status</label>
                <div class="dropdown">
                    <button 
                        class="btn dropdown-toggle"
                        :class="'btn-' + statusOptions.find(option => option.value === newSurvey.status).colorClass" 
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        data-bs-auto-close="true" >
                        {{ statusOptions.find(option => option.value === newSurvey.status).text }}
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="option in statusOptions" :key="option.value">
                            <a class="dropdown-item" @click="setSurveyStatus($event, option.value)" href="#">
                                {{ option.text }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="song-list mb-3">
                <div v-if="newSurvey.songs.length === 0" class="text-secondary fst-italic text-center pt-2 pb-3">
                    Keine Songs hinzugefügt.
                </div>
                <div v-else
                    v-for="song in newSurvey.songs" 
                    :key="song.id" 
                    class="song-item d-flex align-items-center justify-content-between">
                    <span class="ms-2">{{ song.name }}</span>
                    <button class="btn btn-danger btn-sm ms-2" @click="removeSong(song.id)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>

                <hr>

                <div class="input-group mt-2 mb-2">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Song Titel"
                        v-model="newSong">
                    <button 
                        class="btn btn-primary" 
                        type="button"
                        @click="addSong">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </div>
        </template>
        <template #success>
            <template v-if="isSaving">
                <div class="spinner-border spinner-border-sm text-light" role="status"></div>
            </template>
            <template v-else>
                Speichern
            </template>
        </template>
        <template #failure>
            Abbrechen
        </template>
    </BootstrapModal>
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