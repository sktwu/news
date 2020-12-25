<template>
  <div>
    <van-cell
      v-for="(str, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', str)"
    >
      <div v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";

export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      }, 1000),
      immediate: true,
    },
  },
  methods: {
    highlight(str) {
      // 正则表达式的构造函数，参数1：字符串，参数2：匹配规则，返回值：正则对象
      return str.replace(
        new RegExp(this.searchText, "gi"),
        `<span style="color:red">${this.searchText}</span>`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>