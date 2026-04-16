<template>
  <div class="dialog-mask" @click.self="handleClose">
    <div class="dialog-container" :class="{ show: visible }">
      <div class="dialog-content">
        <div class="dialog-options">
          <div class="option" @click="emit('select', 0)">Report</div>
          <div class="option" @click="emit('select', 1)">Shield</div>
        </div>
        <div class="cancel" @click="handleClose">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

const emit = defineEmits(['close', 'select'])

onMounted(() => {
  requestAnimationFrame(() => {
    visible.value = true
  })
})

const handleClose = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
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
  z-index: 999;
}

.dialog-container {
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: calc(100vw * 266 / 375);

  border-radius: calc(100vw * 40 / 375) calc(100vw * 40 / 375) 0 0;
  background: #DBBCFF;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.dialog-container.show {
  transform: translateY(0);
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: calc(100vh * 49 / 812);
  gap: calc(100vh * 22 / 812);
}

.dialog-options {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 16 / 812);
  align-items: center;
}

.option {
  width: calc(100vw * 260 / 375);
  height: calc(100vh * 46 / 812);
  border-radius: calc(100vw * 23 / 375);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 calc(100vw * 10 / 375) rgba(0, 0, 0, 0.1);

  font-family: 'Barlow', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 600;
  color: rgba(25, 44, 65, 1);

  display: flex;
  justify-content: center;
  align-items: center;
}

.cancel {
  width: calc(100vw * 198 / 375);
  height: calc(100vh * 53 / 812);
  border-radius: calc(100vw * 26.5 / 375);
  background: rgba(69, 241, 217, 1);

  font-size: calc(100vw * 20 / 375);
  font-weight: 900;
  color: #000;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>