# Cesium Vue3 Demo

基于 Vue3 + Cesium 构建的三维地球可视化演示项目。

## 🛠 技术栈

- **Frontend**: Vue 3 + TypeScript + Vite
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **三维引擎**: Cesium 1.123.x
- **容器化**: Docker + Nginx

## 🚀 启动指南 (How to Run)

### Docker 方式（推荐）

1. 确保 Docker Desktop 已启动
2. 在项目根目录执行：

```bash
docker compose up -d --build
```

3. 等待容器启动完成（首次构建需下载依赖，请耐心等待）

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 🔗 服务地址 (Services)

| 服务     | 地址                  |
| -------- | --------------------- |
| 前端应用 | http://localhost:3000 |

## 📁 项目结构

```
cesium-vue-demo/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── AppHeader.vue    # 顶部导航栏
│   │   ├── CesiumViewer.vue # Cesium 地图组件
│   │   └── LocationPanel.vue # 位置控制面板
│   ├── views/               # 页面视图
│   │   ├── HomeView.vue     # 首页
│   │   ├── CesiumView.vue   # 三维地图页
│   │   ├── AboutView.vue    # 关于页
│   │   └── NotFoundView.vue # 404 页面
│   ├── stores/              # Pinia 状态管理
│   ├── router/              # Vue Router 路由配置
│   ├── types/               # TypeScript 类型定义
│   └── main.ts              # 应用入口
├── docker-compose.yml       # Docker 编排配置
├── Dockerfile               # Docker 镜像构建
├── nginx.conf               # Nginx 服务配置
└── vite.config.ts           # Vite 构建配置
```

## ✨ 功能特性

- ✅ Cesium 三维地球渲染
- ✅ 城市快速定位飞行
- ✅ 地图标记点添加/删除
- ✅ 相机位置实时显示
- ✅ 响应式布局适配移动端
- ✅ Docker 一键部署
- ✅ 🎨 全局主题色彩切换（支持默认蓝紫、清新绿意、暖橙活力、深邃暗夜四种主题）
