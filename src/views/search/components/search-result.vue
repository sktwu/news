<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from "@/api/search";

export default {
  name: "SearchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      const { data } = await getSearchResults({
        // 页码
        page: this.page,
        // 每页大小
        per_page: this.per_page,
        // 查询字段
        q: this.searchText,
      });
      const { results } = data.data;
      this.list.push(...results);
      this.loading = false;
      if (results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>