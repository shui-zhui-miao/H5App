<template>
  <div class="page">
    <div class="top-header">
      <BackButton />
      <span class="edit-title">My Coins</span>
    </div>

    <!-- 金币盒子UI -->
    <div class="coin-box">
      <img src="@/assets/eiuhbgvnskfb.png" alt="coin" class="coin-icon" />
      <div class="asads">
        <div class="coin-box-header">My Coins</div>
        <span class="coin-number">{{ currentUserStore.currentUser.coins }}</span>
      </div>
    </div>
    <!-- 金币列表 -->
    <div class="coins">
      <div class="coin-list">
        <div
          v-for="(item,index) in otherStore.other.coinsSetting"
          :key="index"
          class="coin-item"
          :class="{ 'coin-item-selected': selectedIndex === index }"
          @click="() => { selectedIndex = index; handleCoinClick(item) }"
        >
          <div class="coin-left">
            <img src="@/assets/coin.png" class="coin-item-icon" />
            <span class="coin-count" :class="{ 'coin-count-selected': selectedIndex === index }">{{ item.cions }}</span>
          </div>

          <div class="coin-right">
            <span class="coin-price" :class="{ 'coin-price-selected': selectedIndex === index }">{{ item.money }}$</span>
          </div>
        </div>
      </div>
    </div>
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

function handleCoinClick(item) {
  // item.key 或 item.id 作为支付标识
  const payKey = item.key

  // 调用 iOS 支付
  sendPaymentToIOS(payKey)
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
  /* display: flex;
  flex-direction: column; */
  box-sizing: border-box;
}

.top-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
  padding: calc(100vh * 55 / 812) calc(100vw * 16 / 375) 0;
}

.edit-title {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  background: rgba(255, 255, 255, 1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 金币盒子外层 */
.coin-box {
  width: calc(100vw * 336 / 375);
  height: calc(100vh * 109 / 812);
  margin-right: auto;
  margin-left: auto;
  margin-top: calc(100vh * 22 / 812);
  background-image: url('@/assets/coinbgc.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: calc(100vh * 10 / 812);
}


/* 上部分标题 */
.coin-box-header {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  letter-spacing: 0px;
  line-height: calc(100vw * 23.17 / 375);
  color: rgba(255, 255, 255, 1);
  margin-top: calc(100vh * 8 / 812);
}

/* 下部分盒子内容 */
.coin-box-content {
  display: inline-flex;       /* 内部内容水平排列 */
  align-items: center;
  justify-content: flex-start;
  border-radius: calc(100vw * 40 / 375);
  background: rgba(74, 32, 25, 1);
  border: calc(100vw * 2 / 375) solid rgba(201, 255, 221, 1);
  padding: calc(100vh * 10 / 812) calc(100vw * 22 / 375);
  gap: calc(100vw * 8 / 375);

  width: fit-content;         /* 核心：宽度自适应内容 */
  max-width: 100%;            /* 避免内容超出父容器 */
  margin-left: 0;             /* 可选：左对齐 */
  margin-right: 0;            /* 可选：右对齐 */
}

/* coin 图标 */
.coin-icon {
  width: calc(100vw * 78 / 375);
  height: calc(100vh * 78 / 812);
  margin-left: calc(100vw * 32 / 375);
}

/* 金币数量文字 */
.coin-number {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  letter-spacing: 0px;
  line-height: calc(100vw * 34.75 / 375);
  color: rgba(255, 255, 255, 1);
}

.coins {
  height: calc(100% - calc(100vh * 285 / 812));
  margin-top: calc(100vh * 30 / 812);
  padding: 0 calc(100vw * 20 / 375) calc(100vh * 34 / 812);
  overflow-y: auto;
}

.coin-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: calc(100vh * 16 / 812);
  column-gap: calc(100vw * 10 / 375);
}

.coin-item {
  height: calc(100vh * 100 / 812);
  width: calc(100vw * 105 / 375);
  border-radius: calc(100vw * 24 / 375);
  background: rgba(35, 30, 36, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 calc(100vw * 10 / 375);
  box-sizing: border-box;
}

.coin-left {
  display: flex;
  align-items: center;
  gap: calc(100vw * 4 / 375);
}

.coin-item-icon {
  width: calc(100vw * 24 / 375);
  height: calc(100vh * 24 / 812);
}

.coin-count {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 23.17 / 375);
  color: rgba(255, 255, 255, 1);
}

.coin-right {
  display: flex;
  align-items: center;
  gap: calc(100vw * 10 / 375);
  margin-top: calc(100vh * 8 / 812);
}

.coin-price {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  color: rgba(255, 255, 255, 0.7);
}

.coin-radio {
  width: calc(100vw * 15 / 375);
  height: calc(100vw * 15 / 375);
  border-radius: 50%;
  background: rgba(105, 71, 65, 1);
}


</style>