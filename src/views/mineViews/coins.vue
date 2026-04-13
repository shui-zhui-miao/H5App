<template>
  <div class="page">
    <div class="top-header">
      <BackButton />
      <span class="edit-title">My diamonds</span>
    </div>

    <!-- 金币盒子UI -->
    <div class="coin-box">
      <div class="coin-box-header">My diamonds</div>
      <div class="coin-box-content">
        <img src="@/assets/coin.png" alt="coin" class="coin-icon" />
        <span class="coin-number">{{ currentUserStore.currentUser.coins }}</span>
      </div>
    </div>
    <div class="coinbgc"></div>
    <!-- 金币列表 -->
    <div class="coins">
      <div class="coin-list">
        <div
          v-for="(item,index) in otherStore.other.coinsSetting"
          :key="index"
          class="coin-item"
          :class="{ 'coin-item-selected': selectedIndex === index }"
          @click="() => { selectedIndex = index}"
        >
          <div class="coin-left">
            <img src="@/assets/coin.png" class="coin-item-icon" />
            <span class="coin-count" :class="{ 'coin-count-selected': selectedIndex === index }">{{ item.cions }}</span>
          </div>

          <div class="coin-right">
            <span class="coin-price" :class="{ 'coin-price-selected': selectedIndex === index }">${{ item.money }}</span>
            <div class="coin-radio" :class="{ 'coin-radio-selected': selectedIndex === index }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="button" @click="handleRecharge">RECHARGE</div>
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
  if (selectedIndex.value === -1) {
    // 可调用 UIStore 显示 toast 提示
    return
  }
  const item = otherStore.other.coinsSetting[selectedIndex.value]
  if (item && item.key) {
    sendPaymentToIOS(item.key)
  }
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
  gap: calc(100vw * 16 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
}

.edit-title {
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  background: #fff;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 金币盒子外层 */
.coin-box {
  width: auto;
  height: calc(100vh * 92 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(28, 19, 55, 1);
  box-shadow:inset calc(100vw * 4 / 375) 0px 0px  rgba(181, 159, 252, 1);
  overflow: hidden;
  margin: calc(100vh * 20 / 812) calc(100vw * 20 / 375) 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: calc(100vw * 13 / 375);
}


/* 上部分标题 */
.coin-box-header {
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  letter-spacing: 0px;
  line-height: calc(100vw * 29.76 / 375);
  color: rgba(237, 228, 255, 1);
}

/* 下部分盒子内容 */
.coin-box-content {
  display: inline-flex;       /* 内部内容水平排列 */
  align-items: center;
  justify-content: flex-start;
  gap: calc(100vw * 8 / 375);
  width: fit-content;         /* 核心：宽度自适应内容 */
  max-width: 100%;            /* 避免内容超出父容器 */
  margin-left: 0;             /* 可选：左对齐 */
  margin-right: 0;            /* 可选：右对齐 */
}

/* coin 图标 */
.coin-icon {
  width: calc(100vw * 46 / 375);
  height: calc(100vh * 46 / 812);
}

/* 金币数量文字 */
.coin-number {
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  letter-spacing: 0px;
  line-height: calc(100vw * 19.84 / 375);
  color: rgba(255, 255, 255, 1);
}

.coinbgc {
  position: absolute;
  top: calc(100vh * 92 / 812);
  right: calc(100vh * 37 / 812);
  width: calc(100vw * 123 / 375);
  height: calc(100vh * 118 / 812);
  background-image: url('@/assets/coinsbgc.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
  pointer-events: none; /* 点击穿透，不拦截点击事件 */
}
 
.coins {
  height: calc(100% - calc(100vh * 285 / 812));
  margin-top: calc(100vh * 30 / 812);
  padding: 0 calc(100vw * 20 / 375) calc(100vh * 34 / 812);
  overflow-y: auto;
}

.coin-list {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 12 / 812);
  padding-bottom: calc(100vh * 60 / 812);
}

.coin-item {
  height: calc(100vh * 64 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px calc(100vw * 2 / 375) calc(100vw * 4 / 375) rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(100vw * 10 / 375);
  box-sizing: border-box;
}

.coin-item-selected {
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 108, 149, 1);
}

.coin-left {
  display: flex;
  align-items: center;
  gap: calc(100vw * 8 / 375);
}

.coin-item-icon {
  width: calc(100vw * 46 / 375);
  height: calc(100vh * 46 / 812);
}

.coin-count {
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 18.48 / 375);
  color: rgba(48, 40, 81, 1);
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
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.36 / 375);
  color: rgba(48, 40, 81, 1);
}

.coin-price-selected {
  color: #FFF;
}

.coin-radio {
  width: calc(100vw * 14 / 375);
  height: calc(100vw * 14 / 375);
  border-radius: 50%;
  background: rgba(237, 228, 255, 1);
  box-sizing: border-box;
  border: calc(100vw * 1 / 375) solid rgba(48, 40, 81, 1);
}

.coin-radio-selected {
  width: calc(100vw * 14 / 375);
  height: calc(100vw * 14 / 375);
  background: linear-gradient(90deg, rgba(181, 158, 255, 1) 0.32%, rgba(127, 83, 255, 1) 99.69%);
  border: calc(100vw * 1 / 375) solid rgba(255, 255, 255, 1);
}
.button{
  position: absolute;
  width: calc(100vw * 229 / 375);
  height: calc(100vh * 62 / 812);
  margin-left: calc(100vw * 73 / 375);
  border-radius: calc(100vw * 40 / 375);
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  z-index: 1;
  bottom: calc(100vh * 35 / 812);
  background: linear-gradient(90deg, rgba(181, 158, 255, 1) 0.32%, rgba(127, 83, 255, 1) 99.69%);
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>