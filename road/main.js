// main.js - 主逻辑代码
// 在文件顶部添加
function updateURLState() {
    const params = new URLSearchParams(window.location.search);
    params.set('scale', appState.scale.toFixed(4));
    params.set('offsetX', appState.offsetX.toFixed(0));
    params.set('offsetY', appState.offsetY.toFixed(0));

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState(null, '', newURL);
}

function restoreFromURLState() {
    const params = new URLSearchParams(window.location.search);
    const scale = parseFloat(params.get('scale'));
    const offsetX = parseFloat(params.get('offsetX'));
    const offsetY = parseFloat(params.get('offsetY'));

    if (!isNaN(scale) && !isNaN(offsetX) && !isNaN(offsetY)) {
        appState.scale = Math.max(appState.minScale, Math.min(appState.maxScale, scale));
        appState.offsetX = offsetX;
        appState.offsetY = offsetY;
        return true;
    }
    return false;
}


// 初始化应用状态
const appState = {
    scale: 1,
    minScale: 1,//最小能缩到多小
    maxScale: Infinity,//放大最大能放多少
    offsetX: 0,
    offsetY: 0,
    lastX: 0,
    lastY: 0,
    isDragging: false,
    highlightedHighway: null,
    canvasRect: null,
    bgImage: null,
    bgImageLoaded: false,
    landmarkImages: {}, // 存储加载的地标图片
    highlightedLandmark: null, // 当前高亮的地标
    touchStartTime: 0, // 触摸开始时间
    touchStartX: 0,    // 触摸开始X坐标
    touchStartY: 0     // 触摸开始Y坐标
};

// 获取DOM元素
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const zoomLevel = document.getElementById('zoomLevel');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const groupsContainer = document.getElementById('groupsContainer');
const highlightInfo = document.getElementById('highlightInfo');
const tooltip = document.getElementById('tooltip');
const infoPanel = document.getElementById('infoPanel');
const highwayInfo = document.getElementById('highwayInfo');
const mouseCoords = document.getElementById('mouseCoords');//鼠标坐标
const mobileToggle = document.getElementById('mobileToggle');
const controlsPanel = document.getElementById('controlsPanel');

// 设置Canvas大小
function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    appState.canvasRect = canvas.getBoundingClientRect();
    
    render();
}

// 渲染地图函数
function render() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 保存原始状态
    ctx.save();

    // 应用变换（平移+缩放）
    ctx.translate(appState.offsetX, appState.offsetY);
    ctx.scale(appState.scale, appState.scale);

    // 绘制背景
    if (appState.bgImageLoaded) {
        ctx.drawImage(appState.bgImage, 0, 0);
    } else {
        const bgPattern = createBackgroundPattern();
        ctx.fillStyle = bgPattern;
        ctx.fillRect(0, 0, config.background.width, config.background.height);
    }

    // 获取所有可见分组
    const visibleGroups = config.groups.filter(g => g.visible).map(g => g.id);

    // 分离普通路线和选中路线
    const normalHighways = [];
    let highlightedHighway = null;

    config.highways.forEach(highway => {
        if (!visibleGroups.includes(highway.group)) return;

        if (appState.highlightedHighway === highway.id) {
            highlightedHighway = highway; // 单独保存选中路线
        } else {
            normalHighways.push(highway); // 普通路线
        }
    });

    // 先绘制所有普通路线
    normalHighways.forEach(highway => {
        drawHighway(highway, false);
    });

    // 最后绘制选中路线（置于顶层）
    if (highlightedHighway) {
        drawHighway(highlightedHighway, true);
    }
    drawLandmarks();// 最后绘制地标（在顶层）
    ctx.restore();
}

