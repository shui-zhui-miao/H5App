<template>
  <div class="page">
    <div class="ortubjsnbiud" ></div>
    <div class="top-header">
      <BackButton />
      <span class="edit-title">My diamonds</span>
    </div>

    <!-- 金币盒子UI -->
    <div class="coin-container">
      <div class="coin-box">
        <!-- <div class="coin-bg-top"></div>
        <div class="coin-bg-right"></div>
        <div class="coin-bg-button"></div> -->
        <div class="coin-box-content">
          <div>Wallet Balance:</div>
          <div class="coin-box-right-box">
            <div class="coin-box-right-icon"></div>
            <span class="coin-number">{{ currentUserStore.currentUser.coins }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="coinbgc"></div> -->
    <!-- 金币列表 -->
    <div class="coins">
      <div class="coin-list">
        <div
          v-for="(item,index) in otherStore.other.coinsSetting"
          :key="index"
          class="coin-item"
          :class="{ 'coin-item-selected': selectedIndex === index }"
          @click="() => { selectedIndex = index;}"
        >
          <div class="coin-left">
            <img src="@/assets/coin.png" class="coin-item-icon" />
            <span class="coin-count" :class="{ 'coin-count-selected': selectedIndex === index }">{{ item.cions }}</span>
          </div>

          <div class="coin-right">
            <span class="coin-price" :class="{ 'coin-price-selected': selectedIndex === index }">${{ item.money }}</span>
            <div :class="{ 'coin-radio-selected': selectedIndex === index, 'coin-radio': selectedIndex!== index }">
              <div v-if="selectedIndex === index" class="coin-radio-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recharge" @click="handleRecharge">Recharge</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/back.vue'
import { useOtherStore } from '@/stores/other'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUserStore } from '@/stores/user'
import { sendPaymentToIOS } from '@/utils/iosBridge'

const otherStore =  useOtherStore()
const currentUserStore = useCurrentUserStore()
const userStore =  useUserStore()

const selectedIndex = ref(-1)

function handleRecharge() {
  if (selectedIndex.value === -1) return
  const selectedItem = otherStore.other.coinsSetting[selectedIndex.value]
  if (selectedItem?.key) {
    sendPaymentToIOS(selectedItem.key)
  }
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* box-sizing: border-box; */
}

.ortubjsnbiud{
  position: absolute;
  right: calc(100vw * 25 / 375);
  top: calc(100vh * 26 / 812);
  width: calc(100vw * 168 / 375);
  height: calc(100vh * 240 / 812);
  background: url('@/assets/ortubjsnbiud.png') no-repeat center center;
  background-size: contain;
}

.top-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
}

.edit-title {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 900;
  line-height: calc(100vw * 24 / 375);
  color: rgb(255, 255, 255);
  /* background: linear-gradient(
    141.29deg,
    rgba(255, 110, 50, 1) 0%,
    rgba(253, 61, 104, 1) 44.94%,
    rgba(251, 226, 100, 1) 100%
  );
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text;  */
}

.coin-container {
  display: flex;
  justify-content: center;
  margin: calc(100vh * 47 / 812) 0 0;
}

/* 金币盒子外层 */
.coin-box {
  width: calc(100vw * 339 / 375);
  height: calc(100vh * 85 / 812);
  /* overflow: hidden; */
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(100vw * 10 / 375);
}

.coin-bg-top {
  position: absolute;
  top: calc(100vh * -21 / 812);
  right: calc(100vw * 85 / 375);
  width: calc(100vw * 67 / 375);
  height: calc(100vh * 39 / 812);
  /* background-image: url('@/assets/coinbgtop.png');
  background-size: cover;  */
  overflow: hidden;
  z-index: 1;
}

.coin-bg-right {
  position: absolute;
  top: calc(100vh * -20 / 812);
  right: calc(100vw * -6 / 375);
  width: calc(100vw * 110 / 375);
  height: calc(100vh * 110 / 812);
  /* background-image: url('@/assets/coinbgright.png');
  background-size: cover;  */
  overflow: hidden;
  z-index: 2;
}

