<template>

  <ion-page>
    <ion-content :fullscreen="true">

      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Primeiros Contatos</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <div id="header">
          <h1>Estou com Medo</h1>
          <p>
            O medo é uma emoção que pode ser desencadeada por uma situação real ou imaginária. 
            Ele é uma resposta natural do organismo a uma situação de perigo, 
            que pode ser real ou imaginária. 
            O medo é uma emoção que pode ser desencadeada por uma situação real ou imaginária. 
            Ele é uma resposta natural do organismo a uma situação de perigo, 
            que pode ser real ou imaginária.
          </p>
        </div>

        <ion-list>

          <ion-item>
            <ion-label>Pensamento Suicida?</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Alguém pra conversar</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Oferecer Companhia</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Escutar e dar apoio</ion-label>
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
