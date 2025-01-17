import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Existing page
import WebsiteTable from '../views/WebsiteTable.vue'; // New page

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/websites', name: 'Websites', component: WebsiteTable },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
