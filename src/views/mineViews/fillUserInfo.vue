<template>
    <div class="page">
        <div class="top">
            <BackButton />
        </div>
        <div class="content">
            <div class="useravator" @click="chooseAvatar">
                <div class="avator">
                    <div class="avator-img" :style="{ backgroundImage: `url(${avatarPreview})` }"></div>
                </div>
                <div class="camera">
                    <div class="camera-img"></div>
                </div>
                <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    style="display:none"
                    @change="onFileChange"
                />
            </div>

            <div class="field-group">
                <div class="text">Name</div>
                <div class="input-box">
                    <input v-model="name" type="text" placeholder="Please enter" />
                </div>
            </div>

            <div class="field-group">
                <div class="text">Birthday</div>
                <div class="input-box">
                    <input v-model="birthday" type="text" placeholder="Please enter" />
                </div>
            </div>

            <div class="field-group">
                <div class="text">Region</div>
                <div class="input-box">
                    <input v-model="location" type="text" placeholder="Please enter" />
                </div>
            </div>

            <div class="field-group">
                <div class="text">Gender</div>
                <div class="gender">
                    <div
                        class="gender-option"
                        :class="{ active: isgender === 1 }"
                        @click="isgender = 1"
                    >
                        Male
                    </div>
                    <div
                        class="gender-option"
                        :class="{ active: isgender === 0 }"
                        @click="isgender = 0"
                    >
                        Female
                    </div>
                </div>
            </div>
        </div>
        <div class="btn" @click="handleSave">SAVE</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { goBackOrClose } from '@/utils/iosBridge'
import { useUIStore } from '@/stores/ui'
import BackButton from '@/components/back.vue'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUserStore } from '@/stores/user'
import { uploadSingleImage } from '@/utils/ossUpload'

const name = ref('')
const birthday = ref('')
const location = ref('')
const isRotatedbirthday = ref(false)
const isRotatedlocation = ref(false)
const isgender = ref(1)
const uiStore = useUIStore()
const avatarFile = ref(null)
const fileInput = ref(null)
const currentUserStore = useCurrentUserStore()
const userStore = useUserStore()
const avatarPreview = ref(currentUserStore.currentUser.avator)

