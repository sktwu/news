<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!-- prop数据如果是引用类型可以修改但是prop数据不能重新赋值 
             想重新赋值要让父组件修改
        -->
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onDelete(index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
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
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    onDelete(index) {
      // 处于删除状态，删除历史记录
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
        return;
      }
      // 非删除状态则搜索
      this.$emit("search", this.searchHistories[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>