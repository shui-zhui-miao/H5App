<template>
  <div class="page">
    <div class="aiusermodel"></div>

    <!-- 页面内容 -->
    <div class="page-content">
      <div class="top-section">
        <BackButton />
      </div>

      <div class="bottom-section">
        <div class="bottom-container">
          <div class="bottom-title">Geime AI</div>
          <div class="bottom-text">Hi! I'm Geime AI, your go-to companion for all things cosplay and character looks. Whether you love anime fits, game-inspired styles, or iconic character vibes, I’m here with tips, costume ideas, and inspiration to bring your favorite characters to life. Let’s cosplay and shine together!</div>
        </div>

      </div>
      <!-- 购买 -->
      <div class="purchase-container" @click="handlePurchaseClick">
        <div class="purchase-info">
          Chat
        </div>
        <div class="chat-box">
          <div class="purchase-icon"></div>
          <div class="purchase-count">x200</div>
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
import { useUIStore } from '@/stores/ui'
import BackButton from '@/components/back.vue'
import CoinNotDialog from '@/views/aiViews/coinNot.vue'

const showCoinNot = ref(false)

const currentUserStore = useCurrentUserStore()
const uiStore = useUIStore()
const userStore =  useUserStore()
function handlePurchaseClick() {
  if (currentUserStore.currentUser.coins >= 100) {
    if (uiStore.loading) return
    uiStore.showLoading()

    const currentCoins = currentUserStore.currentUser.coins - 200
    userStore.updateUser(currentUserStore.currentUser.userId, { coins: currentCoins })

    const delay = Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      uiStore.hideLoading()
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
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* prevent scrolling */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.aiusermodel {
  position: absolute;
  width: calc(100vw * 375 / 375);
  height: calc(100vh * 518 / 812);
  opacity: 1;
  background-image: url('@/assets/aiusermodel.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.page-content {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* top内容在上，bottom内容在下 */
  box-sizing: border-box;
}

.top-section {
  margin-top: calc(100vh * 56 / 812);
  margin-left: calc(100vw * 20 / 375);
  z-index: 100;
}

.bottom-section {
  display: flex;
  justify-content: flex-start;
  z-index: 99;
}

.bottom-container { 
  margin-top:  calc(100vh * 110 / 812);
  width: 100%;
  border-radius: calc(100vw * 40 / 375) calc(100vw * 40 / 375) 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: calc(100vh * 24 / 812); /* top spacing for first text */
  box-sizing: border-box;
}

.bottom-title {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 30 / 375);
  font-weight: 700;
  line-height: calc(100vw * 27.72 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin-bottom: calc(100vh * 20 / 812); /* space before second text */
}

.bottom-text {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 24 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin: 0 calc(100vw * 65 / 375) 0 calc(100vw * 65 / 375); /* horizontal padding */
}

.purchase-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(100vh * 15 / 812);
  margin-bottom: calc(100vh * 35 / 812);
  width: calc(100vw * 235 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 27 / 375);
  background: radial-gradient(54.89% 50% at 50.212765957446805% 0%, rgba(255, 213, 0, 0.4) 0%, rgba(255, 213, 0, 0) 100%), rgba(255, 71, 96, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding-right: calc(100vw * 11 / 375);
  box-sizing: border-box;
}

.purchase-info {
  display: flex;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 28.96 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}

.purchase-icon {
  width: calc(100vw * 20 / 375);
  height: calc(100vh * 20 / 812);
  background-image: url('@/assets/coin.png'); /* replace with your local image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.purchase-count {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 700;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}

.chat-box {
  width: calc(100vw * 73 / 375);
  height: calc(100vh * 29 / 812);
  border-radius: calc(100vw * 14.5 / 375);
  background: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 4 / 375);
  box-sizing: border-box;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>