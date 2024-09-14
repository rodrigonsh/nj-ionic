<template>

<ion-menu id="menu" :contentId="props.content" ref="menuRef" >
<ion-content>

    <img src="/images/logo.png" style="width: 175px; margin: 32px auto; display: block;" />

    <div id="avatarAndUsername">
               
        <label for="avatar">
        <ion-avatar >
            <img :src="avatarURL" />
        </ion-avatar>
        <input type="file" id="avatar" @change="uploadAvatar" style="display: none;" />
        </label>

        <div id="username" @click="goto('/login/address')">
            {{ userName }}
            <small>Editar perfil</small>
        </div>

    </div>

    
    
    <ion-item @click="goto('/doors')" :detail="true">
        <ion-icon :icon="homeOutline" slot="start"></ion-icon>
        <ion-label>Início</ion-label>
    </ion-item>

    <ion-item @click="goto('/notifications')" :detail="true">
        <ion-icon :icon="notificationsOutline" slot="start"></ion-icon>
        <ion-label>Notificações</ion-label>
    </ion-item>

    <ion-item @click="goto('/settings')" :detail="true">
        <ion-icon :icon="settings" slot="start"></ion-icon>
        <ion-label>Configurações</ion-label>
    </ion-item>

    <ion-item @click="goto('/ajuda')" :detail="true">
        <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
        <ion-label>Não entendi esse app</ion-label>
    </ion-item>

    <ion-item @click="logout()">
        <ion-icon :icon="exitOutline" slot="start"></ion-icon>
        <ion-label>Encerrar Sessão</ion-label>
    </ion-item>


</ion-content>
</ion-menu>


</template>

<style>

    --side-max-width: 300px !important;

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
notificationsOutline,
} from 'ionicons/icons';

import api from '@/services/api'
import store from '@/services/store'
import { auth } from '@/firebase/config'

import { menuController } from '@ionic/vue'

const router = useIonRouter();

// use props
const props = defineProps({
    content: String
})

const userName = computed( () =>
{
    if (store == undefined) return 'Usuário'
    if (store.state.user == undefined) return 'Usuário'
    return store.state.user.name
})

const avatarURL = computed( () =>
{

    if (store == undefined) return '/images/profile.png'
    
    if (store.state == undefined) return '/images/profile.png'
    if (store.state.user == undefined) return '/images/profile.png'

    
    if (store.state.user.photoURL != null) return 'http://localhost/'+store.state.user.photoURL
    else return 'waa'
})


const goto = function(path)
{
    console.log('goto', path)
    menuController.close()
    router.push(path)
}

const logout = function()
{
    menuController.close()
    router.replace('/login-bango')
    auth.signOut()
}

const uploadAvatar = function(ev)
{
    console.log('uploadAvatar', ev)
    let file = ev.target.files[0];
    api.updatePhoto(file)
        .then( (ret) => 
        {
            // update avatar
            store.commit('setPhotoURL', ret.data)

        })
        .catch( (err) => { console.log(err); } )

}

</script>