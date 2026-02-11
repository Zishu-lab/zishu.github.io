---
title: "二维码扫描系统教程（二）：Web开发与前端技术"
date: 2026-02-11
draft: false
tags: ["Web开发", "HTML", "CSS", "JavaScript", "教程"]
categories: ["技术教程"]
description: "零基础学习Web前端开发的完整教程，详细介绍HTML结构、CSS样式、JavaScript交互，为二维码扫描项目打下前端基础。"
---

# 二维码扫描系统 - 零基础完整教程

## 第二部分：Web开发与前端技术

---

## 第五章：Web开发基础

### 5.1 什么是Web？

#### 5.1.1 Web的基本概念

**万维网（WWW）：**
- 1989年由蒂姆·伯纳斯-李发明
- 一个通过互联网访问的信息系统
- 由数十亿个网页组成

**类比理解：**
```
互联网 = 高速公路网
Web    = 高速公路上的所有建筑物
网页    = 每个建筑物里的房间
URL    = 每个房间的地址
```

#### 5.1.2 客户端-服务器模型

**基本架构：**
```
┌──────────────┐                    ┌──────────────┐
│   客户端     │                    │   服务器     │
│  (浏览器)    │                    │  (电脑)     │
├──────────────┤                    ├──────────────┤
│              │                    │              │
│  发送请求 ────┼─────────────────>│  接收请求    │
│              │  HTTP请求         │              │
│              │                    │  处理请求    │
│              │<───────────────────│  返回响应    │
│  接收响应    │  HTTP响应         │              │
│              │                    │              │
│  显示内容    │                    │              │
└──────────────┘                    └──────────────┘
```

**生活类比：**
```
你（客户端）                    餐厅（服务器）
  │                                  │
  ├──"我要菜单"────────────────────>│
  │                                  │
  │<───────────"这是菜单"────────────┤
  │                                  │
  ├──"我要宫保鸡丁"────────────────>│
  │                                  │
  │<───────────"好的，15分钟"────────┤
  │                                  │
  │<────15分钟后──────"菜好了"────────┤
```

**关键概念：**

1. **客户端（Client）：**
   - 用户使用的设备（电脑、手机）
   - 运行浏览器软件
   - 发起请求，接收响应

2. **服务器（Server）：**
   - 提供服务的计算机
   - 24小时运行
   - 存储网站文件和数据

3. **请求（Request）：**
   - 客户端发给服务器的消息
   - 包含：要访问的资源、参数等

4. **响应（Response）：**
   - 服务器返回给客户端的消息
   - 包含：HTML、图片、数据等

#### 5.1.3 HTTP协议

**什么是HTTP？**
- HTTP = HyperText Transfer Protocol（超文本传输协议）
- 客户端和服务器之间的"语言"
- 定义了请求和响应的格式

**HTTP请求格式：**
```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html

（空行）
（可选的请求体）
```

**常见HTTP方法：**

| 方法 | 说明 | 例子 |
|------|------|------|
| GET | 获取资源 | 访问网页 |
| POST | 提交数据 | 提交表单 |
| PUT | 更新资源 | 更新用户信息 |
| DELETE | 删除资源 | 删除帖子 |

**HTTP状态码：**
```python
# 2xx - 成功
200 OK          # 请求成功
201 Created     # 创建成功

# 3xx - 重定向
301 Moved Permanently  # 永久重定向
302 Found            # 临时重定向

# 4xx - 客户端错误
400 Bad Request      # 请求格式错误
401 Unauthorized     # 未授权
403 Forbidden       # 禁止访问
404 Not Found       # 资源不存在

# 5xx - 服务器错误
500 Internal Server Error  # 服务器内部错误
502 Bad Gateway           # 网关错误
503 Service Unavailable   # 服务不可用
```

### 5.2 IP地址和端口

#### 5.2.1 IP地址

**什么是IP地址？**
- IP = Internet Protocol（网际协议）
- 网络中设备的唯一标识
- 类似于现实世界的地址

**IP地址格式：**
```
IPv4格式：xxx.xxx.xxx.xxx
例如：192.168.1.1

每部分0-255的数字
总共约43亿个不同地址

特殊IP：
127.0.0.1   = 本机（localhost）
192.168.x.x = 内网地址
0.0.0.0     = 所有网络接口
```

**类比理解：**
```
IP地址 = 家庭住址

192.168.1.100 就像"北京市朝阳区xxx街道100号"

通过这个地址，快递员（网络数据包）
可以准确找到目的地（你的电脑）
```

#### 5.2.2 端口

**什么是端口？**
- 端口是服务器的"门"
- 一个IP可以有65536个端口（0-65535）
- 不同的服务使用不同的端口

