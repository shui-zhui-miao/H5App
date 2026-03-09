<template>
  <div class="page">
    <!-- 全屏视频播放器 -->
    <video
      ref="videoRef"
      class="video-player"
      :src="post && post.dynamicVideo"
      autoplay
      muted
      loop
      playsinline
      webkit-playsinline
      preload="auto"
      @click="togglePlay"
    ></video>

    <!-- center pause/play icon -->
    <img
      v-show="isPaused"
      class="video-center-icon"
      src="@/assets/videopluse.png"
      alt="play"
      @click="togglePlay"
    />

    <!-- 底部阴影区域 -->
    <div class="bottom-shadow"></div>
    <!-- 内容部分 -->
    <div class="content">
      <!-- 顶部按钮 -->
      <div class="top-actions">
        <BackButton />
        <MoreButton />
      </div>

      <!-- 底部信息 -->
      <div class="bottom-info">
        <div class="user-left"> 
          <div class="avatar-wrap">
            <div class="avatar">
              <img :src="postUser && postUser.avator" alt="avatar" />
            </div>
            <div class="follow">
              <img src="@/assets/follow.png" alt="follow" />
            </div>
          </div>

          <div class="user-text">
            <div class="username">{{ postUser && postUser.name }}</div>
            <div class="video-desc">{{ post && post.dynamicDesc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 喜欢、评论数 -->
    <div class="action-buttons">
      <div class="action-button">
        <img src="@/assets/likepic.png" alt="like" />
        <span>123</span>
      </div>
      <div class="action-button" @click="openComment">
        <img src="@/assets/chaticon.png" alt="comment" />
        <span>45</span>
      </div>
    </div>

    <!-- 评论弹窗（底部弹出） -->
    <div v-if="showComment" class="comment-overlay" @click.self="closeComment">
      <div class="comment-sheet">
        <Comment />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { usePostStore } from '@/stores/post'
import { useUserStore } from '@/stores/user'
import { onMounted, onBeforeUnmount } from 'vue'
import BackButton from '@/components/back.vue'
import MoreButton from '@/components/more.vue'
import Comment from '@/views/postViews/comment.vue'

const showComment = ref(false)
function openComment() {
  showComment.value = true
}
function closeComment() {
  showComment.value = false
}

const { postId } = defineProps({
  postId: {
    type: [String, Number],
    required: true
  }
})

const postStore = usePostStore()
const post = postStore.getPostById(postId)

const userStore =  useUserStore()
const postUser = userStore.getUserById(post.userId)

const videoRef = ref(null)
const isPaused = ref(false)

function togglePlay() {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    video.play()
    isPaused.value = false
  } else {
    video.pause()
    isPaused.value = true
  }
}

onMounted(() => {
  const video = videoRef.value
  if (video) {
    video.play().then(() => {
      isPaused.value = false
    }).catch(() => {
      isPaused.value = true
    })
  }
})

onBeforeUnmount(() => {
  const video = videoRef.value
  if (video) {
    video.pause()
  }
})

</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  overflow: hidden;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-center-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw * 60 / 375);
  height: calc(100vw * 60 / 375);
  z-index: 2;
}

.bottom-shadow {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh * 96 / 812);
  background: linear-gradient(180deg, rgba(14, 8, 15, 0.8) 0%, rgba(14, 8, 15, 0) 100%);
  pointer-events: none;
  transform: rotate(180deg);
}
 
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(100vh * 56 / 812) calc(100vw * 20 / 375) calc(100vh * 34 / 812);
  box-sizing: border-box;
  z-index: 3;
  pointer-events: none; /* allow clicks to pass through */
}

/* Overlay pseudo-element for pass-through area */
.content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* re-enable pointer-events for interactive children */
.top-actions, .top-actions *,
.bottom-info, .bottom-info *,
.follow, .follow * {
  pointer-events: auto;
}

.top-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-info {
  display: flex;
  align-items: center;
}

.user-left {
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
}

.avatar {
  width: calc(100vw * 48 / 375);
  height: calc(100vw * 48 / 375);
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
  box-sizing: border-box;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-wrap {
  position: relative;
  width: calc(100vw * 48 / 375);
  height: calc(100vw * 52 / 375); /* avatar 48 + gap 4 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.follow {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: calc(100vw * 36 / 375);
  height: calc(100vw * 14 / 375);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset calc(100vw * -1 / 375) calc(100vw * -1 / 375) calc(100vw * 1 / 375) rgba(255, 255, 255, 0.6), inset calc(100vw * 1 / 375) calc(100vw * 1 / 375) calc(100vw * 1 / 375) rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.follow img {
  width: calc(100vw * 12 / 375);
  height: calc(100vw * 12 / 375);
}

.user-text {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 4 / 812);
}

.username {
  font-family: 'YesevaOne', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.48 / 375);
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100vw - calc(100vw * 48 / 375) - calc(100vw * 16 / 375) - calc(100vw * 40 / 375)); /* avatar width + gap + padding */
}

.video-desc {
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  letter-spacing: 0px;
  line-height: calc(100vw * 15.23 / 375);
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100vw - calc(100vw * 48 / 375) - calc(100vw * 16 / 375) - calc(100vw * 40 / 375)); /* avatar width + gap + padding */
}

.action-buttons {
  position: absolute;
  bottom: calc(100vh * 86 / 812);
  right: calc(100vw * 20 / 375);
  display: flex;
  gap: calc(100vh * 14 / 812);
}

.action-button {
  width: calc(100vw * 91 / 375);
  height: calc(100vh * 39 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(255, 255, 255, 0.4);
  box-shadow: inset calc(100vw * -1 / 375) calc(100vw * -1 / 375) calc(100vw * 1 / 375) rgba(255, 255, 255, 0.6), inset calc(100vw * 1 / 375) calc(100vw * 1 / 375) calc(100vw * 1 / 375) rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(calc(100vw * 10 / 375));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(100vw * 10 / 375);
}

.action-button img {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
}

.action-button span {
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.41 / 375);
  color: rgba(255, 255, 255, 1);
}

.comment-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 10000;
}

.comment-sheet {
  width: 100%;
  height: calc(100vh * 508 / 812);
  animation: slideUp 0.3s forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
