<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->
    <div class="page-container">
      <!-- top -->
      <div class="top-bgc">
        <div class="top-section">
          <BackButton />
        </div>
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
                    <div class="chat-avatar-rigth-border-box">
                      <div class="chat-avatar-rigth"> 
                        <img :src="currentUserStore.currentUser.avator" alt="AI Avatar" />
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <!-- bottom input box -->
    <div class="bottom-input">
      <input type="text" placeholder="Say something" v-model="chatInput" />
      <div class="send-icon" @click="sendMessage" >
        <img src="@/assets/commentsend.png" alt="Send" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/back.vue'
import { useCurrentUserStore } from '@/stores/currentUser'
import { sendShowLoadingToIOS, sendShowToastToIOS } from '@/utils/iosBridge'
import { aiChat } from '@/utils/ai'
import { decryptAES } from '@/utils/aes'

const formatTime12 = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`
}

const messages = ref([
  'I\'m feeling great today.',
  'Do you like reading?',
  'Can you comfort me?'
])

const currentUserStore = useCurrentUserStore()

const getFirstTime = () => {
  const key = 'chat_first_time'
  const saved = localStorage.getItem(key)

  if (saved) return saved

  const now = new Date()
  const time = formatTime12(now) // changed here
  localStorage.setItem(key, time)

  return time
}

const bottomItems = ref([
  { sendId: '0', time: getFirstTime(), message: 'Hi there! I’m Kira, your AI buddy for all things fun and creative.'},
])

async function handleMessageClick(message) {
  const time = formatTime12(new Date()) // changed here
  bottomItems.value.push({
    sendId: currentUserStore.currentUser.id,
    time,
    message: message
  })

  sendShowLoadingToIOS(true)

  try {
    const res = await aiChat(message)

    sendShowLoadingToIOS(false)

    if (res.data.code === '0000') {
      // 1 解密
      const decryptText = decryptAES(res.data.result)
      // 2 转 JSON
      const data = JSON.parse(decryptText)
      const aiMessage = data?.output?.choices?.[0]?.message?.content || ''
      
      // 然后 push 到聊天列表
      bottomItems.value.push({
        sendId: '0',           // AI
        time: formatTime12(new Date()), // changed here
        message: aiMessage
      })
    } else {
      sendShowToastToIOS(res.data.message)
    }

  } catch (err) {
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Network error')
  }
}

const chatInput = ref('')

async function sendMessage() {
  const text = chatInput.value.trim()
  if (!text) return

  const time = formatTime12(new Date()) // changed here

  bottomItems.value.push({
    sendId: currentUserStore.currentUser.id,
    time,
    message: text
  })

  sendShowLoadingToIOS(true)
  try {
    const res = await aiChat(text)

    sendShowLoadingToIOS(false)

    if (res.data.code === '0000') {
      // 1 解密
      const decryptText = decryptAES(res.data.result)
      // 2 转 JSON
      const data = JSON.parse(decryptText)
      const aiMessage = data?.output?.choices?.[0]?.message?.content || ''
      
      // 然后 push 到聊天列表
      bottomItems.value.push({
        sendId: '0',           // AI
        time: formatTime12(new Date()), // changed here
        message: aiMessage
      })

      chatInput.value = ""
    } else {
      sendShowToastToIOS(res.data.message)
    }

  } catch (err) {
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Network error')
  }
}
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* prevent scrolling */
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* justify-content: center; */
}

.top-bgc {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.top-section {
  position: relative;
  margin-top: calc(100vh * 56 / 812);
  margin-left: calc(100vw * 20 / 375);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: calc(100vh * 14 / 812);
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
  padding-top: calc(100vh * 10 / 812);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* ⚡ 关键 */
  background: #fff;
  /* border-radius: calc(100vw * 30 / 375) calc(100vw * 30 / 375) 0px 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px calc(100vw * 4 / 375)  rgba(0, 0, 0, 0.1); */
}

.bottom-scroll {
  flex: 1;
  min-height: 0; /* ⚡ 关键 */
  overflow-y: auto;
  padding: 0 0 calc(100vh * 90 / 812) 0;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 16 / 812);
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
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: auto;
  color: rgba(102, 102, 102, 1);
}

.chat-content {
  display: flex;
  align-items: flex-start;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 37 / 375);
}

.chat-content-rigth {
  display: flex;
  align-items: flex-start;
  justify-content: end;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 37 / 375);
  margin-right: calc(100vw * 20 / 375);
}

.chat-avatar {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  border-radius: 50%;
}

.chat-avatar-rigth-border-box {
  flex-shrink: 0;
  background: rgba(219, 188, 255, 1);
  border-radius: 50%; /* fully circular */
  display: flex;
  justify-content: center;
}

.chat-avatar-rigth {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  border-radius: 50%; /* fully circular */
  padding: calc(100vh * 1 / 812) calc(100vw * 1 / 375);
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
  border-radius: 0px calc(100vw * 10 / 375) calc(100vw * 10 / 375) calc(100vw * 10 / 375);
  background: rgba(69, 241, 217, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 10 / 812) calc(100vw * 10 / 375);
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.8 / 375);
  letter-spacing: 0;
  color: rgba(0, 0, 0, 1);
}

.chat-message-rigth {
  border-radius: calc(100vw * 10 / 375) 0px calc(100vw * 10 / 375) calc(100vw * 10 / 375);
  background: rgba(219, 188, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 10 / 812) calc(100vw * 10 / 375);
  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.8 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}

.bottom-input {
  position: absolute;
  left: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  bottom: calc(100vh * 29 / 812);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(219, 188, 255, 1);
  backdrop-filter: blur(calc(100vw * 32 / 375));
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 11 / 375) 0 calc(100vw * 9 / 375);
  gap: calc(100vw * 16 / 375);
  box-sizing: border-box;
}

.bottom-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  /* font-family: 'OPPOSansRegular', sans-serif; */
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.8 / 375);
  letter-spacing: 0;
  color: #fff;
}

.bottom-input input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.send-icon {
  width: calc(100vw * 36 / 375);
  height: calc(100vw * 36 / 375);
  border-radius: 50%;
  background: rgba(25, 44, 65, 1);
  /* cursor: pointer; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.send-icon img {
  width: calc(100vw * 28 / 375);
  height: calc(100vw * 28 / 375);
}
</style>