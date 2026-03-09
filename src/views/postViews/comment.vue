<template>
  <div class="comment">
    <div class="comment-container">
      <!-- 标题部分 -->
      <div class="comment-header">
        <div class="header-line" style="max-width: calc(100vw * 31 / 375);"></div>
        <div class="header-title">Comments</div>
        <div class="header-line"></div>
      </div>

      <!-- 评论列表 -->
      <div class="comment-list">
        <div v-for="(item, index) in comments" :key="index" class="comment-item">
          <div class="comment-top">
            <div class="comment-user">
              <div class="avatar">
                <img :src="item.avatar" alt="avatar" />
              </div>
              <div class="username">{{ item.name }}</div>
            </div>
            <img class="report-btn" src="@/assets/postpiccommentreport.png" alt="report" />
          </div>
          <div class="comment-text">{{ item.text }}</div>
        </div>
      </div>
    </div>

    <!-- Bottom input box -->
    <div class="bottom-input">
      <input type="text" placeholder="Say something" v-model="inputText" />
      <img class="send-btn" src="@/assets/commentsend.png" alt="send" @click="sendComment" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comments = ref([
  { avatar: 'https://img.js.design/assets/img/69435f7e0aebe8c71fc55eef.png#27c87ac7309481d72bde1bebd6b5801a', name: 'User1', text: 'This is a comment example.' },
  { avatar: 'https://img.js.design/assets/img/69435f7e0aebe8c71fc55eef.png#27c87ac7309481d72bde1bebd6b5801a', name: 'User1', text: 'This is a comment example.' },
  { avatar: 'https://img.js.design/assets/img/69435f7e0aebe8c71fc55eef.png#27c87ac7309481d72bde1bebd6b5801a', name: 'User1', text: 'This is a comment example.' },
  { avatar: 'https://img.js.design/assets/img/69435f7e0aebe8c71fc55eef.png#27c87ac7309481d72bde1bebd6b5801a', name: 'User1', text: 'This is a comment example.' },
  { avatar: 'https://img.js.design/assets/img/69435f7e0aebe8c71fc55eef.png#27c87ac7309481d72bde1bebd6b5801a', name: 'User1', text: 'This is a comment example.' },
])

const inputText = ref('')
function sendComment() {
  if(inputText.value.trim() !== '') {
    console.log('Send comment:', inputText.value)
    inputText.value = ''
  }
}
</script>

<style scoped>
.comment {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: calc(100vh * 20 / 812) calc(100vh * 20 / 812) 0 0;
  background: linear-gradient(135deg, rgba(255, 159, 142, 1) 0%, rgba(241, 213, 160, 1) 32.13%, rgba(201, 255, 221, 1) 67.84%, rgba(157, 255, 255, 1) 100%);
  box-sizing: border-box;
  overflow: hidden;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 6 / 375);
  padding: calc(100vh * 24 / 812) calc(100vw * 18 / 375) 0;
}

.header-line {
  flex: 1;
  height: 1px;
  background-color: #fff;
}

.header-title {
  font-family: 'YesevaOne', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.48 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
}

.comment-list {
  padding: calc(100vh * 20 / 812) calc(100vw * 20 / 375) calc(100vh * 90 / 812);
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 10 / 812);
  overflow-y: auto;
  max-height: calc(calc(100vh * 508 / 812) - calc(100vh * 63 / 812) - calc(100vh * 90 / 812)); /* subtract header and bottom spacing */
}

.comment-item {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 4 / 812);
  padding: calc(100vh * 14 / 812) calc(100vw * 16 / 375) calc(100vh * 18 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(calc(100vw * 12 / 375));
}

.comment-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
}

.avatar {
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  border-radius: 50%;
  padding: calc(100vw * 1 / 375); /* border thickness */
  background: linear-gradient(
    135deg,
    rgba(255, 159, 142, 1) 0%,
    rgba(241, 213, 160, 1) 32.13%,
    rgba(201, 255, 221, 1) 67.84%,
    rgba(157, 255, 255, 1) 100%
  );
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  margin-bottom: calc(100vw * 4 / 375);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.username {
  font-family: 'YesevaOne', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.48 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.report-btn {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
}

.comment-text {
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 12 / 375);
  font-weight: 400;
  line-height: calc(100vw * 13.06 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  text-align: left;
}

.bottom-input {
  position: absolute;
  left: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  bottom: calc(100vh * 29 / 812);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(201, 255, 221, 1);
  box-shadow: 0px calc(100vw * 2 / 375) calc(100vw * 4 / 375) rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(calc(100vw * 32 / 375));
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding: 0 calc(100vw * 16 / 375);
  box-sizing: border-box;
}

.bottom-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  letter-spacing: 0;
  color: #000;
}

.bottom-input input::placeholder {
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  color: rgba(105, 71, 65, 0.5);
}

.send-btn {
  width: calc(100vw * 30 / 375);
  height: calc(100vw * 30 / 375);
  cursor: pointer;
}
</style>