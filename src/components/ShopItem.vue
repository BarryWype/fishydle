<template>
  <div class="shop-item">
    <div class="shop-item__header">
      <div class="shop-item__name">{{ item.name }}</div>
      <div class="shop-item__price">${{ item.price }}</div>
    </div>
    <div class="shop-item__action">
      <button class="button" @click="showDescritpion = !showDescritpion">Description</button>
      <select v-if="affectRods" v-model="selectedRod">
        <option v-for="rod in rods" :key="rod.name" :value="rod">{{ rod.name }}</option>
      </select>
      <button class="button" :disabled="preventPurchase" @click="fishingStore.addItem(item)">
        Buy
      </button>
    </div>
    <div v-if="showDescritpion" class="shop-item__description">{{ item.shopDescription }}</div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { useFishingStore } from '../stores/fishing'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const fishingStore = useFishingStore()

const { item } = toRefs(props)

const showDescritpion = ref(false)
const rods = fishingStore.getRods
const selectedRod = ref(rods[0])
const affectRods = !!item.value.effects.find((effect) => effect.namespace === 'rod')

const preventPurchase = ref(false)
</script>

<style lang="scss">
.shop-item {
  background-color: var(--beige);
  border: 2px solid var(--dark-yellow);
  padding: 12px;

  &__header,
  &__action {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    padding-top: 12px;
  }
}
</style>
