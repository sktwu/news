<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        size="mini"
        plain
        round
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(value, index) in editChannels"
        :key="index"
        :text="value.name"
        @click="onUserChannelClick(value, index)"
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
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  props: {
    editChannels: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
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
    ...mapState(["user"]),
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    async onAdd(channel) {
      this.editChannels.push(channel);
      // 数据持久化
      if (this.user) {
        // 已登录,数据存储到线上
        await addUserChannels({
          channels: [
            {
              id: channel.id,
              seq: this.editChannels.length,
            },
          ],
        });
      } else {
        // 未登录,数据存储到本地
        setItem("user-channels", this.editChannels);
      }
    },
    onUserChannelClick(value, index) {
      // 编辑状态，删除频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(value, index);
      } else {
        // 非编辑状态，切换频道
        this.switchChannel(index);
      }
    },
    async deleteChannel(value, index) {
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        this.$emit("updateActive", this.active - 1);
      }
      this.editChannels.splice(index, 1);
      // 数据持久化
      if (this.user) {
        // 已登录,数据存储到线上
        await deleteUserChannels(value.id);
      } else {
        // 未登录,数据存储到本地
        setItem("user-channels", this.editChannels);
      }
    },
    switchChannel(index) {
      // 切换频道
      this.$emit("updateActive", index);
      // 向父组件传递一个函数，父组件监听处理
      this.$emit("close");
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
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>