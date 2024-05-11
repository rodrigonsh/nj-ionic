<template>

  <ion-page>
    <ion-content :fullscreen="true">

      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Potencial Máximo</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">

        <div id="header">
          <h1>Potencial Máximo</h1>
          <p>
            Quando fizeres um voto a Deus, não tardes em o cumprir, porque não se agrada de tolos. Cumpre o voto que fazes. Melhor é não fazeres voto do que fazê-lo sem o cumprir.
          </p>
          <p>Eclesiastes 5:4-6 TB</p>
        </div>

        <p>Vai ser um score de promessas, onde a pessoa loga e faz uma promessa, e ela fica pública, e ela pode ser marcada diariamente como cumprida</p>
        
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
