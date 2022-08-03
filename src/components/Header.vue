<script setup>
const phrases = [
  'Two Letters, Infinite Possibilities. Or you, a couple hundred at least.',
  'Sometimes, two is enough.',
  "Perhaps it's time to invest in a very small notebook to hold all the small words.",
  'You got this!',
  'Time for a 3 minute break',
  "Go grab a Casey's breakfast pizza, they're delicious",
  "I shouldn't add these phrases when I'm hungry...",
]
const headerPhrase = phrases[Math.floor(Math.random()*phrases.length)]
console.log(headerPhrase)
</script>

<template>
    <div class="my-5">
      <img class="mx-auto w-64 h-16" src="/public/logo.svg"/>
      <div class="mt-5 mx-auto w-fit">
        <span class="text-white">{{headerPhrase}}</span>
      </div>
    </div>
</template>