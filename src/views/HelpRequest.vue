<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>Visualizando Pedido</h1>

      <div v-if="loading">Carregando dados...</div>

      <div class="pedido" v-if="!loading && stillNeedHelp">
        <h2>{{ reqData.user.name }}</h2>

        <p class="info">{{ reqData.user.logradouro }}, {{ reqData.user.numero }}</p>
        <p class="info">
            {{ reqData.user.bairro }}, <br />
            {{ reqData.user.localidade }} - {{ reqData.user.uf }}
        </p>
        <p class="info">CEP: {{ reqData.user.cep }}</p>

        <h2 id="helpText">Precisa de {{ helpText }}</h2>
        <p>{{ reqData.confession }}</p>

        <h3>Família</h3>
        <p v-for="faixa in family">
          {{ faixa.label }}: <strong>{{ faixa.title }}</strong>
        </p>

        <h3>Voluntários</h3>
        
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import store from '@/services/store';
import api from '@/services/api';
import router from '@/router';
import { useRoute } from 'vue-router'

import
{
  IonButtons,
  IonContent,
  IonButton,
  IonIcon,
  IonHeader,
  IonMenuButton, IonPage,
  IonTitle,
  IonToolbar,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,
  IonTextarea,
  IonItem,
} from '@ionic/vue';

import { call, callOutline, logoWhatsapp, handLeftOutline } from 'ionicons/icons';

import { ref, computed } from 'vue';

const loading = ref(true);
const stillNeedHelp = ref(true);
const reqData = ref({
  user: {
    name: 'carregando...',
    need: 'carregando...',
    bairro: 'carregando...',
    localidade: 'carregando...',
    confession: 'carregando...',
    familySize: 'carregando...',
    logradouro: 'carregando...',
    numero: 'carregando...',
    uf: 'carregando...',
    phoneNumber: 'carregando...',

  },
});

// get uuid from router
const route = useRoute();
const uuid = route.params.uuid;

const is_volunteer = ref(false)
const is_sure = ref(false)

console.log('uuid', uuid);

// set backUrl
store.commit('setBackUrl', '/help-request/' + uuid);

// use api to get the help request
// getHelpRequest/uuid
api.getHelpRequest(uuid)
  .then((response) => {

    console.log('response', response);
    loading.value = false;

    let data = response.data;
    if ( data.helper_1 != null && data.helper_2 != null )
    {
      stillNeedHelp.value = false;
      return;
    }

    reqData.value = data;

  })
  .catch((error) => {
    console.error('error', error);
    loading.value = false;
  });

const helpText = computed(() => {
  switch (reqData.value.need)
  {
    case 'compras':
      return 'Alguém pra fazer compras';

    default:
      return reqData.value.need;
  }
});

const family = computed( () =>
{

  console.log('>>>>', reqData.value)

  let familySize = JSON.parse(reqData.value.user.familySize)

  let res = []

  let keys = Object.keys(familySize);

  for( var i=0; i < keys.length; i++ )
  {

    let texto = 'hummmm'
    let partes = []

    var x = null

    if ( 'male' in familySize[keys[i]] )
    {
      let count = parseInt(familySize[keys[i]].male)
      if ( count == 0 ) x = false
      else if ( count == 1 ) partes.push(count + ' homem')
      else partes.push(count + 'homens')
    }

    if ( 'female' in familySize[keys[i]] )
    {
      let count = parseInt(familySize[keys[i]].female)
      if ( count == 0 ) x = false
      else if ( count == 1 ) partes.push(count + ' mulher')
      else partes.push(count + ' mulheres')
    }

    let item = { label: keys[i], title: partes.join(' e ') }
    res.push(item)
  }

  return res;

} )

</script>

<style scoped>
h1 {
  font-size: 1.5em;
  padding: 0px 1em 1em;
  margin-bottom: 1em;
  border-bottom: 2px solid rgb(0, 183, 255);
}

.pedido {
  padding: 0px 1.5em;
  border-radius: 8px;
  margin-bottom: 1em;
}

h2 {
  text-transform: capitalize;
}

.info {
  margin-top: -5px;
  margin-bottom: 5px;
}

#helpText {
  margin: 32px 0px;
  font-size: 2.2em;
  text-transform: uppercase;
  line-height: 1em;
  font-weight: bold;
  color: rgb(0, 183, 255);
}

h3 {
  margin: 64px 0px 16px;
}

p {
  margin-bottom: 1em;
}

</style>
