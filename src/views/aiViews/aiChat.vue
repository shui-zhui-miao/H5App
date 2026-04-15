<template>
  <div class="page">
    <div class="aiusermodel"></div>
    <div class="page-container">
      <!-- top -->
      <div class="top-section">
        <BackButton />
        <span class="top-section-text">Meko AI</span>
      </div>
      <!-- center -->
      <div class="center-section">
        <div
          v-for="(item, index) in messages"
          :key="index"
          class="message-box"
          @click="handleMessageClick(item)"
        >
          <span>{{ item }}</span>
          <span class="message-box-img"></span>
        </div>
      </div>
      <!-- bottom -->
      <div class="bottom-section">
        <div class="bottom-scroll">
          <div v-for="(item, index) in bottomItems" :key="index" class="chat-item">
            <div class="chat-choose" v-if="item.sendId === '0'">
                <div class="chat-time">{{ item.time }}</div>
                <div class="chat-content">
                  <img class="chat-avatar" src="@/assets/aiavator.png" alt="AI Avatar" />
                  <div class="chat-message">{{ item.message }}</div>
                </div>
            </div>
            <div class="chat-choose" v-else>
                <div class="chat-time">{{ item.time }}</div>
                    <div class="chat-content-rigth">
                    <div class="chat-message-rigth">{{ item.message }}</div>
                    <div class="chat-avatar-rigth">
                      <img :src="currentUserStore.currentUser.avator" alt="AI Avatar" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <!-- bottom input box -->
    <div class="bginput-box">
      <div class="bottom-input">
        <input type="text" placeholder="Say something" v-model="chatInput" />
        <img class="send-icon" src="@/assets/commentsend.png" alt="Send" @click="sendMessage" />
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/back.vue'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUIStore } from '@/stores/ui'
import { aiChat } from '@/utils/ai'
import { decryptAES } from '@/utils/aes'

const messages = ref([
  "Cosplay event rules?",
  "How to make props?",
  "How to pose for photos?"
])

const currentUserStore = useCurrentUserStore()
const uiStore = useUIStore()

const getFirstTime = () => {
  const key = 'chat_first_time'
  const saved = localStorage.getItem(key)

  if (saved) return saved

  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // 12:00
  localStorage.setItem(key, time)

  return time
}

const bottomItems = ref([
  { sendId: '0', time: getFirstTime(), message: 'Hi there! I’m Geime, your AI buddy for all things fun and creative.' },
])

async function handleMessageClick(message) {
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  bottomItems.value.push({
    sendId: currentUserStore.currentUser.id,
    time,
    message: message
  })

  if (uiStore.loading) return
  uiStore.showLoading()

  try {
    const res = await aiChat(message)

    uiStore.hideLoading()

    if (res.data.code === '0000') {
      // 1 解密
      const decryptText = decryptAES(res.data.result)
      // 2 转 JSON
      const data = JSON.parse(decryptText)
      const aiMessage = data?.output?.choices?.[0]?.message?.content || ''
      
      // 然后 push 到聊天列表
      bottomItems.value.push({
        sendId: '0',           // AI
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: aiMessage
      })
    } else {
      uiStore.showToast(res.data.message)
    }

  } catch (err) {
    uiStore.hideLoading()
    uiStore.showToast('Network error')
  }
}

const chatInput = ref('')

async function sendMessage() {
  const text = chatInput.value.trim()
  if (!text) return

  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  bottomItems.value.push({
    sendId: currentUserStore.currentUser.id,
    time,
    message: text
  })

  if (uiStore.loading) return
  uiStore.showLoading()
  try {
    const res = await aiChat(text)

    uiStore.hideLoading()

    if (res.data.code === '0000') {
      // 1 解密
      const decryptText = decryptAES(res.data.result)
      // 2 转 JSON
      const data = JSON.parse(decryptText)
      const aiMessage = data?.output?.choices?.[0]?.message?.content || ''
      
      // 然后 push 到聊天列表
      bottomItems.value.push({
        sendId: '0',           // AI
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: aiMessage
      })

      chatInput.value = ""
    } else {
      uiStore.showToast(res.data.message)
    }

  } catch (err) {
    uiStore.hideLoading()
    uiStore.showToast('Network error')
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
  height: calc(100vh * 281 / 812);
  opacity: 1;
  background-image: url('@/assets/rsnskjss.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.top-section {
  position: relative;
  margin-top: calc(100vh * 56 / 812);
  margin-left: calc(100vw * 16 / 375);
  z-index: 100;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: calc(100vw * 12 / 375);
}
.top-section-text{
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 28.96 / 375);
  color: #fff;
}

.center-section {
  margin-top: calc(100vh * 41 / 812);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 28 / 375);
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 8 / 812);
  z-index: 1;
}

