<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell class="base-info" center :border="false">
        <van-image
          round
          class="avatar"
          fit="cover"
          slot="icon"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{ currentUser.name }}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="select-info" :border="false">
        <van-grid-item class="select-info-item" text="文字">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="select-info-item" text="文字">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="select-info-item" text="文字">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="select-info-item" text="文字">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div @click="$router.push('/login')">
        <img class="mobile" src="" alt="" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav-grid mb" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="icon"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="icon"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mb" title="人工智障" is-link to="" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
      center
    ></van-cell>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrentUser } from "@/api/user";

export default {
  name: "MyIndex",
  data() {
    return {
      currentUser: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadCurrentUser();
  },
  methods: {
    onLogout() {
      // 提示用户是否确认退出登录
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "你确定要退出登录吗？",
        })
        .then(() => {
          // 确认退出，清楚登录状态
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async loadCurrentUser() {
      const { data } = await getCurrentUser();
      this.currentUser = data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url("../../assets/img/3.jpg") no-repeat;
    .base-info {
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      box-sizing: border-box;
      background-color: unset;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
        box-sizing: border-box;
      }

      .name {
        color: #fff;
        font-size: 15px;
      }

      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }

    .select-info {
      .select-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .icon {
        font-size: 22px;
      }

      .icon-shoucang {
        color: #eb5453;
      }

      .icon-lishi {
        color: #ff9d1d;
      }

      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .logout-cell {
    color: #d86262;
    text-align: center;
  }

  .mb {
    margin-bottom: 4px;
  }

  .not-login {
    height: 180px;
    background: url("../../assets/img/3.jpg") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      height: 66px;
      width: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>