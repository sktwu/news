/**
 * dayjs相关配置
 */
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 配置中文语言包
dayjs.locale('zh-cn');

// 配置处理相对时间
dayjs.extend(relativeTime);

// 处理相对时间的代码封装为全局过滤器
Vue.filter('relativeTime', time => {
  return dayjs(time).from(dayjs());
})