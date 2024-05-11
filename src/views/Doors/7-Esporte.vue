<template>

  <ion-page>
    <ion-content :fullscreen="true">

      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Viver</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <div id="header">
          <h1>Quero Praticar Esportes</h1>
          <p>
            Praticar esportes é uma atividade que pode ser feita sozinho ou em grupo.
            Se você quer praticar esportes, pode pedir ajuda a alguém que esteja disponível para te ajudar.
          </p>
        </div>

        <ion-list>

          <ion-item>
            <ion-label>Skate</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Capoeira</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Surf</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Futebol</ion-label>
          </ion-item>

        </ion-list>
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


</script>

<style scoped>
/* Your scoped style code here */

#header {

  padding: 16px 16px 0px;

  h1 {
    font-size: 2.5em;
    margin-bottom: 0px;
  }

}

ion-list
{
  padding-top: 0px;
}

ion-list-header {
    margin-top: 32px;
}

</style>
