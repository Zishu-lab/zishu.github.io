// 生成樱花和星星粒子
(function() {
  'use strict';

  // 配置
  const CONFIG = {
    sakuraCount: 20,  // 樱花数量
    starCount: 50,    // 星星数量
  };

  // 生成樱花
  function createSakura() {
    const container = document.body;
    const sizes = ['small', 'medium', 'large'];

    for (let i = 0; i < CONFIG.sakuraCount; i++) {
      const petal = document.createElement('div');
      petal.className = `sakura-petal ${sizes[Math.floor(Math.random() * sizes.length)]}`;
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDelay = `${Math.random() * 10}s, ${Math.random() * 5}s`;
      container.appendChild(petal);
    }
  }

  // 生成星星
  function createStars() {
    const container = document.body;
    const sizes = ['small', 'medium', 'large'];

    for (let i = 0; i < CONFIG.starCount; i++) {
      const star = document.createElement('div');
      const isGold = Math.random() > 0.7; // 30% 金色星星
      star.className = `star ${sizes[Math.floor(Math.random() * sizes.length)]}${isGold ? ' gold' : ''}`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDelay = `${Math.random() * 4}s, ${Math.random() * 5}s`;
      container.appendChild(star);
    }
  }

  // 检测当前模式并生成对应粒子
  function initParticles() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
      createStars();
    } else {
      createSakura();
    }

    // 监听模式切换
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // 清除旧粒子
      document.querySelectorAll('.sakura-petal, .star').forEach(el => el.remove());

      // 生成新粒子
      if (e.matches) {
        createStars();
      } else {
        createSakura();
      }
    });
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
})();
