import { createStore } from 'vuex'
import { auth, messaging } from '../firebase/config'
import dj from './dj';
import api from './api';

import {
  signOut,
  onAuthStateChanged,
  getIdToken
} from 'firebase/auth'

import router from '../router';

const store = createStore({

  state:
  {
    apiURL: 'http://localhost:80',
    authIsReady: false,
    user: null,
    confirmationResult: null,
    confession: null,
    need: null,
  },

  mutations:
  {

    setUser(state, payload) {

      console.log('setting user', payload)
      state.user = payload

      if (payload != null && 'accessToken' in payload) {
        api.setUserToken(payload.accessToken)
      }

    },


    updateUser(state, payload) {
      console.log('updating user', payload)
      state.user = { ...state.user, ...payload }
    },

    setConfirmationResult(state, obj) { state.confirmationResult = obj },

    authIsReady(state, payload) { state.authIsReady = payload },

    setConfession(state, payload) { state.confession = payload },

    setNeed(state, payload) { state.need = payload },

    setEndereco(state, payload) {
      // merge com o que já tem
      // pra pegar as coordenadas
      state.user = { ...state.user, ...payload }
    },

    setFamilySize(state, payload) {
      state.user.familySize = payload
    },

  },

  actions:
  {
    async logout(context) {
      await signOut(auth)
      context.commit('setUser', null)
    }

  }
})

const state = store.state

const unsub = onAuthStateChanged(auth, (user) => {

  //console.log('onAuthStateChanged', user)

  store.commit('authIsReady', true)
  store.commit('setUser', user)

  if (user != null) {

    console.log('user is logged in', user)

    api.checkIn({ uid: user.uid })
      .then(res => {

        if ('missingData' in res.data) {
          store.commit('setUser', {})
          router.replace('/login/dados')
          return
        }
        else {
          console.log(res.data)
          api.setBearer(res.data.token)
          router.replace('/doors')
        }


      })
      .catch(err => {
        console.log('checkIn error', err)
      })

  }
  else {
    console.log('user is logged out')
    router.replace('/login')
  }

  // esse unsub precisa mesmo?
  //unsub()
})


export default store
