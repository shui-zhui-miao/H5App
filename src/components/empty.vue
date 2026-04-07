<template>
  <div class="empty-container">
    <img src="@/assets/empty.png" alt="empty" class="empty-image" />
    <div class="empty-text">NO Data</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column; /* 上下排列 */
  align-items: center;    /* 水平居中 */
}

.empty-image {
  width: calc(100vw * 100 / 375);
  height: calc(100vw * 177 / 375);
}

.empty-text {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  letter-spacing: 0px;
  color: rgba(255, 255, 255, 1);
}
</style>