<template>

<ion-menu id="menu" contentId="main-content" ref="menuRef" >
<ion-content>

    <div id="avatarAndUsername" @click="goto('/perfil')">
        
        <ion-avatar id="avatar">
            <img :src="avatarURL" />
        </ion-avatar>

        <div id="username">
            {{ state.user && state.user.displayName }}
            <small>Editar perfil</small>
        </div>

    </div>

    
    
    <ion-item @click="goto('/dashboard')" :detail="true">
        <ion-icon :icon="homeOutline" slot="start"></ion-icon>
        <ion-label>Visão Geral</ion-label>
    </ion-item>

    <ion-item v-if="isDistribuidor" @click="goto('/pdv')" :detail="true">
        <ion-icon :icon="prismOutline" slot="start"></ion-icon>
        <ion-label>Área secreta</ion-label>
    </ion-item>
    
    <ion-item @click="goto('/account')" :detail="true">
        <ion-icon :icon="cashOutline" slot="start"></ion-icon>
        <ion-label>Sacar</ion-label>
    </ion-item>

    <ion-item v-if="isVendedor" @click="goto('/cadastrar')" :detail="true">
        <ion-icon :icon="personAddOutline" slot="start"></ion-icon>
        <ion-label>Pré Cadastro</ion-label>
    </ion-item>


    <ion-item v-if="state && state.legacyOn" @click="goto('/legacyResults')" :detail="true">
        <ion-icon :icon="trophyOutline" slot="start"></ion-icon>
        <ion-label>Campeões</ion-label>
    </ion-item>

    <ion-item v-if="hasServices" @click="goto('/servicos')" :detail="true">
        <ion-icon :icon="briefcaseOutline" slot="start"></ion-icon>
        <ion-label>Outros Serviços</ion-label>
    </ion-item>

    <ion-item @click="goto('/share')" :detail="true">
        <ion-icon :icon="shareSocialOutline" slot="start"></ion-icon>
        <ion-label>Compartilhar</ion-label>
    </ion-item>

    <ion-item @click="goto('/settings')" :detail="true">
        <ion-icon :icon="settings" slot="start"></ion-icon>
        <ion-label>Configurações</ion-label>
    </ion-item>

    <ion-item v-if="state && state.legacyOn" @click="goto('/regulamento')" :detail="true">
        <ion-icon :icon="bookOutline" slot="start"></ion-icon>
        <ion-label>Regulamento</ion-label>
    </ion-item>

    <ion-item @click="goto('/entidade')" :detail="true">
        <ion-icon :icon="heartOutline" slot="start"></ion-icon>
        <ion-label>{{  state.entidadeNome  }}</ion-label>
    </ion-item>

    <ion-item @click="goto('/ajuda')" :detail="true">
        <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
        <ion-label>Precisa de Ajuda?</ion-label>
    </ion-item>

    <ion-item @click="logout()">
        <ion-icon :icon="exitOutline" slot="start"></ion-icon>
        <ion-label>Encerrar Sessão</ion-label>
    </ion-item>


</ion-content>
</ion-menu>


</template>

<style>

    #menu h1{
        color: lime;
        font-size: 22px;
        margin: 0px;
    }

    #menu h2
    {
        text-align: center;
        margin-bottom: 32px;
    }

    #avatarAndUsername
    {
        display: flex;
        padding: 32px;
        gap: 16px;
        align-items: center;
    }

    #avatar
    {
        width: 64px;
        height: 64px;
    }

    #username
    {
        display: flex;
        flex-direction: column;
    }

    #username small{ margin-bottom: 0px !important; color: gray; }

</style>


<script setup lang="ts">

import '@ionic/vue/css/core.css';


import {
  
  IonMenu,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonAvatar,
  useIonRouter,
 } from '@ionic/vue';

import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import 
{ 
    settings,
    bookOutline,
    cashOutline,
    exitOutline,
    helpCircleOutline,
    personAddOutline,
    homeOutline,
    shareSocialOutline,
    briefcaseOutline,
    heartOutline,
    trophyOutline,
    prismOutline,
airplane,
} from 'ionicons/icons';

import api from '../services/api'


import { menuController } from '@ionic/vue'

import { auth } from "../firebase/config";

const router = useIonRouter();
const store = useStore();
const state = store.state

const avatarURL = computed( () =>
{
    if ( ! state.user ) return
    
    if ( state.user.photoURL )
    {
        return state.user.photoURL+'?cb='+new Date().valueOf()
    }

    return '/profile.png'
})

const hasServices = computed( () =>
{  
    if ( state.user == null ) return false;
    return ('servicosURL' in state && state.servicosURL != '' );
});

const isVendedor = computed( () =>
{  
    if ( state.user == null ) return false;
    return ('isVendedor' in state.account && state.account.isVendedor );
});

const isDistribuidor = computed( () =>
{
    if ( state.user == null ) return false;
    // comparar meu uid com api.distribuidor
    return ( state.user.uid == api.distribuidor )
})

const goto = function(url:String)
{
    menuController.close()

    if ( url == '/dashboard' )
    {
        return router.replace('/dashboard')
    }
    router.push(url)
} 

const logout = function()
{
    menuController.close()
    router.replace('/login-bango')
    auth.signOut()
}

</script>