<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>Pedido recebido!</h1>

      <div class="pedido">

        <p>Seu pedido foi recebido!</p>
        <p>Estamos procurando voluntários para te ajudar.</p>
        <p>Em breve você receberá uma notificação com o status do seu pedido.</p>

        <p>&nbsp</p>
        <p>&nbsp</p>

        <IonButton routerLink="/doors" expand="block" color="primary">Voltar para o Início</IonButton>

      </div>
       
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import store from '@/services/store';
import api from '@/services/api';
import router from '@/router';
import { RouterLink } from 'vue-router'

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

</style>