**常见端口：**
```
端口   服务
────  ─────────────────
21    FTP（文件传输）
22    SSH（远程登录）
80    HTTP（网页）
443   HTTPS（加密网页）
3306  MySQL数据库
5000  Flask默认端口
8000  Django默认端口
```

**类比理解：**
```
IP地址 = 大楼地址
端口    = 房间号

192.168.1.100:5000
就是"xxx大楼5000房间"

不同房间提供不同服务，
就像：
- 100房间是餐厅
- 200房间是健身房
- 5000房间是Web服务器
```

#### 5.2.3 URL详解

**URL格式：**
```
https://www.example.com:443/path/to/page?param=value#section

协议://主机名:端口/路径?查询参数#片段
```

**各部分说明：**

1. **协议（Protocol）：**
   - http:// - 普通网页（不加密）
   - https:// - 加密网页（安全）
   - file:// - 本地文件
   - ws:// - WebSocket连接

2. **主机名（Hostname）：**
   - 域名（www.example.com）
   - 或IP地址（192.168.1.1）

3. **端口（Port）：**
   - 默认端口可省略
   - http默认80，https默认443

4. **路径（Path）：**
   - 服务器上的资源路径
   - 类似文件系统路径

5. **查询参数（Query）：**
   - 传递给服务器的参数
   - 格式：key=value&key2=value2

6. **片段（Fragment）：**
   - 页面内的锚点
   - 不会发送到服务器

**例子：**
```
URL: http://localhost:5000/video_feed

协议:   http
主机名: localhost
端口:   5000
路径:   /video_feed
```

---

## 第六章：HTML基础

### 6.1 HTML是什么？

**HTML = HyperText Markup Language（超文本标记语言）**
- 不是编程语言，是标记语言
- 用"标签"（tag）来描述网页结构
- 浏览器根据标签渲染网页

**类比理解：**
```
HTML = 文章的排版标记

就像在纸上写文章时画标记：
- 圈圈 = 标题
- 下划线 = 强调
- 缩进 = 段落

HTML用标签做同样的事，
告诉浏览器哪是标题、哪是段落
```

### 6.2 HTML基本结构

**标准HTML模板：**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网页标题</title>
</head>
<body>
    <!-- 这里是网页内容 -->
</body>
</html>
```

**各部分详解：**

1. **`<!DOCTYPE html>`**
   - 声明这是HTML5文档
   - 必须放在第一行

2. **`<html>`**
   - 根元素，包含整个网页
   - `lang`属性说明页面语言

3. **`<head>`**
   - 网页的"头部"
   - 不在页面显示
   - 包含元数据、样式、脚本

4. **`<meta>`**
   - 定义页面元数据
   - charset: 字符编码
   - viewport: 移动端适配

5. **`<title>`**
   - 浏览器标签显示的标题
   - 收藏夹的名称

6. **`<body>`**
   - 网页的主要内容
   - 用户可见的部分

### 6.3 常用HTML标签

#### 6.3.1 文本标签

```html
<!-- 标题（h1-h6，从大到小） -->
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
...
<h6>六级标题</h6>

<!-- 段落 -->
<p>这是一个段落</p>
<p>这是另一个段落</p>

<!-- 换行 -->
第一行<br>
第二行

<!-- 水平线 -->
<hr>

<!-- 文本格式化 -->
<strong>粗体（重要）</strong>
<em>斜体（强调）</em>
<u>下划线</u>
<s>删除线</s>
<mark>高亮</mark>
<small>小字</small>

<!-- 预格式化文本（保留空格和换行） -->
<pre>
    def hello():
        print("Hello")
</pre>
```

#### 6.3.2 列表标签

```html
<!-- 无序列表（圆点） -->
<ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>橙子</li>
</ul>

<!-- 有序列表（数字） -->
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>

<!-- 嵌套列表 -->
<ul>
    <li>水果
        <ul>
            <li>苹果</li>
            <li>香蕉</li>
        </ul>
    </li>
    <li>蔬菜
        <ul>
            <li>白菜</li>
            <li>萝卜</li>
        </ul>
    </li>
</ul>
```

#### 6.3.3 链接和图片

```html
<!-- 链接 -->
<a href="https://www.baidu.com">百度</a>
<a href="about.html">关于我们</a>
<a href="#section1">跳到章节1</a>

<!-- 在新标签页打开 -->
<a href="https://www.example.com" target="_blank">打开网站</a>

<!-- 图片 -->
<img src="photo.jpg" alt="照片描述">
<img src="images/logo.png" alt="公司logo">

<!-- 图片链接 -->
<a href="https://www.example.com">
    <img src="banner.jpg" alt="横幅">
