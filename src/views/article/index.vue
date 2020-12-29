<template>
  <div class="article-container">
    <van-nav-bar class="app-nav-bar" left-arrow @click-left="$router.back()" />
    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          class="avator"
          slot="icon"
          width="35"
          height="35"
          fit="cover"
          round
          :src="article.aut_photo"
        />
        <div slot="label" class="pubdate">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button
          round
          size="small"
          type="info"
          class="follow-btn"
          :icon="article.is_followed ? '' : 'plus'"
          :loading="isFollowLoading"
          @click="onFollow"
        >
          {{ article.is_followed ? "已关注" : "关注" }}</van-button
        >
      </van-cell>
      <div
        class="content .markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>
      <comment-list :source="articleId" />
    </div>
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>

<script>
import "@/assets/style/github-markdown.css";
import {
  getArticle,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike,
} from "@/api/article";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "@/api/user";
import CommentList from "./components/comment-list";

export default {
  name: "ArticleIndex",
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      isFollowLoading: false,
      isCollectLoading: false,
    };
  },
  components: {
    CommentList,
  },
  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      const { data } = await getArticle(this.articleId);
      this.article = data.data;

      // 数据改变影响视图更新不是立即的
      // 所以如果需要在修改数据之后马上操作被更改数据影响的DOM，需要把这个标签放到$nextTick中
      this.$nextTick(() => {
        this.PreviewImage();
      });
    },

    PreviewImage() {
      // 获取文章DOM容器，得到所有img标签，给img标签注册点击事件
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      let imgPaths = [];
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = function () {
          ImagePreview({
            // 预览图片路径列表
            images: imgPaths,
            // 起始位置
            startPosition: index,
          });
        };
      });
    },

    async onFollow() {
      this.isFollowLoading = true;
      if (this.article.is_followed) {
        // 已关注就取消关注
        await deleteFollow(this.article.aut_id);
      } else {
        // 未关注则关注
        await addFollow(this.article.aut_id);
      }
      this.article.is_followed = !this.article.is_followed;
      this.isFollowLoading = false;
    },

    async onCollect() {
      this.isCollectLoading = true;
      if (this.article.is_collected) {
        // 已收藏就取消收藏
        await deleteCollect(this.articleId);
      } else {
        // 未收藏则收藏
        await addCollect(this.articleId);
      }
      this.article.is_collected = !this.article.is_collected;
      this.isCollectLoading = false;
      this.$toast.success(`${this.article.is_collected ? "" : "取消"}收藏成功`);
    },

    async onLike() {
      this.isCollectLoading = true;
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId);
        this.article.attitude = -1;
      } else {
        await addLike(this.articleId);
        this.article.attitude = 1;
      }
      this.isCollectLoading = false;
      this.$toast.success(
        `${this.article.attitude === 1 ? "" : "取消"}点赞成功`
      );
    },
  },
};
</script>le

<style lang="less" scoped>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
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
ul {
  list-style: unset;
}
.content {
  padding: 14px;
  background-color: #fff;
}
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>