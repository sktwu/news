<template>
  <div>
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
        show-action
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" />
    <!-- 历史记录 -->
    <search-history v-else />
  </div>
</template>

<script>
import SearchSuggestion from "./components/search-suggestion";
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";

export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      // 展示搜索结果的控制变量
      isResultShow: false,
    };
  },
  methods: {
    onSearch() {
      this.isResultShow = true;
    },
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },
};
</script>

<style lang="scss" scoped>
</style>