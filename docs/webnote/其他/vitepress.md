# vitepress个人博客



## 评论功能

### giscus

需要到官网设置配置，最后复制他的代码

https://giscus.app/zh-CN

#### 条件

![image-20230813154604534](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202308131546982.png)



##### 1 开启discussions

https://docs.github.com/en/discussions/quickstart

仓库 setting 滚动到feature 

##### 2 安装giscus app

https://github.com/apps/giscus

后面维护设置在这里 个人 setting Application

##### 3 输入用户名/仓库名

##### 4 启用 giscus

![image-20230813155344040](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202308131553343.png)

#### vitrepress中使用

##### 3 Comments.vue

```
<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'
const { isDark } = useData()
</script>

<template>
  <div>
    <Giscus
      id="comments"
      repo="youname/repo_name"
      repo-id="xxxxxxxxxxxxxxxxxxxxxxxxx="
      category="Announcements"
      category-id="xxxxxxxxxxxxxxxxxxx"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      lang="zh-CN"
      :theme="isDark ? 'dark_dimmed' : 'noborder_light'"
    />
  </div>
</template>

```

##### 4 插入layout

```
<template #doc-after>
      <Comments />
</template>
```

### gitalk

https://www.npmjs.com/package/gitalk

```javascript
<template>
  <div id="comment-container"></div>
</template>

<script lang="ts" setup>
  const { page } = useData();
  onMounted(() => {
      let gitalk;
      if (type.value && type.value == 'gitalk') {
        gitalk = new Gitalk({
          clientID: '1de126ce1fbdbe049709',
          clientSecret: '035fe49874a43e5cefc28a99b7e40b1925319c62',
          repo: 'charles7c.github.io',
          owner: 'Charles7c',
          admin: ['Charles7c'],
          id: md5(page.value.relativePath),
          language: 'zh-CN',
          distractionFreeMode: false,
          // 默认: https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token
          proxy: 'https://vercel.charles7c.top/github_access_token',
        });
      }
      gitalk.render('comment-container')
  })
</script>
```







##  



