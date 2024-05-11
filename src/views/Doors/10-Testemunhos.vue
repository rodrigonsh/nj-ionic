<template>

  <ion-page>
    <ion-content :fullscreen="true">

      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Testemunhos</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">

        <div id="header">
          <h1>Chegamos lá!</h1>
          <p>
            E Você, até onde quer chegar?
          </p>
        </div>

        <p>Vai ser uma lista publica de testemunhos</p>
        
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
