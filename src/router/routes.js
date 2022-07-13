/**
 * The legacy-* routes allow for links that were published before this particular rewrite
 */
import Welcome from "@/views/Welcome";
import About from "@/views/About";
import WessexFeatures from '@/views/WessexFeatures'
import WessexPodcasts from "@/views/WessexPodcasts";
import Newsletter from "@/views/Newsletter";
import Contact from "@/views/Contact";
import Events from "@/views/Events";

export const routes = [
    {path: '/', name: 'welcome', component: Welcome},
    {path: '/about', name: 'about', component: About},
    {path: '/features', name: 'features', component: WessexFeatures},
    {path: '/podcasts', name: 'podcasts', component: WessexPodcasts},
    {path: '/contact', name: 'contact', component: Contact},
    {path: '/events', name: 'events', component: Events},
    {path: '/newsletter', name: 'newsletter', component: Newsletter},
    {path: '/storyworlds/wessex/features', name: 'legacy-features', component: WessexFeatures},
    {path: '/storyworlds/wessex/podcasts', name: 'legacy-podcasts', component: WessexPodcasts},
    {path: '/:pathMatch(.*)', name: 'not-found', component: Welcome}
]