</a>
```

#### 6.3.4 表格

```html
<table>
    <thead>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>城市</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>25</td>
            <td>北京</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>30</td>
            <td>上海</td>
        </tr>
    </tbody>
</table>

<!-- 标签说明：
table  - 表格
tr     - 行（table row）
th     - 表头单元格（table header）
td     - 数据单元格（table data）
thead  - 表头区域
tbody  - 表体区域
-->
```

#### 6.3.5 表单

```html
<form action="/submit" method="POST">
    <!-- 文本输入 -->
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username">

    <!-- 密码输入 -->
    <label for="password">密码：</label>
    <input type="password" id="password" name="password">

    <!-- 邮箱输入 -->
    <input type="email" placeholder="example@mail.com">

    <!-- 数字输入 -->
    <input type="number" min="0" max="100" value="50">

    <!-- 单选按钮 -->
    <input type="radio" name="gender" value="male" id="male">
    <label for="male">男</label>
    <input type="radio" name="gender" value="female" id="female">
    <label for="female">女</label>

    <!-- 复选框 -->
    <input type="checkbox" id="agree">
    <label for="agree">同意条款</label>

    <!-- 下拉选择 -->
    <select name="city">
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </select>

    <!-- 文本域 -->
    <textarea name="message" rows="5" cols="30"></textarea>

    <!-- 按钮 -->
    <button type="submit">提交</button>
    <button type="reset">重置</button>
</form>
```

#### 6.3.6 容器标签

```html
<!-- div：通用容器（块级） -->
<div class="container">
    <div class="header">头部</div>
    <div class="content">内容</div>
    <div class="footer">底部</div>
</div>

<!-- span：通用容器（行内） -->
<p>
    这是一段文字，
    <span style="color: red;">这是红色文字</span>，
    继续其他内容。
</p>

<!-- 语义化标签 -->
<header>头部</header>
<nav>导航</nav>
<main>主要内容</main>
<aside>侧边栏</aside>
<footer>底部</footer>
<article>文章</article>
<section>章节</section>
```

### 6.4 HTML属性

**基本语法：**
```html
<标签名 属性1="值1" 属性2="值2">内容</标签名>
```

**常见属性：**

```html
<!-- id：唯一标识符 -->
<div id="main-content">主要内容</div>

<!-- class：类名（可多个元素共用） -->
<div class="container">
    <p class="text-primary">重要文字</p>
    <p class="text-secondary">次要文字</p>
</div>

<!-- style：内联样式 -->
<p style="color: red; font-size: 20px;">红色大字</p>

<!-- title：鼠标悬停提示 -->
<button title="点击保存">保存</button>

<!-- data-*：自定义数据 -->
<div data-id="123" data-name="产品">内容</div>

<!-- aria-*：无障碍属性 -->
<button aria-label="关闭对话框">×</button>
```

---

## 第七章：CSS基础

### 7.1 CSS是什么？

**CSS = Cascading Style Sheets（层叠样式表）**
- 用于描述网页的外观
- 控制颜色、字体、布局、动画等
- 与HTML分离，便于维护

**类比理解：**
```
HTML = 房子的结构（墙、门、窗）
CSS  = 房子的装修（颜色、材质、布局）

HTML决定了"有什么"，
CSS决定了"长什么样"
```

### 7.2 CSS引入方式

#### 7.2.1 内联样式

```html
<!-- 直接在标签中写style属性 -->
<p style="color: red; font-size: 20px;">
    这是红色的大字
</p>
```

**缺点：**
- 难以维护
- 代码重复
- 不推荐使用

#### 7.2.2 内部样式表

```html
<head>
    <style>
        p {
            color: red;
            font-size: 20px;
        }

        .highlight {
            background-color: yellow;
        }
    </style>
</head>
```

#### 7.2.3 外部样式表（推荐）

```html
<!-- 在HTML中引入 -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>

<!-- styles.css文件内容： -->
p {
    color: red;
    font-size: 20px;
}

.highlight {
    background-color: yellow;
}
```

### 7.3 CSS选择器

#### 7.3.1 基本选择器

```css
/* 1. 元素选择器 */
p {
    color: red;
}

h1 {
    font-size: 32px;
}

/* 2. 类选择器（最常用） */
.button {
    padding: 10px 20px;
    background: blue;
    color: white;
}

.text-center {
    text-align: center;
}

/* 3. ID选择器（唯一） */
#header {
    background: #333;
    color: white;
}

/* 4. 通配符选择器 */
* {
    margin: 0;
    padding: 0;
}
```

#### 7.3.2 组合选择器

```css
/* 后代选择器（空格分隔） */
.container p {
    color: blue;
}
/* 选择.container内所有<p>元素 */

