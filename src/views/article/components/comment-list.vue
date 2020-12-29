<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(comment, index) in list"
        :key="index"
        :title="comment.content"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from "@/api/comment";

export default {
  name: "CommentList",
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: "a",
        source: this.source,
        offset: this.offset,
        limit: this.limit,
      });
      const { results } = data.data;
      this.list.push(...results);
      this.loading = false;
      if (results.length) {
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>