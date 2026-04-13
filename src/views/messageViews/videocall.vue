<template>
  <div class="video-call" :style="{ backgroundImage: `url(${pageBg})` }">
    <div class="bg-gradient"></div>
    <!-- Top Avatar Container -->
    <div class="top-content">
      <BackButton />
      <MoreButton @click="$emit('showReport')" /> 
    </div>
    <div class="avatar-outer">
      <div class="avatar-inner">
        <img :src="userInfo.avator" alt="User Avatar" />
      </div>
    </div>
    <div class="mid">
      <div class="calling-text">{{ callingText }}</div>
      <div class="user-name">{{ userInfo.name }}</div>
      <div class="time">{{ formatTime(durationSeconds) }}</div>
    </div>

    <!-- Bottom Control Panel -->
    <div class="call-panel">
      <div class="hangup-btn" @click="hangup">
        <img src="@/assets/hangupicon.png" alt="hangup" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/back.vue'
import MoreButton from '@/components/more.vue'
import pageBg from '@/assets/pagebgc.png'

import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({ userId: String })
const emits = defineEmits(['hangup','showReport'])

const userStore = useUserStore()
const userInfo = userStore.getUserById(props.userId)

// 原有 callingText 动态点逻辑
const callingText = ref('Calling')
let dotCount = 0
let dotInterval = null

// 新增计时相关
const durationSeconds = ref(0)   // 初始 00:15
let timerInterval = null

// 格式化 MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

onMounted(() => {
  // 原有 Calling 点动画
  dotInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4
    callingText.value = 'Calling' + '.'.repeat(dotCount)
  }, 1000)

  // 新增计时器：每秒增加 1 秒
  timerInterval = setInterval(() => {
    durationSeconds.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(dotInterval)
  if (timerInterval) clearInterval(timerInterval)
})

function hangup() {
  clearInterval(dotInterval)
  if (timerInterval) clearInterval(timerInterval)
  emits('hangup')
}
</script>

<style scoped>
.video-call > *:not(.bg-gradient) {
  z-index: 1;
}

/* Top avatar */
.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.top-content{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: calc(100vh * 55 / 812);
  padding-left: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  box-sizing: border-box;
}

.video-call {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.avatar-outer {
  width: calc(100vw * 166 / 375);
  height: calc(100vw * 166 / 375);
  border: calc(100vw * 2 / 375) solid rgba(181, 158, 255, 0.5);
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-inner {
  width: calc(100vw * 144 / 375);
  height: calc(100vw * 144 / 375);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.mid{
  background: rgba(48, 40, 81, 1);
  width: calc(100vw * 288 / 375);
  height: calc(100vh * 128 / 812);
  border-radius: calc(100vw * 20 / 375);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.time{
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.36 / 375);
  color: rgba(237, 228, 255, 1);
}

/* Bottom call panel */
.call-panel {
  margin-bottom: calc(100vh * 35 / 812);
  width: calc(100% - (calc(100vw * 50 / 375)));
  height: calc(100vh * 80 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(48, 40, 81, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 calc(100vw * 20 / 375);
  box-sizing: border-box;
}

.call-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(100vh * 10 / 812);
}

.user-name {
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  line-height: calc(100vw * 29.76 / 375);
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: calc(100vh * 4 / 812);
  margin-bottom: calc(100vh * 24 / 812);
}

.calling-text {
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 19.84 / 375);
  color: rgba(255, 108, 149, 1);
}

.hangup-btn {
  width: calc(100vw * 46 / 375);
  height: calc(100vw * 50 / 375);
  border-radius: calc(100vw * 22.5 / 375);
  background: rgba(255, 108, 149, 1);
  box-shadow: 0px 0px 10px  rgba(255, 108, 149, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hangup-btn img {
  width: calc(100vw * 26 / 375);
  height: calc(100vw * 26 / 375);
}
</style>