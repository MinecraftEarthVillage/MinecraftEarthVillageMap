import offsetConfig from './offsetConfig.js';


// 应用偏移到坐标点
function applyOffset(point, offsets = [0, 0]) {
    return [
        point[0] + offsets[0],
        point[1] + offsets[1]
    ];
}

// 应用偏移到路径数组
function applyOffsetToPath(path, offsets = [0, 0]) {
    return path.map(point => applyOffset(point, offsets));
}

// 获取特定元素的偏移量
function getSpecificOffset(id, type) {
    // 安全访问特定偏移配置
    if (offsetConfig.specificOffsets && 
        offsetConfig.specificOffsets[type] && 
        offsetConfig.specificOffsets[type][id]) {
        return offsetConfig.specificOffsets[type][id];
    }
    return null; // 未找到特定偏移时返回 null
}

// 处理配置对象并应用偏移
export function processConfigWithOffset(config, landmarks) {
    // 处理公路配置
    const processedHighways = config.highways.map(highway => {
        const specificOffset = getSpecificOffset(highway.id, 'highways');
        const offsets = specificOffset || offsetConfig.globalOffset;
        
        return {
            ...highway,
            path: applyOffsetToPath(highway.path, offsets)
        };
    });
    
    // 处理地标配置
    const processedLandmarks = landmarks.map(landmark => {
        const specificOffset = getSpecificOffset(landmark.id, 'landmarks');
        const offsets = specificOffset || offsetConfig.globalOffset;
        
        return {
            ...landmark,
            positions: landmark.positions.map(pos => applyOffset(pos, offsets))
        };
    });
    
    return {
        config: {
            ...config,
            highways: processedHighways
        },
        landmarks: processedLandmarks
    };
}