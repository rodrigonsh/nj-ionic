<template>

  <ion-page>
    <ion-content :fullscreen="true">

      <ion-header>
        <ion-toolbar color="secondary">
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Vamos começar?</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">

        <div id="header">
          <h1>A paz do Senhor</h1>
          <p>
            Lucas 2:14 Glória a Deus nas alturas, Paz na terra, boa vontade para com os homens.
          </p>
        </div>

        
        
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

import { IonIcon } from '@ionic/vue';

import { FaBeer } from 'react-icons/fa';
import MenuIcon from 'vue-material-design-icons/Menu.vue';




const requestHelp = (ev) => {

  const text = ev.target.innerText;
  console.log('Requesting help', text);

}

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

  p
  {

  }

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

ion-item .item-native
{
  padding-bottom: 20px;
}

ion-label
{
  margin: 0;
}

.item-bottom
{
  margin-bottom: 32px;
}

.icon {
  width: 32px;
  margin-right: 20px;
}

ion-button {
  font-weight: bold;
  margin-bottom: 64px;
}

button
{
  text-shadow: 3px 3px 0px black;
}

</style>
