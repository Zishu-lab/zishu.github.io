// 樱花（白天）和星星（夜晚）效果
(function() {
  'use strict';
  
  // 配置
  const CONFIG = {
    sakuraEmoji: ['🌸', '✿', '❀', '💮'],  // 樱花表情符号
    starEmoji: ['✨', '⭐', '🌟', '💫'],   // 星星表情符号
    interval: 800,  // 生成间隔（毫秒）
  };
  
  // 获取当前模式
  function isDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  // 创建粒子
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'fixed';
    particle.style.top = '-20px';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.fontSize = (20 + Math.random() * 20) + 'px';
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    particle.style.userSelect = 'none';
    particle.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
    
    // 根据模式选择表情
    if (isDarkMode()) {
      // 夜晚：星星
      const starIndex = Math.floor(Math.random() * CONFIG.starEmoji.length);
      particle.innerHTML = CONFIG.starEmoji[starIndex];
      particle.style.animation = `starTwinkle ${3 + Math.random() * 2}s ease-in-out`;
    } else {
      // 白天：樱花
      const sakuraIndex = Math.floor(Math.random() * CONFIG.sakuraEmoji.length);
      particle.innerHTML = CONFIG.sakuraEmoji[sakuraIndex];
      particle.style.animation = `sakuraFall ${8 + Math.random() * 4}s linear`;
    }
    
    document.body.appendChild(particle);
    
    // 10秒后移除
    setTimeout(() => {
      particle.remove();
    }, 12000);
  }
  
  // 启动粒子生成
  function startParticles() {
    setInterval(createParticle, CONFIG.interval);
  }
  
  // 页面加载完成后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startParticles);
  } else {
    startParticles();
  }
})();
