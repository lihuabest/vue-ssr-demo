<template>
    <div>
        <h2>Index</h2>
        <div>
            <ul>
                <li v-for="(list) of lists" :key="list.id">
                    <h4>{{ list.title }}</h4>
                    <div>
                        <img v-bind:src="list.images.large">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import api from '../services/client'

    export default {
        name: 'IndexComponent',
        data() {
            return {
                lists: null
            }
        },
        methods: {
            asyncData() {
                console.log('load data')
                api.get('https://api.douban.com/v2/movie/in_theaters').then(data => {
                    this.lists = data.subjects
                    console.log(this.lists)
                }).catch(err => {
                    console.log(err)
                })
                // this.lists = data.subjects
            }
        }
    }
</script>
