# Power BI × AI 速成手册

> **核心理念**：不用学函数、用 AI 生成代码，你只做业务审查

本手册按照工程化方式组织，可作为：**项目即插即用 + Prompt 即粘即用 + 模板即拷即用** 的速成指南。

### 总宗旨

- **不背函数、不写语法**：全部由 AI 生成（DAX/M/PowerShell/REST）
- 你只做三件事：**定义业务 → 审查口径 → 验证结果**
- 全流程覆盖：Power Platform 概念 → Power BI Desktop/Service → 数据仓库 → Power Query → 模型 → DAX → 可视化 → 性能 → 安全 → 部署流水线

---

## 一、Introduction｜Power Platform & Power BI 全貌

### 1.1 What is Power Platform?

**组件架构**：

| 组件 | 功能 | 定位 |
|------|------|------|
| **Power BI** | 数据分析与可视化 | 语义与决策层 |
| **Power Apps** | 应用构建 | 回写/审批入口 |
| **Power Automate** | 流程自动化 | 告警/推送/工单 |
| **Power Virtual Agents** | 对话式机器人 | Copilot Studio |
| **Dataverse** | 数据平台 | 统一数据存储 |

**T0 用法**：Power BI 作为"语义与决策层"，与 Apps（回写/审批）、Automate（告警/推送）闭环。

**AI Prompt（定义级）**：

```text
你是 Power Platform 解决方案架构师。我们目标是数据驱动的闭环：
- Power BI：可视化、指标对齐
- Power Apps：异常确认与回写
- Power Automate：推送与工单
请给出端到端方案蓝图（数据流、触发条件、权限、安全），并列出需要在 Power BI 中暴露的关键指标与切片器。
```

### 1.2 为什么选择 Power BI？

| 优势 | 说明 |
|------|------|
| **Microsoft 生态集成** | Azure AD、SharePoint、Teams、Fabric、Office |
| **语义层** | Semantic Model + AI Copilot（自动 DAX/M、设计建议） |
| **低代码 + 企业治理** | 适合业务人员开发，IT 统一管控 |

### 1.3 Power BI 产品线

| 产品 | 用途 | 特点 |
|------|------|------|
| **Desktop** | 开发工具 | 建模、DAX、可视化 |
| **Pro** | 协作发布 | 每日刷新 8 次，共享协作 |
| **Premium** | 企业容量 | 每日刷新 48 次，AI 能力，RLS at scale |
| **Mobile** | 移动端 | iOS/Android 消费 |
| **Embedded** | 嵌入式 | 将报表嵌入第三方应用 |
| **Report Server** | 本地部署 | 私有化部署方案 |

### 1.4 核心术语速查

| 术语 | 说明 |
|------|------|
| **Power BI Desktop** | 建模、DAX、可视化开发工具 |
| **Power Query** | 数据获取与转换（M 语言） |
| **Power Pivot** | 数据建模（关系、度量） |
| **Power View** | 可视化层（报表画布） |
| **Power Map** | 地理视图（3D Maps/ArcGIS） |
| **Power BI Service** | 发布、共享、App、治理 |
| **M Language** | Power Query 的函数式语言（由 AI 生成） |
| **DAX** | 数据分析表达式（由 AI 生成） |

---

## 二、Data Warehousing Concepts｜仓库与建模思想

### 2.1 核心概念

| 概念 | 说明 |
|------|------|
| **OLTP** | 业务事务系统（MES/QMS/ERP） |
| **OLAP** | 分析型数据仓库，历史可追溯 |
| **主键/外键/代理键** | PKey/FKey/SKey |
| **维度表** | 描述性数据（日期、产品、客户） |
| **事实表** | 业务事件记录（订单、生产、库存） |

### 2.2 模式选择

| 模式 | 特点 | 推荐度 |
|------|------|--------|
| **星型** | 维度表直接关联事实表，查询效率高 |  推荐 |
| **雪花** | 维度表进一步规范化，查询稍慢 |  适度使用 |
| **混合** | 星型 + 雪花组合 |  复杂场景 |

**AI Prompt（建模审查）**：

