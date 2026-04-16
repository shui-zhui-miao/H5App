<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->

    <!-- 页面内容 -->
    <div class="page-content">
      <div class="top-section">
        <BackButton />
      </div>
      <div class="bottom-scroll">
        <div class="bottom-first-box">
          <div class="midd"></div>
          <div class="bottom-first">
            <div class="ai-user-container"></div>
            <!-- <div class="ai-bgc-icon"></div> -->
            <div class="ai-content">
              <div class="ai-title-inter">
                <div class="ai-title-inter-one">Kira Dance</div>
                <div class="ai-title-inter-one">AI</div>
                <div style="height: calc(100vh * 10 / 812);"></div>
                <div class="ai-title-inter-two">Welcome to learn about</div>
                <div class="ai-title-inter-two">dance.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-section">
          <div class="bottom-container">
            <div class="bottom-top">
              <div class="bottom-text">Hi! I’m Kira, your friendly AI companion for all things dance. Whether you’re taking your first step, refining your moves, or just looking to express yourself and feel alive, I’m here to share tips, answer questions, and keep your dance journey inspiring and joyful. Ready to move, groove, and shine together? Let’s turn up the energy and dance like no one’s watching every single day!</div>
            </div>
            <!-- 购买 -->
            <div class="purchase-container" @click="handlePurchaseClick">
              <div class="purchase-info">
                <div class="purchase-icon"></div>
                <div class="purchase-count">x 200</div>
              </div>
              <div class="chat-box">Chat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="dialog"
      v-if="showCoinNot"
      @click.self="showCoinNot = false"
    >
      <CoinNotDialog @recharge="handleRechargeEvent" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUserStore } from '@/stores/user'
import BackButton from '@/components/back.vue'
import CoinNotDialog from '@/views/aiViews/coinNot.vue'
import { sendShowLoadingToIOS } from '@/utils/iosBridge'

const showCoinNot = ref(false)

const currentUserStore = useCurrentUserStore()
const userStore =  useUserStore()
function handlePurchaseClick() {
  if (currentUserStore.currentUser.coins >= 200) {
    sendShowLoadingToIOS(true)

    const currentCoins = currentUserStore.currentUser.coins - 200
    userStore.updateUser(currentUserStore.currentUser.userId, { coins: currentCoins })

    const delay = Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      sendShowLoadingToIOS(false)
      router.push({ name: 'aiChat' })
    }, delay)
  } else {
    showCoinNot.value = true
  }
}

const router = useRouter()
function handleRechargeEvent(value) {
  showCoinNot.value = false
  if (value === true) {
    router.push({ name: 'coins' })
  }
}
</script>

<style scoped>
.page {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
}

.page-content {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-sizing: border-box;
}

.top-section {
  margin-top: calc(100vh * 56 / 812);
  margin-left: calc(100vw * 20 / 375);
  z-index: 100;
}

.bottom-scroll {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.bottom-first-box {
  position: relative;
  display: flex;
  justify-content: end;
  flex-direction: column;
}

.midd{
  position: absolute;
  width: 100vw;
  height: calc(100vh * 55 / 812);
  background: #fff;
  border-radius: calc(100vw * 40 / 375) calc(100vw * 40 / 375) 0 0;
  transform: translateY(calc(100vh * 1 / 812));
}

.bottom-first {
  position: relative;
  width: calc(100vw * 335 / 375);
  height: calc(100vh * 223 / 812);
  margin: calc(100vh * 20 / 812) calc(100vw * 20 / 375) 0 calc(100vh * 20 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: linear-gradient(180deg, rgba(69, 241, 217, 1) 0%, rgba(255, 255, 255, 1) 100%);
  box-sizing: border-box;
}

.ai-user-container {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100vw * 160 / 375);
  height: calc(100vh * 220 / 812);
  background-image: url('@/assets/aiuserpic.png');
  background-size: contain; /* 等比缩放覆盖 */
  background-position: right; /* 居中显示 */
  background-repeat: no-repeat;
  z-index: 2;
}

.ai-bgc-icon {
  position: absolute;
  right: calc(100vw * 2 / 375);
  top: calc(100vh * -12 / 812);
  width: calc(100vw * 66 / 375);
  height: calc(100vh * 66 / 812);
  /* background-image: url('@/assets/aibgcicon.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; */
  z-index: 2;
}

.ai-content {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: calc(100vh * 32 / 812) calc(100vw * 23 / 375) calc(100vh * 14 / 812) calc(100vw * 18 / 375);
}

.ai-title-inter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 0 calc(100vw * 22 / 375); */
  z-index: 3;
}

.ai-title-inter-one {
  /* padding-right: calc(100vw * 7 / 375); */
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 30 / 375);
  font-weight: 700;
  line-height: calc(100vw * 36 / 375);
  color: rgba(0, 0, 0, 1);
  text-shadow: 0 calc(100vw * 2 / 375) calc(100vw * 4 / 375)  rgba(0, 0, 0, 0.25);
}

.ai-title-inter-two {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.8 / 375);
  color: rgba(0, 0, 0, 1);
}




.bottom-section {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: flex-start;
  z-index: 99;
  background: #fff;
}

.bottom-container { 
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 28 / 812);
  box-sizing: border-box;
}

.bottom-top {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: calc(100vh * 20 / 812) calc(100vw * 30 / 375) 0 calc(100vw * 30 / 375);
}

.bottom-title {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  line-height: calc(100vw * 24 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
  text-align: center;
}

.bottom-text {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 30 / 375);
  letter-spacing: 0;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  overflow-y: auto;
}

.purchase-container {
  margin-bottom: calc(100vh * 34 / 812);
  width: calc(100vw * 189 / 375);
  height: calc(100vh * 53 / 812);
  background: rgba(69, 241, 217, 1);
  border-radius: calc(100vw * 40 / 375);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 18 / 375);
  box-sizing: border-box;
}

.purchase-info {
  display: flex;
  align-items: center;
  gap: calc(100vw * 3 / 375);
}

.purchase-icon {
  width: calc(100vw * 36 / 375);
  height: calc(100vh * 36 / 812);
  background-image: url('@/assets/coin.png'); /* replace with your local image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.purchase-count {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 900;
  line-height: calc(100vw * 24 / 375);
  letter-spacing: 0;
  color: rgba(0, 0, 0, 1);
}

.chat-box {
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 19.2 / 375);
  letter-spacing: 0;
  color: rgba(0, 0, 0, 1);
  box-sizing: border-box;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>