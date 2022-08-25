const ejs = require('ejs');
const path = require('path');
const log = require('hexo-log')({
  debug: false,
  silent: false
});

hexo.extend.generator.register('friends', async function (locals) {
  if (!this?.config?.friends?.enable) {
    return;
  }
  
  const contents = await ejs.renderFile(path.join(__dirname, 'templates/friends.ejs'), {
    friends: this.config?.friends
  }, { async: false });
  return {
    path: this.config?.friends?.path || ('friends/index.html'),
    data: {
      title: this.config.friends?.title ?? '友人帐',
      content: contents,
      ...this.config?.friends?.extra_options
    },
    layout: ['page', 'post']
  };
});
