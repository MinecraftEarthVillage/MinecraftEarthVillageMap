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
    touchStartY: 0,   // 触摸开始Y坐标
    bindings: {}, // 存储绑定关系 {highwayId: [landmarkIds], landmarkId: highwayId}
    //共线重叠情况下
    overlappingHighways: [], // 当前重叠的公路
    showHighwayMenu: false,  // 是否显示菜单
    menuPosition: { x: 0, y: 0 }, // 菜单位置

    directHighlight: { // 直接点击的高亮对象
        type: null, // 'highway' 或 'landmark'
        id: null    // 直接点击的ID
    },
    relatedHighlights: { // 关联高亮对象
        highways: [],   // 关联高亮的公路ID列表
        landmarks: []   // 关联高亮的地标ID列表
    }
};

//设置高亮的方法
function setHighwayHighlight(highway) {
    // 设置直接高亮
    appState.directHighlight = {
        type: 'highway',
        id: highway.id
    };
    
    // 设置关联高亮
    appState.relatedHighlights.highways = [highway.id];
    
    // 如果有绑定地标，添加关联高亮
    if (highway.landmarkIds && highway.landmarkIds.length > 0) {
        appState.relatedHighlights.landmarks = highway.landmarkIds;
    }
    
    // 显示信息
    showHighwayInfo(highway);
    highlightInfo.textContent = `已选择: ${highway.name}`;
    hideTooltip();
}

function setLandmarkHighlight(landmark) {
    // 设置直接高亮
    appState.directHighlight = {
        type: 'landmark',
        id: landmark.id
    };
    
    // 设置关联高亮
    appState.relatedHighlights.landmarks = [landmark.id];
    
    // 如果有绑定公路，添加关联高亮
    if (landmark.highwayId) {
        const highwayIds = Array.isArray(landmark.highwayId) 
            ? landmark.highwayId 
            : [landmark.highwayId];
            
        appState.relatedHighlights.highways = highwayIds;
    }
    
    showHighwayInfo(landmark);
    highlightInfo.textContent = `已选择: ${landmark.name}`;
}
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

    // 检查是否应该高亮
    const shouldHighlight = 
        appState.directHighlight.id === highway.id || 
        appState.relatedHighlights.highways.includes(highway.id);

    if (shouldHighlight) {
        ctx.shadowColor = '#f1c40f';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = highway.width * 1.5;
    } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.strokeStyle = group.color;
        ctx.lineWidth = highway.width;
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
//绘制多条
function drawHighways() {
    config.highways.forEach(highway => {
        // 检查分组可见性
        const group = config.groups.find(g => g.id === highway.group);
        if (!group || !group.visible) return;

        ctx.beginPath();
        const [firstX, firstY] = highway.path[0];
        ctx.moveTo(
            firstX * appState.scale + appState.offsetX,
            firstY * appState.scale + appState.offsetY
        );

        // 绘制路径
        highway.path.slice(1).forEach(([x, y]) => {
            ctx.lineTo(
                x * appState.scale + appState.offsetX,
                y * appState.scale + appState.offsetY
            );
        });

        // 应用样式：高亮状态使用特殊颜色
        if (appState.highlightedHighway === highway.id) {
            ctx.strokeStyle = '#f1c40f'; // 高亮色（黄色）
            ctx.lineWidth = highway.width * 1.5 * appState.scale; // 高亮时线宽增加
            ctx.shadowColor = '#f1c40f';
            ctx.shadowBlur = 10;
        } else {
            ctx.strokeStyle = group.color;
            ctx.lineWidth = highway.width * appState.scale;
            ctx.shadowBlur = 0; // 清除阴影
        }

        ctx.stroke();
        ctx.closePath();
    });
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

    const hitHighways = [];

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
            // 计算点到线段的距离
            const dx = p2[0] - p1[0];
            const dy = p2[1] - p1[1];
            const segmentLengthSquared = dx * dx + dy * dy;
            if (segmentLengthSquared === 0) continue;

            const t = ((contentX - p1[0]) * dx + (contentY - p1[1]) * dy) / segmentLengthSquared;
            const tClamped = Math.max(0, Math.min(1, t));
            const projX = p1[0] + tClamped * dx;
            const projY = p1[1] + tClamped * dy;

            const dist = Math.sqrt((contentX - projX) ** 2 + (contentY - projY) ** 2);

            if (dist < tolerance) {
                hitHighways.push(highway);
                // break; // 一条公路只需要匹配一次
            }
        }
    }

    return hitHighways;
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


