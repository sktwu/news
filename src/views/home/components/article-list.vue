<template>
  <div class="article-articles">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccess"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item/index";

export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      // 下一页数据的时间戳
      timestamp: null,
      isLoading: false,
      // 下拉刷新的提示
      refreshSuccess: "",
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 1.请求数据
      const { data } = await getArticles({
        // 频道id
        channel_id: this.channel.id,
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        timestamp: this.timestamp || Date.now(),
        // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        with_top: 1,
      });
      // 2.数据放入articles数组中
      this.articles.push(...data.data.results);
      // 3.设置本次加载状态结束，它才可以接着加载下一次
      this.loading = false;
      // 4.更新获取下一页数据
      if (data.data.results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp;
      } else {
        // 没有数据了，不在加载
        this.finished = true;
      }
    },
    async onRefresh() {
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      // 2.把数据放到数据列表中（往顶部追加）
      this.articles.unshift(...data.data.results);
      // 3.关闭刷新状态
      this.isLoading = false;

      this.refreshSuccess = `更新了${data.data.results.length}条数据`;
    },
  },
  components: {
    ArticleItem,
  },
};
</script>

<style lang="less" scoped>
.article-articles {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>