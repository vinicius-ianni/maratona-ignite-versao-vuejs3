import { createRouter, createWebHistory } from "vue-router";
import Event from './pages/Event.vue'
import Home from './pages/Home.vue'

const NotFound = {
    template: "<h1>NAO LOCALIZADO !</h1>"
}

const routes = [
    { path: "/", name: 'Home', component: Home },
    { path: "/events", name: 'Events', component: Event, props:true },
    {path: "/events/lesson/:lessonName", name:'Events/Lesson', component: Event, props: true},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]

const Router = createRouter({
  history: createWebHistory(),
  routes
});

export default Router;
