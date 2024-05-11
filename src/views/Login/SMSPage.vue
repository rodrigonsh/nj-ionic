<template>
    <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Confirmar telefone</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="login-sms" :fullscreen="true" class="ion-padding ion-justify-content-around">

      <div class="breathes">
        
        <form v-if="!loading" @submit.prevent="prosseguir" class="leGrid">

          <h1>
            Enviamos um código SMS para este número. 
            Por favor digite-o abaixo
          </h1>
            <ion-item>

              <ion-input 
                label="Código SMS" 
                labelPlacement="floating"
                placeholder="__ __ __ __ __ __" 
                inputmode="tel"
                v-model="masked"
                autofocus
                @keyup="checkCode"
                v-cleave="{
                  blocks: [1, 1, 1, 1, 1, 1], 
                  delimiter: ' ',
                  }"
              ></ion-input>
                
              <ion-icon slot="start" :icon="phonePortraitOutline"></ion-icon>
            </ion-item>
            
          </form>

        <img id="loading" v-if="loading" src="/spinner.gif" />


      </div>

    </ion-content>
  </ion-page>
</template>

<style>

  #login-sms
  {
    height:100dvh;
    position: relative;
  }

  #login-sms #loading
  {
    display: block;
    width: 32px;
    margin: 56px auto;
  }
  
</style>

<script setup lang="ts">

import '@ionic/vue/css/core.css';

import { phonePortraitOutline } from 'ionicons/icons';

import {
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  useIonRouter,
  alertController,
 } from '@ionic/vue';

import { ref } from 'vue'
import store from '@/services/store';
import router from '@/router';
var masked = ref("");
var loading = ref(false);

const state = store.state

const  checkCode = async function()
{  
  //console.log(masked.value, masked.value.length)
  if ( masked.value.length === 11 )
  {
    loading.value = true

    let partes = masked.value.split(" ") 
    let code = partes.join("")

    //console.log('testandoo', code, store)
    state.confirmationResult.confirm(code).then((result)=>
    {
      console.log('EITAAA', result.user)
      store.commit('setUser', result.user)
      return router.replace("/login/dados")
    }).catch((error)=>
    {

      console.error(error)

      const presentAlert = async () => 
      {
        const alert = await alertController.create({
          header: '😒😒😒😒😒😒',
          subHeader: 'Código Inválido',
          message: 'O Código foi enviado por SMS!',
          buttons: ['OK'],
        });

        alert.onDidDismiss().then(() => 
        {
          loading.value = false
          masked.value = ""
        })

        await alert.present();
        
      };

      return presentAlert();

    })
    //confirmationResult
    //await store.dispatch('signup', {})
    //setTimeout(prosseguir, 1000)
  }
}

const prosseguir = function()
{
  router.push('/login-dados');
}

</script>