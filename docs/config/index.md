# 配置运维手册

本手册详细介绍了 IE Arch Handbook 项目的本地使用、内容管理和媒体管理方法，帮助您快速上手和维护项目。

## 1. 本地使用

### 环境要求

- **Python 3.7+**：MkDocs 运行的基础环境
- **pip**：Python 包管理工具
- **Git**：版本控制工具（推荐）

### 安装步骤

1. **克隆项目**（如果尚未克隆）
   ```bash
   git clone https://github.com/H4nkX/H4nkX.github.io.git
   cd H4nkX.github.io
   ```

2. **创建虚拟环境**（推荐）
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **安装依赖**
   ```bash
   pip install -r requirements.txt
   ```

### 本地预览

修改内容后，启动本地服务器进行实时预览：

```bash
mkdocs serve
```

然后在浏览器中访问 `http://localhost:8000` 查看实时效果。

### 构建站点

在部署前，本地构建站点以检查是否有错误：

```bash
mkdocs build --clean
```

构建结果会生成在 `site` 目录中。

### 常见问题

- **端口被占用**：使用 `mkdocs serve -a 127.0.0.1:8080` 指定不同端口
- **依赖安装失败**：检查 Python 版本，尝试更新 pip
- **构建错误**：检查 Markdown 文件语法，确保所有链接和引用正确

## 2. 内容管理

### 内容结构

项目采用以下目录结构组织内容：

```
docs/
├── index.md          # 首页
├── about/            # About 页面
├── story/            # 故事栏目
│   ├── index.md      # 故事首页
│   ├── story1/       # 故事1
│   ├── story2/       # 故事2
│   └── story3/       # 故事3
├── ai/               # AI专栏
├── yunchou/          # 运筹栏目
└── config/           # 配置运维手册
```

### 新增文章

1. **选择栏目**：确定文章所属的栏目（如 story、ai、yunchou 等）
2. **创建文件**：在对应栏目目录下创建新的 Markdown 文件
3. **编写内容**：使用 Markdown 语法编写文章内容
4. **添加元数据**：在文章顶部添加必要的元数据（可选）

   ```markdown
   ---
title: 文章标题
date: 2026-03-19
description: 文章描述
---

文章内容...
   ```

### 新增栏目

1. **创建目录**：在 `docs` 目录下创建新的文件夹（如 `new-section/`）
2. **创建首页**：在该文件夹中创建 `index.md` 文件作为栏目首页
3. **更新导航**：在 `mkdocs.yml` 文件的 `nav` 部分添加新的栏目导航

   ```yaml
   nav:
     - 首页: index.md
     - 新栏目:
       - 新栏目首页: new-section/index.md
   ```

### 内容编辑最佳实践

- **文件命名**：使用小写字母、数字和连字符（如 `my-post.md`）
- **目录结构**：保持清晰的层级结构，避免过深的嵌套
- **标题层级**：使用适当的标题层级（#、##、###）
- **链接格式**：使用相对路径链接到其他页面
- **代码格式**：使用代码块展示代码，添加语言标识
- **图片引用**：使用相对路径引用图片

### 内容更新

1. **编辑文件**：直接修改对应的 Markdown 文件
2. **预览效果**：使用 `mkdocs serve` 实时预览修改效果
3. **提交更改**：使用 Git 提交更改

   ```bash
   git add docs/
   git commit -m "更新内容"
   git push
   ```

## 3. 媒体管理

### 图片管理

#### 图片存储

所有图片应存储在以下目录：

```
assets/images/
```

建议按照内容类型进一步组织：

```
assets/images/
├── story/        # 故事栏目图片
├── ai/           # AI专栏图片
├── yunchou/      # 运筹栏目图片
└── common/       # 通用图片
```

#### 图片引用

在 Markdown 文件中引用图片时，使用相对路径：

```markdown
![图片描述](../assets/images/story/example.png)
```

#### 图片优化

- **压缩图片**：使用 TinyPNG、Squoosh 等工具减小图片文件大小
- **选择格式**：
  - JPG：适合照片和复杂图像
  - PNG：适合需要透明背景的图像
  - WebP：现代浏览器支持的高效格式
- **控制尺寸**：根据页面布局调整图片尺寸
- **添加 alt 文本**：为图片添加描述性的 alt 文本，提高可访问性

### 其他媒体文件

- **视频文件**：建议使用外部视频平台（如 YouTube、B 站）嵌入，避免直接上传大文件
- **音频文件**：使用适当的格式（如 MP3）并确保文件大小合理
- **文档文件**：可以上传 PDF 等文档文件，存放在 `assets/docs/` 目录

### 媒体文件最佳实践

- **文件命名**：使用描述性的文件名，避免使用中文和特殊字符
- **文件大小**：控制媒体文件大小，确保页面加载速度
- **文件组织**：按照内容类型和栏目组织媒体文件
- **备份**：定期备份媒体文件，确保数据安全

