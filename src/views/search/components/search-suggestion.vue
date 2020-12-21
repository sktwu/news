<template>
  <div>
    <van-cell
      v-for="(str, index) in suggestions"
      :key="index"
      :title="str"
      icon="search"
    />
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";

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
      async handler() {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>