// 在信息面板显示详情（同时支持道路和地标）
function showHighwayInfo(item) {
    if (!item) return;

    // 支持地标和道路两种类型
    highwayInfo.innerHTML = item.info ? item.info :
        `<h2>${item.name}</h2>
         <p><strong>类型:</strong> ${item.type || '未知'}</p>
         ${item.group ? `<p><strong>分组:</strong> ${item.group}</p>` : ''}`;

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
    mobileToggle.addEventListener('click', function () {
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
        // 先隐藏之前的提示
        hideTooltip();
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
            const highways = getHighwayAtPoint(e.clientX, e.clientY);
            if (highways.length > 0) {
                canvas.style.cursor = 'pointer';
                // 显示第一条公路的名称作为提示
                showTooltip(highways[0], e.clientX, e.clientY);
            } else {
                canvas.style.cursor = 'default';
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
        // 重置悬停状态
        appState.highlightedHighway = null;
        highlightInfo.innerHTML = "未选择任何路线或地标";
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
                // 阻止事件冒泡 - 关键修复
                e.stopPropagation();
                handleMapClick(touch.clientX, touch.clientY);
            }
        }

        e.preventDefault();
    }, { passive: false });

    // 电脑端点击事件
    // 处理Canvas点击事件
canvas.addEventListener('click', (e) => {
    resetAllHighlights();
    
    const clickedLandmark = getLandmarkAtPoint(e.clientX, e.clientY);
    if (clickedLandmark) {
        setLandmarkHighlight(clickedLandmark);
        render();
        return;
    }
    
    const hitHighways = getHighwayAtPoint(e.clientX, e.clientY);
    if (hitHighways.length > 0) {
        handleHighwayClick(hitHighways, e);
    } else {
        infoPanel.style.display = 'none';
        highlightInfo.textContent = '未选择任何路线或地标';
    }
    
    render();
});

// 处理地标点击
function handleLandmarkClick(landmark) {
    // 设置直接高亮
    appState.directHighlight = {
        type: 'landmark',
        id: landmark.id
    };
    
    // 设置关联高亮
    appState.relatedHighlights.landmarks = [landmark.id];
    
    // 如果有绑定公路，添加关联高亮
    if (landmark.highwayId) {
        const highwayIds = Array.isArray(landmark.highwayId) 
            ? landmark.highwayId 
            : [landmark.highwayId];
            
        appState.relatedHighlights.highways = highwayIds;
    }
    
    showHighwayInfo(landmark);
    highlightInfo.textContent = `已选择: ${landmark.name}`;
}

// 处理公路点击
function handleHighwayClick(highways, e) {
    if (highways.length > 1) {
        appState.overlappingHighways = highways;
        appState.showHighwayMenu = true;
        appState.menuPosition = { x: e.clientX, y: e.clientY };
        showHighwayMenu();
        return;
    }
    
    setHighwayHighlight(highways[0]);
}