/* 子元素选择器 */
.menu > li {
    display: inline-block;
}
/* 只选择.menu的直接子元素<li> */

/* 相邻兄弟选择器 */
h2 + p {
    font-weight: bold;
}
/* 选择紧跟在h2后的p */

/* 伪类选择器 */
a:hover {
    color: red;
}
/* 鼠标悬停时的样式 */

input:focus {
    border-color: blue;
}
/* 获得焦点时的样式 */

/* 伪元素选择器 */
p::before {
    content: "→ ";
}
/* 在每个p前面添加箭头 */
```

#### 7.3.3 优先级

**优先级规则（从高到低）：**
1. !important
2. 内联样式
3. ID选择器
4. 类选择器、伪类
5. 元素选择器

```css
/* 优先级示例 */
p {
    color: red !important;  /* 最高优先级 */
}

#text {
    color: blue;  /* ID选择器，优先级高 */
}

.text {
    color: green;  /* 类选择器，优先级中 */
}

p {
    color: yellow;  /* 元素选择器，优先级低 */
}
```

### 7.4 CSS盒模型

**什么是盒模型？**
- 每个HTML元素都是一个矩形盒子
- 由内容、内边距、边框、外边距组成

```
┌─────────────────────────────────────┐
│         margin（外边距）            │
│  ┌───────────────────────────────┐ │
│  │     border（边框）            │ │
│  │  ┌─────────────────────────┐ │ │
│  │  │  padding（内边距）      │ │ │
│  │  │  ┌───────────────────┐ │ │ │
│  │  │  │  content（内容）   │ │ │ │
│  │  │  │                   │ │ │ │
│  │  │  └───────────────────┘ │ │ │
│  │  └─────────────────────────┘ │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**相关CSS属性：**

```css
.box {
    /* 内容区域 */
    width: 200px;
    height: 100px;

    /* 内边距（内容到边框） */
    padding: 10px;           /* 四周10px */
    padding: 10px 20px;      /* 上下10px 左右20px */
    padding: 10px 20px 30px; /* 上10px 左右20px 下30px */
    padding: 10px 20px 30px 40px; /* 上右下左 */

    /* 边框 */
    border: 1px solid #ccc;   /* 宽度 样式 颜色 */
    border-width: 2px;
    border-style: solid;      /* solid/dashed/dotted/double */
    border-color: #333;
    border-radius: 5px;       /* 圆角 */

    /* 外边距（盒子到其他盒子） */
    margin: 20px;
    margin: 10px auto;        /* 上下10px 左右自动居中 */
}
```

**box-sizing属性：**

```css
/* 默认值（content-box）：width只包含内容 */
.content-box {
    box-sizing: content-box;
    width: 200px;
    padding: 20px;  /* 总宽度 = 200 + 20*2 = 240px */
}

/* 推荐（border-box）：width包含内容+内边距+边框 */
.border-box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;  /* 总宽度 = 200px，内容自动减少 */
}
```

### 7.5 CSS布局

#### 7.5.1 Display属性

```css
/* 块级元素（独占一行） */
.block {
    display: block;
}
/* 例如：div, p, h1, ul, li */

/* 行内元素（不独占一行） */
.inline {
    display: inline;
}
/* 例如：span, a, img, strong */

/* 行内块（不独占一行，但可以设置宽高） */
.inline-block {
    display: inline-block;
}

/* 隐藏元素 */
.hidden {
    display: none;
}
```

#### 7.5.2 Position定位

```css
/* 默认定位（文档流） */
.static {
    position: static;
}

/* 相对定位（相对于自身原位置） */
.relative {
    position: relative;
    top: 10px;      /* 向下移动10px */
    left: 20px;     /* 向右移动20px */
}

/* 绝对定位（相对于最近的定位祖先元素） */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}
/* 常用于：固定在某个角落的元素 */

/* 固定定位（相对于浏览器窗口） */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
/* 常用于：返回顶部按钮、客服窗口 */

/* 粘性定位（滚动到某个位置时固定） */
.sticky {
    position: sticky;
    top: 0;
}
/* 常用于：吸顶导航栏 */
```

#### 7.5.3 Float浮动

```css
.left {
    float: left;
}

.right {
    float: right;
}

/* 清除浮动 */
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}
```

#### 7.5.4 Flexbox布局（现代布局方式）

