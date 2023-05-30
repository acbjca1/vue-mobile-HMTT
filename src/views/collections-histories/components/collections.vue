<template>
    <div class="collections">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ArticleItem v-for="(article, index) in list" :key="index" :article="article"></ArticleItem>
        </van-list>
    </div>
</template>
<script>
import { getCollections } from '@/api/user'
import ArticleItem from '@/components/article-item'
export default {
    name: 'Collections',
    components: {
        ArticleItem
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            per_page: 10
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
                const { data } = await getCollections({
                    page: this.page,
                    per_page: this.per_page
                })
                // 2.将数据加载到列表中
                const { results } = data.data
                this.list.push(...results)
                // 3.将loading设置为false
                this.loading = false
                // 4.判断是否还有数据
                if (results.length) {
                    this.page++
                } else {
                    this.finished = true
                }
            } catch (err) {
                this.loading = false
                this.$toast.fail('获取数据失败，请重试')
            }

        }
    }
};
</script>
<style lang='less' scoped>
.collections {
    position: fixed;
    left: 0;
    right: 0;
    top: 180px;
    bottom: 0;
    overflow-y: auto;
}
</style>