<script setup>
    import SurveyItem from './SurveyItem.vue';

    defineProps(['surveys']);
</script>

<template>
    <div class="survey-list">
        <SurveyItem v-for="survey in surveys" :key="survey.id" :survey="survey" />
    </div>
</template>

<style scoped>
    .survey-list {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>