```text
你是企业数据建模专家。请基于以下字段与业务事件：
- 事实事件：生产记录（每分钟/每批次）
- 维度：日期、班次、产线、SKU、客户
请输出：星型模型设计（表清单、主键、关系方向），指出粒度冲突与代理键需求。
```

---

## 三、Power BI Desktop｜组件与基本功

### 3.1 核心组件

- **模型视图**：管理表关系
- **数据视图**：查看数据表
- **报表视图**：设计可视化
- **外部工具**：DAX Studio / Tabular Editor

### 3.2 标准工作流

```
数据源 → Power Query → 数据模型 → DAX 度量 → 可视化 → 验证 → 发布
```

**AI Prompt（项目脚手架）**：

```text
请为"制造 KPI（产量/达成率/停机/不良率）"生成 Power BI 项目脚手架：
- 推荐表结构
- 基础度量列表
- 页面布局（领导总览、趋势、损失、质量）
- 验证清单
```

---

## 四、Power Query Editor｜连接、转换、合并

### 4.1 连接类型

| 类型 | 数据源 |
|------|--------|
| **文件** | Excel/CSV/XML/JSON/文件夹 |
| **数据库** | MySQL/SQL Server/Oracle/Access |
| **云服务** | Snowflake/Azure SQL/BigQuery |
| **Web** | GitHub/LinkedIn/网页表格 |

### 4.2 连接模式

| 模式 | 特点 | 适用场景 |
|------|------|----------|
| **Import** | 缓存模型，性能最佳 | 数据量适中，非实时 |
| **DirectQuery** | 实时访问源 | 数据量大，实时要求高 |
| **Live Connection** | 连接 SSAS/现有数据集 | 企业模型复用 |
| **Streaming** | 推送数据 | IoT/实时仪表板 |

### 4.3 常用转换操作

- 数据类型转换
- 空值处理
- 列拼接/拆分
- 条件列
- 分组汇总
- 筛选日期
- Join（Left/Right/Full/Inner/Left Anti/Right Anti）

**AI Prompt（M 生成标准模板）**：

```text
你是 Power Query M 专家。表结构：
Date, Line, SKU, Actual, Plan, DowntimeMin, DefectQty

业务规则：
- 保留最近 180 天
- 删除 Actual、Plan 同时为空的行
- 按 Date+Line+SKU 聚合 Actual/Plan 求和
- 生成字段 AchRate = Actual/Plan（保留3位小数）
- 左连接 Defect 表，缺失记为0
- 能折叠则折叠（尽量让转换在源端执行）

请输出完整 M 代码，逐步骤加中文注释，并标注可能破坏 Query Folding 的步骤与替代方案。
```

### 4.4 Query Folding（查询折叠）

**原则**：尽量将过滤/分组/投影下推到源端执行。

**检查方法**：右键步骤 → "查看本机查询"

---

## 五、Power Pivot｜关系与建模

### 5.1 关系设计原则

| 原则 | 说明 |
|------|------|
| **一对多为主** | 维度表 → 事实表 |
| **避免事实对事实** | 通过维度桥接 |
| **单向优先** | 星型模型最佳实践 |
| **双向谨慎** | 仅在业务必要时使用 |

### 5.2 基数类型

| 基数 | 说明 | 使用频率 |
|------|------|----------|
| **1:\*** | 一对多 |  最常用 |
| **\*:1** | 多对一 |  常用 |
| **\*:\*** | 多对多 |  谨慎使用 |

### 5.3 角色扮演维度

如日期维度（下单日期/发货日期/到货日期），建议：**单表 + 多关系（仅1条活跃，其余 DAX 激活）**

**AI Prompt（关系建议）**：

```text
你是 Power BI 模型架构师。以下表与字段：
（列出事实和维度及键）
请输出关系图：主外键、方向、活跃性；标注需要 USERELATIONSHIP 的场景，并给出对应度量示例。
```

---

## 六、DAX 计算｜用 AI 生成

### 6.1 列 vs 度量

| 类型 | 特点 | 推荐度 |
|------|------|--------|
| **计算列** | 行级、存储、用于分类/排序 | 尽量不用 |
| **度量（Measure）** | 动态计算，随上下文变化 | 推荐 |

