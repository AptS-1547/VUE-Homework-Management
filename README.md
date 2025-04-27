# 作业管理系统 (Homework Management System)

**⚠️ 注意：本项目为 AutoBits 前段面试题，不能直接用于生产环境。本项目已停止维护。**
**⚠️ Note: This project is an AutoBits front-end interview question and cannot be used directly in production. This project has been discontinued.**

基于 Vue 3、Vite 和 TailwindCSS 构建的现代化作业管理系统。该系统提供了完整的学生作业上传、教师批改流程和用户权限管理功能。

## 功能特点

- 💼 **多角色支持**：学生、课代表、教师不同权限管理
- 📝 **作业管理**：学生上传作业、添加批注说明
- ✅ **教师评阅**：老师查看、评价学生作业
- 📊 **提交概览**：支持查看全班作业提交情况
- 📱 **响应式设计**：支持移动端和桌面端访问
- 🔐 **JWT 授权**：安全的用户认证机制

## 技术栈

- 🖼️ 前端框架：[Vue 3](https://vuejs.org/)
- 🛠️ 构建工具：[Vite](https://vitejs.dev/)
- 🎨 UI 设计：[TailwindCSS](https://tailwindcss.com/)
- 🧭 路由管理：[Vue Router](https://router.vuejs.org/)
- 🔄 HTTP 客户端：[Axios](https://axios-http.com/)

## 项目结构

```plaintext
├── public/                # 静态资源
├── src/
│   ├── api/               # API 请求模块
│   │   ├── homework.js    # 作业相关 API
│   │   ├── index.js       # API 基础配置
│   │   └── upload.js      # 上传相关 API
│   ├── assets/            # 项目资源
│   ├── components/        # 通用组件
│   ├── router/            # 路由配置
│   ├── student/           # 学生视图组件
│   ├── teacher/           # 教师视图组件
│   ├── utils/             # 工具函数
│   ├── views/             # 页面视图
│   ├── App.vue            # 根组件
│   ├── main.js            # 入口文件
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── vite.config.js         # Vite 配置
├── postcss.config.js      # PostCSS 配置
├── tailwind.config.js     # TailwindCSS 配置
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## 快速开始

### 前置要求

- Node.js 16.x 或更高版本
- Yarn 1.22.x 或更高版本

### 环境变量配置

复制示例环境变量文件并根据需要修改：

```bash
cp .env.example .env.local
```

### 安装依赖

```bash
yarn
```

### 开发模式运行

```bash
yarn dev
```

### 构建生产版本

```bash
yarn build
```

### 预览构建结果

```bash
yarn preview
```

## API 接口

### 用户认证

#### 登录

- **URL**: `/login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "string",
    "password": "string",
    "rememberMe": boolean
  }
  ```
- **成功响应** (200):
  ```json
  {
    "code": 0,
    "access_token": "string"
  }
  ```

### 学生接口

#### 获取作业列表

- **URL**: `/student/getHomework`
- **方法**: `GET`
- **认证**: 需要 Bearer Token
- **成功响应** (200):
  ```json
  {
    "homework_data": {
      "作业1": {
        "name": "作业1",
        "content": "作业描述",
        "status": 0,
        "timestamp": "2023-07-01T12:00:00Z"
      }
    }
  }
  ```

#### 上传作业

- **URL**: `/student/submitHomework`
- **方法**: `POST`
- **认证**: 需要 Bearer Token
- **内容类型**: `multipart/form-data`
- **请求参数**:
  - `homework_name`: 作业名称
  - `comment`: 学生批注
  - `files`: 文件数组
- **成功响应** (200):
  ```json
  {
    "code": 0,
    "message": "作业提交成功"
  }
  ```

### 教师接口

#### 获取学生作业

- **URL**: `/teacher/getHomework`
- **方法**: `GET`
- **认证**: 需要 Bearer Token
- **成功响应** (200): 与学生接口类似

#### 批改作业

- **URL**: `/teacher/replyHomework`
- **方法**: `POST`
- **认证**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "student": "学生用户名",
    "homework": "作业名称",
    "reply": "教师评语"
  }
  ```
- **成功响应** (200):
  ```json
  {
    "code": 0,
    "message": "批改成功"
  }
  ```

## 状态码说明

- `0`: 操作成功
- `1`: 认证失败
- `2`: 权限不足
- `3`: 资源不存在
- `4`: 请求参数错误
- `5`: 服务器内部错误

## 用户角色权限

- **学生**: 查看个人作业、上传作业
- **课代表**: 学生权限 + 查看全班作业提交情况
- **教师**: 查看并评阅全部学生作业

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目基于 GPL-3.0 协议开源。

## 作者

The ESAP Project - [@AptS-1547](https://github.com/AptS-1547)

项目链接: https://github.com/AptS-1547/vue-Homework-Management
