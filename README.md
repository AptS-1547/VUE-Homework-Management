# 作业管理系统

这是一个基于 Vue 3 和 Vite 构建的作业管理系统。该系统允许学生上传作业，教师批改作业，并提供了用户登录和权限管理功能。

## 项目结构

```plaintext
public/
src/
	api/
		homework.js
        index.js
		upload.js
	assets/
	components/
		Header.vue
		MessageInfo.vue
	router/
		index.js
	student/
		HomeworkDetail.vue
		HomeworkUpload.vue
		HomeworkView.vue
	teacher/
		HomeworkCheck.vue
		HomeworkOverview.vue
	utils/
		auth.js
	views/
		About.vue
	App.vue
	main.js
	style.css

index.html
postcss.config.js
tailwind.config.js
vite.config.js
extensions.json
package.json
README.md
.env.examples

```

## 安装与运行

### 安装依赖

```sh
npm install
```

### 开发环境运行

```sh
npm run dev
```

### 构建项目

```sh
npm run build
```

### 预览构建结果

```sh
npm run preview
```

## API 请求

### 登录

**URL:** `/login`

**方法:** `POST`

**请求体:**

```json
{
  "username": "string",
  "password": "string",
  "rememberMe": "boolean"
}
```

**响应:**

```json
{
  "code": 0,
  "access_token": "string"
}
```

### 上传作业

**URL:** `/student/submitHomework`

**方法:** `POST`

**请求头:**

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
```

**请求体:**

```form-data
homework_name: string
comment: string
files: file[]
```

**响应:**

```json
{
  "code": 0,
  "message": "string"
}
```

### 获取学生作业

**URL:** `/student/getHomework`

**方法:** `GET`

**请求头:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**响应:**

```json
{
  "homework_data": {
    "homework_name": {
      "name": "string",
      "content": "string",
      "status": 0,
      "timestamp": "string"
    }
  }
}
```

### 获取教师作业

**URL:** `/teacher/getHomework`

**方法:** `GET`

**请求头:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**响应:**

```json
{
  "homework_data": {
    "homework_name": {
      "name": "string",
      "content": "string",
      "status": 0,
      "timestamp": "string"
    }
  }
}
```

### 批改作业

**URL:** `/teacher/replyHomework`

**方法:** `POST`

**请求头:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**请求体:**

```json
{
  "student": "string",
  "homework": "string",
  "reply": "string"
}
```

**响应:**

```json
{
  "code": 0,
  "message": "string"
}
```

## 许可证

本项目基于 GPL-3.0 协议开源，详情请参阅 LICENSE 文件。