```css
/* 创建flex容器 */
.container {
    display: flex;

    /* 主轴方向 */
    flex-direction: row;         /* 水平（默认） */
    flex-direction: column;      /* 垂直 */

    /* 换行 */
    flex-wrap: wrap;           /* 允许换行 */
    flex-wrap: nowrap;         /* 不换行（默认） */

    /* 主轴对齐 */
    justify-content: flex-start;    /* 左对齐 */
    justify-content: center;       /* 居中 */
    justify-content: space-between; /* 两端对齐 */
    justify-content: space-around;  /* 分散对齐 */

    /* 交叉轴对齐 */
    align-items: center;       /* 居中 */
    align-items: stretch;     /* 拉伸（默认） */

    /* 简写 */
    flex-flow: row wrap;
}

/* flex项目属性 */
.item {
    flex: 1;               /* 占据剩余空间 */
    flex: 1 1 200px;       /* grow shrink basis */
    order: 1;              /* 排序顺序 */
    align-self: center;     /* 自身对齐 */
}

/* 应用示例：水平垂直居中 */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 7.6 CSS颜色

**颜色表示方法：**

```css
/* 1. 颜色名称 */
color: red;
color: blue;
color: green;

/* 2. 十六进制（#RRGGBB） */
color: #FF0000;  /* 红色 */
color: #00FF00;  /* 绿色 */
color: #0000FF;  /* 蓝色 */
color: #000000;  /* 黑色 */
color: #FFFFFF;  /* 白色 */
color: #333;     /* 简写：#333333 */

/* 3. RGB函数 */
color: rgb(255, 0, 0);     /* 红色 */
color: rgb(255, 255, 255); /* 白色 */
color: rgb(128, 128, 128); /* 灰色 */

/* 4. RGBA函数（带透明度） */
color: rgba(255, 0, 0, 0.5);  /* 半透明红色 */
color: rgba(0, 0, 0, 0.1);    /* 淡黑色 */

/* 5. HSL函数（色相、饱和度、亮度） */
color: hsl(0, 100%, 50%);     /* 红色 */
color: hsl(120, 100%, 50%);   /* 绿色 */
```

### 7.7 常用CSS属性

#### 7.7.1 文字样式

```css
.text {
    /* 字体大小 */
    font-size: 16px;
    font-size: 1.2em;    /* 相对父元素 */
    font-size: 1.2rem;   /* 相对根元素 */

    /* 字体粗细 */
    font-weight: normal;  /* 正常 */
    font-weight: bold;    /* 粗体 */
    font-weight: 100-900; /* 100-900数字 */

    /* 字体家族 */
    font-family: Arial, sans-serif;
    font-family: "微软雅黑", sans-serif;

    /* 文字颜色 */
    color: #333;

    /* 文本对齐 */
    text-align: left;    /* 左对齐 */
    text-align: center;  /* 居中 */
    text-align: right;   /* 右对齐 */
    text-align: justify; /* 两端对齐 */

    /* 文本装饰 */
    text-decoration: none;        /* 无装饰 */
    text-decoration: underline;   /* 下划线 */
    text-decoration: line-through;/* 删除线 */

    /* 文本阴影 */
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);

    /* 行高 */
    line-height: 1.5;  /* 行距为字体的1.5倍 */

    /* 字间距 */
    letter-spacing: 2px;
}
```

#### 7.7.2 背景样式

```css
.box {
    /* 背景颜色 */
    background-color: #f0f0f0;

    /* 背景图片 */
    background-image: url('bg.jpg');

    /* 背景重复 */
    background-repeat: no-repeat;
    background-repeat: repeat-x;  /* 水平重复 */
    background-repeat: repeat-y;  /* 垂直重复 */

    /* 背景位置 */
    background-position: center;
    background-position: top right;
    background-position: 10px 20px;

    /* 背景大小 */
    background-size: cover;     /* 覆盖整个元素 */
    background-size: contain;   /* 完整显示图片 */
    background-size: 100% 100%; /* 拉伸填充 */

    /* 简写 */
    background: #f0f0f0 url('bg.jpg') no-repeat center;
}
```

#### 7.7.3 边框样式

```css
.border {
    /* 边框宽度 */
    border-width: 1px;

    /* 边框样式 */
    border-style: solid;    /* 实线 */
    border-style: dashed;   /* 虚线 */
    border-style: dotted;   /* 点线 */
    border-style: double;   /* 双线 */

    /* 边框颜色 */
    border-color: #ccc;

    /* 圆角 */
    border-radius: 5px;         /* 四角相同 */
    border-radius: 10px 20px;   /* 左上右下10px 右上左下20px */
    border-radius: 50%;          /* 圆形 */

    /* 分别设置四边 */
    border-top: 1px solid #ccc;
    border-right: 2px dashed #999;
    border-bottom: 1px solid #ccc;
    border-left: 2px dashed #999;

    /* 简写 */
    border: 1px solid #ccc;
}
```

#### 7.7.4 阴影效果

```css
.box-shadow {
    /* 盒子阴影：x偏移 y偏移 模糊 扩展 颜色 */
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);

    /* 多个阴影 */
    box-shadow:
        0 1px 3px rgba(0,0,0,0.12),
        0 1px 2px rgba(0,0,0,0.24);

    /* 内阴影 */
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
}