// 重置所有高亮状态
function resetAllHighlights() {
    appState.directHighlight = { type: null, id: null };
    appState.relatedHighlights = { highways: [], landmarks: [] };
    appState.highlightedLandmark = null;
    appState.highlightedHighway = null;
}

    // 移动端控制面板切换
    mobileToggle.addEventListener('click', function () {
        controlsPanel.classList.add('visible');
    });

    // 关闭面板按钮
    document.getElementById('closePanel').addEventListener('click', function () {
        controlsPanel.classList.remove('visible');
    });

    // 点击外部关闭面板
    document.addEventListener('click', function (e) {
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
    // 关闭信息面板
    infoPanel.style.display = 'none';
    // 检测地标
    console.log("Handling map click at", clientX, clientY);

    const landmark = getLandmarkAtPoint(clientX, clientY);
    if (landmark) {
        appState.highlightedLandmark = landmark.id; // 设置地标高亮
        appState.highlightedHighway = null; // 取消公路高亮
        // 如果有绑定公路，则高亮公路
        if (appState.bindings[landmark.id]) {
            appState.highlightedHighway = appState.bindings[landmark.id];
        }
        highlightInfo.innerHTML = `已选择: <span class="highlight-info">${landmark.name}</span>`;
        showLandmarkInfo(landmark);
        render();
        return;
    }

    // 检测公路
    const highways = getHighwayAtPoint(clientX, clientY);
    console.log("Found highways:", highways);
    if (highways.length > 0) {
        if (highways.length === 1) {
            // 只有一条公路，直接选择
            selectHighway(highways[0]);
        } else {
            // 阻止事件冒泡 - 关键修复
            e.stopPropagation();
            // 多条公路重叠，显示选择菜单
            console.log("多条公路重叠，显示选择菜单");

            appState.overlappingHighways = highways;
            appState.showHighwayMenu = true;
            appState.menuPosition = {
                x: clientX,
                y: clientY
            };
            // 确保菜单渲染
            setTimeout(() => renderMenu(), 0);
        }
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
    loadLandmarkImages();// 加载地标图片
    // 移动设备初始化
    if (isMobile()) {
        // 添加安全区域顶部填充
        const header = document.querySelector('.header');
        header.style.paddingTop = `env(safe-area-inset-top, 0)`;

        controlsPanel.classList.remove('visible');
        // 添加安全区域底部填充
        const statusBar = document.querySelector('.status-bar');
        statusBar.style.paddingBottom = `calc(8px + env(safe-area-inset-bottom, 0))`;
    }

    // 确保菜单元素存在
    if (!document.getElementById('highwayMenu')) {
        const menu = document.createElement('div');
        menu.id = 'highwayMenu';
        menu.className = 'highway-menu';
        menu.style.display = 'none';
        menu.style.position = 'fixed';
        menu.style.zIndex = '1000';
        menu.style.backgroundColor = 'white';
        menu.style.border = '1px solid #ccc';
        menu.style.borderRadius = '5px';
        menu.style.padding = '10px';
        menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';

        // 标题栏（带关闭按钮）
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '10px';
        
        const title = document.createElement('h4');
        title.textContent = '选择道路：';
        title.style.margin = '0';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            menu.style.display = 'none';
            appState.showHighwayMenu = false;
        });
        
        header.appendChild(title);
        header.appendChild(closeButton);
        
        const list = document.createElement('ul');
        list.id = 'highwayMenuList';
        list.style.listStyleType = 'none';
        list.style.padding = '0';
        list.style.margin = '0';
        
        menu.appendChild(header);
        menu.appendChild(list);
        document.body.appendChild(menu);
    }


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
        if (landmark.imageUrl && !appState.landmarkImages[landmark.imageUrl]) {
            const img = new Image();
            img.src = landmark.imageUrl;
            img.onload = () => {
                appState.landmarkImages[landmark.imageUrl] = img;
                render();
            };
            img.onerror = () => {
                console.error(`无法加载地标图片: ${landmark.imageUrl}`);
                // 加载失败时使用默认图标
                appState.landmarkImages[landmark.imageUrl] = createDefaultLandmarkImage();
                render();
            };
        }
    });
}
// 创建默认地标图片
function createDefaultLandmarkImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fill();
    return canvas;
}


