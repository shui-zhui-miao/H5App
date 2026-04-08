<template>
  <div class="page">
    <div class="header">
      <BackButton />
      <h1 class="title">Setting</h1>
    </div>
    <main class="options-list">
      <div class="option" v-for="(option, index) in options" :key="index" @click="handleOption(index)">
        <span class="option-text">{{ option.text }}</span>
        <div class="option-right">
          <div class="arrow-placeholder"></div>
        </div>
      </div>
    </main>
    <div class="footer">
      <button class="btn delete-btn" @click="handleAction(true)">Delete account</button>
      <button class="btn logout-btn" @click="handleAction(false)">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
import { useCurrentUserStore } from '@/stores/currentUser'
import BackButton from '@/components/back.vue'
import { sendLogoutToIOS } from '@/utils/iosBridge'

const options = ref([
  { text: 'Privacy Policy' },
  { text: 'User Agreement' },
  { text: 'Blacklist' },
  { text: 'Edit personal information' }
])

const router = useRouter()
const uiStore = useUIStore()
const userStore =  useUserStore()
const currentUserStore = useCurrentUserStore()

function handleOption(index) {
  if (currentUserStore.currentUser.email === "") {
    uiStore.showToast('Not logged in. Please log in first.')
    return
  }
  switch (index) {
    case 0:
      router.push({ name: 'privacyPolicy' })
      break
    case 1:
      router.push({ name: 'userAgreement' })
      break
    case 2:
      router.push({ name: 'block' })
      break
    case 3:
      router.push({ name: 'coins' })
      break
    case 4:
      router.push({ name: 'edit' })
      break
    default:
      break
  }
}

function handleAction(isDelete) {
  if (uiStore.loading) return
  uiStore.showLoading()

  if (isDelete) {
    userStore.updateUser(currentUserStore.currentUser.userId, { isdelete: 1 })
  }

  const delay = Math.floor(Math.random() * 1500) + 500

  setTimeout(() => {
    uiStore.hideLoading()
    sendLogoutToIOS(isDelete)

  }, delay)
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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
  padding: calc(100vh * 55 / 812) calc(100vw * 16 / 375) 0;
}

.title {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  background: rgba(255, 255, 255, 1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Options List */
.options-list {
  flex: 1;
  padding: calc(100vh * 20 / 812) calc(100vw * 16 / 375) 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 32 / 812);
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-text {
  font-family: 'Lato', sans-serif;
  color: #fff;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
}

.option-right .arrow-placeholder {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
  background-image: url('@/assets/seetinggoicon.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
}

/* Footer */
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 20 / 812);
  padding-bottom: calc(100vh * 83 / 812);
}

.btn {
  width: calc(100vw * 235 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 27 / 375);
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  border: none;
  cursor: pointer; 
}

.delete-btn {
  color: rgba(255, 255, 255, 1);
  background: radial-gradient(54.89% 50% at 50.212765957446805% 0%, rgba(255, 213, 0, 0.4) 0%, rgba(255, 213, 0, 0) 100%), rgba(255, 71, 96, 1);
}

.logout-btn {
  background: radial-gradient(54.89% 50% at 50.212765957446805% 0%, rgba(255, 213, 0, 0.4) 0%, rgba(255, 213, 0, 0) 100%), rgba(255, 71, 96, 1);
  color: rgba(255, 255, 255, 1);
}
</style>