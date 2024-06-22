<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Notifications</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
        <ion-card @click="notificationClicked(notificacao)" v-for="notificacao in notificacoes" :key="notificacao.id">
          <ion-card-header>
            <ion-card-title>{{ notificacao.title }}</ion-card-title>
            <ion-card-subtitle>{{ notificacao.body }}</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <div v-if="notificacoes.length == 0">
          <p>Nenhuma notificação</p>
        </div>



    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import router from '@/router';
import 
{ 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, IonPage, 
  IonTitle, 
  IonToolbar,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,
  
} from '@ionic/vue';

import { ref } from 'vue';
import { mapTypeToRoute } from '@/services/notifications';

const notificacoes = ref([]);

// load from localStorage
if(localStorage.getItem('notifications'))
{
  notificacoes.value = JSON.parse(localStorage.getItem('notifications'));
}

const notificationClicked = (n) =>
{
  console.log( 'Notification clicked: ', n );

  let route = mapTypeToRoute(n.data.type);
  router.push(route + '' + n.data.uuid);

}

</script>

<style scoped>
  #notificacoes
  {
    padding: 20px;
  }
</style>
