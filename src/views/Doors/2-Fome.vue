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
          <h1>Fome/Frio</h1>
          <p>
            Se estás com fome ou frio e precisas de ajuda, podes pedir ajuda a
            alguém que esteja disponível para te ajudar.
          </p>
        </div>

        <ion-list @click="requestHelp" lines="none">
          <ion-list-header color="light">
            <ion-label>Escolha o tipo de ajuda que precisa</ion-label>
          </ion-list-header>
          
          <ion-item data-need="marmitex" button>
            <img class="icon" src="/icons/marmitex.svg" slot="start" />
            <ion-label>Marmitex</ion-label>
          </ion-item>

          <ion-item data-need="cesta" button>
            <img class="icon" src="/icons/food.svg" slot="start" />
            <ion-label>Cesta Básica</ion-label>
          </ion-item>

          <ion-item data-need="roupas" button>
            <img class="icon" src="/icons/clothes.svg" slot="start" />
            <ion-label>Roupa</ion-label>
          </ion-item>

          <ion-item data-need="agasalhos" button>
            <img class="icon" src="/icons/winter-hat.svg" slot="start" />
            <ion-label>Agasalho</ion-label>
          </ion-item>

          <ion-item data-need="calcados" button>
            <img class="icon" src="/icons/sneakers.svg" slot="start" />
            <ion-label>Calçados</ion-label>
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
  IonListHeader
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