// 创建背景纹理
function createBackgroundPattern() {
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 40;
    patternCanvas.height = 40;
    const patternCtx = patternCanvas.getContext('2d');

    patternCtx.fillStyle = '#3c4e60';
    patternCtx.fillRect(0, 0, 40, 40);

    patternCtx.strokeStyle = 'rgba(52, 73, 94, 0.5)';
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 0);
    patternCtx.lineTo(40, 0);
    patternCtx.stroke();

    patternCtx.beginPath();
    patternCtx.moveTo(0, 0);
    patternCtx.lineTo(0, 40);
    patternCtx.stroke();

    return ctx.createPattern(patternCanvas, 'repeat');
}

// 绘制单条公路
function drawHighway(highway, isHighlighted = false) {
    const group = config.groups.find(g => g.id === highway.group);
    if (!group) return;

    const lineWidth = highway.width;

    if (isHighlighted) {
        ctx.shadowColor = 'white';//边缘白光
        ctx.shadowBlur = 15;
        ctx.strokeStyle = '#f1c40f'; // 橙色线条
        ctx.lineWidth = lineWidth * 1.2;
    } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = group.color; // 分组颜色
    }

    ctx.beginPath();
    ctx.moveTo(highway.path[0][0], highway.path[0][1]);

    for (let i = 1; i < highway.path.length; i++) {
        ctx.lineTo(highway.path[i][0], highway.path[i][1]);
    }

    // ctx.strokeStyle = group.color;//如果你取消注释这行，那么上面的变橙色将完全失效
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

// 缩放到指定的点
function zoomAtPoint(scaleFactor, clientX, clientY) {
    appState.canvasRect = canvas.getBoundingClientRect();

    const x = clientX - appState.canvasRect.left;
    const y = clientY - appState.canvasRect.top;

    const contentX = (x - appState.offsetX) / appState.scale;
    const contentY = (y - appState.offsetY) / appState.scale;

    const newScale = Math.max(appState.minScale, Math.min(appState.maxScale, appState.scale * scaleFactor));
    appState.scale = newScale;

    appState.offsetX = x - contentX * appState.scale;
    appState.offsetY = y - contentY * appState.scale;

    zoomLevel.textContent = Math.round(appState.scale * 100) + '%';
    render();
    updateURLState();
}

// 判断是否命中公路
function getHighwayAtPoint(clientX, clientY) {
    appState.canvasRect = canvas.getBoundingClientRect();

    const x = clientX - appState.canvasRect.left;
    const y = clientY - appState.canvasRect.top;

    const contentX = (x - appState.offsetX) / appState.scale;
    const contentY = (y - appState.offsetY) / appState.scale;

    for (let i = config.highways.length - 1; i >= 0; i--) {
        const highway = config.highways[i];
        const group = config.groups.find(g => g.id === highway.group);

        if (!group || !group.visible) continue;

        const baseTolerance = 10;
        // 移动设备增加容差
        const toleranceMultiplier = isMobile() ? 1.8 : 1;
        const tolerance = Math.max(highway.width * 1.5 * toleranceMultiplier, baseTolerance) / appState.scale;

        for (let j = 0; j < highway.path.length - 1; j++) {
            const p1 = highway.path[j];
            const p2 = highway.path[j + 1];

            const dx = p2[0] - p1[0];
            const dy = p2[1] - p1[1];
            const segmentLengthSquared = dx * dx + dy * dy;

            if (segmentLengthSquared === 0) continue;

            const t = Math.max(0, Math.min(1, ((contentX - p1[0]) * dx + (contentY - p1[1]) * dy) / segmentLengthSquared));
            const projX = p1[0] + t * dx;
            const projY = p1[1] + t * dy;

            const distSquared = (contentX - projX) * (contentX - projX) + (contentY - projY) * (contentY - projY);

            if (distSquared < tolerance * tolerance) {
                return highway;
            }
        }
    }

    return null;
}

// 显示悬停提示
function showTooltip(highway, x, y) {
    if (!highway || !highway.name) return;

    tooltip.textContent = highway.name;
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.display = 'block';
}

// 隐藏提示
function hideTooltip() {
    tooltip.style.display = 'none';
}

