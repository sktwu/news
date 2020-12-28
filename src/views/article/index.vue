<template>
  <div class="article-container">
    <van-nav-bar class="app-nav-bar" left-arrow @click-left="$router.back()" />
    <h1 class="title">标题</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">天涯小行客</div>
      <van-image
        class="avator"
        slot="icon"
        width="35"
        height="35"
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="label" class="pubdate">14小时前</div>
      <van-button round size="small" type="info" class="follow-btn" icon="plus">
        关注</van-button
      >
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleIndex",
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
};
</script>le

<style lang="less" scoped>
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avator {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
</style>