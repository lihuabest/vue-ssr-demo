<template>
    <div>
        <h1>VUE SSR DEMO21322</h1>
        <HeaderComponent></HeaderComponent>
        <a href="javascript:;" @click="click">点击</a>
    </div>
</template>

<script>
    import HeaderComponent from './components/header.vue'

    export default {
        name: 'App',
        components: {
            HeaderComponent
        },
        beforeCreate() {
            console.log('app beforeCreate')
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

