<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>Não vá sozinho!</h1>

      <p>Aguarde enquanto aguardamos mais um voluntário para te acompanhar.</p>
      <p>Assim que encontrarmos alguém, vocês poderão combinar o melhor horário.</p>

      <p>&nbsp</p>
      <p>&nbsp</p>

      <IonButton routerLink="/doors" expand="block" color="primary">Voltar para o Início</IonButton>
      
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

</script>

<style scoped>
h1 {
  font-size: 1.5em;
  padding: 0px 1em 1em;
  margin-bottom: 1em;
  border-bottom: 2px solid rgb(0, 183, 255);
}
 p
  {
    padding: 0px 1em;
    margin-bottom: 1em;
  }
</style>
