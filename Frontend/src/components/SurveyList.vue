<script setup>
    import SurveyItem from './SurveyItem.vue';

    defineProps(['surveys']);
</script>

<template>
    <div class="survey-list">
        <SurveyItem 
            v-for="survey in surveys" 
            :key="survey.id" 
            :survey="survey" 
            @vote-survey="(id) => $emit('voteSurvey', id)" 
            @delete-survey="(id) => $emit('deleteSurvey', id)"
            @edit-survey="(id) => $emit('editSurvey', id)"
            @results="(id) => $emit('results', id)" />
    </div>
</template>

<style scoped>
    .survey-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
</style>
