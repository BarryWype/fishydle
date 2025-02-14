<template>
  <main>
    <div class="game-container">
      <sprite-container />
      <user-interface />
    </div>
  </main>
</template>

<script setup>
import SpriteContainer from './components/SpriteContainer.vue'
import UserInterface from './components/UserInterface.vue'
</script>

<style>
body {
  margin: 0;
}

.game-container {
  width: 350px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