## 4. 配置管理

### 站点配置

主要配置文件为 `mkdocs.yml`，包含以下关键配置：

- **基本信息**：
  - `site_name`：站点名称
  - `site_url`：站点 URL
  - `site_description`：站点描述
  - `site_author`：站点作者
  - `copyright`：版权信息

- **主题配置**：
  - `theme.name`：主题名称（使用 material）
  - `theme.palette`：颜色方案
  - `theme.features`：启用的主题功能
  - `theme.language`：站点语言

- **导航配置**：
  - `nav`：站点导航结构

- **扩展配置**：
  - `markdown_extensions`：Markdown 扩展

- **插件配置**：
  - `plugins`：启用的插件

### 配置示例

```yaml
site_name: IE Arch Handbook_H4nk
site_description: 工业工程架构师手册
site_author: H4nk
site_url: https://h4nkx.github.io/

nav:
  - 首页: index.md
  - About: about/index.md
  - 故事:
    - 故事首页: story/index.md
    - 故事1: story/story1/index.md
  - AI专栏:
    - AI专栏首页: ai/index.md
  - 运筹:
    - 运筹首页: yunchou/index.md
  - 配置: config/index.md

theme:
  name: material
  palette:
    - scheme: default
      primary: indigo
      accent: indigo
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - navigation.indexes
    - navigation.top
    - navigation.footer
    - search.suggest
    - search.highlight
    - search.share
    - toc.follow
    - content.action.edit
    - content.action.view
  language: zh

markdown_extensions:
  - pymdownx.highlight
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - attr_list
  - pymdownx.mark
  - pymdownx.emoji
  - pymdownx.tabbed
  - toc:
      permalink: true

plugins:
  - search
  - minify:
      minify_html: true
```

### 自定义配置

- **自定义样式**：编辑 `assets/css/custom.css` 文件
- **自定义模板**：修改 `overrides` 目录下的模板文件
- **自定义脚本**：在页面中添加必要的 JavaScript 代码

## 5. 部署管理

### 自动部署

项目配置了 GitHub Actions 自动部署流程：

1. **推送更改**：将修改推送到 `main` 分支
2. **自动构建**：GitHub Actions 会自动执行构建
3. **部署**：构建结果会自动部署到 `gh-pages` 分支
4. **发布**：GitHub Pages 会自动发布站点

### 手动部署

如果需要手动部署，可以使用以下命令：

```bash
mkdocs gh-deploy
```

此命令会构建站点并部署到 `gh-pages` 分支。

### 部署验证

部署完成后，可以通过以下 URL 访问站点：

```
https://H4nkX.github.io/
```

### 部署问题排查

- **GitHub Actions 失败**：检查工作流日志，查看具体错误信息
- **页面显示异常**：检查 Markdown 文件语法，确保所有链接和引用正确
- **样式问题**：检查 CSS 文件是否正确加载
- **图片不显示**：检查图片路径是否正确，确保图片已上传
- **404 错误**：检查页面路径是否正确，确保所有页面都已正确构建

### 部署最佳实践

- **测试**：在本地构建和预览，确保没有错误
- **提交信息**：使用清晰的提交信息，便于追踪更改
- **分支管理**：使用分支开发新功能，合并前进行测试
- **备份**：定期备份项目文件，确保数据安全
- **监控**：定期检查站点运行状态，及时发现和解决问题

## 6. 维护指南

### 定期维护

- **更新依赖**：定期更新 MkDocs 和相关依赖
  ```bash
  pip install --upgrade mkdocs mkdocs-material
  ```

- **清理构建**：定期清理 `site` 目录，避免旧文件影响
  ```bash
  mkdocs build --clean
  ```

- **检查链接**：定期检查站点链接，确保没有 broken links

### 故障排除

- **构建失败**：检查 Markdown 文件语法，确保所有链接和引用正确
- **样式问题**：检查 CSS 文件是否正确加载，清除浏览器缓存
- **性能问题**：优化图片大小，减少不必要的脚本和样式
- **安全问题**：定期更新依赖，避免已知安全漏洞

### 版本控制

- **提交规范**：使用清晰的提交信息，遵循 Git 最佳实践
- **分支管理**：使用主分支部署，功能分支开发
- **标签管理**：使用标签标记重要版本

```bash
# 创建标签
git tag v1.0.0

# 推送标签
git push origin v1.0.0
```



## 7. 资源参考

- **MkDocs 官方文档**：https://www.mkdocs.org/
- **Material for MkDocs 文档**：https://squidfunk.github.io/mkdocs-material/
- **Markdown 语法指南**：https://www.markdownguide.org/
- **GitHub Pages 文档**：https://docs.github.com/en/pages
- **GitHub Actions 文档**：https://docs.github.com/en/actions

---

本手册会根据项目发展和技术更新不断完善，如有任何问题或建议，欢迎联系我们。