/**
 * PostCSS是基于Nodejs运行的一个处理css的工具
 */
module.exports = {
  plugins: {
    // 自动配置浏览器前缀,用来兼容不同的浏览器,这个脚手架已经配置过了
    /* autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    }, */
    //自动将将px转换为rem，行内样式不转换
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};