// 在信息面板显示公路详情
function showHighwayInfo(highway) {
    if (!highway) return;

    // 使用配置中的HTML格式显示信息
    highwayInfo.innerHTML = highway.info ? highway.info :
        `<h2>${highway.name}</h2>
         <p><strong>类别:</strong> ${getGroupName(highway.group)}</p>
         <p><strong>路段数:</strong> ${highway.path.length}段</p>`;

    // 显示信息面板
    infoPanel.style.display = 'block';
}

// 获取分组名称
function getGroupName(groupId) {
    const group = config.groups.find(g => g.id === groupId);
    return group ? group.name : '未知类别';
}

// 初始化分组控件
function initGroupControls() {
    config.groups.forEach(group => {
        const container = document.createElement('div');
        container.className = 'group-control';

        const checkboxId = `group-${group.id}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = checkboxId;
        checkbox.checked = group.visible;
        checkbox.dataset.id = group.id;

        const label = document.createElement('label');
        label.htmlFor = checkboxId;

        const colorBox = document.createElement('div');
        colorBox.style.width = '15px';
        colorBox.style.height = '15px';
        colorBox.style.backgroundColor = group.color;
        colorBox.style.borderRadius = '3px';

        label.appendChild(checkbox);
        label.appendChild(colorBox);
        label.appendChild(document.createTextNode(group.name));

        container.appendChild(label);
        groupsContainer.appendChild(container);

        checkbox.addEventListener('change', function () {
            group.visible = this.checked;
            render();
        });
        // 线路组的地标计数(可选功能)
        // const landmarkCount = landmarks.filter(l => l.group === group.id).length;
        // if (landmarkCount > 0) {
        //     const countSpan = document.createElement('span');
        //     countSpan.className = 'landmark-count';
        //     countSpan.textContent = ` (${landmarkCount}个地标)`;
        //     label.appendChild(countSpan);
        // }

    });
}

// 检测移动设备
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 设置事件监听器
function setupEventListeners() {
    window.addEventListener('resize', resizeCanvas);

    // 移动端控制面板切换
    mobileToggle.addEventListener('click', function() {
        controlsPanel.classList.toggle('visible');
    });

    zoomInBtn.addEventListener('click', () => {
        appState.canvasRect = canvas.getBoundingClientRect();
        const centerX = appState.canvasRect.left + appState.canvasRect.width / 2;
        const centerY = appState.canvasRect.top + appState.canvasRect.height / 2;
        zoomAtPoint(1.2, centerX, centerY);
    });

    zoomOutBtn.addEventListener('click', () => {
        appState.canvasRect = canvas.getBoundingClientRect();
        const centerX = appState.canvasRect.left + appState.canvasRect.width / 2;
        const centerY = appState.canvasRect.top + appState.canvasRect.height / 2;
        zoomAtPoint(0.8, centerX, centerY);
    });

    canvas.addEventListener('wheel', e => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.8 : 1.2;
        zoomAtPoint(delta, e.clientX, e.clientY);
    });

    canvas.addEventListener('mousedown', e => {
        appState.isDragging = true;
        appState.lastX = e.clientX;
        appState.lastY = e.clientY;
        canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('mousemove', e => {
        updateMouseCoords(e.clientX, e.clientY);
        if (appState.isDragging) {
            const dx = e.clientX - appState.lastX;
            const dy = e.clientY - appState.lastY;

            appState.offsetX += dx;
            appState.offsetY += dy;

            appState.lastX = e.clientX;
            appState.lastY = e.clientY;

            render();
            updateURLState();
        } else {
            const highway = getHighwayAtPoint(e.clientX, e.clientY);
            if (highway) {
                canvas.style.cursor = 'pointer';
                showTooltip(highway, e.clientX, e.clientY);
            } else {
                canvas.style.cursor = 'default';
                hideTooltip();
            }
        }
    });

    canvas.addEventListener('mouseup', () => {
        appState.isDragging = false;
        canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('mouseleave', () => {
        appState.isDragging = false;
        canvas.style.cursor = 'default';
        hideTooltip();
    });

    canvas.addEventListener('touchstart', e => {
        // 记录触摸开始时间和位置
        appState.touchStartTime = Date.now();
        appState.touchStartX = e.touches[0].clientX;
        appState.touchStartY = e.touches[0].clientY;
        
        if (e.touches.length === 1) {
            appState.isDragging = true;
            appState.lastX = e.touches[0].clientX;
            appState.lastY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];

            appState.lastDistance = Math.sqrt(
                Math.pow(touch1.clientX - touch2.clientX, 2) +
                Math.pow(touch1.clientY - touch2.clientY, 2)
            );
        }
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', e => {
        if (e.touches.length === 1) {
            updateMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
        }
        if (e.touches.length === 1 && appState.isDragging) {
            const dx = e.touches[0].clientX - appState.lastX;
            const dy = e.touches[0].clientY - appState.lastY;

            appState.offsetX += dx;
            appState.offsetY += dy;

            appState.lastX = e.touches[0].clientX;
            appState.lastY = e.touches[0].clientY;

            render();
            updateURLState();
        } else if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt(
                Math.pow(touch1.clientX - touch2.clientX, 2) +
                Math.pow(touch1.clientY - touch2.clientY, 2)
            );

            const centerX = (touch1.clientX + touch2.clientX) / 2;
            const centerY = (touch1.clientY + touch2.clientY) / 2;

            const scaleFactor = distance / appState.lastDistance;
            zoomAtPoint(scaleFactor, centerX, centerY);

            appState.lastDistance = distance;
            render();
            updateURLState();
        }
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', e => {
        appState.isDragging = false;
        
        // 处理点击（轻击）
        if (e.changedTouches.length === 1) {
            const touch = e.changedTouches[0];
            const touchDuration = Date.now() - appState.touchStartTime;
            const touchDistance = Math.sqrt(
                Math.pow(touch.clientX - appState.touchStartX, 2) +
                Math.pow(touch.clientY - appState.touchStartY, 2)
            );
            
            // 判定为点击的条件：时间短且移动距离小
            if (touchDuration < 300 && touchDistance < 15) {
                handleMapClick(touch.clientX, touch.clientY);
            }
        }
        
        e.preventDefault();
    }, { passive: false });

        // 电脑端点击事件
    canvas.addEventListener('click', function(e) {
        if (appState.isDragging) return;
        handleMapClick(e.clientX, e.clientY);
    });
    
    // 移动端控制面板切换
    mobileToggle.addEventListener('click', function() {
        controlsPanel.classList.add('visible');
    });
    
    // 关闭面板按钮
    document.getElementById('closePanel').addEventListener('click', function() {
        controlsPanel.classList.remove('visible');
    });
    
    // 点击外部关闭面板
    document.addEventListener('click', function(e) {
        if (!controlsPanel.contains(e.target) && 
            e.target !== mobileToggle &&
            controlsPanel.classList.contains('visible')) {
            controlsPanel.classList.remove('visible');
        }
    });

    // 重置按钮事件
    document.getElementById('resetView').addEventListener('click', () => {
        // 清除URL参数
        window.history.replaceState(null, '', window.location.pathname);

        // 重置视图
        appState.scale = 1;
        appState.offsetX = 0;
        appState.offsetY = 0;

        // 居中显示
        appState.canvasRect = canvas.getBoundingClientRect();
        const centerX = appState.canvasRect.left + appState.canvasRect.width / 2;
        const centerY = appState.canvasRect.top + appState.canvasRect.height / 2;
        zoomAtPoint(0.9, centerX, centerY);

        zoomLevel.textContent = Math.round(appState.scale * 100) + '%';
        render();
    });

    // 分享功能
    document.getElementById('shareView').addEventListener('click', () => {
        const currentURL = window.location.href;

        // 尝试使用Web Share API
        if (navigator.share) {
            navigator.share({
                title: '高速公路地图视图',
                text: '查看我当前的地图视图',
                url: currentURL
            }).catch(error => {
                console.log('分享失败:', error);
                fallbackCopy(currentURL);
            });
        } else {
            fallbackCopy(currentURL);
        }
    });

    // 备用复制方法
    function fallbackCopy(url) {
        navigator.clipboard.writeText(url).then(() => {
            alert('链接已复制到剪贴板！\n\n' + url);
        }).catch(err => {
            console.error('复制失败:', err);
            prompt('请手动复制以下链接:', url);
        });
    }

}

// 处理地图点击事件（统一处理点击和触摸）
function handleMapClick(clientX, clientY) {
    // 检测地标
    const landmark = getLandmarkAtPoint(clientX, clientY);
    if (landmark) {
        appState.highlightedLandmark = landmark.id; // 设置地标高亮
        appState.highlightedHighway = null; // 取消公路高亮

        highlightInfo.innerHTML = `已选择: <span class="highlight-info">${landmark.name}</span>`;
        showLandmarkInfo(landmark);
        render();
        return;
    }

    // 检测公路
    const highway = getHighwayAtPoint(clientX, clientY);
    if (highway) {
        appState.highlightedHighway = highway.id; // 设置公路高亮
        appState.highlightedLandmark = null; // 取消地标高亮

        highlightInfo.innerHTML = `已选择: <span class="highlight-info">${highway.name}</span>`;
        showHighwayInfo(highway);
    } else {
        // 点击空白处
        appState.highlightedHighway = null;
        appState.highlightedLandmark = null;
        highlightInfo.innerHTML = "未选择任何路线或地标";
        infoPanel.style.display = 'none';
    }

    render();
}

// 初始化应用
function init() {
    resizeCanvas();
    initGroupControls();
    setupEventListeners();

    // 移动设备初始化
    if (isMobile()) {
        controlsPanel.classList.remove('visible');
        // 添加安全区域底部填充
        const statusBar = document.querySelector('.status-bar');
        statusBar.style.paddingBottom = `calc(8px + env(safe-area-inset-bottom, 0))`;
    }
        // 添加视口高度变化监听
    window.addEventListener('resize', handleViewportChange);
    // 初始调整
    handleViewportChange();

    // 尝试从URL恢复状态
    const restored = restoreFromURLState();

    if (restored) {
        zoomLevel.textContent = Math.round(appState.scale * 100) + '%';
    } else {
        // 没有URL参数时使用默认居中
        appState.canvasRect = canvas.getBoundingClientRect();
        const centerX = appState.canvasRect.left + appState.canvasRect.width / 2;
        const centerY = appState.canvasRect.top + appState.canvasRect.height / 2;
        zoomAtPoint(0.9, centerX, centerY);
    }

    // 加载配置的背景图
    if (config.background.url) {
        loadBackgroundImage(config.background.url);
    }

    // 加载地标图片
    loadLandmarkImages();

    // 初始渲染
    render();
}

function loadBackgroundImage(src) {
    const img = new Image();
    img.onload = function () {
        // 直接保存原始图像对象
        appState.bgImage = img;
        appState.bgImageLoaded = true;
        render();
    };

    // 处理加载错误
    img.onerror = function () {
        console.error('背景图加载失败:', src);
        appState.bgImageLoaded = false;
        render();
    };

    img.src = src;
}

// 加载地标图片
function loadLandmarkImages() {
    landmarks.forEach(landmark => {
        if (landmark.type === '仅图标' || landmark.type === '图文组合') {
            const img = new Image();
            img.onload = function () {
                appState.landmarkImages[landmark.id] = img;
                render();
            };
            img.src = landmark.imageUrl;
        }
    });
}


// 绘制地标（支持多个位置）
function drawLandmarks() {
        // 获取所有可见分组
    const visibleGroups = config.groups.filter(g => g.visible).map(g => g.id);
    landmarks.forEach(landmark => {
                // 检查地标分组是否可见
        if (landmark.group && !visibleGroups.includes(landmark.group)) {
            return; // 分组不可见，跳过绘制
        }
        const isHighlighted = appState.highlightedLandmark === landmark.id;

        // 遍历所有位置
        landmark.positions.forEach(position => {
            const x = position[0];
            const y = position[1];

            // 保存当前上下文状态
            ctx.save();

            // 高亮效果
            if (isHighlighted) {
                ctx.shadowColor = '#ffefa1ff';
                ctx.shadowBlur = 15;
            } else {
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }

            // 绘制图片部分
            if ((landmark.type === '仅图标' || landmark.type === '图文组合') &&
                appState.landmarkImages[landmark.id]) {

                const img = appState.landmarkImages[landmark.id];
                const width = landmark.width || img.width;
                const height = landmark.height || img.height;

                ctx.drawImage(
                    img,
                    x - width / 2,
                    y - height / 2,
                    width,
                    height
                );
            }

            // 绘制文本部分
            if (landmark.type === '仅文本' ||
                (landmark.type === '图文组合' && landmark.text)) {

                const style = landmark.textStyle || {};
                const text = landmark.text;

                // 设置基本文本属性
                ctx.font = style.font ||
                    `${style.fontStyle || 'normal'} ${style.fontWeight || 'normal'} ${style.fontSize || '12px'} ${style.fontFamily || 'Arial, sans-serif'}`;

                ctx.textAlign = style.textAlign || 'center';
                ctx.textBaseline = style.textBaseline || 'middle';

                // 设置阴影
                if (style.textShadow || style.shadowBlur) {
                    ctx.shadowColor = style.shadowColor || 'rgba(0,0,0,0.7)';
                    ctx.shadowBlur = style.shadowBlur || 5;
                    ctx.shadowOffsetX = style.shadowOffsetX || 2;
                    ctx.shadowOffsetY = style.shadowOffsetY || 2;
                } else {
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }

                // 设置文本位置偏移
                const offset = landmark.textOffset || [0, 0];
                const textX = x + offset[0];
                const textY = y + offset[1];

                // 绘制背景框
                if (style.backgroundColor) {
                    const textWidth = ctx.measureText(text).width;
                    const padding = Array.isArray(style.backgroundPadding) ?
                        style.backgroundPadding :
                        [style.backgroundPadding || 4, style.backgroundPadding || 8];

                    ctx.fillStyle = style.backgroundColor;

                    // 绘制圆角矩形背景
                    ctx.beginPath();
                    ctx.roundRect(
                        textX - textWidth / 2 - padding[1],
                        textY - parseInt(style.fontSize || 12) / 2 - padding[0],
                        textWidth + padding[1] * 2,
                        parseInt(style.fontSize || 12) + padding[0] * 2,
                        style.borderRadius || 0
                    );
                    ctx.fill();

                    // 绘制边框
                    if (style.borderColor && style.borderWidth) {
                        ctx.strokeStyle = style.borderColor;
                        ctx.lineWidth = style.borderWidth;
                        ctx.stroke();
                    }
                }

                // 保存当前状态（用于旋转）
                ctx.save();

                // 应用旋转
                if (style.rotation) {
                    ctx.translate(textX, textY);
                    ctx.rotate(style.rotation * Math.PI / 180);
                    ctx.translate(-textX, -textY);
                }

                // 绘制文本描边（如果有）
                if (style.strokeStyle && style.strokeWidth) {
                    ctx.strokeStyle = style.strokeStyle;
                    ctx.lineWidth = style.strokeWidth;
                    ctx.strokeText(text, textX, textY);
                }

                // 绘制文本填充
                ctx.fillStyle = style.color || '#ffffff';
                ctx.fillText(text, textX, textY);

                // 恢复状态（取消旋转）
                ctx.restore();
            }

            // 恢复上下文状态
            ctx.restore();
        });
    });
}
// 检测点击位置是否在地标上（支持多个位置）
function getLandmarkAtPoint(clientX, clientY) {
        // 获取所有可见分组
    const visibleGroups = config.groups.filter(g => g.visible).map(g => g.id);
    appState.canvasRect = canvas.getBoundingClientRect();

    const x = clientX - appState.canvasRect.left;
    const y = clientY - appState.canvasRect.top;

    const contentX = (x - appState.offsetX) / appState.scale;
    const contentY = (y - appState.offsetY) / appState.scale;

    // 从后向前检查（最后绘制的在最上层）
    for (let i = landmarks.length - 1; i >= 0; i--) {
        const landmark = landmarks[i];

                // 检查地标分组是否可见
        if (landmark.group && !visibleGroups.includes(landmark.group)) {
            continue; // 分组不可见，跳过检测
        }

        // 检查该地标的每个位置
        for (let j = 0; j < landmark.positions.length; j++) {
            const position = landmark.positions[j];
            const lx = position[0];
            const ly = position[1];

            // 简单矩形碰撞检测
            let width = 0, height = 0;

            if (landmark.type === '仅图标' || landmark.type === '图文组合') {
                width = landmark.width || 32;
                height = landmark.height || 32;
            } else if (landmark.type === '仅文本') {
                ctx.font = landmark.textStyle?.fontSize || '12px Arial';
                width = ctx.measureText(landmark.text).width;
                height = 20; // 文本高度估算
            }

            // 扩大点击区域（移动设备增加容差）
            const tolerance = (isMobile() ? 25 : 10) / appState.scale;

            if (contentX > lx - width / 2 - tolerance &&
                contentX < lx + width / 2 + tolerance &&
                contentY > ly - height / 2 - tolerance &&
                contentY < ly + height / 2 + tolerance) {
                return landmark;
            }
        }
    }

    return null;
}
// 显示地标信息（显示所有位置）
function showLandmarkInfo(landmark) {
    if (!landmark) return;

    // 创建位置列表
    let positionsHTML = '<ul>';
    landmark.positions.forEach(pos => {
        positionsHTML += `<li>[${pos[0]}, ${pos[1]}]</li>`;
    });
    positionsHTML += '</ul>';
    //插入配置文件里的数据
    highwayInfo.innerHTML = landmark.info
    //  ? 
    //     landmark.info + 
    //     `<p><strong>位置:</strong> ${positionsHTML}</p>` : 
    //     `<h2>${landmark.name}</h2>
    //      <p><strong>类型:</strong> ${landmark.type}</p>
    //      <p><strong>位置:</strong> ${positionsHTML}</p>`;

    infoPanel.style.display = 'block';
}

//实时显示鼠标坐标
// 将屏幕坐标转换为地图坐标
function screenToMap(clientX, clientY) {
    appState.canvasRect = canvas.getBoundingClientRect();

    const screenX = clientX - appState.canvasRect.left;
    const screenY = clientY - appState.canvasRect.top;

    const mapX = (screenX - appState.offsetX) / appState.scale;
    const mapY = (screenY - appState.offsetY) / appState.scale;

    return { x: mapX, y: mapY };
}
// 更新鼠标坐标显示
function updateMouseCoords(clientX, clientY) {
    // 检查鼠标是否在画布内
    appState.canvasRect = canvas.getBoundingClientRect();

    const inCanvas =
        clientX >= appState.canvasRect.left &&
        clientX <= appState.canvasRect.right &&
        clientY >= appState.canvasRect.top &&
        clientY <= appState.canvasRect.bottom;

    if (inCanvas) {
        const mapCoords = screenToMap(clientX, clientY);
        mouseCoords.textContent = `(${Math.round(mapCoords.x)}, ${Math.round(mapCoords.y)})`;
    } else {
        mouseCoords.textContent = "(超出范围)";
    }
}

// 处理视口高度变化
function handleViewportChange() {
    const statusBar = document.querySelector('.status-bar');
    const mapArea = document.querySelector('.map-area');
    
    if (isMobile()) {
        // 在移动设备上，为地图区域添加底部内边距
        const statusBarHeight = statusBar.offsetHeight;
        mapArea.style.paddingBottom = `${statusBarHeight}px`;
        
        // 确保Canvas正确调整大小
        resizeCanvas();
    } else {
        // 在桌面设备上重置
        mapArea.style.paddingBottom = '0';
    }
}
// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);