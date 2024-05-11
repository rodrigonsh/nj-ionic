<template>
    <div>
       <ion-input 
        label="Número do Celular" 
        labelPlacement="floating" 
        type="tel"
        inputmode="tel"
        autofocus
        id="WTF" 
        @input="handleInput" 
        ref="inputRef"></ion-input>
    </div>
</template>
  
<script>
  
  import IMask from 'imask';
  import { IonInput } from '@ionic/vue'
  
  export default {
    name: 'MaskedInput',
    props: ['mask'],
    components: { IonInput },
    mounted() {
      // This code will run when the component is added to the DOM
      this.runSpecificJavaScript();
    },
    methods: {
      handleInput()
      {
        setTimeout(() => {
          this.$emit('digitada', this.weird.displayValue);
        }, 10);
      },
      runSpecificJavaScript() {

        this.weird =  IMask(
          this.$refs.inputRef.$el,
          {
              mask: this.mask,
              lazy: true,
              overwrite: 'replace',
              displayChar: ''
          }
          )
        
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component's styles here */
  </style>