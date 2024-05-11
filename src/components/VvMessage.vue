<template>
  <div class="vv-message">

    <ion-avatar>
      <img :src="photo ?? '/profile.png'" />
    </ion-avatar>

    <p>
      <span class="displayName">{{ user }}:</span>
      {{ msg }}
    </p>

  </div>
</template>

<script setup lang="ts">
defineProps({
  user: String,
  msg: String,
  photo: String,
});
</script>

<style scoped>

  .vv-message
  {
    display: flex;
    gap: 12px;
    color: black;
    background: white;
    padding: 3px 30px 3px 3px;
    border-radius: 33px;
    margin: 0px 0px 10px;
    font-size: 16px;
  }

  .vv-message ion-avatar
  {
    flex-shrink: 0;
  }

  .vv-message .displayName
  {
    display: block;
    font-weight: bold;
    font-size: 14px;
    margin-top: 12px;
    margin-bottom: 6px;
  }

  .vv-message p{ margin: 0px 0px 12px; }

</style>
