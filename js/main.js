/**
 * 全国单招百科全书 - 主要交互脚本
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initNumberAnimation();
    initSearchTags();
    initMobileMenu();
});

/**
 * 导航栏滚动效果
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // 如果是空锚点或javascript，不处理
            if (href === '#' || href.startsWith('javascript')) {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 数字滚动动画
 */
function initNumberAnimation() {
    const statsSection = document.querySelector('.stats');
    
    if (!statsSection) return;
    
    const animateNumbers = () => {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const text = stat.textContent;
            const match = text.match(/([\d.]+)(.*)/);
            
            if (!match) return;
            
            const target = parseFloat(match[1]);
            const suffix = match[2];
            const isDecimal = text.includes('.');
            
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    stat.textContent = text;
                    clearInterval(timer);
                } else {
                    const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
                    stat.textContent = displayValue + suffix;
                }
            }, 30);
        });
    };

    // 使用Intersection Observer触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
}

/**
 * 搜索标签交互
 */
function initSearchTags() {
    const searchInput = document.querySelector('.search-box input');
    const tags = document.querySelectorAll('.hot-tags .tag');
    
    if (!searchInput) return;
    
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.textContent;
            searchInput.focus();
        });
    });
}

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        // 简单切换显示状态
        const isHidden = navLinks.style.display === 'none' || !navLinks.style.display;
        
        if (isHidden) {
            navLinks.style.cssText = `
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 72px;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                padding: 20px;
                gap: 16px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                z-index: 999;
            `;
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                navLinks.style.display = 'none';
            }
        });
    });
}

/**
 * 滚动动画
 * 为进入视口的元素添加动画效果
 */
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 初始化滚动动画
initScrollAnimation();

/**
 * 工具函数：防抖
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 工具函数：节流
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 控制台输出
console.log('🎓 全国单招百科全书 - 已加载');
console.log('📌 提示：所有跳转链接已设置为 127.0.0.1 占位符');
