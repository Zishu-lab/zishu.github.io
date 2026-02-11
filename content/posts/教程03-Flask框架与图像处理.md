---
title: "二维码扫描系统教程（三）：Flask框架与图像处理"
date: 2026-02-11
draft: false
tags: ["Flask", "OpenCV", "图像处理", "Python", "教程"]
categories: ["技术教程"]
description: "深入学习Flask Web框架和OpenCV图像处理技术，详细介绍二维码识别算法和位置估算原理，构建完整的后端服务。"
---

# 二维码扫描系统 - 零基础完整教程

## 第三部分：Flask框架与图像处理

---

## 第九章：Flask框架详解

### 9.1 什么是Flask？

**Flask的定义：**
- 一个轻量级的Python Web框架
- 用于构建Web应用程序和API
- 被称为"微框架"（Microframework）

**类比理解：**

```
Web框架 = 建房子的工具和预制件

没有框架：
  - 需要从零开始造砖
  - 自己设计门窗
  - 自己铺设水管
  - 繁琐且容易出错

有框架：
  - 砖块已经预制好
  - 门窗有标准尺寸
  - 水管有标准接口
  - 快速且可靠

Flask提供：
  - 路由系统（URL到函数的映射）
  - 模板引擎（HTML页面渲染）
  - 请求处理（接收用户数据）
  - 响应返回（发送数据给用户）
```

### 9.2 Flask安装与入门

#### 9.2.1 虚拟环境

**为什么需要虚拟环境？**
- 不同项目需要不同版本的库
- 避免全局环境污染
- 方便项目迁移

**类比理解：**
```
虚拟环境 = 每个项目独立的"工作间"

全局环境 = 公共厨房（大家都用，容易冲突）
虚拟环境 = 独立厨房（各用各的，互不影响）

项目A用自己的Python和库
项目B用自己的Python和库
两者互不干扰
```

**创建和使用虚拟环境：**

```bash
# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
# Linux/Mac:
source venv/bin/activate

# Windows:
venv\Scripts\activate

# 退出虚拟环境
deactivate
```

#### 9.2.2 安装Flask

```bash
# 在虚拟环境中安装
pip install flask

# 验证安装
python -c "import flask; print(flask.__version__)"
```

### 9.3 第一个Flask应用

#### 9.3.1 最简单的应用

```python
# app.py
from flask import Flask

# 创建Flask应用实例
app = Flask(__name__)

# 定义路由
@app.route('/')
def hello():
    return '你好，世界！'

# 运行应用
if __name__ == '__main__':
    app.run(debug=True)
```

**运行应用：**
```bash
python app.py
# 访问 http://127.0.0.1:5000
```

**代码详解：**

```python
# 1. 导入Flask类
from flask import Flask

# 2. 创建应用实例
# __name__ 是Python内置变量
# 告诉Flask在哪里找模板和静态文件
app = Flask(__name__)

# 3. 路由装饰器
# @app.route('/') 告诉Flask：
# "当用户访问根路径 / 时，调用下面的函数"
@app.route('/')
def hello():
    return '你好，世界！'

# 4. 运行应用
# debug=True 开启调试模式
#   - 代码改动自动重启
#   - 出错时显示调试信息
if __name__ == '__main__':
    app.run(debug=True)
```

#### 9.3.2 路由详解

**基本路由：**

```python
from flask import Flask
app = Flask(__name__)

# 根路径
@app.route('/')
def index():
    return '首页'

# 多级路径
@app.route('/user/profile')
def profile():
    return '用户资料'

# 带变量的路径
@app.route('/user/<username>')
def show_user(username):
    return f'用户：{username}'

# 带类型限制的变量
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'文章ID：{post_id}'

# 多个变量
@app.route('/user/<username>/post/<int:post_id>')
def user_post(username, post_id):
    return f'{username}的文章{post_id}'
```

**HTTP方法：**

```python
# 默认只响应GET请求
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # 处理登录
        return '登录中...'
    else:
        # 显示登录表单
        return '登录表单'
```

### 9.4 请求与响应

#### 9.4.1 Request对象

