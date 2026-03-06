import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
    const loading = ref(false)
    const toastMessage = ref('')

    function showLoading() {
        loading.value = true
    }

    function hideLoading() {
        loading.value = false
    }

    function showToast(message, duration = 1500) {
        toastMessage.value = message
        setTimeout(() => { toastMessage.value = '' }, duration)
    }

    return {
        loading,
        showLoading,
        hideLoading,
        toastMessage,
        showToast
    }
})