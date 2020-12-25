<template>
  <div>
    <van-cell title="搜索历史">
      <div>
        <span>全部删除</span>
        <span>完成</span>
      </div>
      <van-icon name="delete" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
    >
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistories: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>