.coin-bg-button {
  position: absolute;
  bottom: calc(100vh * -21 / 812);
  left: calc(100vw * 19 / 375);
  width: calc(100vw * 82 / 375);
  height: calc(100vh * 79 / 812);
  /* background-image: url('@/assets/coinbgbutton.png');
  background-size: cover;  */
  overflow: hidden;
  z-index: 3;
}

/* 下部分盒子内容 */
.coin-box-content {
  /* position: absolute;
  bottom: calc(100vh * 6 / 812);
  left: calc(100vw * 113 / 375); */
  display: flex;       /* 内部内容水平排列 */
  /* flex-direction: column; */
  align-items: flex-start;
  flex-direction: column;
  padding: 0 calc(100vw * 14 / 375);
  /* gap: calc(100vh * 9 / 812); */
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 900;
  line-height: calc(100vw * 24 / 375);
  color: #fff;
  z-index: 4;
}

.coin-box-right-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 6 / 375);
}

.coin-box-right-icon {
  width: calc(100vw * 36 / 375);
  height: calc(100vh * 36 / 812);
  background-image: url('@/assets/coin.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.coin-box-right-box, span {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
  color: rgb(255, 255, 255);
}

/* coin 图标 */
.coin-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;   /* 关键！等同 background-size: cover */
  display: block;      /* 去掉底部间隙 */
}

/* 金币数量文字 */
.coin-number {
  font-size: calc(100vw * 24 / 375);
  font-weight: 400;
  color: #fff;
  line-height: calc(100vw * 25.44 / 375);
}
 
.coins {
  flex: 1;
  margin-top: calc(100vh * 36 / 812);
  padding: 0 calc(100vw * 20 / 375) calc(100vh * 90 / 812);
  overflow-y: auto;
}

.coin-list {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 12 / 812);
}

.coin-item {
  /* width: calc(100vw * 113 / 375); */
  height: calc(100vh * 64 / 812);
  border-radius: calc(100vw * 20 / 375);
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(100vw * 10 / 375);
}

.coin-item-selected {
  background: rgba(219, 188, 255, 1);
}

.coin-left {
  display: flex;
  align-items: center;
  gap: calc(100vw * 8 / 375);
}

.coin-item-icon {
  width: calc(100vw * 36 / 375);
  height: calc(100vh * 36 / 812);
}

.coin-count {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 900;
  line-height: calc(100vw * 19.2 / 375);
  color: #000000;
}

.coin-count-selected {
  color: #fff;
}

.coin-right {
  display: flex;
  align-items: center;
  gap: calc(100vw * 10 / 375);
}

.coin-price {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: auto;
  color: rgba(36, 24, 24, 1);
}

.coin-price-selected {
  color: #FFF;
}

.coin-radio {
  width: calc(100vw * 14 / 375);
  height: calc(100vw * 14 / 375);
  border-radius: 50%;
  background: rgba(232, 232, 232, 1);
  border: calc(100vw * 1 / 375) solid rgba(85, 85, 85, 1);
  box-sizing: border-box;
}

.coin-radio-selected {
  width: calc(100vw * 14 / 375);
  height: calc(100vw * 14 / 375);
  border-radius: 50%;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.coin-radio-inner {
  width: calc(100vw * 9 / 375);
  height: calc(100vw * 9 / 375);
  border-radius: 50%;
  background: rgba(69, 241, 217, 1);
}

.recharge{
  position: absolute;
  bottom: calc(100vh * 35 / 812);
  left: 0;
  right: 0;
  margin: 0 auto; 
  width: calc(100vw * 198 / 375);
  height: calc(100vh * 53 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(69, 241, 217, 1);
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 900;
  line-height: calc(100vh * 53 / 812);
  color: #000000;
  text-align: center;
}
</style>