// 绘制地标（支持多个位置）
function drawLandmarks() {
    landmarks.forEach(landmark => {
        // 检查地标是否属于可见分组
        if (landmark.group && !config.groups.find(g => g.id === landmark.group && g.visible)) {
            return;
        }

          // 检查是否应该高亮
        const shouldHighlight = 
            appState.directHighlight.id === landmark.id || 
            appState.relatedHighlights.landmarks.includes(landmark.id);
        
        if (shouldHighlight) {
            ctx.save();
            ctx.shadowColor = '#f1c40f';
            ctx.shadowBlur = 15;
        }

        // 绘制图标
        if (landmark.type === '仅图标' || landmark.type === '图文组合') {
            landmark.positions.forEach(pos => {
                const [x, y] = pos;

                // 绘制图标（假设已加载）
                if (appState.landmarkImages[landmark.imageUrl]) {
                    ctx.drawImage(
                        appState.landmarkImages[landmark.imageUrl],
                        x - landmark.width / 2,
                        y - landmark.height / 2,
                        landmark.width,
                        landmark.height
                    );
                } else {
                    // 图标未加载时绘制占位符
                    ctx.fillStyle = '#3498db';
                    ctx.fillRect(x - landmark.width / 2, y - landmark.height / 2, landmark.width, landmark.height);
                }

                // 绘制文本（图文组合类型）
                if (landmark.type === '图文组合' && landmark.text) {
                    ctx.save();
                    const textX = x + (landmark.textOffset?.[0] || 0);
                    const textY = y + (landmark.textOffset?.[1] || 0) + landmark.height / 2;

                    ctx.fillStyle = landmark.textStyle?.color || '#fff';
                    ctx.font = `${landmark.textStyle?.fontWeight || 'normal'} ${landmark.textStyle?.fontSize || '12px'} sans-serif`;

                    if (landmark.textStyle?.strokeStyle) {
                        ctx.strokeStyle = landmark.textStyle.strokeStyle;
                        ctx.lineWidth = landmark.textStyle.strokeWidth || 1;
                        ctx.strokeText(landmark.text, textX, textY);
                    }

                    ctx.fillText(landmark.text, textX, textY);
                    ctx.restore();
                }
            });
        }

        // 恢复状态
        if (shouldHighlight) {
            ctx.restore();
        }
    });
}

// 检测是否点击到地标
function getLandmarkAtPoint(clientX, clientY) {
    appState.canvasRect = canvas.getBoundingClientRect();
    const x = clientX - appState.canvasRect.left;
    const y = clientY - appState.canvasRect.top;
    const contentX = (x - appState.offsetX) / appState.scale;
    const contentY = (y - appState.offsetY) / appState.scale;

    for (let i = landmarks.length - 1; i >= 0; i--) {
        const landmark = landmarks[i];
        // 检查地标是否属于可见分组
        if (landmark.group && !config.groups.find(g => g.id === landmark.group && g.visible)) {
            continue;
        }

        // 检查每个位置点
        for (const pos of landmark.positions) {
            const [landmarkX, landmarkY] = pos;
            // 计算点击区域（图标大小的矩形区域）
            const halfWidth = (landmark.width || 8) / 2;
            const halfHeight = (landmark.height || 8) / 2;

            if (contentX >= landmarkX - halfWidth &&
                contentX <= landmarkX + halfWidth &&
                contentY >= landmarkY - halfHeight &&
                contentY <= landmarkY + halfHeight) {
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




// 重叠时选择公路函数
function selectHighway(highway) {
    appState.highlightedHighway = highway.id;
    appState.highlightedLandmark = null;

    // 如果有绑定地标，则高亮地标
    if (appState.bindings[highway.id]) {
        appState.highlightedLandmarks = appState.bindings[highway.id];
    }

    highlightInfo.innerHTML = `已选择: <span class="highlight-info">${highway.name}</span>`;
    showHighwayInfo(highway);
    appState.showHighwayMenu = false;
}

// 渲染重叠列表菜单
// 显示公路选择菜单
function showHighwayMenu() {
    const menu = document.getElementById('highwayMenu');
    const menuList = document.getElementById('highwayMenuList');

    menuList.innerHTML = '';
    
    appState.overlappingHighways.forEach(highway => {
        const li = document.createElement('li');
        li.textContent = highway.name;
        li.addEventListener('click', () => {
            setHighwayHighlight(highway);
            appState.showHighwayMenu = false;
            menu.style.display = 'none';
            render();
        });
        menuList.appendChild(li);
    });

    menu.style.left = `${appState.menuPosition.x}px`;
    menu.style.top = `${appState.menuPosition.y}px`;
    menu.style.display = 'block';
}

// 点击页面其他地方关闭菜单
document.addEventListener('click', (e) => {
    const menu = document.getElementById('highwayMenu');
    const canvas = document.getElementById('mapCanvas');

    // 如果点击不在菜单内且不在canvas上，则关闭菜单
    if (!menu.contains(e.target) && e.target !== canvas) {
        appState.showHighwayMenu = false;
        menu.style.display = 'none';
    }
});

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);
