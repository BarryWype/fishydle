<template>
  <div class="store">
    <shop-item v-for="item in items" :key="item.name" :item="item" />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { useShopStore } from '@/stores/shop'
import ShopItem from './ShopItem.vue'

const shopStore = useShopStore()

const items = toRefs(shopStore.shopItems)
</script>

<style lang="scss">
.store {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-inline: 4px;
}
</style>