### 6.2 度量分层架构

```
[Base]    事实求和/计数（SUM/COUNT）
[Logic]   业务逻辑（如达成率、OEE 组件）
[Report]  报表特定（TopN/动态切换/呈现格式）
```

**AI Prompt（度量库生成）**：

```text
你是 DAX 架构师。请基于以下表（FactProduction、DimDate、DimLine、DimSKU）生成：
- Base 度量（Actual, Plan, DowntimeMin, DefectQty 等）
- KPI 度量（AchRate, OEE 组件）
- 报表层度量（Top5 Loss、Others 聚合、动态 KPI 选择）
要求：
1）DIVIDE 防 0；2）注释中文解释；3）列出上下文依赖与常见误用。
```

### 6.3 常见函数族

| 类别 | 函数示例 |
|------|----------|
| **聚合** | SUM, COUNT, AVERAGE, MAX, MIN |
| **上下文** | CALCULATE, FILTER, ALL, REMOVEFILTERS |
| **逻辑/容错** | IF, SWITCH, DIVIDE, ISBLANK |
| **时间智能** | SAMEPERIODLASTYEAR, DATESYTD, PARALLELPERIOD |
| **表操作** | SUMMARIZE, ADDCOLUMNS, SELECTCOLUMNS |
| **迭代器** | SUMX, AVERAGEX, FILTERX |

### 6.4 DAX Studio（性能分析）

**使用场景**：
- 定位慢度量
- 基表扫描分析
- 评估上下文转换

**AI Prompt（调优）**：

```text
以下为度量定义与模型摘要、性能分析器输出，请识别瓶颈：
- 是否使用了不必要的 ALL/REMOVEFILTERS
- 是否可通过增加辅助维度/预聚合优化
- 给出优化后 DAX
```

---

## 七、Power View｜可视化与交互

### 7.1 核心功能

| 功能 | 用途 |
|------|------|
| **层级** | 创建层级结构，支持下钻/上卷 |
| **Drill Through** | 从总览跳转到明细页面 |
| **书签** | 保存视图状态，一键切换 |
| **按钮** | 页面导航、清筛、图表切换 |
| **选择面板** | 控制视觉对象显示/隐藏 |

### 7.2 过滤器层级

| 层级 | 作用范围 |
|------|----------|
| **视觉级** | 单个图表 |
| **页面级** | 整个页面 |
| **报表级** | 所有页面 |
| **Drillthrough** | 跨页面传递筛选 |

### 7.3 行级安全（RLS）

| 类型 | 说明 |
|------|------|
| **静态 RLS** | 固定规则，手动配置 |
| **动态 RLS** | 基于 USERPRINCIPALNAME() 自动匹配 |

**AI Prompt（动态 RLS）**：

```text
请生成动态 RLS 方案：
- 角色表字段：UserEmail, Plant, Line
- 规则：用户仅可看所属 Plant + Line
- 给出角色 DAX 表达式与测试方法，并说明对 DirectQuery 的注意点。
```

---

## 八、Power BI Service｜协作与发布

### 8.1 工作区权限

| 角色 | 权限 |
|------|------|
| **Admin** | 完全控制 |
| **Member** | 编辑 + 分享 |
| **Contributor** | 编辑内容 |
| **Viewer** | 仅查看 |

### 8.2 核心功能

- **Dashboard**：Pin 单图或 Live Page
- **Apps**：打包发布，分节与链接
- **Q&A**：NLP 自然语言查询
- **移动端视图**：定制手机布局

**AI Prompt（组织交付）**：

```text
请为"制造 KPI 解决方案"生成 Service 交付方案：
- 工作区结构（Dev/Test/Prod）
- 内容打包为 App 的结构
- 权限矩阵
- 计划刷新与告警
- 移动端视图与固定磁贴策略
```

---

## 九、Gateways｜网关与刷新

### 9.1 网关类型

| 类型 | 适用场景 |
|------|----------|
| **个人网关** | 个人开发测试 |
| **企业网关** | 生产环境（推荐） |

### 9.2 刷新限制

| 许可 | 每日刷新次数 |
|------|-------------|
| **Pro** | 最多 8 次 |
| **Premium** | 最多 48 次 |

