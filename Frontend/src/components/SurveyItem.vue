<script setup>
    import { ref } from 'vue';

    const emit = defineEmits(['deleteSurvey', 'voteSurvey', 'editSurvey', 'results']);
    const props = defineProps(['survey']);
    const date = new Date(props.survey?.date).toLocaleDateString();

    const isDeleting = ref(false);

    async function handleDelete() {
        isDeleting.value = true;
        emit('deleteSurvey', props.survey.id);
    }

    async function handleVote() {
        emit('voteSurvey', props.survey.id);
    }

    function handleEdit() {
        emit('editSurvey', props.survey.id);
    }
    
    function handleResults() {
        emit('results', props.survey.id);
    }
</script>

<template>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ survey.title }}</h5>
        <p class="card-text">Datum: {{ date }}</p>
        <div class="d-flex">
            <template v-if="survey.status === 'open'">
                <button @click="handleVote" class="btn btn-primary">Abstimmen</button>
            </template>
            <template v-else-if="survey.status === 'closed'">
                <button @click="handleResults" class="btn btn-success">Ergebnisse</button>
            </template>
            <button class="btn btn-secondary ms-2" @click="handleEdit">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger ms-2" :disabled="isDeleting" @click="handleDelete">
                <template v-if="isDeleting">
                    <div class="spinner-border spinner-border-sm" role="status"></div>
                </template>
                <template v-else>
                    <i class="bi bi-trash"></i>
                </template>
            </button>
        </div>
      </div>
    </div>      
</template>
