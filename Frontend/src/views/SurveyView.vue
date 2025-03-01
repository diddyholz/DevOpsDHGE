<script setup>
import SurveyList from '../components/SurveyList.vue'
import SurveyService from '../services/SurveyService.js'
import VoteModal from '../components/VoteModal.vue'

import { useTemplateRef, ref } from 'vue'

const surveys = ref(null);
const voteModal = useTemplateRef("vote-modal");

function handleVoteSurvey(id) {
    // Get the survey by id
    const survey = surveys.value.find(s => s.id === id);

    if (survey == null) {
        console.error(`Survey with id ${id} not found.`);
        return;
    }
    
    voteModal.value.show(survey, survey.title);
}

async function loadSurveys() {
    surveys.value = await SurveyService.getSurveys();
}

loadSurveys();
</script>

<template>
    <div class="w-100">
        <VoteModal ref="vote-modal"></VoteModal>
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
                <SurveyList :surveys="surveys" @vote-survey="handleVoteSurvey"/>
            </template>
        </div>
        <button class="btn btn-primary mt-5">
            Neue Umfrage
        </button>
    </div>
</template>
