<template>

  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Nova Jerusalém</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToNotifications()">
            <ion-icon :icon="notificationsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <swiper id="walls" :pagination='true' :loop="true" :modules="modules">
        <swiper-slide class="wall" >
          <ion-card
            @click="openDoor('1')"
            class="door"
            style="background-image: url('/images/1.png')"
          >
            <ion-card-header>
              <ion-card-title color="light"> Estou doente </ion-card-title>
              <ion-card-subtitle color="light">Simão Pedro com Rúben</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card
            @click="openDoor('2')"
            class="door"
            style="background-image: url('/images/2.png')"
          >
            <ion-card-header>
              <ion-card-title color="light"> Com fome e frio </ion-card-title>
              <ion-card-subtitle color="light">Judas Tadeu com Simeão</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card class="door" style="background-image: url('/images/3.png')">
            <ion-card-header>
              <ion-card-title color="light"> Preciso descansar </ion-card-title>
              <ion-card-subtitle color="light">Mateus com Levi</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </swiper-slide>

        <swiper-slide class="wall">
          <ion-card class="door" style="background-image: url('/images/4.png')">
            <ion-card-header>
              <ion-card-title color="light"> Tenho Medo </ion-card-title>
              <ion-card-subtitle color="light"
                >Judas Escariotes com Judá</ion-card-subtitle
              >
            </ion-card-header>
          </ion-card>

          <ion-card class="door" style="background-image: url('/images/5.png')">
            <ion-card-header>
              <ion-card-title color="light"> Solidão </ion-card-title>
              <ion-card-subtitle color="light">André com Dã</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card class="door" style="background-image: url('/images/6.png')">
            <ion-card-header>
              <ion-card-title color="light"> Creches e Babás </ion-card-title>
              <ion-card-subtitle color="light">Filipe com Naftali</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </swiper-slide>

        <swiper-slide class="wall">
          <ion-card class="door" style="background-image: url('/images/7.png')">
            <ion-card-header>
              <ion-card-title color="light"> Esportes </ion-card-title>
              <ion-card-subtitle color="light">Tomé com Gade</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card class="door" style="background-image: url('/images/8.png')">
            <ion-card-header>
              <ion-card-title color="light"> Fazer a diferença </ion-card-title>
              <ion-card-subtitle color="light">Bartolomeu com Aser</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card class="door" style="background-image: url('/images/9.png')">
            <ion-card-header>
              <ion-card-title color="light"> Potencial Máximo </ion-card-title>
              <!-- fazer uma promessa, um score público de promessas -->
              <ion-card-subtitle color="light">Tiago Maior com Issacar</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </swiper-slide>

        <swiper-slide class="wall">
          <ion-card class="door" style="background-image: url('/images/10.png')">
            <ion-card-header>
              <ion-card-title color="light"> Chegamos lá! </ion-card-title>
              <ion-card-subtitle color="light"
                >João Evangelista com Zebulom</ion-card-subtitle
              >
            </ion-card-header>
          </ion-card>

          <ion-card class="door" style="background-image: url('/images/11.png')">
            <ion-card-header>
              <ion-card-title color="light"> Quero contribuir </ion-card-title>
              <ion-card-subtitle color="light">Tiago Menor com José</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card class="door" style="background-image: url('/images/12.png')">
            <ion-card-header>
              <ion-card-title color="light"> Meu Legado </ion-card-title>
              <ion-card-subtitle color="light"
                >Simão Zelote com Benjamim</ion-card-subtitle
              >
            </ion-card-header>
          </ion-card>
        </swiper-slide>
  
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,

} from "@ionic/vue";

// notifications icon
import { notificationsOutline } from "ionicons/icons";

import { Swiper, SwiperSlide, } from "swiper/vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@ionic/vue/css/ionic-swiper.css";

import MenuLateral from "@/components/MenuLateral.vue";

import router from "@/router";
import store from "@/services/store";
import api from "@/services/api";
import { ref } from "vue";

if (store.state.backUrl != null) {
  console.log("backUrl", store.state.backUrl);
  setTimeout(() => {
    router.replace(store.state.backUrl);
    store.commit("setBackUrl", null);
  }, 1000);
}

const modules = [Pagination];

const openDoor = (door: string) => {
  console.log(door);
  api.letMeIn(door);
  router.push(`/door/${door}`);
};


const goToNotifications = () => {
  router.push("/notifications");
};

</script>

<style scoped>
#walls {
  background: rgb(29, 211, 226);
  background: radial-gradient(
    circle,
    rgba(29, 211, 226, 1) 0%,
    rgba(18, 127, 247, 1) 100%
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;

  /** swiper pagination variables */
  --bullet-background: #ffffff6e;
  --bullet-background-active: #fff;
  --swiper-pagination-bottom: 12px;

}

.wall {
  display: flex;
  justify-content: space-evenly;
  padding: 32px;
}

.door {
  width: 30%;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
}

ion-card-title {
  font-family: "Bebas Neue", sans-serif;
  font-size: 48px;
  font-weight: regular;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0px;
  line-height: 1em;
}

ion-card-subtitle {
  font-family: "Bebas Neue", sans-serif;
  font-size: 14px;
  font-weight: regular;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
  margin-top: 0px;
}

@media (max-width: 768px) {
  .wall {
    flex-direction: column;
    align-items: stretch;
  }

  .door {
    width: 100%;
    height: 200px;
    margin-inline: 0px;
  }

  ion-card-title {
    font-size: 40px;
  }
}
</style>
