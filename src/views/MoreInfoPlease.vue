<template>
  <ion-page>
      <ion-content :fullscreen="true" class='ion-padding'>
      
        <h1>Mais alguma coisa que nós precisamos saber?</h1>

        <form @submit.prevent="prosseguir" class="leGrid">
          
          <ion-item>
            <ion-textarea 
              label="Observações" 
              labelPlacement="floating"
              placeholder="A hora que você prefere ser atendido, ou qualquer outra informação que você acha relevante."
              :v-model="confession"
              @ionInput="setConfession"
              required="true"
              rows="16"
              ></ion-textarea>
          </ion-item>

          <ion-item>
          </ion-item>
          <ion-button size="large" expand="full" type="submit">
            <ion-icon slot="start" :icon="heartCircleOutline"></ion-icon>
            Amém?
          </ion-button>

        </form>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import store from '@/services/store';
import api from '@/services/api';

import { ref } from 'vue';

const state = store.state;
const confession = ref('');

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

import { heartCircleOutline } from 'ionicons/icons';

const setConfession = (value) => {
  confession.value = value.target.value;
  store.commit('setConfession', confession.value);
}

const prosseguir = () => {
  console.log('prosseguir', store );
  setTimeout(api.requestHelp, 2000)
  //api.requestHelp();
}

console.log('MoreInfoPlease', store );

</script>

<style scoped>

  h1
  {
    font-size: 1.8em;
    padding: 0px 1em;
    margin-bottom: 1em;
  }

</style>
