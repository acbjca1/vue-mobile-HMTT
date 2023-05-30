<template>
    <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error="error"
            error-text="加载失败，请点击重试" :immediate-check="false">
            <CommentItem v-for="(item, index) in list" :key="index" :comment="item"
                @reply-click="$emit('reply-click', $event)" />
        </van-list>
    </div>
</template>
<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
    name: 'CommentList',
    components: {
        CommentItem
    },
    mixins: [],
    props: {
        source: {
            type: [Number, String, Object],
            required: true
        },
        list: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            // 自定义 Prop 数据验证
            validator(value) {
                return ['a', 'c'].includes(value)
            },
            default: 'a'
        }
    },
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null, // 获取下一页数据的标记
            limit: 10,
            error: false
        }
    },
    created() {
        // 当你手动初始 onLoad 的话，它不会自动开始初始的 loading
        // 所以我们要手动的开启初始 loading
        this.loading = true
        this.onLoad()
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        async onLoad() {
            try {
                // 1.请求获取数据
                const { data } = await getComments({
                    type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                    source: this.source, // 源id，文章id或评论id
                    offset: this.offset, // 	获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    limit: this.limit// 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
                })
                // 2.将数据加载到列表中
                const { results } = data.data
                this.list.push(...results)

                // 把文章评论总数量传递到外部
                this.$emit('onload-success', data.data)
                // 3.将 loading 设置为 false
                this.loading = false
                // 4.判断是否还有数据
                if (results.length) {
                    // 有就更新获取下一页的数据页码
                    this.offset = data.data.last_id
                } else {
                    // 没有就将 finished 设置为结束
                    this.finished = true
                }
            } catch (err) {
                this.error = true,
                    this.loading = false
            }

        }
    }
};
</script>
<style lang='' scoped>
</style>