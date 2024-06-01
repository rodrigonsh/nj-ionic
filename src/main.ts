import { createApp } from 'vue'
import App from './App.vue'
import router from './router';


import { IonicVue } from '@ionic/vue';

  

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Cleave from 'cleave.js';

import api from '@/services/api';
import store from '@/services/store';

const state = store.state

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .directive('cleave', {
    mounted: (el, binding) => {
        //console.log('cleave mounted', el, binding)
        el.cleave = new Cleave(el, binding.value || {})
    },
    updated: (el) => {
        const event = new Event('input', {bubbles: true});
        setTimeout(function () {
            el.value = el.cleave.properties.result
            el.dispatchEvent(event)
        }, 100);
    }
  });;
  
router.isReady().then(() => {
  app.mount('#app');

});


// Listen to service worker messages sent via postMessage()
navigator.serviceWorker.addEventListener('message', (event) => {
  if (!event.data.action) {
    return
  }

  switch (event.data.action) {
    case 'redirect-from-notificationclick':
      window.location.href = event.data.url
      break
    // no default
  }
})
