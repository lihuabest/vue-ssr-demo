<template>
    <div>
        <h2>Index</h2>
        <div>
            <p>this is a: {{a}}</p>
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
    import api from '../services/index'

    export default {
        name: 'IndexComponent',
        data() {
            return {
                lists: null,
                a: 0
            }
        },
        prefetch() {
            return new Promise((resolve, reject) => {
                api.get('/v2/movie/in_theaters').then(data => {
                    let d = {
                        lists: data.subjects,
                        a: 123
                    }
                    resolve(d);
                }).catch(err => {
                    reject(err);
                })

                // let d = {
                //     lists: null,
                //     a: 123
                // }
                // resolve(d)
            });
        },
        methods: {

        }
    }
</script>
