<template>
    <div class="article-list">
        <van-pull-refresh v-model="isreFreshLoading" :success-text="refreshSuccessText" :success-duration="1000"
            @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error"
                error-text="请求失败，点击重新加载">
                <ArticleItem v-for="(article, index) in list" :key="index" :article="article"></ArticleItem>
                <!-- <van-cell v-for="article in list" :key="article.art_id" :title="article.title" /> -->
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
    name: 'ArticleList',
    components: {
        ArticleItem
    },
    mixins: [],
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            list: [], // 存储列表数据的数组
            loading: false, // 控制加载中 loading状态 
            finished: false, // 控制数据加载结束的状态
            timestamp: null,// 请求获取下一页数据的时间戳
            error: false,// 控制列表加载失败的提示状态
            isreFreshLoading: false,// 控制下拉刷新的loading 状态
            refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
        }
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
                const { data } = await getArticles({
                    channel_id: this.channel.id,//频道ID
                    //timestamp 简单理解就是请求数据的页码
                    // 请求第一页的数据：当前最新时间戳
                    // 用于请求之后数据的时间戳会在当前请求结果中返回给你
                    timestamp: this.timestamp || Date.now()
                })
                // 报错模拟
                // if (Math.random() > 0.5) {
                //     JSON.parse('dhhsjajaja')
                // }
                // console.log(data);
                // 2.把请求结果数据放到list数组中
                const { results } = data.data
                // 数组的展开操作符，它会把数组元素一个一个拿出来
                this.list.push(...results)
                // 3.本次数据加载结束之后要把加载状态设置为结束
                this.loading = false
                // 4.判断数据是否全部加载完成
                if (results.length) {
                    // 更新获取下一页数据的时间戳
                    this.timestamp = data.data.pre_timestamp
                } else {
                    // 没有数据了，将 finished 设置为true，不再 load加载更多
                    this.finished = true
                }
            } catch (err) {
                // 展示错误提示状态
                this.error = true
                // 请求失败了，loading也需要关闭
                this.loading = false
            }

        },
        // 初始化或滚动到底部的时候会触发调用 onLoad
        // onLoad() {
        //     // 1.请求获取数据
        //     // 异步更新数据
        //     // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        //     setTimeout(() => {
        //         // 2.把请求结果数据放到list数组中
        //         for (let i = 0; i < 10; i++) {
        //             this.list.push(this.list.length + 1);
        //         }
        //         // 加载状态结束
        //         // 3.本次数据加载结束之后要把加载状态设置为结束
        //         // loading关闭后才能触发下一次加载更多
        //         this.loading = false;

        //         // 数据全部加载完成
        //         // 4.判断数据是否全部加载完成
        //         if (this.list.length >= 40) {
        //             // 如果没有数据，把finished设置为true，之后不能再触发加载更多
        //             this.finished = true;
        //         }
        //     }, 1000);
        // },
        // 当下拉刷新的时候会触发调用该函数
        async onRefresh() {
            try {
                const { data } = await getArticles({
                    channel_id: this.channel.id,//频道ID
                    timestamp: Date.now() // 下拉刷新，每次请求获取最新数据
                })
                // 2.将数据追加到列表顶部
                const { results } = data.data
                this.list.unshift(...results)
                // 3.关闭下拉刷新的loading状态
                this.isreFreshLoading = false
                // 更新下拉刷新成功提示的文本
                this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
            } catch (err) {
                this.isreFreshLoading = false
                this.refreshSuccessText = '刷新失败'
            }
        }
    },
}

</script>
<style lang='less' scoped>
.article-list {
    // 百分比单位是相对于父元素的
    height: 79vh;
    overflow-y: auto;
}
</style>