import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/views/Welcome";
import About from "@/views/About";
import WessexFeatures from '@/views/WessexFeatures'

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
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
