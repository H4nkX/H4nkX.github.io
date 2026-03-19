# IE Arch Handbook_H4nk

工业工程架构师手册 - 分享架构设计、技术实践和运维经验

## 项目简介

这是一个基于 MkDocs 和 Material for MkDocs 主题构建的技术博客/手册网站，专注于工业工程、架构设计和技术实践的分享。

## 项目结构

```
H4nkX.github.io/
├── assets/           # 静态资源文件
├── blog/            # 博客内容
├── story/           # 故事内容
├── yunchou/         # 云筹相关内容
├── config/          # 配置页面
├── overrides/       # 主题覆盖文件
├── search/          # 搜索索引
├── mkdocs.yml       # MkDocs 配置文件
├── requirements.txt # Python 依赖
└── README.md        # 项目说明
```

## 快速开始

### 环境要求

- Python 3.7+
- pip (Python 包管理器)

### 安装依赖

```bash
pip install -r requirements.txt
```

### 本地开发

```bash
# 启动本地开发服务器
mkdocs serve

# 构建静态网站
mkdocs build
```

### 部署到 GitHub Pages

本项目已经配置为 GitHub Pages，当推送到 `gh-pages` 分支时，GitHub 会自动部署网站。

## 内容管理

### 添加新文章

1. 在 `docs/` 目录下创建新的 Markdown 文件
2. 在 `mkdocs.yml` 的 `nav` 配置中添加文章链接
3. 提交并推送到 GitHub

### 文章格式

文章使用 Markdown 格式编写，支持 Material for MkDocs 的所有扩展功能。

## 主题定制

主题配置位于 `mkdocs.yml` 文件的 `theme` 部分，可以自定义颜色、字体、功能等。

## 许可证

本项目内容采用知识共享许可协议。

## 联系方式

- GitHub: [H4nkX](https://github.com/H4nkX)
- 邮箱: [你的邮箱]

---

*最后更新: 2024年3月19日*