.text-shadow {
    /* 文字阴影：x偏移 y偏移 模糊 颜色 */
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
```

---

## 第八章：JavaScript基础

### 8.1 JavaScript是什么？

**JavaScript（简称JS）：**
- 一种编程语言
- 在浏览器中运行
- 让网页"动起来"
- 与Java完全不同的语言

**类比理解：**
```
HTML  = 网页的骨架（身体）
CSS   = 网页的化妆师（外表）
JS    = 网页的大脑（行为和交互）

有了JS，网页可以：
- 响应用户操作（点击、输入）
- 动态更新内容
- 与服务器通信
- 创建动画效果
```

### 8.2 JavaScript引入方式

#### 8.2.1 内联方式

```html
<!-- 直接在HTML标签中写JS -->
<button onclick="alert('你好！')">点击我</button>
```

#### 8.2.2 内部脚本

```html
<head>
    <script>
        function hello() {
            alert('你好！');
        }
    </script>
</head>
```

#### 8.2.3 外部脚本（推荐）

```html
<!-- 引用外部JS文件 -->
<script src="app.js"></script>

<!-- app.js内容： -->
function hello() {
    alert('你好！');
}
```

### 8.3 JavaScript基础语法

#### 8.3.1 变量

```javascript
// var（旧方式，不推荐）
var name = "小明";

// let（推荐，可变的变量）
let age = 18;
age = 19;  // 可以重新赋值

// const（推荐，不可变的常量）
const pi = 3.14159;
// pi = 3.14;  // 错误！不能重新赋值

// 变量命名规则
let userName = "小明";  // 驼峰命名法
let user_name = "小明";  // 下划线命名
let $special = "特殊";   // 可以用$开头
let _private = "私有";   // 可以用_开头

// 错误命名
// let 2name = "错误";    // 不能以数字开头
// let user-name = "错误";  // 不能用减号
// let class = "错误";     // 不能用保留字
```

#### 8.3.2 数据类型

```javascript
// 1. 数字
let 整数 = 100;
let 浮点数 = 3.14;
let 负数 = -10;
let 科学计数 = 1.5e10;  // 15000000000

// 2. 字符串
let 单引号 = '单引号字符串';
let 双引号 = "双引号字符串";
let 模板字符串 = `模板字符串，可以${变量}插值`;

let 名字 = "小明";
let 问候 = `你好，${名字}！`;  // "你好，小明！"

// 3. 布尔值
let 是真的 = true;
let 是假的 = false;

// 4. null（空值）
let 空值 = null;

// 5. undefined（未定义）
let 未定义;
console.log(未定义);  // undefined

// 6. 数组
let 数组 = [1, 2, 3, 4, 5];
let 混合数组 = [1, "文字", true, null];

// 访问数组元素
console.log(数组[0]);  // 1
console.log(数组[数组.length - 1]);  // 5（最后一个）

// 数组方法
数组.push(6);      // 添加到末尾
数组.pop();        // 删除末尾元素
数组.shift();      // 删除第一个元素
数组.unshift(0);   // 添加到开头

// 7. 对象
let 对象 = {
    名字: "小明",
    年龄: 18,
    城市: "北京",
    问候: function() {
        console.log("你好！");
    }
};

// 访问对象属性
console.log(对象.名字);        // "小明"
console.log(对象["年龄"]);      // 18
对象.问候();                   // 调用方法
```

#### 8.3.3 运算符

```javascript
// 算术运算符
let a = 10, b = 3;
console.log(a + b);    // 13（加）
console.log(a - b);    // 7（减）
console.log(a * b);    // 30（乘）
console.log(a / b);    // 3.333...（除）
console.log(a % b);    // 1（取余）
console.log(a ** b);   // 1000（幂）

// 比较运算符
console.log(5 == "5");    // true（相等，类型转换）
console.log(5 === "5");   // false（严格相等，不转换类型）
console.log(5 != "5");    // false
console.log(5 !== "5");   // true
console.log(5 > 3);       // true
console.log(5 >= 5);      // true

// 逻辑运算符
console.log(true && false);  // false（与）
console.log(true || false);  // true（或）
console.log(!true);          // false（非）

// 字符串拼接
let msg = "Hello " + "World";  // "Hello World"

// 模板字符串（推荐）
let name = "小明";
let age = 18;
let info = `我叫${name}，今年${age}岁`;

// 赋值运算符
let x = 10;
x += 5;   // x = x + 5，结果是15
x -= 3;   // x = x - 3，结果是12
x *= 2;   // x = x * 2，结果是24
x /= 4;   // x = x / 4，结果是6

// 自增自减
let i = 0;
i++;      // i = 1（后置）
++i;      // i = 2（前置）
i--;      // i = 1
--i;      // i = 0
```

#### 8.3.4 条件语句

```javascript
// if语句
let score = 85;

if (score >= 90) {
    console.log("优秀");
} else if (score >= 80) {
    console.log("良好");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}

// 三元运算符
let result = score >= 60 ? "及格" : "不及格";

// switch语句
let day = 1;
switch (day) {
    case 1:
        console.log("星期一");
        break;
    case 2:
        console.log("星期二");
        break;
    default:
        console.log("其他");
}
```

#### 8.3.5 循环

```javascript
// for循环
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// while循环
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}

