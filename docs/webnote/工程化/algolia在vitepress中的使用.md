---
title: algolia在vitepress中的使用
author: xxxsjan
date: 2023/04/11 10:00
isTop: true
categories:
 - 工程化
tags:
 - vitepress
 - algolia
---

# algolia在vitepress中的使用



>  以vitepress为例说明

## 注册登录

首先官网https://www.algolia.com/ 注册登录，用github账户快速注册即可

## 进入设置

登录后，点击头像，setting（设置）

General下找到Applications，点击

## 创建应用

进入后，点击Create Application 

### 第一步

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111444987.png)

### 第二步



![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111445742.png)

### 第三步

勾选

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111446911.png)



创建成功

## 获取各种key

来到这个页面

点击 apikey进去

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111448320.png)



然后，看到几个关键信息

- indexName                   也就是前面创建的应用名称
- Application ID              就是appid
-  Search-Only API Key   类似 公钥 的东西，大家能看到
-  Admin API Key    类似私钥的东西，自己保管好，其实也不用保管，复制粘贴到github上管理就行，后面说

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111452311.png)

## 新建仓库密匙

主要是用来给github 的action用

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111501952.png)

新增两个密匙

- Name: API_KEY                         Secret: Search-Only API Key

- Name: APPLICATION_ID          Secret: Application ID     

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111508446.png)

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111506239.png)



## vitepress 配置 algolia

 docs/.vitepress/config    themeConfig

```
{
  // ....
  themeConfig:{
       algolia: {
        "appId": "xxxxxxxxxxxxx",  
        "apiKey": "xxxxxxxxxxxx",  
        "indexName": "xxxxxxxxxxxxxxxxx", 
        "placeholder": "请输入关键词",
        "buttonText": "搜索"
      }
  }
}

```

配置完成，页面就会有搜索的ui了

## 配置爬取配置文件

项目根目录创建crawlerConfig.json

index_name 对应的是 algolia之前创建的应用名

start_urls  是写你实际部署的域名地址，就是公网能访问的，因为是根据这个爬取数据

```
{
  "index_name": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "start_urls": ["https://xxxxxx.xxxxxxxxxxxxxxx.com/"],
  "rateLimit": 8,
  "maxDepth": 10,
  "selectors": {
    "lvl0": {
      "selector": "",
      "defaultValue": "Documentation"
    },
    "lvl1": ".content h1",
    "lvl2": ".content h2",
    "lvl3": ".content h3",
    "lvl4": ".content h4",
    "lvl5": ".content h5",
    "content": ".content p, .content li",
    "lang": {
      "selector": "/html/@lang",
      "type": "xpath",
      "global": true
    }
  },
  "selectors_exclude": [
    "aside",
    ".page-footer",
    ".next-and-prev-link",
    ".table-of-contents"
  ],
  "custom_settings": {
    "attributesForFaceting": ["lang", "tags"]
  },
  "js_render": true
}

```





配置项目的github action

根目录创建.github\workflows\algolia.yml

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111510633.png)

填入代码

```
name: algolia
on:
  push:
    branches:
      - main
jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Get the content of algolia.json as config
        id: algolia_config
        run: echo "config=$(cat crawlerConfig.json | jq -r tostring)" >> $GITHUB_OUTPUT
      - name: Push indices to Algolia
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.APPLICATION_ID }}
          API_KEY: ${{ secrets.API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}

```

作用：每次提交仓库时，会执行这个脚本

## 提交代码

git push提交你刚修改的代码到仓库即可

action或跑逻辑，爬取你网站的数据

## 爬取数据结果查看

进去algolia [dashboard](https://www.algolia.com/apps/YUGA5PESZC/dashboard)

search index  你的应用名即可查看

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111517297.png)

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111518229.png)

看到提示，创建index，点击 create index

然后随便输入index 的名字

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111521956.png)

看到没有记录，这是因为我并没有配置爬虫，哈哈，只是创建来做演示教程的

不出意外的话，你的可以看到有数据，类似这样

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304111524205.png)

好的，教程结束，希望可以帮到你