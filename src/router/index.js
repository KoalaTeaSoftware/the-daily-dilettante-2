import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/views/Welcome";
import About from "@/views/About";
import WessexFeatures from '@/views/WessexFeatures'
import WessexPodcasts from "@/views/WessexPodcasts";

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    }, {
        path: '/about',
        name: 'about',
        component: About
    }, {
        path: '/features',
        name: 'features',
        component: WessexFeatures
    }, {
        path: '/podcasts',
        name: 'podcasts',
        component: WessexPodcasts
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
