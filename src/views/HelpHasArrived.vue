<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>Sua ajuda chegou!</h1>

      <div v-if="loading">Carregando dados...</div>

      <div v-if="!loading">

        <h2>{{ reqData.partner.name }}</h2>
        <p>{{ reqData.partner.bairro }}, {{ reqData.partner.localidade }}</p>

        <p id="basicInfo">
          {{ reqData.partner.bairro }} <br />
          <strong>{{ reqData.partner.localidade }}</strong>
        </p>

        <div id="buttons">
          <ion-button @click="callPhone" shape="round" size="large">
            <ion-icon slot="icon-only" :icon="callOutline"></ion-icon>
          </ion-button>
          <ion-button @click="callWhats" shape="round" size="large" color="success">
            <ion-icon slot="icon-only" :icon="logoWhatsapp"></ion-icon>
          </ion-button>
        </div>
      
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import store from '@/services/store';
import api from '@/services/api';
import router from '@/router';
import { useRoute } from 'vue-router'

import
{
  IonButtons,
  IonContent,
  IonButton,
  IonIcon,
  IonHeader,
  IonMenuButton, IonPage,
  IonTitle,
  IonToolbar,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,
  IonTextarea,
  IonItem,
} from '@ionic/vue';

import { call, callOutline, logoWhatsapp, handLeftOutline } from 'ionicons/icons';

import { ref, computed } from 'vue';

const loading = ref(true);

const reqData = ref({
  partner: {
    name: 'carregando...',
    bairro: 'carregando...',
    localidade: 'carregando...',
    phoneNumber: 'carregando...',
  },
});

// get uuid from router
const route = useRoute();
const uuid = route.params.uuid;


// set backUrl
store.commit('setBackUrl', '/meet-your-partner/' + uuid);

// use api to get the help request
// getHelpRequest/uuid
api.getHelpRequest(uuid)
  .then((response) => {

    let data = response.data.data;
    reqData.value = data;

  })
  .catch((error) => {
    console.error('error', error);
    loading.value = false;
  });



const callPhone = function()
{
  console.log('callPhone', reqData.value.partner.phoneNumber)
  window.open('tel:' + reqData.value.partner.phoneNumber, '_system')
}

const callWhats = function()
{
  let number = reqData.value.partner.phoneNumber.substring(1)
  console.log('callWhats', number)
  window.open('https://api.whatsapp.com/send?phone=' +  number, '_system')
}
</script>

<style scoped>
h1 {
  font-size: 1.5em;
  padding: 0px 1em 1em;
  margin-bottom: 1em;
  border-bottom: 2px solid rgb(0, 183, 255);
}

.pedido {
  padding: 1.5em;
  border-radius: 8px;
  margin-bottom: 1em;
}

h2 {
  text-transform: capitalize;
}

#basicInfo {
  margin-top: -5px;
  margin-bottom: 32px;
}

#helpText {
  margin-top: 32px;
  font-size: 2.2em;
  text-transform: uppercase;
  line-height: 1em;
  font-weight: bold;
  color: rgb(0, 183, 255);
}

h3 {
  margin: 64px 0px 16px;
}

p {
  margin-bottom: 1em;
}

#buttons {
  display: flex;
  gap: 32px;
  justify-content: space-around;
  margin: 48px 0px;
}

#volunteerBtn {
  margin-top: 72px;
}
</style>
