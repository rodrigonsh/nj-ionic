<template>
  <ion-page>
      <ion-content :fullscreen="true" class='ion-padding'>
      
        <h1>Temos um novo pedido de ajuda!</h1>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import store from '@/services/store';
import api from '@/services/api';
import router from '@/router';

import { ref } from 'vue';

// get uuid
const state = store.state;

// use api to get the help request

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


</script>

<style scoped>

  h1
  {
    font-size: 1.8em;
    padding: 0px 1em;
    margin-bottom: 1em;
  }

</style>