```python
from flask import request

@app.route('/search')
def search():
    # 获取URL参数：?keyword=python
    keyword = request.args.get('keyword', '')
    return f'搜索：{keyword}'

@app.route('/login', methods=['POST'])
def login():
    # 获取表单数据
    username = request.form.get('username')
    password = request.form.get('password')
    return f'用户：{username}'

@app.route('/api/data', methods=['POST'])
def api_data():
    # 获取JSON数据
    data = request.get_json()
    return data

@app.route('/upload', methods=['POST'])
def upload():
    # 获取上传的文件
    file = request.files['file']
    file.save('uploads/' + file.filename)
    return '上传成功'

# 其他request属性
@app.route('/info')
def info():
    info = {
        'url': request.url,           # 完整URL
        'path': request.path,         # 路径
        'method': request.method,     # HTTP方法
        'ip': request.remote_addr,    # 客户端IP
        'headers': dict(request.headers)  # 请求头
    }
    return info
```

#### 9.4.2 Response对象

```python
from flask import Response, jsonify, redirect

# 返回JSON
@app.route('/api/stats')
def stats():
    data = {
        'users': 100,
        'posts': 500
    }
    return jsonify(data)

# 返回自定义状态码
@app.route('/not_found')
def not_found():
    return 'Not Found', 404

# 返回带头的响应
@app.route('/custom')
def custom():
    resp = Response('Custom Response')
    resp.headers['X-Custom-Header'] = 'Value'
    return resp

# 重定向
@app.route('/old')
def old_url():
    return redirect('/new')

@app.route('/new')
def new_url():
    return '新地址'
```

### 9.5 模板渲染

#### 9.5.1 模板基础

```python
from flask import render_template

@app.route('/')
def index():
    # 渲染模板
    return render_template('index.html')

# 传递变量给模板
@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)

# 传递多个变量
@app.route('/dashboard')
def dashboard():
    data = {
        'username': '小明',
        'age': 18,
        'posts': [
            {'title': '第一篇', 'content': '...'},
            {'title': '第二篇', 'content': '...'}
        ]
    }
    return render_template('dashboard.html', **data)
```

#### 9.5.2 模板语法

```html
<!-- templates/user.html -->
<!DOCTYPE html>
<html>
<head>
    <title>用户资料</title>
</head>
<body>
    <!-- 变量 -->
    <h1>欢迎，{{ name }}！</h1>

    <!-- 条件 -->
    {% if age >= 18 %}
        <p>你已成年</p>
    {% else %}
        <p>你还未成年</p>
    {% endif %}

    <!-- 循环 -->
    <h2>文章列表</h2>
    <ul>
    {% for post in posts %}
        <li>{{ post.title }}</li>
    {% endfor %}
    </ul>

    <!-- 过滤器 -->
    <p>{{ name|upper }}</p>           <!-- 转大写 -->
    <p>{{ content|safe }}</p>         <!-- 不转义HTML -->
    <p="{{ price|default('0.00') }}"  <!-- 默认值 -->
    <p>{{ text|truncate(50) }}</p>    <!-- 截断 -->
</body>
</html>
```

### 9.6 Flask在项目中的应用

#### 9.6.1 项目结构

```
project/
├── app.py              # 主应用文件
├── templates/          # 模板文件夹
│   └── index.html
└── static/            # 静态文件
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

#### 9.6.2 本项目的Flask应用

```python
# qr_scanner_server_simple.py

from flask import Flask, render_template, Response, jsonify
from flask_cors import CORS

# 创建应用
app = Flask(__name__,
            template_folder='templates',
            static_folder='static')
CORS(app)  # 允许跨域请求

# 全局扫描器实例
scanner = None

# 路由：主页
@app.route('/')
def index():
    return render_template('index.html')

