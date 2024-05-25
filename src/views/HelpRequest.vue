<template>
  <ion-page>
      <ion-content :fullscreen="true" class='ion-padding'>
      
        <h1>Temos um novo pedido de ajuda!</h1>

        <div v-if="loading">Carregando dados...</div>
        
        <div class="pedido" v-if="!loading && stillNeedHelp">

          <h2>{{ reqData.user.name  }}</h2>
          <p>Precisa de {{ helpText }}</p>
          <p>{{ reqData.confession}}</p>      

          <IonButton 
            color="primary" 
            @click="router.push('/i-want-to-help/' + uuid + '')" 
            size="large" expand="block"
          >
          <ion-icon slot="start" :icon="handLeftOutline"></ion-icon>
            <!-- ISA.6.8.ARA -->
            Eis-me aqui, <br />envia-me a mim!
          </IonButton>

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

import { handLeftOutline, heart, logoApple, settingsSharp, star } from 'ionicons/icons';

import { ref, computed } from 'vue';

const loading = ref(true);
const stillNeedHelp = ref(true);
const reqData = ref({
  user: {name: 'carregando...'}
});

// get uuid from router
const route = useRoute();
const uuid = route.params.uuid;

console.log('uuid', uuid);

// set backUrl
store.commit('setBackUrl', '/help-request/' + uuid);

// use api to get the help request
// getHelpRequest/uuid
api.getHelpRequest(uuid)
  .then((response) => {

    console.log('response', response);
    loading.value = false;

    let data = response.data;
    if ( data.helper_1 != null && data.helper_2 != null )
    {
      stillNeedHelp.value = false;
      return;
    }

    reqData.value = data;

  })
  .catch((error) => {
    console.error('error', error);
    loading.value = false;
  });

const helpText = computed(() => {
  switch (reqData.value.need)
  {
    case 'compras':
      return 'Alguém pra fazer compras';
    case 'food':
      return 'comida';
    case 'medicine':
      return 'remédio';
    case 'money':
      return 'dinheiro';
    case 'other':
      return 'outro';
    default:
      return 'ajuda';
  }
});

</script>

<style scoped>

  h1
  {
    font-size: 1.8em;
    padding: 0px 1em;
    margin-bottom: 1em;
  }

  .pedido
  {
    padding: 1.5em;
    border-radius: 8px;
    margin-bottom: 1em;
  } 

</style>
