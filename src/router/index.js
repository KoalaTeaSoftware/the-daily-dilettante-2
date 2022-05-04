import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/views/Welcome";
import About from "@/views/About";
import WessexFeatures from '@/views/WessexFeatures'
import WessexPodcasts from "@/views/WessexPodcasts";
import Newsletter from "@/views/Newsletter";
import Contact from "@/views/Contact";

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
    }, {
        path: '/contact',
        name: 'contact',
        component: Contact
    }, {
        path: '/newsletter',
        name: 'newsletter',
        component: Newsletter
    }, {
        path: '/storyworlds/wessex/features',
        name: 'legacy-features',
        component: WessexFeatures
    }, {
        path: '/storyworlds/wessex/podcasts',
        name: 'legacy-podcasts',
        component: WessexPodcasts
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
