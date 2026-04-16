<template>
  <div class="coninnot-container">
    <!-- <div class="coninnot-bgi"></div> -->
    <div class="coinnot-box">
      <div class="coinnot-bgc">
        <div class="coinnot-content">
          <div class="coinnot-content-img"></div>
          <div style="height: calc(100vh * 6 / 812);"></div>
          <div class="recharge-title">
            <div class="recharge-title-text">Sorry</div>
            <div style="height: calc(100vh * 2 / 812);"></div>
            <div class="recharge-title-content">your current balance is</div>
            <div class="recharge-title-content">insufficient</div>
          </div>
          <div class="recharge-button" @click="handleRecharge">Recharge</div>
        </div>
      </div>
    </div>
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
.coninnot-container {
  width: 100%;
  position: absolute;
}

.coinnot-box {
  display: flex;
  justify-content: center;
} 

.coinnot-bgc {
  width: calc(100vw * 277 / 375);
  min-height: calc(100vh * 317 / 812);
  max-height: calc(100vh * 356 / 812);
  border-radius: calc(100vw * 40 / 375);
  background-image: url('@/assets/coinnotbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.coinnot-content {
  border: calc(100vw * 1 / 375) solid rgba(69, 241, 217, 1);
  border-radius: calc(100vw * 34 / 375);
  margin: calc(100vw * 11 / 375);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  box-sizing: border-box;
}

.coinnot-content-img{
  width: calc(100vw * 100 / 375);
  height: calc(100vw * 100 / 375);
  background-image: url('@/assets/irubhnsknff.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.recharge-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
}

.recharge-title-text {
  display: flex;
  justify-content: center;
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 900;
  line-height: calc(100vw * 28.8 / 375);
  color: rgba(0, 0, 0, 1);
}

.recharge-title-content {
  display: flex;
  justify-content: center;
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 30 / 375);
  color: rgba(51, 51, 51, 1);
  text-align: center;
}

.recharge-button {
  width: calc(100vw * 203 / 375);
  height: calc(100vh * 53 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(69, 241, 217, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 900;
  line-height: calc(100vw * 24 / 375);
  color: rgba(0, 0, 0, 1);
  margin: calc(100vh * 20 / 812) 0 calc(100vh * 16 / 812);
}
</style>