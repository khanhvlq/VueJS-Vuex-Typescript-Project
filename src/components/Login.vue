<template>
    <div class="login">
        <form @submit.prevent="login">
            <h1>Login</h1>
            <label for="Email">Username</label>
            <br>
            <input required v-model="email" id="Email" type="text"/>
            <br>
            <br>
            <label for="Password">Password</label>
            <br>
            <input required v-model="password" id="Password" type="password"/>
            <br>
            <br>
            <button type="submit">Login</button>
        </form>
    </div>

</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {AUTH_REQUEST} from "@/type"

    @Component
    export default class Login extends Vue {
        private email: any = 'eve.holt@reqres.in'
        private password: any = 'cityslicka'
        public login() {
            const users = {
                email: this.email,
                password: this.password
            }

            this.$store.dispatch(AUTH_REQUEST, users).then(() => {
                this.$router.push('/')
            })
        }

        // name: "Login",
        // methods: {
        //     login: () => {
        //         const {username, password} = this
        //         this.$store.dispatch(AUTH_REQUEST, {username, password}).then(() => {
        //             this.$router.push("/")
        //         })
        //     }
        // }

    }
</script>

<style scoped>

</style>
