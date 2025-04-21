<script setup>
import SurveyList from '../components/SurveyList.vue'
import SurveyService from '../services/SurveyService.js'
import VoteModal from '../components/VoteModal.vue'
import EditModal from '../components/EditModal.vue'
import CreateModal from '../components/CreateModal.vue'
import ResultModal from '../components/ResultModal.vue'

import { useTemplateRef, ref } from 'vue'

const surveys = ref(null);
const voteModal = useTemplateRef("vote-modal");
const editModal = useTemplateRef("edit-modal");
const createModal = useTemplateRef("create-modal");
const resultModal = useTemplateRef("result-modal");

async function handleDeleteSurvey(id) {
    // Delete the survey by id
    try {
        await SurveyService.deleteSurvey(id);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        loadSurveys();
    }
}

function handleCreateSurvey() {
    createModal.value.show();
}

function handleEditSurvey(id) {
    // Get the survey by id
    const survey = surveys.value.find(s => s.id === id);

    if (survey == null) {
        console.error(`Survey with id ${id} not found.`);
        return;
    }
    
    editModal.value.show(id, survey.name);
}

function handleVoteSurvey(id) {
    // Get the survey by id
    const survey = surveys.value.find(s => s.id === id);

    if (survey == null) {
        console.error(`Survey with id ${id} not found.`);
        return;
    }
    
    voteModal.value.show(id, survey.name);
}

function handleResults(id) {
    // Get the survey by id
    const survey = surveys.value.find(s => s.id === id);

    if (survey == null) {
        console.error(`Survey with id ${id} not found.`);
        return;
    }
    
    resultModal.value.show(id, survey.name);
}

function handleSaved() {
    // Reload the surveys after saving
    loadSurveys();
}

async function loadSurveys() {
    surveys.value = null;
    surveys.value = await SurveyService.getSurveys();
}

loadSurveys();
</script>

<template>
    <div class="w-100">
        <VoteModal ref="vote-modal"></VoteModal>
        <EditModal ref="edit-modal" @saved="handleSaved"></EditModal>
        <CreateModal ref="create-modal" @saved="handleSaved"></CreateModal>
        <ResultModal ref="result-modal"></ResultModal>
        
        <div>
            <h1>Umfragen</h1>
            <p>Wähle eine Umfrage aus, bei der du abstimmen möchtest.</p>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <template v-if="surveys == null">
                <div class="spinner-border text-primary" role="status">
                </div>
            </template>
            <template v-else-if="surveys.length === 0">
                <p class="text-secondary fst-italic">Keine Umfragen vorhanden.</p>
            </template>
            <template v-else>
                <SurveyList 
                    :surveys="surveys" 
                    @vote-survey="handleVoteSurvey" 
                    @delete-survey="handleDeleteSurvey"
                    @edit-survey="handleEditSurvey"
                    @results="handleResults"/>
            </template>
        </div>
        <button class="btn btn-primary mt-5" @click="handleCreateSurvey">
            Neue Umfrage
        </button>
    </div>
</template>