.message-box {
  display: inline-flex;
  align-items: center;
  height: calc(100vh * 36 / 812);
  padding: 0 calc(100vw * 10 / 375);
  border-radius: calc(100vw * 18 / 375);
  background: rgba(13, 8, 13, 0.2);
  backdrop-filter: blur(calc(100vw * 8 / 375));
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content; /* Wrap width to content */
  justify-content: flex-start; /* Align content to left */
  gap: calc(100vw * 16 / 375);
}
.message-box-img{
  background-image: url('@/assets/tuhbdjnfc.png'); 
  width: calc(100vw * 16 / 375);
  height: calc(100vw * 16 / 375);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bottom-section {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(100vh * 281 / 812); /* adjust top spacing as needed */
  z-index: 2;
}

.bottom-scroll {
  height: calc(100% - calc(100vh * 20 / 812));
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-top: calc(100vh * 20 / 812);
  padding-bottom: calc(100vh * 90 / 812);
  box-sizing: border-box;
  gap: calc(100vh * 24 / 812);
}

/* Optional: hide scrollbar */
.bottom-scroll::-webkit-scrollbar {
  display: none;
}
.bottom-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chat-item {
  display: flex;
  flex-direction: column;
}

.chat-choose {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 12 / 812);
}

.chat-time {
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.6);
}

.chat-content {
  display: flex;
  align-items: flex-start;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 16 / 375);
  margin-right: calc(100vw * 68 / 375);
}

.chat-content-rigth {
  display: flex;
  align-items: flex-start;
  justify-content: end;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 68 / 375);
  margin-right: calc(100vw * 20 / 375);
}

.chat-avatar {
  width: calc(100vw * 40 / 375);
  height: calc(100vw * 40 / 375);
  border-radius: 50%;
}

.chat-avatar-rigth {
  width: calc(100vw * 40 / 375);
  height: calc(100vw * 40 / 375);
  flex-shrink: 0;
  border-radius: 50%; /* fully circular */
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

/* Ensure avatar images fit inside the circular container and any overflow is hidden */
.chat-avatar img,
.chat-avatar-rigth img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* ensure image fills container */
  border-radius: 50%;
  overflow: hidden;
}

.chat-message {
  border-radius: calc(100vw * 16 / 375);
  background: rgba(42, 42, 42, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}

.chat-message-rigth {
  border-radius: calc(100vw * 16 / 375);
  background: rgba(255, 71, 96, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}

.bginput-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh * 86 / 812);
  background: rgba(14, 8, 15, 1);
  z-index: 10; /* 提高层级 */
}

.bottom-input {
  position: absolute;
  left: calc(100vw * 16 / 375);
  right: calc(100vw * 16 / 375);
  bottom: calc(100vh * 35 / 812);
  height: calc(100vh * 40 / 812);
  display: flex;
  align-items: center;
  gap: calc(100vw * 10 / 375);
  background: rgba(42, 42, 42, 1);
  border-radius: calc(100vw * 16 / 375);
  box-sizing: border-box;
  padding: 0 calc(100vw * 16 / 375);
  z-index: 20;
}

.bottom-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  letter-spacing: 0;
  font-family: 'Lato', sans-serif;
  color: rgba(255, 255, 255, 1);
}

.bottom-input input::placeholder {
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  letter-spacing: 0;
  font-family: 'Lato', sans-serif;
  color: rgba(255, 255, 255, 0.6);
}

.send-icon {
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  cursor: pointer;
}

</style>