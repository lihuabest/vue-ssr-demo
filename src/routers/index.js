import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 
export default function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        routes: [
            {
                path: '/',
                name: 'index',
                component: () => System.import('../components/index.vue')
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: () => System.import('../components/detail.vue')
            }
            // ,
            // {
            //     path: '/',
            //     redirect: '/index'
            // }
        ]
    })
}