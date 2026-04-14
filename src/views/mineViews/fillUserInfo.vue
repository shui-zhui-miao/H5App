<template>
    <div class="page">
        <div class="top">
            <BackButton />
        </div>
        <div class="useravator" @click="chooseAvatar">
            <div class="avator" >
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
        <div class="text">NAME</div>
        <div class="input-box">
            <input v-model="name" type="text" placeholder="Please enter" />
        </div>
        <div class="text">BIRTHDAY</div>
        <div class="input-box">
            <input v-model="birthday" type="text" placeholder="2001-01-01" />
            <!-- <div class="input-box-img" :class="{ rotated: isRotatedbirthday }" @click="toggleRotatebirthday"></div> -->
        </div>
        <div class="text">LOCATION</div>
        <div class="input-box">
            <input v-model="location" type="text" placeholder="Please enter" />
            <!-- <div class="input-box-img" :class="{ rotated: isRotatedlocation }" @click="toggleRotatelocation"></div> -->
        </div>
        <div class="text">GENDER</div>
        <div class="gender">
            <div v-if="isgender===1" class="isgender-box isgender-man">
                <div class="isgender-box-img isgender-man-img"></div>
                <div class="isgender-text">Male</div>
            </div>
            <div v-else class="gender-box gender-man" @click="isgender=1">
                <div class="gender-box-img gender-man-img"></div>
                <div class="gender-text">Male</div>
            </div>
            <div v-if="isgender===0" class="isgender-box isgender-woman">
                <div class="isgender-box-img isgender-woman-img"></div>
                <div class="isgender-text">Female</div>
            </div>
            <div v-else class="gender-box gender-woman" @click="isgender=0">
                <div class="gender-box-img gender-woman-img"></div>
                <div class="gender-text">Female</div>
            </div>
        </div>
        <div class="btn" @click="handleSave">SAVE</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { clearAndNavigateTo,goBackOrClose } from '@/utils/iosBridge'
import { useUIStore } from '@/stores/ui'
import BackButton from '@/components/back.vue'
import avatarIcon from '@/assets/avataricon.png'
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
const avatarPreview = ref(avatarIcon)
const fileInput = ref(null)
const currentUserStore = useCurrentUserStore()
const userStore = useUserStore()

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
    // uiStore.showToast('Updated failed, please check your network.')
    uiStore.showToast(e)
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
    height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    /* background: #000; */
}

.top{
    width: 100vw;
    box-sizing: border-box;
    padding: calc(100vh * 55 / 812) calc(100vw * 20 / 375) 0 calc(100vw * 20 / 375);
    display: flex;
    justify-content: start;
    align-items: center;
}

.useravator{
    position: relative;
}
.avator{
    width: calc(100vw * 80 / 375);
    height: calc(100vw * 80 / 375);
    border-radius: 50%;
    background: #fff;
    box-sizing: border-box;
    padding: calc(100vw * 1 / 375);
    
}
.avator-img{
    width: calc(100vw * 78 / 375);
    height: calc(100vw * 78 / 375);
    border-radius: 50%;
    background-size: cover;
    background-position: center;
}
.camera{
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100vw * 28 / 375);
    height: calc(100vw * 28 / 375);
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.camera-img{
    width: calc(100vw * 20 / 375);
    height: calc(100vw * 20 / 375);
    background-image: url('@/assets/cameraicon.png');
    background-size: cover;
    background-position: center;
}

.text{
    width: 100vw;
    box-sizing: border-box;
    padding-left: calc(100vw * 20 / 375);
    margin: calc(100vh * 20 / 812) 0 calc(100vh * 10 / 812) 0;
    font-family: 'JetBrainsMono', sans-serif;
    font-size: calc(100vw * 20 / 375);
    font-weight: 700;
    line-height: calc(100vw * 24.8 / 375);
    color: rgba(237, 228, 255, 1);
}

.input-box {
  width: calc(100vw * 335 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(calc(100vw * 12 / 375));
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 14 / 375);
  box-sizing: border-box;
}
.input-box input {
  width: 100%;
  border: none;
  outline: none;
  font-family: 'JetBrainsMono', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  letter-spacing: 0;
  color: rgba(39, 36, 79, 1);
  background: transparent;
}
.input-box input::placeholder {
  color: rgba(39, 36, 79, 0.7);
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

.gender{
    width: calc(100vw * 355 / 375);
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: calc(100vw * 20 / 375);
    margin-top: calc(100vh * 10 / 812);
    gap: calc(100vw * 25 / 375);
}
.gender-box{
    width: calc(100vw * 147 / 375);
    height: calc(100vh * 66 / 812);
    border-radius: calc(100vw * 20 / 375);
    box-sizing: border-box;
    padding: calc(100vh * 9 / 812) calc(100vw * 15 / 375) calc(100vh * 9 / 812) calc(100vw * 15 / 375);
    display: flex;
    justify-content: space-between;
    align-items: self-end;
}
.gender-box-img{
    width: calc(100vw * 48 / 375);
    height: calc(100vw * 48 / 375);
    background-size: cover;
    background-position: center;
}
.gender-text{
    font-family: 'JetBrainsMono', sans-serif;
    font-size: calc(100vw * 14 / 375);
    font-weight: 700;
    line-height: calc(100vw * 17.36 / 375);
    color: rgba(0, 0, 0, 0.27);
}
.gender-man{
    background: rgba(234, 244, 255, 1);
}
.gender-man-img{
    background-image: url('@/assets/mnhootijafylujzm.png');
}
.gender-woman{
    background: rgba(252, 237, 249, 1);
}
.gender-woman-img{
    background-image: url('@/assets/srgjbuxntegixvbm.png');
}
.isgender-box{
    width: calc(100vw * 147 / 375);
    height: calc(100vh * 66 / 812);
    border-radius: calc(100vw * 20 / 375);
    box-sizing: border-box;
    padding: calc(100vh * 9 / 812) calc(100vw * 15 / 375) calc(100vh * 9 / 812) calc(100vw * 15 / 375);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.isgender-box-img{
    width: calc(100vw * 79 / 375);
    height: calc(100vw * 92 / 375);
    background-size: cover;
    background-position: center;
}
.isgender-man-img{
    background-image: url('@/assets/onjgvnnbwzpsvstk.png');
}
.isgender-woman-img{
    background-image: url('@/assets/tseetbcbvryhzdzi.png');
}
.isgender-man{
    background: rgba(234, 244, 255, 1);
    border: calc(100vw * 1 / 375) solid rgba(103, 114, 251, 1);
}
.isgender-woman{
    background: rgba(252, 237, 249, 1);
    border: calc(100vw * 1 / 375) solid rgba(252, 129, 207, 1);
}
.isgender-text{
    font-family: 'JetBrainsMono', sans-serif;
    font-size: calc(100vw * 14 / 375);
    font-weight: 700;
    line-height: calc(100vw * 17.36 / 375);
    color: rgba(0, 0, 0, 1);
}

.btn{
    width: calc(100vw * 229 / 375);
    height: calc(100vh * 62 / 812);
    border-radius: calc(100vw * 31 / 375);
    margin-top: calc(100vh * 70 / 812);
    background: linear-gradient(90deg, rgba(181, 158, 255, 1) 0.32%, rgba(127, 83, 255, 1) 99.69%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrainsMono', sans-serif;
    font-size: calc(100vw * 20 / 375);
    font-weight: 700;
    line-height: calc(100vw * 24.8 / 375);
    color: rgba(255, 255, 255, 1);
}
</style>