// do-while循环
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 10);

// for-in循环（遍历对象）
let person = {name: "小明", age: 18};
for (let key in person) {
    console.log(key + ": " + person[key]);
}

// for-of循环（遍历数组）
let fruits = ["苹果", "香蕉", "橙子"];
for (let fruit of fruits) {
    console.log(fruit);
}

// 数组的forEach方法
fruits.forEach(function(fruit, index) {
    console.log(index + ": " + fruit);
});

// break和continue
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;  // 跳出循环
    }
    if (i === 3) {
        continue;  // 跳过本次
    }
    console.log(i);
}
```

#### 8.3.6 函数

```javascript
// 函数声明
function 函数名(参数1, 参数2) {
    // 函数体
    return 返回值;
}

// 示例
function add(a, b) {
    return a + b;
}

let result = add(5, 3);  // 8

// 函数表达式
const multiply = function(a, b) {
    return a * b;
};

// 箭头函数（ES6，推荐）
const divide = (a, b) => a / b;

// 多个参数
const sum = (a, b, c) => a + b + c;

// 多条语句
const complex = (a, b) => {
    let temp = a + b;
    return temp * 2;
};

// 默认参数
function greet(name = "朋友") {
    console.log("你好，" + name);
}
greet();        // "你好，朋友"
greet("小明");  // "你好，小明"