# 路由：视频流
@app.route('/video_feed')
def video_feed():
    return Response(
        scanner.get_frame_generator(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

# 路由：统计信息
@app.route('/api/stats')
def api_stats():
    stats = scanner.get_stats()
    return jsonify(stats)

# 路由：控制接口
@app.route('/api/control/start', methods=['POST'])
def api_start():
    scanner.start()
    return jsonify({'status': 'started'})

@app.route('/api/control/stop', methods=['POST'])
def api_stop():
    scanner.stop()
    return jsonify({'status': 'stopped'})

# 运行应用
if __name__ == '__main__':
    # 初始化扫描器
    scanner = QRScannerServer(...)
    scanner.start()

    # 启动Web服务器
    app.run(host='0.0.0.0', port=5000)
```

---

## 第十章：图像处理基础

### 10.1 什么是数字图像？

#### 10.1.1 图像的本质

**数字图像 = 数字矩阵**

```
一张灰度图像：
[ 50  100  150  200 ]
[ 60  110  160  210 ]
[ 70  120  170  220 ]

每个数字代表一个像素的亮度（0-255）
0 = 黑色，255 = 白色

一张彩色图像（RGB）：
每个像素有3个值（R, G, B）
[ (255,0,0)   (0,255,0)   (0,0,255) ]  红  绿  蓝
[ (255,255,0) (255,0,255) (0,255,255) ]  黄  紫  青
```

#### 10.1.2 图像的基本属性

```python
# 图像属性
高度      # 图像的高度（像素数）
宽度      # 图像的宽度（像素数）
通道数    # 1=灰度，3=彩色（RGB）
数据类型   # 通常是uint8（0-255）
总像素数   = 宽度 × 高度
```

**实际例子：**
```python
# 640×480的彩色图像
- 宽度：640像素
- 高度：480像素
- 通道数：3（RGB）
- 总像素数：640 × 480 = 307,200
- 数据大小：307,200 × 3 = 921,600字节 ≈ 0.9MB
```

### 10.2 OpenCV入门

#### 10.2.1 OpenCV简介

**OpenCV = Open Source Computer Vision Library**
- 开源的计算机视觉库
- 支持Python、C++、Java等
- 2500+个优化算法
- 应用：人脸识别、物体检测、图像处理

**安装OpenCV：**
```bash
pip install opencv-python
```

#### 10.2.2 读取和显示图像

```python
import cv2

# 读取图像
# 第二个参数：
#   cv2.IMREAD_COLOR - 彩色图像（默认）
#   cv2.IMREAD_GRAYSCALE - 灰度图像
#   cv2.IMREAD_UNCHANGED - 包含透明通道
image = cv2.imread('photo.jpg')

# 检查是否成功
if image is None:
    print("无法读取图像")
else:
    print(f"图像尺寸：{image.shape}")
    # 输出：(高度, 宽度, 通道数)

# 显示图像
cv2.imshow('窗口名称', image)
cv2.waitKey(0)  # 等待按键
cv2.destroyAllWindows()  # 关闭所有窗口

# 保存图像
cv2.imwrite('output.jpg', image)
cv2.imwrite('output.png', image, [cv2.IMWRITE_PNG_COMPRESSION, 9])
```

#### 10.2.3 视频处理

```python
# 打开视频文件
cap = cv2.VideoCapture('video.mp4')

# 或打开摄像头
cap = cv2.VideoCapture(0)  # 0 = 第一个摄像头

# 检查是否成功打开
if not cap.isOpened():
    print("无法打开视频")
    exit()

# 获取视频属性
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(cap.get(cv2.CAP_PROP_FPS))

print(f"视频尺寸：{width}×{height}，帧率：{fps}")

# 逐帧处理
while True:
    # 读取一帧
    ret, frame = cap.read()

    # ret = 是否成功读取
    # frame = 图像数据（numpy数组）

    if not ret:
        break  # 视频结束

    # 处理帧（例如：转为灰度）
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 显示帧
    cv2.imshow('Frame', frame)
    cv2.imshow('Gray', gray)

    # 按'q'退出
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 释放资源
cap.release()
cv2.destroyAllWindows()
```

### 10.3 图像基本操作

#### 10.3.1 颜色空间转换

```python
# BGR转灰度
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# BGR转RGB
rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# BGR转HSV
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

# 为什么需要转换？
# OpenCV默认使用BGR格式（不是RGB！）
# 大多数图像库使用RGB
# 保存前或显示前需要转换
```

#### 10.3.2 图像裁剪和缩放

```python
# 裁剪图像 [y1:y2, x1:x2]
# 注意：numpy数组索引是 [行, 列]
# 行 = y方向，列 = x方向
cropped = image[100:400, 200:500]  # [y, x]

# 缩放图像
resized = cv2.resize(image, (640, 480))

# 按比例缩放
scale = 0.5
resized = cv2.resize(image, None, fx=scale, fy=scale)

# 保持宽高比缩放到固定宽度
target_width = 640
aspect_ratio = image.shape[0] / image.shape[1]
target_height = int(target_width * aspect_ratio)
resized = cv2.resize(image, (target_width, target_height))
```

#### 10.3.3 绘图操作

```python
import numpy as np
import cv2

# 创建空白图像
blank = np.zeros((480, 640, 3), dtype=np.uint8)

# 画直线
# cv2.line(图像, 起点, 终点, 颜色, 粗细)
cv2.line(blank, (0, 0), (640, 480), (255, 0, 0), 2)

# 画矩形
# cv2.rectangle(图像, 左上角, 右下角, 颜色, 粗细)
cv2.rectangle(blank, (100, 100), (300, 300), (0, 255, 0), 2)
# 粗细=-1表示填充
cv2.rectangle(blank, (350, 100), (550, 300), (0, 255, 0), -1)

# 画圆形
# cv2.circle(图像, 圆心, 半径, 颜色, 粗细)
cv2.circle(blank, (320, 240), 50, (0, 0, 255), 2)

# 画文字
# cv2.putText(图像, 文字, 位置, 字体, 大小, 颜色, 粗细)
cv2.putText(blank, 'Hello OpenCV', (50, 50),
            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

# 画多边形
points = np.array([[100, 100], [200, 50], [300, 100], [200, 150]], np.int32)
points = points.reshape((-1, 1, 2))
cv2.polylines(blank, [points], True, (255, 255, 0), 2)
```

### 10.4 图像滤波与边缘检测

#### 10.4.1 模糊处理

```python
# 高斯模糊（最常用）
blurred = cv2.GaussianBlur(image, (5, 5), 0)

# 均值模糊
blurred = cv2.blur(image, (5, 5))

# 中值模糊（去椒盐噪声）
blurred = cv2.medianBlur(image, 5)

# 双边滤波（保边模糊）
blurred = cv2.bilateralFilter(image, 9, 75, 75)

# 为什么需要模糊？
# - 降噪
# - 平滑图像
# - 为边缘检测做准备
```

#### 10.4.2 边缘检测

```python
# 转为灰度
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Canny边缘检测
edges = cv2.Canny(gray, threshold1=100, threshold2=200)

# 参数说明：
# threshold1: 第一个阈值（弱边缘）
# threshold2: 第二个阈值（强边缘）
# 值越大，检测到的边缘越少

# Sobel边缘检测
sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)  # x方向
sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)  # y方向

# Laplacian边缘检测
laplacian = cv2.Laplacian(gray, cv2.CV_64F)
```

---

## 第十一章：二维码识别算法

### 11.1 二维码原理

#### 11.1.1 QR码结构

```
┌────────────────────────────┐
│███  ████      ████  ████│  定位图案
│█   █  █      █   █  █  █│  (三个角的"回"字)
│█   █  █      █   █  █  █│
│███  ████      ████  ████│
│                          │
│      ████  ████  ████   │  定时图案
│      █  █  █  █  █  █   │  (交替的黑白线)
│      ████  ████  ████   │
│                          │
│    数据区域（编码内容）    │
│                          │
│    纠错码（用于恢复）      │
│                          │
│███  ████      ████  ████│
│█   █  █      █   █  █  █│
│█   █  █      █   █  █  █│
│███  ████      ████  ████│
└────────────────────────────┘
```

#### 11.1.2 二维码编码过程

```
原始数据："Hello"

1. 数据分析
   - 确定数据类型（数字/字母/汉字）
   - 选择最优编码模式

2. 数据编码
   - 转换为二进制
   "Hello" → 01001000 01100101 ...

3. 纠错编码
   - 使用Reed-Solomon算法
   - 生成纠错码（可以恢复损坏的数据）

4. 码字排列
   - 将数据和纠错码按规则排列

5. 掩码（Masking）
   - 应用掩码模式
   - 使图案分布更均匀

6. 添加功能图案
   - 定位图案（三个角的大方块）
   - 定时图案（黑白交替线）
   - 对齐图案（小方块，大码才有）

7. 最终二维码
```

### 11.2 二维码识别过程

```
输入图像
    ↓
┌───────────────────┐
│ 1. 预处理         │
│    - 灰度化        │
│    - 二值化        │
│    - 去噪          │
└───────────────────┘
    ↓
┌───────────────────┐
│ 2. 定位图案检测   │
│    - 找三个"回"字 │
│    - 确定二维码位置│
└───────────────────┘
    ↓
┌───────────────────┐
│ 3. 透视变换       │
│    - 矫正倾斜      │
│    - 变成正方形    │
└───────────────────┘
    ↓
┌───────────────────┐
│ 4. 采样           │
│    - 读取每个模块  │
│    - 确定黑/白     │
└───────────────────┘
    ↓
┌───────────────────┐
│ 5. 解码           │
│    - 去除掩码      │
│    - 纠错恢复      │
│    - 数据解码      │
└───────────────────┘
    ↓
输出："Hello"
```

### 11.3 Pyzbar库详解

#### 11.3.1 安装与使用

```bash
# 安装
pip install pyzbar

# Linux可能需要额外安装
sudo apt-get install libzbar0
```

#### 11.3.2 基本使用

```python
import cv2
from pyzbar.pyzbar import decode

# 读取图像
image = cv2.imread('qrcode.png')

# 转为灰度
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 解码二维码
barcodes = decode(gray)

# 遍历所有找到的条码
for barcode in barcodes:
    # 获取条码类型
    barcode_type = barcode.type
    # QRCODE, CODE128, EAN13等

    # 获取条码数据
    barcode_data = barcode.data.decode('utf-8')

    # 获取条码位置（多边形顶点）
    barcode_points = barcode.polygon
    # 或使用 rect (矩形)
    barcode_rect = barcode.rect

    print(f"类型：{barcode_type}")
    print(f"数据：{barcode_data}")
    print(f"位置：{barcode_points}")

    # 在图像上绘制
    # 提取点坐标
    points = [(pt.x, pt.y) for pt in barcode.polygon]
    points = np.array(points, np.int32)
    points = points.reshape((-1, 1, 2))

    # 画多边形
    cv2.polylines(image, [points], True, (0, 255, 0), 2)

    # 添加文字
    text = f"{barcode_type}: {barcode_data}"
    cv2.putText(image, text, (points[0][0][0], points[0][0][1] - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# 显示结果
cv2.imshow('Result', image)
cv2.waitKey(0)
```

### 11.4 项目中的二维码识别

```python
def decode_qr_codes(self, frame):
    """检测并解码二维码"""
    results = []

    # 转为RGB（pyzbar需要RGB格式）
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # 解码
    barcodes = decode(rgb_frame)

    for barcode in barcodes:
        # 解码数据
        data = barcode.data.decode('utf-8')
        barcode_type = barcode.type

        # 获取点坐标
        pts = [(pt.x, pt.y) for pt in barcode.polygon]

        # 估算位置
        position = None
        if self.focal_length is not None:
            position = self.estimate_qr_position(pts)

        # 保存结果
        detection = {
            'type': barcode_type,
            'data': data,
            'points': pts,
            'position': position,
            'timestamp': datetime.now().isoformat()
        }
        results.append(detection)

        # 日志
        if position:
            logger.info(
                f"[QR] {barcode_type}: {data} | "
                f"距离: {position['distance']:.2f}m | "
                f"H: {position['horizontal_angle']:.1f}°"
            )

    return results
```

---

## 第十二章：位置估算算法详解

### 12.1 相机标定基础

#### 12.1.1 针孔相机模型

```
        3D世界坐标                图像平面
            ╱│                      ╱│
           ╱ │                    ╱  │
          ╱  │                  ╱   │
         ╱   │ 光轴           ╱    │
        ╱─────┤              ╱─────┤
       ╱     相机中心        ╱     图像中心
      ╱       (0,0,0)      ╱
     ╱                    ╱
    ╱                    ╱
   ╱                    ╱

相机参数：
- 焦距: 相机中心到图像平面的距离
- 主点: 光轴与图像平面的交点
- 内参矩阵 K:
    [fx  0   cx]
    [0   fy  cy]
    [0   0   1 ]

其中 fx, fy 是焦距（像素单位）
```

#### 12.1.2 相机内参

```python
# 本项目中的简化估算

# 获取图像尺寸
width = int(camera.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(camera.get(cv2.CAP_PROP_FRAME_HEIGHT))

# 估算焦距
# 经验公式：f ≈ width × 1.2
# 这是对大多数网络摄像机的粗略估计
# 更精确的方法是相机标定（使用棋盘格）
focal_length = width * 1.2

# 主点（图像中心）
cx = width / 2.0
cy = height / 2.0

print(f"相机内参：fx={focal_length}, cx={cx}, cy={cy}")
```

### 12.2 距离估算

#### 12.2.1 相似三角形原理

```
实际场景                    相机成像
      ╱│                          ╱│
     ╱ │                        ╱  │
    ╱  │ h (二维码真实尺寸)     ╱   │
   ╱   │ 0.05m                ╱    │
  ╱─────┘                      ╱─────┘
   d    f                        f    s
  (距离)  (焦距)                 (焦距)  (像素尺寸)

相似三角形公式：
  d / f = h / s
  d = f × h / s

参数：
  d: 距离（未知，待求）
  f: 焦距（已知，相机参数）
  h: 二维码真实尺寸（已知，如0.05m）
  s: 二维码在图像中的像素尺寸（测量得到）
```

#### 12.2.2 代码实现

```python
def estimate_qr_position(self, qr_points):
    """估算二维码位置"""

    # 1. 计算二维码中心
    center_x = sum(p[0] for p in qr_points) / 4.0
    center_y = sum(p[1] for p in qr_points) / 4.0

    # 2. 计算二维码在图像中的尺寸
    p0 = np.array(qr_points[0])
    p1 = np.array(qr_points[1])
    p2 = np.array(qr_points[2])
    p3 = np.array(qr_points[3])

    # 计算边长
    width_pixel = np.linalg.norm(p0 - p1)   # 顶点0到1的距离
    height_pixel = np.linalg.norm(p1 - p2)  # 顶点1到2的距离
    avg_size_pixel = (width_pixel + height_pixel) / 2.0

    # 3. 使用相似三角形计算距离
    # d = f × h / s
    distance = (self.qr_size * self.focal_length) / avg_size_pixel

    return distance
```

### 12.3 角度估算

#### 12.3.1 方向角计算

```
图像坐标系：
(0,0)在左上角
x轴向右，y轴向下

      y
      ↓
      ────────
      │       │
      │   ●   │ ← 图像中心
      │       │
      ────────

二维码中心 (x_qr, y_qr)

dx = x_qr - cx  # x方向偏移
dy = y_qr - cy  # y方向偏移

角度计算：
  水平角 = arctan(dx / f)
  垂直角 = arctan(dy / f)
```

#### 12.3.2 代码实现

```python
# 计算偏移
dx = center_x - self.cx  # 水平偏移（右为正）
dy = center_y - self.cy  # 垂直偏移（下为正）

# 计算角度（弧度）
horizontal_angle = np.arctan2(dx, self.focal_length)
vertical_angle = np.arctan2(dy, self.focal_length)

# 转换为角度
h_angle_deg = np.degrees(horizontal_angle)
v_angle_deg = np.degrees(vertical_angle)

# 角度含义：
# 水平角 > 0: 二维码在图像右侧（实际在相机右侧）
# 水平角 < 0: 二维码在图像左侧（实际在相机左侧）
# 垂直角 > 0: 二维码在图像下方（实际在相机下方）
# 垂直角 < 0: 二维码在图像上方（实际在相机上方）
```

### 12.4 3D坐标估算

```python
# 在相机坐标系中估算3D坐标
# 坐标系定义：
# X轴: 向右
# Y轴: 向下
# Z轴: 向前（深度）

x = distance * np.tan(horizontal_angle)
y = distance * np.tan(vertical_angle)
z = distance

# 返回完整的位置信息
return {
    'distance': distance,           # 距离（米）
    'horizontal_angle': h_angle_deg,  # 水平角（度）
    'vertical_angle': v_angle_deg,    # 垂直角（度）
    'x': x, 'y': y, 'z': z,       # 3D坐标（米）
    'center_x': center_x,          # 图像中X坐标
    'center_y': center_y,          # 图像中Y坐标
    'qr_size_pixel': avg_size_pixel  # 像素尺寸
}
```

### 12.5 算法优化建议

#### 12.5.1 相机标定

```python
# 使用棋盘格进行精确标定
import cv2
import numpy as np

# 准备标定板参数
chessboard_size = (9, 6)  # 内角点数量
square_size = 1.0          # 方格实际尺寸

# 准备对象点（3D世界坐标）
objp = np.zeros((chessboard_size[0] * chessboard_size[1], 3), np.float32)
objp[:, :2] = np.mgrid[0:chessboard_size[0],
                       0:chessboard_size[1]].T.reshape(-1, 2)
objp = objp * square_size

# 存储所有图像的点
obj_points = []  # 3D世界坐标
img_points = []  # 2D图像坐标

# 采集多张标定图像
for image_file in calibration_images:
    img = cv2.imread(image_file)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 找到棋盘格角点
    ret, corners = cv2.findChessboardCorners(gray, chessboard_size, None)

    if ret:
        obj_points.append(objp)
        img_points.append(corners)

# 标定相机
ret, camera_matrix, dist_coeffs, rvecs, tvecs = cv2.calibrateCamera(
    obj_points, img_points, gray.shape[::-1], None, None
)

print("相机内参矩阵：")
print(camera_matrix)
print("畸变系数：")
print(dist_coeffs)

# 使用标定结果
# fx = camera_matrix[0, 0]
# fy = camera_matrix[1, 1]
# cx = camera_matrix[0, 2]
# cy = camera_matrix[1, 2]
```

#### 12.5.2 多帧平滑

```python
# 使用滑动窗口平均减少抖动
from collections import deque

class PositionSmoother:
    def __init__(self, window_size=5):
        self.window_size = window_size
        self.history = deque(maxlen=window_size)

    def add_position(self, position):
        """添加新的位置数据"""
        self.history.append(position)

    def get_smoothed_position(self):
        """获取平滑后的位置"""
        if len(self.history) == 0:
            return None

        # 计算平均值
        n = len(self.history)
        avg = {
            'distance': sum(p['distance'] for p in self.history) / n,
            'x': sum(p['x'] for p in self.history) / n,
            'y': sum(p['y'] for p in self.history) / n,
            'z': sum(p['z'] for p in self.history) / n,
        }

        # 过滤异常值（使用中位数更稳健）
        distances = sorted(p['distance'] for p in self.history)
        avg['distance'] = distances[len(distances) // 2]

        return avg
```

---

## 本章小结

### 学习检查清单

**Flask框架：**
- [ ] 理解Flask的基本概念
- [ ] 掌握路由和视图函数
- [ ] 理解请求和响应
- [ ] 能使用模板渲染
- [ ] 了解本项目中的API设计

**图像处理：**
- [ ] 理解数字图像的本质
- [ ] 掌握OpenCV基本操作
- [ ] 能进行颜色空间转换
- [ ] 能进行图像裁剪、缩放
- [ ] 能进行基本绘图操作

**二维码识别：**
- [ ] 理解二维码的结构
- [ ] 掌握pyzbar的使用
- [ ] 理解位置估算原理
- [ ] 掌握相似三角形算法

**项目核心：**
- [ ] 理解完整的扫描流程
- [ ] 理解视频流的实现
- [ ] 理解前后端通信方式

---

*第三部分完成*

## 继续学习请阅读：
[教程04：项目实战与进阶](/posts/教程04-项目实战与进阶/)
