<template>
  <div class="bg">
    <div class="coinnot-box"></div>
    <div class="recharge-button" @click="handleRecharge">Recharge</div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['recharge'])

function handleRecharge() {
  emit('recharge', true)
}
</script>

<style scoped>
.bg{
  width: calc(100vw * 280 / 375);
  height: calc(100vh * 264 / 812);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: calc(100vh * 20 / 812);
}
.coinnot-box {
  width: calc(100vw * 280 / 375);
  height: calc(100vh * 190 / 812);
  background-image: url('@/assets/coinnot.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.recharge-button {
  width: calc(100vw * 235 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 27 / 375);
  background: radial-gradient(54.89% 50% at 50.212765957446805% 0%, rgba(255, 213, 0, 0.4) 0%, rgba(255, 213, 0, 0) 100%), rgba(255, 71, 96, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.1 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}
</style>