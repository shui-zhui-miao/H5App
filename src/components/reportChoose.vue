<template>
  <Transition name="fade">
    <div v-if="internalVisible" class="dialog-mask" @click.self="handleClose">
      <Transition name="slide-up" @after-leave="onContentAfterLeave">
        <div v-if="contentVisible" class="dialog-container">
          <div class="dialog-content">
            <div class="option" @click="handleSelect(0)">Report</div>
            <div class="option" @click="handleSelect(1)">Shield</div>
            <div class="cancel" @click="handleClose">Cancel</div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['close', 'select', 'update:visible'])

const internalVisible = ref(false)
const contentVisible = ref(false)

watch(() => props.visible, (newVal) => {
  if (newVal) {
    internalVisible.value = true
    nextTick(() => {
      contentVisible.value = true
    })
  } else {
    contentVisible.value = false
  }
}, { immediate: true })

const onContentAfterLeave = () => {
  internalVisible.value = false
}

const handleClose = () => {
  contentVisible.value = false
  emit('close')
  emit('update:visible', false)
}

const handleSelect = (value) => {
  emit('select', value)
  handleClose()
}
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
  align-items: flex-end; /* 底部对齐 */
  z-index: 999;
}

/* 蒙层淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: background-color 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  background-color: rgba(0, 0, 0, 0);
}

.dialog-container {
  width: 100vw;
  height: calc(100vh * 267 / 812);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-radius: 24px 24px 0px 0px;
  background: radial-gradient(16% 13.86% at 100% 0%, rgba(245, 181, 57, 0.2) 0%, rgba(245, 181, 57, 0) 100%), radial-gradient(20% 18.35% at 33.33333333333333% 0%, rgba(242, 71, 93, 0.2) 0%, rgba(242, 71, 93, 0) 100%), rgba(21, 20, 25, 1);
  transform: translateY(0);
}

/* 上滑/下滑动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: auto;
  padding-bottom: calc(100vh * 36 / 812);
  gap: calc(100vh * 26 / 812);
}

.option {
  width: calc(100vw * 260 / 375);
  height: calc(100vh * 46 / 812);
  border-radius: calc(100vw * 23 / 375);
  background: rgba(42, 42, 42, 1);
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.cancel {
  width: calc(100vw * 235 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 27 / 375);
  background: radial-gradient(54.89% 50% at 50.212765957446805% 0%, rgba(255, 213, 0, 0.4) 0%, rgba(255, 213, 0, 0) 100%), rgba(255, 71, 96, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
}
</style>