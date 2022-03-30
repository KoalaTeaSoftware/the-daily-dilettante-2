import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/views/Welcome";
import About from "@/views/About";

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    }, {
        path: '/about',
        name: 'about',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
