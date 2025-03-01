<script setup>
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'

    const route = useRoute();
    const activeRoute = computed(() => route.path);

    const navitems = [
        { name: 'Umfragen', path: '/' },
        { name: 'About', path: '/about' }
    ]
</script>

<template>
    <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Navbar</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <RouterLink 
                        v-for="item in navitems" 
                        :key="item.path" 
                        :to="item.path" 
                        class="nav-link" 
                        :class="{ active: item.path === activeRoute }">
                        {{ item.name }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>