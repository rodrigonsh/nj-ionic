<template>
  <ion-page id="notificacoes">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Notifications</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content  :fullscreen="true"  style="--background: rgb(29, 211, 226)">
      
        <ion-card @click="notificationClicked(notificacao)" v-for="notificacao in notificacoes" :key="notificacao.id"
          class="ion-margin">
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

// load notifications from IndexedDB

const DBOpenRequest = self.indexedDB.open('notifications', 1);

  DBOpenRequest.onerror = function (event) {
    console.log('Error loading database.', event.target.errorCode);
  };

  DBOpenRequest.onsuccess = function (event) {
    console.log('Database initialized.');

    // store the result of opening the database in the db variable. This is used a lot below
    let db = event.target.result;

    // Open the object store
    let objectStore = db.transaction('notifications').objectStore('notifications');

    // Create a cursor request to get all items in the store, which we collect in the allNotifications array
    objectStore.openCursor().onsuccess = function (event) {
      let cursor = event.target.result;

      if (cursor) {
        notificacoes.value.push(cursor.value);
        cursor.continue();
      }
    };
    
  }



const notificationClicked = (n) =>
{
  console.log( 'Notification clicked: ', n );

  let route = mapTypeToRoute(n.data.type);
  router.push(route + '' + n.data.uuid);

}

</script>

<style scoped>
  
</style>
