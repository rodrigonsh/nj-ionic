<template>
    <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Antes de prosseguir...</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="login-dados" :fullscreen="true" class="ion-padding ion-justify-content-around">

      <div class="breathes">

        
        <form v-if="!loading" @submit.prevent="prosseguir" class="leGrid">
          
          <h1>
            Vamos precisar de alguns dados
          </h1>

          <ion-list lines="full">
        
            
            <ion-item>
              <ion-input 
              label="Nome Completo" 
              labelPlacement="floating"
              placeholder="" 
              v-model="dados.name"
              required="true"
              ></ion-input>
              <ion-icon slot="start" :icon="personOutline"></ion-icon>
            </ion-item>
            
            <ion-item>
              <ion-input 
                label="CPF" 
                labelPlacement="floating"
                placeholder="___.___.___-__" 
                v-model="dados.cpf"
                inputmode="tel"
                :required="true"
                v-cleave="{
                  blocks: [3, 3, 3, 2], 
                  delimiters: ['.',  '.', '-'],
                  }"
              ></ion-input>
                
              <ion-icon slot="start" :icon="idCardOutline"></ion-icon>
            </ion-item>

          </ion-list>
          
          <ion-button @click="prosseguir">Continuar</ion-button>

        </form>

        <img id="loading" v-if="loading" src="/spinner.gif" />

      </div>

    </ion-content>
  </ion-page>
</template>

<style>

  #login-dados
  {
    height:100dvh;
    position: relative;
  }

  #login-dados #leGrid
  {
    padding: 32px;
    display: flex !important;
    flex-direction: column !important;
    gap: 32px !important;
  }

  #login-dados #loading
  {
    display: block;
    width: 32px;
    margin: 56px auto;
  }
  
</style>

<script setup lang="ts">

import '@ionic/vue/css/core.css';

import 
{ 
  idCardOutline,
  personOutline,
  happyOutline,
  calendarNumber,

} from 'ionicons/icons';

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
  IonList,
  useIonRouter,
  alertController,
  
} from '@ionic/vue';

import { ref } from 'vue';

import api from '@/services/api';
import { cpf } from 'cpf-cnpj-validator'; 
import { updateProfile } from "firebase/auth"
import store from '@/services/store';
import router from '@/router';

const state = store.state

const loading = ref(false)
const dados = ref({name: '', cpf: '', phoneNumber: ''})

const prosseguir = async function()
{
  
  loading.value = true

  // verifica se é um nome completo
  if( dados.value.name.indexOf(" ") == -1 )
  {
    const presentAlert = async () => {
      
      const alert = await alertController.create({
        header: '🤨🤌 Nome Completo',
        subHeader: 'Você precisa fornecer seu nome completo',
        message: 'Escreva seu nome completo no campo onde está escrito NOME COMPLETO',
        buttons: ['OK'],
      });

      alert.onDidDismiss().then( () => loading.value = false )

      await alert.present();
    };

    return presentAlert();
  
  };

  console.log('teste1')

  // verifica se CPF é um número válido
  if(! cpf.isValid(dados.value.cpf))
  {
    const presentAlert = async () => {
      
      const alert = await alertController.create({
        header: '🤨 CPF Inválido! ',
        subHeader: 'Você precisa fornecer um CPF válido',
        message: 'Verifique se você digitou corretamente!',
        buttons: ['OK'],
      });

      alert.onDidDismiss().then( () => loading.value = false )

      await alert.present();
    };

    console.log('teste2')

    return presentAlert();
  
  }

  //tentar setar customClaims no nosso backend
  // se der certo atualizar o displayname

  dados.value.uid = state.user.uid
  dados.value.phoneNumber = state.user.phoneNumber

  store.commit('setUser', dados.value)

  console.log('teste3')
  router.replace('/login/address');
  console.log('teste4')

}

</script>