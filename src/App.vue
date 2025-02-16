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
// TODO put all that in a separate file

body {
  margin: 0;
}

:root {
  --blue: #c8ceee;
  --green: #cbd3ad;
  --yellow: #f7e5b7;
  --orange: #ffc697;
  --pink: #f9c5c7;
  --purple: #d1b3c4;
  --beige: #fce7c8;
  --red: #f9c5c7;
  --black: #222222;
  --white: #fefefe;
  --grey: #999999;
  --light-grey: #cccccc;
  --dark-grey: #666666;
  --dark-blue: #333366;
  --dark-green: #5a6436;
  --dark-yellow: #90904f;
  --dark-orange: #663333;
  --dark-pink: #663366;
  --dark-purple: #333366;
  --dark-beige: #666633;
  --dark-red: #663333;
  --dark-black: #333333;
  --dark-white: #cccccc;
  --gold: #ffd700;
}

.button {
  padding: 12px;
  background-color: var(--green);
  border: 1px solid var(--beige);
  font-weight: 700;
  border-radius: 4px;
  color: var(--dark-green);

  &:hover {
    cursor: pointer;
    background-color: var(--dark-green);
    color: var(--beige);
  }

  &:disabled {
    background-color: var(--grey);
    color: var(--dark-green);
    cursor: default;
  }
}

.icon-button {
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  color: var(--dark-green);

  &:hover {
    background-color: var(--green);
  }
}

.game-container {
  width: 350px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--black);
}

.rarity {
  &--common {
    --rarity-colour: var(--grey);
  }

  &--uncommon {
    --rarity-colour: #48ca48;
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
