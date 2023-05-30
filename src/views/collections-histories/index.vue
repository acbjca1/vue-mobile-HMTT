<template>
    <div class="collections-histories">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="收藏/历史" left-arrow @click-left="$router.back()" />
        <!-- /导航栏 -->

        <!-- 列表 -->
        <van-tabs color="#3296fa" title-active-color="#3296fa" class="van-tabs" v-model="active">
            <van-tab title="我的收藏">
                <Collections />
            </van-tab>
            <van-tab title="我的历史">
                <Histories />
            </van-tab>
        </van-tabs>
        <!-- /列表 -->
    </div>
</template>
<script>
import Collections from './components/collections.vue'
import Histories from './components/histories.vue'
export default {
    name: 'collections-histories',
    components: {
        Collections,
        Histories
    },

    mixins: [],
    props: {

    },
    data() {
        return {
            active: this.$route.query.active
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>
<style lang='less' scoped>
.collections-histories {
    /deep/.van-tabs {
        .van-tabs__line {
            width: 132px !important;
        }
    }

}
</style>