<template>
    <div class="search-container">
        <!-- 搜索栏 -->
        <form action="/" class="search-form">
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
                background="#3296fa" @focus="isResultShow = false" />
        </form>
        <!-- /搜索栏 -->

        <!-- 搜索结果 -->
        <SearchResult v-if="isResultShow" :searchText="searchText" />
        <!-- /搜索结果 -->

        <!-- 联想建议 -->
        <SearchSuggestion v-else-if="searchText" :searchText="searchText" @search="onSearch" />
        <!-- /联想建议 -->

        <!-- 搜索历史记录 -->
        <SearchHistory v-else :searchHistories="searchHistories" @clear-search-histories="searchHistories = []"
            @search="onSearch" />
        <!-- /搜索历史记录 -->




    </div>
</template>
<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage';
export default {
    name: 'SearchIndex',
    components: {
        SearchHistory,
        SearchSuggestion,
        SearchResult
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            searchText: '',
            isResultShow: false, // 控制搜索结果的展示
            searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据
        }
    },
    computed: {

    },
    watch: {
        searchHistories(value) {
            setItem('TOUTIAO_SEARCH_HISTORIES', value)
        }
    },
    mounted() {

    },
    methods: {
        onSearch(val) {
            // 更新文本框内容
            this.searchText = val

            // 存储搜索历史记录
            // 要求：不要有重复历史记录、最新的排在最前面
            const index = this.searchHistories.indexOf(val) // indexOf搜索指定数据的索引，有就返回指定索引，没有返回-1
            if (index !== -1) {
                this.searchHistories.splice(index, 1)
            }
            this.searchHistories.unshift(val)

            // 渲染搜索结果
            this.isResultShow = true
        },
        onCancel() {
            this.$router.back()
        }
    }
};
</script>
<style lang='less' scoped>
.search-container {

    padding-top: 108px;

    .van-search__action {
        color: #fff;
    }

    .search-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>