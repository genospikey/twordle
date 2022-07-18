<script setup>
import Header from "./components/Header.vue"
import Social from "./components/Social.vue"
import PlayArea from "./components/PlayArea.vue"
import Keyboard from "./components/Keyboard.vue"

export default{
    methods:{
        handleKeyboard(e){
            console.log(e)
        }
    }
}
</script>

<template>
<div class="relative w-full min-h-screen">
  
  <div class="bg-red-500 w-full h-auto">
    top bar here
  </div>
  
  <div class="mx-auto mid h-full">
    
    <Header />

    <div class="md:flex">
      <Social />
      <PlayArea />
      <div class="w-32 mx-auto bg-green-300">
      </div>
    </div>
  
    <div class="absolute bottom-0 mid">
      <Keyboard @pressed="handleKeyboard" />
    </div>

  </div>

</div>
</template>

<style>
.mid {
  width: 50rem;
}
</style>
