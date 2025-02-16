<template>
  <div class="rod">
    <div class="rod__name">
      <span class="rod__info-label"> Rod name: </span>
      <span class="rod__info-data">
        <!-- weird behaviour with the v-model, if you set the v-model to rod.name, it will lose the focus after each key press. I guess -->
        <input type="text" v-model="rodName" @change="rod.name = rodName" class="rod__name-input" />
      </span>
    </div>
    <div class="rod__auto-pick-time">
      <span class="rod__info-label"> Auto catch fish time: </span>
      <span class="rod__info-data"> {{ rod.autoPickTime }} seconds </span>
    </div>
    <div class="rod__ready-to-fish-time">
      <span class="rod__info-label"> Re-bait after a catch: </span>
      <span class="rod__info-data"> {{ rod.readyToFishTime }} seconds </span>
    </div>
    <div class="rod__max-wait-time-fishing">
      <span class="rod__info-label"> Maximum bitting time: </span>
      <span class="rod__info-data"> {{ rod.maxWaitTimeFishing }} seconds </span>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  rod: {
    type: Object,
    required: true,
  },
})

const { rod } = toRefs(props)

const rodName = ref(rod.value.name)
</script>
