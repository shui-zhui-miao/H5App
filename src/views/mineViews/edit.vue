<template>
  <div class="page">
    <div class="top-header">
      <BackButton />
      <span class="edit-title">Edit</span>
    </div>
    <div class="content">
      <div class="top">
        <div class="top-block" :style="{ backgroundImage: `url(${topBlockImage})` }" @click="chooseAvatar">
            <div class="camera-corner">
              <img src="@/assets/cameraicon.png" alt="camera" />
            </div>
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display:none"
        @change="onFileChange"
      />
      <div class="second">
        <div class="second-section">
            <div class="label">Name</div>
            <div class="input-box">
            <input v-model="name" type="text" placeholder="Please enter" />
            </div>
        </div>
      </div>
      <div class="fourth-section">
        <div class="save-btn" @click="saveProfile">Save</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUIStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
import BackButton from '@/components/back.vue'
import { goBackOrClose } from '@/utils/iosBridge'
import { uploadSingleImage } from '@/utils/ossUpload'

// Use relative path for web build
const topBlockImage = ref('/src/assets/avataricon.png')

const name = ref('')
const aboutMe = ref('')

const fileInput = ref(null)
const avatarFile = ref(null)

const currentUserStore = useCurrentUserStore()
const uiStore = useUIStore()
const userStore =  useUserStore()

const chooseAvatar = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  avatarFile.value = file

  // 本地预览
  const reader = new FileReader()
  reader.onload = (ev) => {
    topBlockImage.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

const saveProfile = async () => {
  if (!name.value.trim()) {
    uiStore.showToast('Please enter name')
    return
  }

  if (!aboutMe.value.trim()) {
    uiStore.showToast('Please enter about me')
    return
  }

  if (uiStore.loading) return
  uiStore.showLoading()

  let avatarUrl = topBlockImage.value

  try {
    if (avatarFile.value) {
      avatarUrl = await uploadSingleImage(avatarFile.value, 'template_development')
    }

    const delay = avatarFile.value ? 0 : Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      userStore.updateUser(currentUserStore.currentUser.userId, { 
        avator: avatarUrl,
        name: name.value,
        about: aboutMe.value
      })

      uiStore.hideLoading()

      goBackOrClose()

      uiStore.showToast('Profile updated')
    }, delay)

  } catch (e) {
    console.error(e)
    uiStore.hideLoading()
    uiStore.showToast('Updated failed, please check your network.')
  }
}

onMounted(() => {
  const user = currentUserStore.currentUser
  if (!user) return

  name.value = user.name || ''
  aboutMe.value = user.about || ''

  if (user.avator) {
    topBlockImage.value = user.avator
  }
})
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

.top-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
  padding: calc(100vh * 55 / 812) calc(100vw * 16 / 375) 0;
}

.edit-title {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  background: rgba(255, 255, 255, 1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content {
  position: relative;
  width: 100vw;
  height: calc(100% - calc(100vh * 98 / 812));
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.top, .second, .third {
    display: flex;
    justify-content: center;
}

.top-block {
  width: calc(100vw * 80 / 375);
  height: calc(100vw * 80 / 375);
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: calc(100vh * 24 / 812);
}

.camera-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100vw * 28 / 375);
  height: calc(100vw * 28 / 375);
  border-radius: 50%;
  background: rgba(255, 71, 96, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-corner img {
  width: calc(100vw * 22 / 375);
  height: calc(100vw * 22 / 375);
}

.second-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 10 / 812);
  width: calc(100% - calc(100vh * 40 / 812));
  margin: calc(100vh * 44 / 812) 0 0;
}

.label {
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 28.96 / 375);
  color: rgba(255, 255, 255, 1);
}

.input-box {
  width: 100%;
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: rgba(42, 42, 42, 1);
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 20 / 375);
  box-sizing: border-box;
}

.input-box input {
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  background: transparent;
}

.input-box input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.third-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 10 / 812);
  width: calc(100% - calc(100vh * 40 / 812));
  margin-top: calc(100vh * 20 / 812);
}

.about-me-box {
  height: calc(100vh * 111 / 812);
}

.about-me-box textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  letter-spacing: 0;
  color: #000;
  background: transparent;
  padding: calc(100vh * 16 / 812) 0; /* top-left padding */
  box-sizing: border-box;
}

.fourth-section {
  margin: calc(100vh * 143 / 812) 0 calc(100vh * 34 / 812);
  display: flex;
  justify-content: center;
  width: 100%;
}

.save-btn {
  width: calc(100vw * 229 / 375);
  height: calc(100vh * 62 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: radial-gradient(54.89% 50% at 50.212765957446805% 0%, rgba(255, 213, 0, 0.4) 0%, rgba(255, 213, 0, 0) 100%), rgba(255, 71, 96, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.01 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}
</style>