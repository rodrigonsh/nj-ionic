<template>
  
  <div class="range-container" :data-channel="props.audio">
    
    <input 
      type="range"
      class="range-input"
      min="0" max="100" :step="1" 
      v-model="volume" 
      @input="handleVolumeChange"
      aria-label="RANGE"
    />

    <div class="range-track"></div>

  </div>
  
</template>

<style scoped>

  input
  {
    width: 100%;
  }

  .range-container {
  position: relative;
  height: 8px;
  width: 100%;
  margin-bottom: 16px;
}

.range-input {
  -webkit-appearance: none;
  width: 100%;
  background-color: transparent;
  outline: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 1;
}

.range-input::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #4285f4;
  border-radius: 50%;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  margin-top: -6px;
}

.range-track {
  position: absolute;
  height: 4px;
  width: 0;
  top: 2px;
  left: 0;
  background-color: #4285f4;
  transition: width 0.2s ease;
  z-index: 0;
}

</style>  

<script setup lang="ts">

  import { ref } from 'vue';
  import dj from "../services/dj";
  
  
  const props = defineProps({
    audio: String
  });
  
  const audio = dj.get(props.audio)
  const volume = ref(audio.volume * 100) 

  const handleVolumeChange = function(event) 
  {

      // Retrieve the new volume value from the event
      let newVolume = parseInt( event.target.value );

      audio.volume = newVolume / 100;
      
  }

</script>