const chooseAvatar = () => {
  fileInput.value?.click()
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  avatarFile.value = file

  const reader = new FileReader()
  reader.onload = (ev) => {
    avatarPreview.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

const handleSave = async () => {
  if (!name.value.trim()) {
    uiStore.showToast('Please enter name')
    return
  }

  if (!isValidBirthday(birthday.value)) {
    uiStore.showToast('Birthday format (YYYY-MM-DD)')
    return
  }

  if (!location.value.trim()) {
    uiStore.showToast('Please enter location')
    return
  }

  if (uiStore.loading) return
  uiStore.showLoading()

  let avatarUrl = avatarPreview.value

  try {
    // ✅ 上传头像（如果有）
    if (avatarFile.value) {
      avatarUrl = await uploadSingleImage(
        avatarFile.value,
        'template_development'
      )
    }

    const delay = avatarFile.value
      ? 0
      : Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      userStore.updateUser(currentUserStore.currentUser.userId, {
        avator: avatarUrl,
        name: name.value,
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
const toggleRotatebirthday = () => {
    isRotatedbirthday.value = !isRotatedbirthday.value
}
const toggleRotatelocation = () => {
    isRotatedlocation.value = !isRotatedlocation.value
}
const isValidBirthday = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return false
    const trimmed = dateStr.trim()
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(trimmed)) return false
    const parts = trimmed.split('-')
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)
    if (month < 1 || month > 12) return false
    if (day < 1 || day > 31) return false
    if (month === 2) {
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
        if (day > (isLeap ? 29 : 28)) return false
    }
    if ([4, 6, 9, 11].includes(month) && day > 30) return false
    return true
}
</script>

<style scoped>
.page{
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    padding: calc(100vh * 55 / 812) calc(100vw * 16 / 375) calc(100vh * 35 / 812);
    box-sizing: border-box;
    overflow: hidden;
}

.top{
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-shrink: 0;
}

.content{
    flex: 1;
    overflow-y: auto;
    padding: calc(100vh * 20 / 812) 0 calc(100vh * 10 / 812);
}

.useravator{
    position: relative;
    width: fit-content;
    margin: 0 auto;
}
.avator{
    width: calc(100vw * 80 / 375);
    height: calc(100vw * 80 / 375);
    border-radius: 50%;
    padding: calc(100vw * 2 / 375);
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.1) 100%);
}
.avator-img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-color: rgba(42, 42, 42, 1);
}
.camera{
    position: absolute;
    right: calc(100vw * -2 / 375);
    bottom: 0;
    width: calc(100vw * 28 / 375);
    height: calc(100vw * 28 / 375);
    border-radius: 50%;
    background: linear-gradient(180deg, rgba(255, 71, 96, 1) 0%, rgba(255, 98, 78, 1) 100%);
    box-shadow: 0 0 calc(100vw * 24 / 375) rgba(255, 213, 0, 0.24);
    display: flex;
    justify-content: center;
    align-items: center;
}
.camera::before{
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at 50% -30%, rgba(255, 213, 0, 0.85) 0%, rgba(255, 213, 0, 0) 75%);
}
.camera-img{
    position: relative;
    z-index: 1;
    width: calc(100vw * 22 / 375);
    height: calc(100vw * 22 / 375);
    background-image: url('@/assets/cameraicon.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.field-group{
    margin-top: calc(100vh * 20 / 812);
}

.field-group:first-of-type{
    margin-top: calc(100vh * 32 / 812);
}

.text{
    margin-bottom: calc(100vh * 12 / 812);
    font-family: 'JetBrainsMono', sans-serif;
    font-size: calc(100vw * 16 / 375);
    font-weight: 700;
    line-height: 1.3;
    color: rgba(255, 255, 255, 1);
}

.input-box {
  width: 100%;
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: rgba(42, 42, 42, 1);
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 16 / 375);
  box-sizing: border-box;
}
.input-box input {
  width: 100%;
  border: none;
  outline: none;
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: 1.3;
  color: rgba(255, 255, 255, 1);
  background: transparent;
}
.input-box input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.gender{
    width: 100%;
    display: flex;
    align-items: center;
    gap: calc(100vw * 15 / 375);
}

.gender-option{
    flex: 1;
    height: calc(100vh * 50 / 812);
    border-radius: calc(100vw * 25 / 375);
    background: rgba(42, 42, 42, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrainsMono', sans-serif;
    font-size: calc(100vw * 14 / 375);
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    transition: all 0.2s ease;
}

.gender-option.active{
    background:
        radial-gradient(circle at 50% -42%, rgba(255, 213, 0, 0.95) 0%, rgba(255, 213, 0, 0) 72%),
        linear-gradient(180deg, rgba(255, 71, 96, 1) 0%, rgba(255, 98, 78, 1) 100%);
    box-shadow: 0 calc(100vh * 8 / 812) calc(100vw * 24 / 375) rgba(255, 71, 96, 0.25);
}

.btn{
    width: calc(100vw * 235 / 375);
    height: calc(100vh * 54 / 812);
    border-radius: calc(100vw * 27 / 375);
    margin: calc(100vh * 20 / 812) auto 0;
    background:
        radial-gradient(circle at 50% -38%, rgba(255, 213, 0, 0.95) 0%, rgba(255, 213, 0, 0) 72%),
        linear-gradient(180deg, rgba(255, 71, 96, 1) 0%, rgba(255, 98, 78, 1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrainsMono', sans-serif;
    font-size: calc(100vw * 18 / 375);
    font-weight: 700;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 1);
    flex-shrink: 0;
    box-shadow: 0 calc(100vh * 10 / 812) calc(100vw * 28 / 375) rgba(255, 71, 96, 0.24);
}

.input-box-img {
    width: calc(100vw * 20 / 375);
    height: calc(100vw * 20 / 375);
    background-image: url('@/assets/augrmtwijijxojep.png');
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease;
}
.input-box-img.rotated {
    transform: rotate(180deg);
}

@media (max-height: 700px) {
    .page{
        padding-top: calc(100vh * 32 / 812);
        padding-bottom: calc(100vh * 24 / 812);
    }

    .field-group:first-of-type{
        margin-top: calc(100vh * 24 / 812);
    }
}
</style>
