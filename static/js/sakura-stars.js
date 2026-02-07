// Canvas 樱花和星星效果 - 模仿 weilv.space
(function() {
  'use strict';

  // 创建 canvas 元素
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animationId = null;
  let particles = [];
  let width = window.innerWidth;
  let height = window.innerHeight;
  let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isHidden = false;

  // 检测减少动画偏好
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 调整 canvas 大小
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  // 初始化粒子
  function initParticles() {
    const count = Math.floor((width * height) / 15000);
    particles = [];

    for (let i = 0; i < count; i++) {
      const isSpecial = Math.random() > 0.85;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isSpecial ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
        speed: isSpecial ? Math.random() * 0.6 + 0.3 : Math.random() * 0.8 + 0.2,
        wind: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        isSpecial: isSpecial
      });
    }
  }

  // 绘制樱花花瓣（椭圆形状）
  function drawPetal(x, y, radius, rotation, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 2, radius, 0, 0, Math.PI * 2);
    
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2);
    gradient.addColorStop(0, `rgba(255, 200, 210, ${opacity})`);
    gradient.addColorStop(1, `rgba(255, 150, 170, ${opacity * 0.5})`);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.restore();
  }

  // 绘制星星（四角）
  function drawStar(x, y, radius, rotation, opacity, isGold) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    const spikes = 4;
    const outerRadius = radius * 2;
    const innerRadius = radius;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();

    if (isGold) {
      ctx.fillStyle = `rgba(255, 215, 100, ${opacity})`;
      ctx.shadowColor = 'rgba(255, 200, 80, 0.8)';
      ctx.shadowBlur = radius * 2;
    } else {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = radius;
    }
    
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  // 绘制圆形粒子
  function drawCircle(x, y, radius, opacity, isDark) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    if (isDark) {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = radius * 2;
    } else {
      ctx.fillStyle = `rgba(255, 160, 180, ${opacity})`;
      ctx.shadowBlur = 0;
    }
    
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 动画循环
  function animate() {
    if (isHidden || reducedMotion.matches) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speed;
      p.x += p.wind;
      p.rotation += p.rotationSpeed;

      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }

      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;

      if (isDarkMode) {
        if (p.isSpecial) {
          drawStar(p.x, p.y, p.radius, p.rotation, p.opacity, true);
        } else {
          drawCircle(p.x, p.y, p.radius, p.opacity, true);
        }
      } else {
        if (p.isSpecial) {
          drawPetal(p.x, p.y, p.radius, p.rotation, p.opacity);
        } else {
          drawCircle(p.x, p.y, p.radius, p.opacity, false);
        }
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  function start() {
    if (!animationId) {
      resize();
      initParticles();
      animate();
    }
  }

  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function handleVisibility() {
    isHidden = document.hidden;
    if (isHidden) {
      stop();
    } else {
      start();
    }
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  document.addEventListener('visibilitychange', handleVisibility);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    isDarkMode = e.matches;
  });

  reducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      stop();
    } else {
      start();
    }
  });

  resize();
  initParticles();

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    start();
  } else {
    document.addEventListener('DOMContentLoaded', start);
  }
})();
