<template>
    <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Antes de Continuar...</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="login-bango" :fullscreen="true" class="ion-padding ion-justify-content-around">

      <div class="breathes">

        
        <form @submit.prevent="prosseguir" class="leGrid">
          <h1>Confirme seu número de telefone por gentileza</h1>
          <ion-item>

            <masked-input 
                @digitada="checkBango" :mask="'(00) 00000-0000'" 
              />
              
            <ion-icon slot="start" :icon="phonePortraitOutline"></ion-icon>
          </ion-item>

          <div id="recaptcha-container"></div>

          </form>


      </div>

    </ion-content>
  </ion-page>
</template>

<style> 
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
 } from '@ionic/vue';

import { ref } from 'vue';
import { useStore } from 'vuex';
import { auth } from '@/firebase/config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import api from '@/services/api';
import store from '@/services/store';
import router from '@/router';

import MaskedInput from '@/components/MaskedInput.vue';


const state = store.state
const phoneNumber = ref()

const checkBango = async function(ev)
{
  //console.log(ev, ev.length)

  let recaptcha = document.querySelector('#recaptcha-container')
  recaptcha.innerHTML = ""

  phoneNumber.value = ev
  
  if ( ev.length == 15 )
  {
    try
    {

      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container', 
        {
          callback: () =>
          {
            let number = ev
            number = number.replace('(', '')
            number = number.replace(')', '')
            number = '+55'+number

            signInWithPhoneNumber(auth, number, recaptchaVerifier)
              .then((confirmationResult) => {
                console.log(confirmationResult)
                store.commit('setConfirmationResult', confirmationResult)
                router.replace('/login/sms');
              })
              .catch((error) => {
                console.error(error)
              })
            
          }
        })

      recaptchaVerifier.render()

    } catch( err )
    {
      alert("ERRO 1719!");
      console.error(err)
    }
  }
}

</script>