<template>
    <div>
        <h1>VUE SSR DEMO</h1>
        <!-- <HeaderComponent></HeaderComponent>
        <a href="javascript:;" @click="click">点击</a>
        <div>
            <ul>
                <li v-for="(list) of lists" :key="list.id">
                    <h4>{{ list.title }}</h4>
                    <div>
                        <img v-bind:src="list.images.large">
                    </div>
                </li>
            </ul>
        </div> -->
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>

<script>
    import HeaderComponent from './components/header.vue'
    import api from './services/client'

    async function getData() {
        return await api.get('/v2/movie/in_theaters')
    }

    export default {
        name: 'App',
        components: {
            HeaderComponent
        },
        data() {
            return {
                lists: []
            }
        },
        async beforeCreate() {
            console.log('app beforeCreate')
            let data = await getData()
            this.lists = data.subjects
        },
        beforeMount() {
            console.log('app beforeMount')
        },
        mounted() {
            console.log('app mounted')
        },
        methods: {
            click() {
                alert(11)
            }
        }
    }
</script>
<style>
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s ease;
    }
</style>

