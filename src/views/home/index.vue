<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        size="small"
        round
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 文章文类列表 标签页组件有一个功能，只有你第一查看的时候才渲染-->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="channelShow = true" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
      v-model="channelShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :edit-channels="channels"
        :active="active"
        @close="channelShow = false"
        @updateActive="onUpdateActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";

export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 2,
      // 频道列表
      channels: [],
      channelShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      let channels = [];
      if (this.user) {
        const { data } = await getUserChannels();
        channels = data.data.channels;
      } else {
        let localChannels = getItem("user-channels");
        if (localChannels) {
          channels = localChannels;
        } else {
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }
      }
      this.channels = channels;
    },
    onUpdateActive(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-button__text {
      font-size: 14px;
    }
    .van-icon {
      font-size: 16px;
    }
  }
  .channel-tabs {
    /deep/ .van-tabs__line {
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
  .channel-edit-popup {
    height: 100%;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    opacity: 0.9;
    background-color: #fff;
    display: flex;
    justify-items: center;
    align-items: center;
    .van-icon {
      font-size: 24px;
    }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
}
</style>