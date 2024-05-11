<template>

  <ion-page>
    <ion-content :fullscreen="true">

      <ion-header>
        <ion-toolbar color="secondary">
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Preciso de Ajuda</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">

        <div id="header">
          <h1>Estou doente</h1>
          <p>
            Se estás doente e precisas de ajuda, podes pedir ajuda a
            alguém que esteja disponível para te ajudar.
          </p>
        </div>

        <ion-list @click="requestHelp" lines="none">

          <ion-list-header color="light">
            <ion-label>Cuidados Básicos</ion-label>
          </ion-list-header>

          <ion-item button data-need="compras">
            <img class="icon" src="/icons/basket-shopping-solid.svg" slot="start" />
            <ion-label>Alguém pra fazer compras</ion-label>
          </ion-item>

          <ion-item button data-need="cozinhar">
            <img class="icon" src="/icons/utensils-solid.svg" slot="start" />
            <ion-label>Cozinhar refeições</ion-label>
          </ion-item>

          <ion-item button data-need="limpeza">
            <img class="icon" src="/icons/limpeza.svg" slot="start" />
            <ion-label>Limpeza da casa</ion-label>
          </ion-item>

          <ion-item button data-need="medical-appointment-transportation">
            <img class="icon" src="/icons/car-solid.svg" slot="start" />
            <ion-label>Transporte para consultas médicas</ion-label>
          </ion-item>


          <ion-list-header color="light">
            <ion-label>Cuidados especializados</ion-label>
          </ion-list-header>

          <ion-item button data-need="medical-appointment-partner">
            <img class="icon" src="/icons/handshake.svg" slot="start" />
            <ion-label>Companheiro(a) para consultas médicas</ion-label>
          </ion-item>

          <ion-item button data-need="medicines">
            <img class="icon" src="/icons/medicine.svg" slot="start" />
            <ion-label>Auxílio com Medicações</ion-label>
          </ion-item>

          <ion-item button data-need="care">
            <img class="icon" src="/icons/trophy.svg" slot="start" />
            <ion-label>Cuidado com crianças e idosos</ion-label>
          </ion-item>

        </ion-list>

        <ion-button size="large" expand="full">
          <img class="icon" src="/icons/bible.svg" slot="start" />
          Pastor Digital
        </ion-button>

      </div>


    </ion-content>
  </ion-page>

</template>

<script setup>

import 
{ 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonItem,
  IonList,
  IonButton,
  IonLabel,
  IonListHeader,
} from '@ionic/vue';

import { requestHelp } from '@/services/help';

</script>

<style scoped>
/* Your scoped style code here */

#header {

  padding: 16px 16px 0px;

  h1 {
    font-size: 2.5em;
    margin: 0px;
    color: var(--ion-color-secondary);
    font-variant: small-caps;
  }

  p {}

}

ion-list {
  padding-top: 0px;
  margin-bottom: 32px;
}

ion-list-header {
  margin-top: 32px;
}

ion-item {
  text-transform: uppercase;
  margin: 20px;
}

ion-item .item-native {
  padding-bottom: 20px;
}

ion-label {
  margin: 0;
}

.item-bottom {
  margin-bottom: 32px;
}

ion-button {
  font-weight: bold;
  margin-bottom: 64px;
}

button {
  text-shadow: 3px 3px 0px black;
}
</style>
