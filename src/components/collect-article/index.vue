<template>
    <van-icon :color="value ? '#ffa500' : '#777'" :name="value ? 'star' : 'star-o'" :loading="loading"
        @click="onCollect" />
</template>
<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
    name: 'CollectArticle',
    components: {

    },
    mixins: [],
    props: {
        value: {
            type: Boolean,
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
                if (this.value) {
                    // 已经收藏，取消收藏
                    await deleteCollect(this.articleId)
                } else {
                    // 没有收藏，添加收藏
                    await addCollect(this.articleId)
                }
                // 更新视图
                this.$emit('input', !this.value)
                this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
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
<style lang='less' scoped>

</style>