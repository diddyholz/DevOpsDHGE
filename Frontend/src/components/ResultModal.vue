<script setup>
    import BootstrapModal from './bootstrap-wrappers/BootstrapModal.vue';
    import { useTemplateRef, ref } from 'vue';
    import SurveyService from '../services/SurveyService.js';

    const modalRef = useTemplateRef("modal");
    const surveyResults = ref(null);
    const tmpTitle = ref('');

    function reset() {
        surveyResults.value = null;
        tmpTitle.value = '';
    }

    function show(surveyId, surveyTitle) {
        reset();
        
        tmpTitle.value = surveyTitle;
        loadResults(surveyId);
        modalRef.value.show();
    }

    async function loadResults(surveyId) {
        let survey = await SurveyService.getSurvey(surveyId);
        let results = await SurveyService.getResults(surveyId);
        let computedResult = [];

        for (let song of results) {
            let songData = survey.songs.find(s => s.id == song.song);
            let songName = "Unbekannt";

            if (songData) {
                songName = songData.name;
            }

            computedResult.push({
                id: song.id,
                name: songName,
                place: song.place
            });
        }

        surveyResults.value = computedResult;
    }

    async function handleClose() {
        modalRef.value.hide();
    }

    defineExpose({ show });
</script>

<template>
    <BootstrapModal ref="modal" size="lg" @success="handleClose" @failure="handleCancel">
        <template #header>
            <h5 class="modal-title">
                Ergebnisse für {{ tmpTitle }}
            </h5>
        </template>
        <template #body>
            <template v-if="surveyResults == null">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary m-4" role="status"></div>
                </div>
            </template>
            <template v-else>
                <p>Das Ergebniss der Umfrage lautet:</p>
                <div class="ms-3">
                    <p v-for="song in surveyResults" :key="song.id">
                        <strong>{{ song.place + 1 }}. {{ song.name }}</strong>
                    </p>
                </div>
            </template>
        </template>
        <template #success>
            Schließen
        </template>
    </BootstrapModal>
</template>