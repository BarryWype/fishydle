<template>
  <div>Score: {{ scoreStore.score }}</div>
</template>

<script setup>
import { useScoreStore } from '@/stores/score'

const scoreStore = useScoreStore()
</script>
