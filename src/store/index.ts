import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {AUTH_LOGOUT, AUTH_ERROR, AUTH_SUCCESS, AUTH_REQUEST, USER_REQUEST} from "@/type"

Vue.use(Vuex);

const user = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || '',
        status: ''
    },
    mutations: {
        [AUTH_REQUEST]: (state) => {
            state.status = 'loading'
        },
        [AUTH_SUCCESS]: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        [AUTH_ERROR]: (state) => {
            state.status = 'error'
        }
    },
    actions: {
        [AUTH_REQUEST]: ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => {
                commit(AUTH_REQUEST)
                console.log(user)
                axios({url: 'https://reqres.in/api/login', data: user, method: 'POST'})
                    .then(resp => {
                        console.log(resp)
                        const token = resp.data.token
                        localStorage.setItem('user-token', token)
                        commit(AUTH_SUCCESS, token)
                        dispatch(USER_REQUEST)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit(AUTH_ERROR, err)
                        localStorage.removeItem('user-token')
                        reject(err)
                    })
            })
        },
        [AUTH_LOGOUT]: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                commit(AUTH_LOGOUT)
                localStorage.removeItem('user-token')
                resolve()
            })
        }
    },
    modules: {},
    getters: {
        isAuth: state => !!state.token,
        statusAuth: state => !!state.status
    }
});
