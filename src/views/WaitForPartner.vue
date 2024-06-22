<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>Não vá sozinho!</h1>

      <p>Aguarde enquanto aguardamos mais um voluntário para te acompanhar.</p>
      <p>Assim que encontrarmos alguém, vocês poderão combinar o melhor horário.</p>

      
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

.page {
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
