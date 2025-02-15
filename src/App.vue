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

<style lang="scss">
body {
  margin: 0;
}

.game-container {
  width: 350px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.rarity {
  &--common {
    --rarity-colour: grey;
  }

  &--uncommon {
    --rarity-colour: #b3ffb3;
  }

  &--rare {
    --rarity-colour: #b3b3ff;
  }

  &--epic {
    --rarity-colour: #ffb3ff;
  }

  &--legendary {
    --rarity-colour: #ffb3b3;
  }
}
</style>
