<template>
  <ion-page>
    <ion-content :fullscreen="true">


      <div id="container">

        <img id="logo" alt="Nova Jerusalém" src="/images/logo.png" width="190" />
        <img id="tipo" alt="Nova Jerusalém" src="/images/tipo-branco.png" width="320" />

        <p>V0.1 ALPHA <a target="_blank" rel="noopener noreferrer" href="https://">Site Oficial</a></p>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import {
useIonRouter,
IonContent,
IonPage,
} from '@ionic/vue';

import api from '@/services/api';

import router from '@/router';

</script>

<style scoped>
#container {
  background: rgb(29, 211, 226);
  background: radial-gradient(circle, rgba(29, 211, 226, 1) 0%, rgba(18, 127, 247, 1) 100%);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

#container .smallcaps {
  font-variant: small-caps;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  margin: 0;
}

#container a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

#logo {
  display: block;
  ;
}
</style>
