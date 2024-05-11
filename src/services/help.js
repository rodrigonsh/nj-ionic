import { useStore } from 'vuex';
import { useIonRouter } from '@ionic/vue';

import store from '@/services/store.js';
import router from '@/router';

const state = store.state

const requestHelp = (ev) => {

  const target = ev.target.closest('ion-item')
  if (!target) return;

  const need = target.dataset.need
  const confession = state.confession

  console.log('Requesting help', need, confession);
  console.log('FOR User:', state.user);

  // checar se o usuario está online
  if (state.user === null) {
    console.log('User is offline');
    router.replace('/login');
    return;
  }

  store.commit('setNeed', need);

  router.push('/more-info-please');

}

export { requestHelp }