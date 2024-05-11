<template>
    <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tamanho da Família</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="familia" :fullscreen="true" class="ion-padding ion-justify-content-around">

      <div class="breathes">

        <h1>Quantas pessoas na sua família?</h1>

        <div @click="addMember">
        
        <div class="familyBtn">
          <img data-kind="male-baby" src="/icons/family-baby-boy.svg" class="icon" />
          {{ getCount('baby') }}
          <img data-kind="female-baby" src="/icons/family-baby-girl.svg" class="icon" />
        </div>

        <div class="familyBtn">
          <img data-kind="male-kid" src="/icons/family-kid-boy.svg" class="icon" />
          {{ getCount('kid') }}
          <img data-kind="female-kid" src="/icons/family-kid-girl.svg" class="icon" />
        </div>

        <div class="familyBtn">
          <img data-kind="male-young" src="/icons/family-young-boy.svg" class="icon" />
          {{ getCount('young') }}
          <img data-kind="female-young" src="/icons/family-young-girl.svg" class="icon" />
        </div>

        <div class="familyBtn">
          <img data-kind="male-adult" src="/icons/family-adult-male.svg" class="icon" />
          {{ getCount('adult') }}
          <img data-kind="female-adult" src="/icons/family-adult-female.svg" class="icon" />
        </div>

        <div class="familyBtn">
          <img data-kind="male-old" src="/icons/family-old-male.svg" class="icon" />
          {{ getCount('old') }}
          <img data-kind="female-old" src="/icons/family-old-female.svg" class="icon" />
        </div>

        </div>

        <ion-button @click="continuar" size="large" expand="full">
          Continuar
        </ion-button>


      </div>

    </ion-content>
  </ion-page>
</template>

<style>

  .familyBtn
  {
    display: flex;
    justify-content: space-between;
    background: var(--ion-color-light);
    padding: 16px;
    margin-bottom: 8px;
    align-items: center;
  }
  
</style>

<script setup lang="ts">

import '@ionic/vue/css/core.css';

import { phonePortraitOutline } from 'ionicons/icons';
import router from '@/router';
import store from '@/services/store';
import api from '@/services/api';

import
{
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,

} from '@ionic/vue';


import { ref } from 'vue';
import { storeKey } from 'vuex';

const state = store.state;

const members = ref({});

const getCount = (age) =>
{
  
  if ( members.value[age] != null )
  {
    return members.value[age].male + members.value[age].female
  }

  else return 0
}

const addMember = (ev) =>
{
  const kind = ev.target.getAttribute('data-kind');

  if ( kind == null ) return;

  let partes = kind.split('-');
  let gender = partes[0];
  let age = partes[1];

  if ( members.value[age] == null )
  {
    members.value[age] = {male: 0, female: 0};
  }

  members.value[age][gender]++

  console.log(members.value);
}

const continuar = () =>
{
  store.commit('setFamilySize', members.value);
  api.checkIn(state.user)
  router.push('/doors');
}

</script>
