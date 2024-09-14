<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Qual seu Endereço?</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="endereco" :fullscreen="true" class="ion-padding ion-justify-content-around">

      <div class="breathes">

        <form v-if="!loading" @submit.prevent="prosseguir" class="leGrid">

          <h1>
            Você sabe seu CEP?
          </h1>

          <ion-item>

            <ion-input 
              label="CEP" 
              labelPlacement="floating" 
              placeholder="Digite seu CEP" 
              inputmode="tel"
              v-model="masked" 
              autofocus 
              v-cleave="{
                blocks: [5, 3],
                delimiter: '-',
              }"
              @keyup="checkCode"></ion-input>
          </ion-item>

          <ion-item>
          <ion-input 
            :required="true" 
            :readonly="'cep' in state.user" 
            v-model="state.user.uf" 
            placeholder="UF"
            label="UF"
            maxlength="2"
            labelPlacement="floating"></ion-input>
          </ion-item>      


          <ion-item>
          <ion-input 
            :required="true" 
            :readonly="'cep' in state.user" 
            v-model="state.user.localidade" 
            placeholder="UF"
            label="Cidade"
            labelPlacement="floating"></ion-input>
          </ion-item>      
          
          <ion-item>
          <ion-input 
            :required="true" 
            :readonly="'cep' in state.user" 
            v-model="state.user.bairro" 
            placeholder="Bairro"
            label="Bairro"
            labelPlacement="floating"
            ></ion-input>
          </ion-item>
          
          <ion-item>
          <ion-input 
            :required="true" 
            :readonly="'cep' in state.user" 
            v-model="state.user.logradouro" 
            placeholder="Logradouro"
            label="Logradouro"
            labelPlacement="floating"
            ></ion-input>
          </ion-item>

          <ion-item>
          <ion-input 
            :required="true" 
            v-model="state.user.numero" 
            type="number" 
            placeholder="Número"
            label="Número"
            labelPlacement="floating"
            ></ion-input>
          </ion-item>

          <ion-item>
          <ion-input 
            v-model="state.user.complemento" 
            placeholder="Complemento"
            label="Complemento"
            labelPlacement="floating"
            ></ion-input>
          </ion-item>

          <ion-item>
          <ion-input 
            v-model="state.user.referencia" 
            placeholder="Referência"
            label="Referência"
            labelPlacement="floating"
            ></ion-input>
          </ion-item>

          <ion-button class="mt" size="large" expand="full" type="submit">
            Continuar
          </ion-button>

        </form>

        <img id="loading" v-if="loading" src="/spinner.gif" />


      </div>

    </ion-content>
  </ion-page>
</template>

<style>
#endereco {
  height: 100dvh;
  position: relative;
}

#endereco #loading {
  display: block;
  width: 32px;
  margin: 56px auto;
}
</style>

<script setup lang="ts">

import '@ionic/vue/css/core.css';

import { airplane, phonePortraitOutline } from 'ionicons/icons';

import {
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonButton,
IonIcon,
IonInput,
IonItem,
IonRow,
IonCol,

} from '@ionic/vue';

import { ref } from 'vue'
import store from '@/services/store';
import router from '@/router';
import CoordenadasDoCep from "@/services/cep";
import api from "@/services/api";

const state = store.state
const masked = ref(state.user.cep ?? "");
const loading = ref(false);

const checkCode = async function (ev) {

  console.log(ev)

  // exit if event is not keyup
  if ( ! ( "key" in ev ) ) return

  // ignore if tab
  if ( ev.key === "Tab" ) return

  console.log(masked.value, masked.value.length)

  let partes = masked.value.split("-")
  let code = partes.join("")

  if (code.length === 8) {

    loading.value = true
    console.log(code)

    // buscar endereço
    CoordenadasDoCep.setOpcoes(true, 4, 2)
    CoordenadasDoCep.getByCep(code)
      .then(info => {
        //retorna o mesmo 'info' da versão em promise
        console.log(info)
        // set user state
        store.commit('setEndereco', info)
        loading.value = false
      })
      .catch(err => {
        //retorna o mesmo parâmetro 'err' da versão em promise
        console.error(err)
        alert('CEP não encontrado')
        loading.value = false
      })

  }
}

const prosseguir = async function () {

  // check form validity
  const form = document.querySelector('form')
  if ( ! form.checkValidity() )
  {
    form.reportValidity()
    return
  }

  if ( ! ( 'localidade' in state.user ) )
  {
    return
  }

  loading.value = true

  // se o cep nao estiver preenchido usar o getByEndereco
  if ( !("cep" in state.user) ) {
    CoordenadasDoCep.setOpcoes(true, 4, 2)
    await CoordenadasDoCep.getByEndereco(state.user)
      .then(info => {
        //retorna o mesmo 'info' da versão em promise
        console.log(info)
        // set user state
        store.commit('setEndereco', info)
        loading.value = false
      })
      .catch(err => {
        //retorna o mesmo parâmetro 'err' da versão em promise
        console.error(err)
      })
    
  }

  loading.value = false

  // enviar para o backend
  store.commit('setEndereco', state.user) 

  // schedule next page
  router.push('/login/family-size')

}

</script>
