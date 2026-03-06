import { defineStore } from 'pinia'
import commentsData from '../data/comments.json'

export const useCommentsStore = defineStore('comment', {
    state: () => ({
        comment: commentsData,  // 初始化为本地 JSON
    }),
    actions: {
        getCommentsById(postId) {
            // 过滤出所有 dynamicId 匹配的评论
            const filtered = this.comment.filter(c => c.dynamicId == postId);
            // 倒序返回
            return filtered.reverse();
        },
    }
})