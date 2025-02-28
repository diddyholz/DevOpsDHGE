<script setup>
import SurveyList from '../components/SurveyList.vue'
import SurveyService from '../services/SurveyService.js'

import { ref } from 'vue'

const surveys = ref(null);

async function loadSurveys() {
    surveys.value = await SurveyService.getSurveys();
}

loadSurveys();
</script>

<template>
    <div class="w-100">
        <div>
            <h1>Umfragen</h1>
            <p>Wählen Sie eine Umfrage aus, um abzustimmen.</p>
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
                <SurveyList :surveys="surveys" />
            </template>
        </div>
    </div>
</template>
