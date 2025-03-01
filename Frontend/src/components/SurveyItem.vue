<script setup>
    const props = defineProps(['survey']);
    const date = new Date(props.survey?.date).toLocaleDateString();
</script>

<template>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ survey.title }}</h5>
        <p class="card-text">Datum: {{ date }}</p>
        <div class="d-flex">
            <template v-if="survey.status === 'open'">
                <button @click="$emit('voteSurvey', survey.id)" class="btn btn-primary">Abstimmen</button>
            </template>
            <template v-else-if="survey.status === 'closed'">
                <button class="btn btn-success">Ergebnisse</button>
            </template>
            <button class="btn btn-secondary ms-2">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger ms-2">
                <i class="bi bi-trash"></i>
            </button>
        </div>
      </div>
    </div>      
</template>
