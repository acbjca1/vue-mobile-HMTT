<template>
    <van-button class="follow-btn" round size="small" v-if="isFollowed" @click="onFollow"
        :loading="loading">已关注</van-button>
    <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-else @click="onFollow"
        :loading="loading">关注</van-button>
</template>
<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
    name: 'FollowUser',
    components: {

    },
    mixins: [],
    props: {
        isFollowed: {
            type: Boolean,
            required: true
        },
        userId: {
            type: [String, Number, Object],
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
        async onFollow() {
            this.loading = true // 展示关注按钮的loading 状态
            try {
                if (this.isFollowed) {
                    // 已关注，取消关注
                    await deleteFollow(this.userId)
                    // console.log(data);
                } else {
                    // 没有关注，添加关注
                    await addFollow(this.userId)
                    // console.log(data);
                }
                // 更新视图状态
                // this.article.is_followed = !this.article.is_followed
                this.$emit('update-is_followed', !this.isFollowed)
            } catch (err) {
                let message = '操作失败，请重试'
                if (err.response && err.response.status === 400) {
                    message = '你不能关注你自己'
                }
                if (err.response && err.response.status === 401) {
                    message = '亲，要先登录喔'
                }
                this.$toast(message)
            }
            this.loading = false // 关闭关注按钮的loading 状态

        }
    }
};
</script>
<style lang='less' scoped>

</style>