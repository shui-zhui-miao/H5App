<template>
  <div class="page">
    <div class="back">
      <BackButton/>
    </div>
    <div class="page-content">
        <!-- 输入框 -->
        <div class="input-box">
          <textarea
            v-model="text"
            maxlength="150"
            class="post-textarea"
            placeholder="Please enter"
          ></textarea>
          <div class="text-count">{{ text.length }}/150</div>
        </div>
        <!-- Upload（video） -->
        <div class="theme-label">Upload（video）</div>
        <!-- 视频上传 -->
        <div class="upload-list">
          <!-- 添加视频按钮 -->
          <label v-if="!uploadedVideo" class="upload-item">
            <input type="file" accept="video/*" style="display:none" @change="handleAddVideo" />
            <div class="upload-add"></div>
          </label>

          <!-- 已上传的视频第一帧显示 -->
          <template v-if="uploadedVideo">
            <label class="upload-item">
              <img class="upload-video-preview" :src="videoFirstFrame" alt="video preview" />
              <van-icon class="upload-remove" name="clear" size="20" @click="handleRemoveVideo" color="#fff"/>
            </label>
          </template>
        </div>
        <!-- Release -->
        <div class="release-button">Release</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOtherStore } from '@/stores/other'
import BackButton from '@/components/back.vue'

const text = ref('')
const selectedTheme = ref(0)

const otherStore =  useOtherStore()

const uploadedVideo = ref(null)  // store the video file
const videoFirstFrame = ref('') // store the preview image

const handleAddVideo = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  uploadedVideo.value = file;

  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.muted = true;
  video.playsInline = true;

  // Wait until the video can play to draw the first frame
  video.addEventListener('loadeddata', () => {
    video.currentTime = 0;
  }, { once: true });

  video.addEventListener('seeked', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    videoFirstFrame.value = canvas.toDataURL('image/png');
  }, { once: true });
}

const handleRemoveVideo = () => {
  uploadedVideo.value = null
  videoFirstFrame.value = ''
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  background-image: url('@/assets/pagebgc.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
}

.back {
    padding-top: calc(100vh * 56 / 812);
    padding-left: calc(100vw * 20 / 375);
}

.page-content {
  position: relative;
  width: 100vw;
  height: calc(100vh - calc(100vh * 96 / 812));
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.input-box {
  position: relative;
  margin-top: calc(100vh * 20 / 812);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 20 / 375);
  height: calc(100vh * 174 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: rgba(255, 255, 255, 1);
  padding: calc(100vw * 12 / 375);
  box-sizing: border-box;
}

.post-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  background: transparent;
  color: #000;
}

.post-textarea::placeholder {
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  color: rgba(105, 71, 65, 1); /* 颜色可半透明 */
}

.text-count {
  position: absolute;
  right: calc(100vw * 14 / 375);
  bottom: calc(100vh * 19 / 812);
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: normal;
  color: rgba(105, 71, 65, 1);
}

.theme-label {
  margin-top: calc(100vh * 24 / 812);
  margin-left: calc(100vw * 20 / 375);
  font-family: 'YesevaOne', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 400;
  line-height: calc(100vw * 23.1 / 375);
  color: rgba(255, 255, 255, 1);
  text-align: left;
}

.upload-list {
  display: flex;
  overflow-x: auto;
  margin-top: calc(100vh * 20 / 812);
  padding-left: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  gap: calc(100vw * 10 / 375); /* 间距10，当有图片时 */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
.upload-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.upload-item {
  width: calc(100vw * 108 / 375);
  height: calc(100vw * 108 / 375);
  flex-shrink: 0;
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.upload-video-preview {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.upload-add {
  width: calc(100vw * 21 / 375);
  height: calc(100vw * 21 / 375);
  background-image: url('@/assets/uploadpic.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto;
}

.upload-remove {
  position: absolute;
  top: calc(100vh * 8 / 812);
  right: calc(100vw * 5 / 375);
  width: calc(100vw * 20 / 375);
  height: calc(100vw * 20 / 375);
  cursor: pointer;
  z-index: 10;
}

/* Release Button Styles */
.release-button {
  width: calc(100vw * 229 / 375);
  height: calc(100vh * 62 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: linear-gradient(135deg, rgba(255, 159, 142, 1) 0%, rgba(241, 213, 160, 1) 32.13%, rgba(201, 255, 221, 1) 67.84%, rgba(157, 255, 255, 1) 100%);
  box-shadow: inset calc(100vw * -2 / 375) calc(100vw * -2 / 375) calc(100vw * 2 / 375) rgba(255, 255, 255, 0.6), inset calc(100vw * 2 / 375) calc(100vw * 2 / 375) calc(100vw * 2 / 375) rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'YesevaOne', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 400;
  line-height: calc(100vw * 23.1 / 375);
  color: rgba(74, 32, 25, 1);
  cursor: pointer;
  margin: calc(100vh * 148 / 812) auto calc(100vh * 34 / 812) auto;
}
</style>