### 9.3 增量刷新

**核心参数**：`RangeStart` / `RangeEnd`

**AI Prompt（增量刷新策略）**：

```text
请根据以下事实表（按分钟粒度，近2年数据）给出增量刷新策略：
- 参数设置（RangeStart/RangeEnd）
- 分区建议
- DirectQuery for historical 数据的可行性
- Gateway 规划
```

---

## 十、Connections｜连接模式对比

| 模式 | 性能 | 实时性 | 数据量 | 推荐场景 |
|------|------|--------|--------|----------|
| **Import** |1 | N  适中 | 默认选择 |
| **DirectQuery** | 4 | Y | 超大 | 实时要求高 |
| **Live** | 2 | Y | 企业模型 | 复用现有语义层 |
| **Streaming** | 3 | Y | IoT | 实时仪表板 |

**选择建议**：优先 Import → 数据量超大/实时性强用 DirectQuery → 企业模型复用用 Live

---

## 十一、Performance Tuning｜性能优化

### 11.1 优化检查清单

| 层面 | 检查项 |
|------|--------|
| **数据层** | 源端索引、Query Folding |
| **模型层** | 减少基数、规范化设计 |
| **DAX 层** | 避免过度 ALL、减少迭代器 |
| **可视层** | 减少交互、简化视觉 |

**AI Prompt（性能体检）**：

```text
以下为模型关系图、行数摘要、慢查询的 DAX、源表索引情况，请给出分项优化方案（数据建模/Power Query/DAX/可视交互），并说明预期收益。
```

---

## 十二、Security｜安全与权限

### 12.1 安全层级

| 层级 | 机制 |
|------|------|
| **认证** | Azure AD 组织账户 |
| **对象级授权** | Workspace 角色 |
| **数据级** | RLS（静态/动态） |
| **对象级安全** | OLS（Tabular Editor） |

---

## 十三、Cmdlets & REST APIs｜自动化治理

### 13.1 PowerShell 自动化

**AI Prompt（脚本生成）**：

```text
请生成 PowerShell 脚本：
- 登录 Power BI
- 列出所有工作区与成员
- 将用户 user@company.com 加入某工作区为 Viewer
- 导出工作区内报表/仪表板清单为 CSV
- 注释每行解释
```

### 13.2 REST API 场景

- 导出资源清单
- 批量权限管理
- 自动部署
- 数据备份

---

## 十四、Deployment Pipelines｜部署流水线

### 14.1 三段式发布

```
Dev → Test → Prod
```

### 14.2 核心操作

- 创建流水线
- 推送对象
- 差异比较
- 选择性推送

**AI Prompt（发布蓝图）**：

```text
请为制造 KPI 项目生成部署流水线设计：
- 分环境工件清单
- 参数化连接
- 数据集/报表分离
- 验收与回滚策略
```

---

## 十五、SSAS Multidimensional｜多维模型

### 15.1 使用场景

- 历史系统迁移
- 企业已有多维模型
- 复杂维度计算

### 15.2 连接方式

Power BI Live Connection 连接 SSAS Cube

---

## 十六、Snowflake｜云数据仓库

### 16.1 连接流程

```
注册 → 建库/仓库 → 装载数据 → Power BI 连接 → 报表开发
```

### 16.2 成本治理

| 策略 | 说明 |
|------|------|
| **Warehouse 尺寸** | 按需调整，自动暂停 |
| **Query Tag** | 成本跟踪 |
| **Import vs DirectQuery** | 性能权衡 |

---

## 十七、Python Integration｜脚本集成

### 17.1 应用场景

- 数据预处理
- 特征工程
- 高级可视化

### 17.2 配置步骤

1. 安装 Python（NumPy/Pandas/Matplotlib）
2. Power BI 配置 Python 路径
3. 使用 Python 脚本作为数据源或可视化

**AI Prompt（Python 数据帧）**：

```text
请生成一个 Python 脚本：
- 从 CSV 读取生产数据
- 计算每条产线的 7 日移动平均产量
- 输出为 DataFrame 给 Power BI
- 异常点标注（3σ）
```






