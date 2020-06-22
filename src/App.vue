<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
            |
            <a v-if="isAuth" @click="logout" href="#">Logout</a>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {AUTH_LOGOUT} from "@/type"
    import {Getter} from "vuex-class"

    @Component
    export default class App extends Vue {

        @Getter('isAuth') public isAuth : any

        logout() {
            this.$store.dispatch(AUTH_LOGOUT).then(() => {
                this.$router.push("/login")
            })
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
