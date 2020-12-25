<template>
  <div>
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
        show-action
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 历史记录 -->
    <search-history v-else :search-histories="searchHistories" />
  </div>
</template>

<script>
import SearchSuggestion from "./components/search-suggestion";
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";
import { setItem, getItem } from "@/utils/storage";
import { getSearchHistories } from "@/api/search";
import { mapState } from "vuex";

export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      // 展示搜索结果的控制变量
      isResultShow: false,
      // 搜索历史
      searchHistories: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadSearchHistories();
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      const index = this.searchHistories.indexOf(searchText);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(searchText);
      setItem("search-histories", this.searchHistories);
      this.isResultShow = true;
    },
    async loadSearchHistories() {
      let localHistories = getItem("search-histories") || [];
      if (this.user) {
        const { data } = await getSearchHistories();
        localHistories = [
          ...new Set([...localHistories, ...data.data.keywords]),
        ];
      }
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