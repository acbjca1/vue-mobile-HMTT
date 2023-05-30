<template>
    <van-icon :color="value === 1 ? '#e5645f' : '#777'" :name="value === 1 ? 'good-job' : 'good-job-o'"
        :loading="loading" @click="onCollect" />
</template>
<script>
import { addLike, deleteLike } from '@/api/article'
export default {
    name: 'LikeArticle',
    components: {

    },
    mixins: [],
    props: {
        value: {
            type: Number,
            required: true
        },
        articleId: {
            type: [Number, String, Object],
            required: true
        }
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        async onCollect() {
            this.loading = true
            try {
                let status = -1
                if (this.value === 1) {
                    // 已经点赞，取消点赞
                    await deleteLike(this.articleId)
                } else {
                    // 没有点赞，添加点赞
                    await addLike(this.articleId)
                    status = 1
                }
                // 更新视图
                this.$emit('input', status)
                this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
            } catch (err) {
                let message = '操作失败，请重试'
                if (err.response && err.response.status === 401) {
                    message = '亲，要先登录喔'
                }
                this.$toast.fail(message)
            }
            this.loading = false
        }
    }
};
</script>
<style lang='' scoped>
</style>