import { createRouter, createWebHistory } from 'vue-router'
import SurveyView from '../views/SurveyView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'surveys',
            component: SurveyView,
        },
        // {
        //     path: '/vote/:id',
        //     name: 'survey',
        //     component: SurveyVote
        // },
        {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
        },
    ],
})

export default router
