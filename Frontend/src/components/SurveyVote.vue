<script setup>
    defineProps(['survey']);
</script>

<template>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ survey.name }}</h5>
        <p class="card-text">Datum: {{ survey.date }}</p>
        <template v-if="survey.status === 'open'">
            <a href="#" class="btn btn-primary">Abstimmen</a>
        </template>
        <template v-else-if="survey.status === 'closed'">
            <a href="#" class="btn btn-secondary">Ergebnisse</a>
        </template>
      </div>
    </div>      
</template>
