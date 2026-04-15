<template>
  <div class="dialog-mask" @click.self="$emit('close')">
    <div class="dialog-container" :style="{ backgroundImage: `url(${bgcImage})` }">
      <div class="dialog-content">
        <div class="dialog" :style="{ backgroundImage: `url(${bgcImage2})` }"></div>
        <div class="option" @click="$emit('select', 0)">Report</div>
        <div class="option" @click="$emit('select', 1)">Shield</div>
        <div class="cancel" @click.self="$emit('close')">CANCEL</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bgcImage from '@/assets/reportdialogbgc.png'
import bgcImage2 from '@/assets/reportchoosebgc.png'
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 居中 */
  width: calc(100vw * 244 / 375);
  height: calc(100vh * 316 / 812);
  border-radius: calc(100vw * 30 / 375);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1000;
  display: flex;
  justify-self: center;
  align-items: center;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 底部对齐 */
  align-items: center;       /* 水平居中 */
  height: 100%;
  width: 100%;
  padding-bottom: calc(100vh * 36 / 812); /* 底部间距 */
  gap: calc(100vh * 16 / 812); /* 上下间距26 */
}

.dialog-options {
  width: calc(100vw * 220 / 375);
  height: calc(100vh * 164 / 812);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(100vh * 26 / 812); /* 上下间距26 */
  align-items: center;
  background-image: url(''); /* 先空，实际绑定在模板 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.dialog{
  width: calc(100vw * 64 / 375);
  height: calc(100vw * 64 / 375);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: calc(100vh * 4 / 812);
}
.option {
  width: calc(100vw * 148 / 375);
  height: calc(100vh * 46 / 812);
  border-radius: calc(100vw * 23 / 375);
  background: rgba(255, 255, 255, 1);
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  color: rgba(39, 36, 79, 1);
  text-align: center;

  display: flex; /* 新增 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.cancel {
  margin-top: calc(100vh * 8 / 812);
  width: calc(100vw * 164 / 375);
  height: calc(100vh * 56 / 812);
  border-radius: calc(100vw * 28 / 375);
  background: linear-gradient(90deg, rgba(181, 158, 255, 1) 0.32%, rgba(127, 83, 255, 1) 99.69%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
</style>