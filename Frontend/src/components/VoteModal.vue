<script setup>
    import BootstrapModal from './bootstrap-wrappers/BootstrapModal.vue';
    import SongList from './SongList.vue';
    import { useTemplateRef, ref } from 'vue';
    import SurveyService from '../services/SurveyService.js';

    const modalRef = useTemplateRef("modal");
    const songListRef = useTemplateRef("song-list");
    const currentSurvey = ref(null);
    const tmpTitle = ref('');
    const isSaving = ref(false);

    function show(surveyId, surveyTitle) {
        tmpTitle.value = surveyTitle;
        loadSurvey(surveyId);
        modalRef.value.show();
    }

    async function loadSurvey(surveyId) {
        currentSurvey.value = await SurveyService.getSurvey(surveyId);
    }

    function handleCancel() {
        modalRef.value.hide();
    }

    async function handleSave() {
        if (currentSurvey.value == null) {
            return;
        }

        if (isSaving.value) {
            return;
        }

        isSaving.value = true;
        await SurveyService.createVote(currentSurvey.value.id, songListRef.value.getSongVotes());
        isSaving.value = false;
        modalRef.value.hide();
    }

    defineExpose({ show });
</script>

<template>
    <BootstrapModal ref="modal" size="lg" @success="handleSave" @failure="handleCancel">
        <template #header>
            <h5 class="modal-title">
                {{ currentSurvey?.title || tmpTitle }}
            </h5>
        </template>
        <template #body>
            <template v-if="currentSurvey == null">
                <div class="spinner-border text-primary" role="status"></div>
            </template>
            <template v-else-if="currentSurvey.songs.length == 0">
                <p>Für diese Umfrage sind noch keine Songs vorhanden</p>
            </template>
            <template v-else>
                <p>Wähle durch Drag & Drop deine Song-Vorlieben aus</p>
                <SongList ref="song-list" :songs="currentSurvey?.songs" />
            </template>
        </template>
        <template #success v-if="currentSurvey">
            <template v-if="isSaving">
                <div class="spinner-border spinner-border-sm text-light" role="status"></div>
            </template>
            <template v-else>
                Abschicken
            </template>
        </template>
        <template #failure>
            Abbrechen
        </template>
    </BootstrapModal>
</template>