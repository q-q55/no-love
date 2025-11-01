// 提示语数组
const tips = [
    "保持好心情", "我想你了", "保持微笑", "元气满满", "别熬夜",
    "多喝水", "每天开心", "吃水果", "好好吃饭", "保持纯真",
    "你的微笑特别", "要幸福哦", "想你的每一天", "照顾好自己", "记得想我"
];

// 配置参数
const config = {
    desiredPoints: 100,  // 心形点数
    windowW: 120,        // 窗口宽度
    windowH: 60,         // 窗口高度
    delay: 120,          // 窗口显示间隔（毫秒）
    duration: 5000       // 窗口显示时长（毫秒）
};

// 生成心形坐标
function generateHeartPoints(numPoints) {
    const points = [];
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const centerX = screenW / 2;
    const centerY = screenH / 2;
    const scale = Math.min(screenW / 40, screenH / 40);

    for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI;
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        x = centerX + x * scale;
        y = centerY + y * scale;

        // 限制窗口在屏幕内
        x = Math.max(config.windowW/2, Math.min(x, screenW - config.windowW/2));
        y = Math.max(config.windowH/2, Math.min(y, screenH - config.windowH/2));

        points.push({ x: Math.floor(x), y: Math.floor(y) });
    }
    return points;
}

// 显示提示窗口
function showTipWindow(x, y) {
    const div = document.createElement('div');
    div.className = 'tip-window';
    
    // 随机浅色背景
    const r = Math.floor(Math.random() * 56) + 200;
    const g = Math.floor(Math.random() * 56) + 200;
    const b = Math.floor(Math.random() * 56) + 200;
    div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // 随机提示语
    div.textContent = tips[Math.floor(Math.random() * tips.length)];

    // 定位与样式
    div.style.left = `${x - config.windowW/2}px`;
    div.style.top = `${y - config.windowH/2}px`;
    div.style.width = `${config.windowW}px`;
    div.style.height = `${config.windowH}px`;
    div.style.lineHeight = `${config.windowH}px`;
    div.style.textAlign = 'center';

    document.body.appendChild(div);

    // 自动消失逻辑
    setTimeout(() => {
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 700); // 等待淡出动画完成
    }, config.duration);
}

// 执行动画的主函数
function startHeartAnimation() {
    const btn = document.getElementById('yes');
    // 禁用按钮防止重复点击
    btn.disabled = true;
    // btn.textContent = "动画执行中...";

    const points = generateHeartPoints(config.desiredPoints);
    
    // 依次显示窗口
    points.forEach((point, index) => {
        setTimeout(() => {
            showTipWindow(point.x, point.y);
        }, index * config.delay);
    });

    // 动画结束后恢复按钮状态
    const totalTime = config.desiredPoints * config.delay + config.duration;
    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "爱你";
    }, totalTime);
}

// 页面加载完成后绑定按钮事件
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('yes').addEventListener('click', startHeartAnimation);
});