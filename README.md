# Super Blog

基于 [VitePress](https://vitepress.dev/) 的个人前端技术知识库。

**在线访问：** [blog.odep.shop](https://blog.odep.shop/)

---

## 内容方向

| 分类 | 说明 |
|------|------|
| 前端基础 | HTML / CSS / JS / TS / Vue / React |
| 工程化 | Vite / Webpack / 规范与部署 |
| 服务端 | Node.js / Nginx / 数据库 |
| 源码阅读 | 框架原理与实现细节 |
| 业务实践 | 登录、权限、支付、小程序等 |

---

## 技术栈

- **文档框架** — VitePress
- **搜索** — Algolia DocSearch
- **评论** — Waline
- **部署** — Vercel
- **包管理** — pnpm

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地开发
pnpm docs:dev

# 生产构建
pnpm docs:build

# 预览构建产物
pnpm docs:serve
```

---

## 目录结构

```text
super-blog/
├── docs/                 # 文档源码
│   ├── .vitepress/       # VitePress 配置与主题
│   ├── webnote/          # 技术笔记
│   ├── source-code/      # 源码学习
│   └── ...
├── crawlerConfig.json    # Algolia 爬虫配置
└── package.json
```

---

## 相关命令

| 命令 | 说明 |
|------|------|
| `pnpm docs:dev` | 本地开发（`--host`） |
| `pnpm docs:build` | 默认构建 |
| `pnpm build:vercel` | Vercel 环境构建 |
| `pnpm build:github` | GitHub Pages 构建 |
| `pnpm docs:serve` | 预览构建结果 |

---

## License

MIT © [xxxsjan](https://github.com/xxxsjan)
