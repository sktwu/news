<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button type="danger" size="mini" plain round>编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in editChannels"
        :key="index"
        :text="value.name"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in recommendChannels"
        :key="index"
        :text="value.name"
        @click="onAdd(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channel";

export default {
  name: "ChannelEdit",
  props: {
    editChannels: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [],
    };
  },
  computed: {
    // 推荐频道列表
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        // 判断channel是否属于用户频道
        return !this.editChannels.find((editChannel) => {
          return editChannel.id === channel.id;
        });
      });
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    onAdd(channel) {
      this.editChannels.push(channel);
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
    }
  }
}
</style>