// 剩余参数
function sumAll(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
sumAll(1, 2, 3, 4);  // 10
```

#### 8.3.7 数组方法

```javascript
let nums = [1, 2, 3, 4, 5];

// map：转换数组
let doubled = nums.map(x => x * 2);  // [2, 4, 6, 8, 10]

// filter：过滤数组
let evens = nums.filter(x => x % 2 === 0);  // [2, 4]

// reduce：累加
let sum = nums.reduce((acc, x) => acc + x, 0);  // 15

// find：查找元素
let found = nums.find(x => x > 3);  // 4

// indexOf：查找索引
let index = nums.indexOf(3);  // 2

// includes：是否包含
let hasFive = nums.includes(5);  // true

// slice：截取数组
let part = nums.slice(1, 4);  // [2, 3, 4]

// splice：删除/插入元素
nums.splice(2, 1);  // 从索引2删除1个元素

// push/pop：操作末尾
nums.push(6);  // 添加到末尾
let last = nums.pop();  // 删除并返回末尾

// shift/unshift：操作开头
nums.unshift(0);  // 添加到开头
let first = nums.shift();  // 删除并返回开头

// sort：排序
nums.sort((a, b) => a - b);  // 升序
nums.sort((a, b) => b - a);  // 降序

// reverse：反转
nums.reverse();
```

### 8.4 DOM操作

**DOM = Document Object Model（文档对象模型）**
- 将HTML文档表示为树形结构
- JS可以通过DOM操作HTML元素

#### 8.4.1 选择元素

```javascript
// 根据ID选择（返回单个元素）
let elem = document.getElementById("myId");

// 根据类名选择（返回NodeList）
let elems = document.getElementsByClassName("myClass");

// 根据标签名选择
let divs = document.getElementsByTagName("div");

// CSS选择器（推荐）
let elem = document.querySelector("#myId");       // 单个
let elems = document.querySelectorAll(".myClass"); // 多个

// 选择器示例
document.querySelector("div");              // 第一个div
document.querySelector("#header");          // id为header
document.querySelector(".active");          // class为active
document.querySelector("button.btn-primary"); // class为btn-primary的button
document.querySelectorAll("li");           // 所有li
document.querySelectorAll("#menu li");      // #menu下的所有li
```

#### 8.4.2 修改元素

```javascript
let elem = document.querySelector("#myElement");

// 修改内容
elem.textContent = "纯文本内容";  // 设置文本
elem.innerHTML = "<strong>HTML内容</strong>";  // 设置HTML

// 修改属性
elem.id = "newId";
elem.className = "newClass anotherClass";
elem.setAttribute("data-value", "123");

// 修改样式
elem.style.color = "red";
elem.style.fontSize = "20px";
elem.style.backgroundColor = "#f0f0f0";

// 添加/移除class
elem.classList.add("active");
elem.classList.remove("inactive");
elem.classList.toggle("highlight");  // 有则删除，无则添加
elem.classList.contains("active");  // 是否包含

// 修改表单元素
input.value = "新值";
checkbox.checked = true;
select.value = "option2";
```

#### 8.4.3 创建和删除元素

```javascript
// 创建元素
let newDiv = document.createElement("div");
newDiv.textContent = "新元素";
newDiv.className = "item";

// 添加到文档
document.body.appendChild(newDiv);
parentElement.insertBefore(newDiv, referenceElement);

// 删除元素
elem.remove();
parentElement.removeChild(childElement);

// 替换元素
parentElement.replaceChild(newElement, oldElement);
```

### 8.5 事件处理

```javascript
// 方式1：HTML属性（不推荐）
<button onclick="alert('点击！')">按钮</button>

// 方式2：元素属性
button.onclick = function() {
    alert("点击！");
};

// 方式3：addEventListener（推荐）
button.addEventListener("click", function() {
    alert("点击！");
});

// 使用箭头函数
button.addEventListener("click", () => {
    alert("点击！");
});

// 常见事件类型
click        // 点击
dblclick     // 双击
mousedown    // 鼠标按下
mouseup      // 鼠标释放
mousemove    // 鼠标移动
mouseover    // 鼠标悬停
mouseout     // 鼠标离开
keydown      // 键盘按下
keyup        // 键盘释放
submit       // 表单提交
load         // 页面加载完成
resize       // 窗口大小改变

// 事件对象
button.addEventListener("click", function(event) {
    console.log(event.type);      // 事件类型
    console.log(event.target);     // 触发事件的元素
    console.log(event.clientX);    // 鼠标X坐标
    console.log(event.clientY);    // 鼠标Y坐标
    event.preventDefault();        // 阻止默认行为
    event.stopPropagation();       // 停止事件冒泡
});

// 事件委托
document.querySelector("#list").addEventListener("click", function(event) {
    if (event.target.classList.contains("item")) {
        // 处理点击.item元素
    }
});
```

### 8.6 异步编程

#### 8.6.1 回调函数

```javascript
// 传统异步方式
function fetchData(callback) {
    setTimeout(() => {
        callback("数据加载完成");
    }, 1000);
}

fetchData(function(data) {
    console.log(data);
});
```

#### 8.6.2 Promise

```javascript
// 创建Promise
let promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        let success = true;
        if (success) {
            resolve("成功！");
        } else {
            reject("失败！");
        }
    }, 1000);
});

// 使用Promise
promise
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log("完成"));

// Promise链
promise
    .then(data => {
        console.log(data);
        return "下一步数据";
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
```

#### 8.6.3 async/await（推荐）

```javascript
// async函数返回Promise
async function fetchData() {
    let response = await fetch('/api/data');
    let data = await response.json();
    return data;
}

// 使用
fetchData().then(data => console.log(data));

// 错误处理
async function getData() {
    try {
        let response = await fetch('/api/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("出错了：", error);
    }
}

// Promise.all：并行执行
let [data1, data2] = await Promise.all([
    fetch('/api/1').then(r => r.json()),
    fetch('/api/2').then(r => r.json())
]);
```

### 8.7 Fetch API

```javascript
// GET请求
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// POST请求
fetch('/api/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: '小明',
        age: 18
    })
})
    .then(response => response.json())
    .then(data => console.log(data));

// async/await版本
async function getData() {
    try {
        let response = await fetch('/api/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

---

## 本章小结

### 学习检查清单

**HTML基础：**
- [ ] 理解HTML的基本结构
- [ ] 掌握常用HTML标签
- [ ] 了解表单和表格

**CSS基础：**
- [ ] 理解选择器的使用
- [ ] 掌握盒模型
- [ ] 了解Flexbox布局
- [ ] 能制作简单的页面样式

**JavaScript基础：**
- [ ] 掌握变量和数据类型
- [ ] 理解函数和作用域
- [ ] 能操作DOM元素
- [ ] 理解异步编程
- [ ] 能使用Fetch API

**下章预告：**
- Flask框架详解
- 后端API开发
- 图像处理入门
- OpenCV基础操作

---

*第二部分完成*

## 继续学习请阅读：
[教程03：Flask框架与图像处理](/posts/教程03-flask框架与图像处理/)
