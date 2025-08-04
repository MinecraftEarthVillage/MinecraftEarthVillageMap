// offsetConfig.js - 偏移配置文件
const offsetConfig = {
    // 全局偏移（应用于所有元素）
    globalOffset: [10, 20], // [x, y] 偏移量
    
    // 特定元素的偏移（覆盖全局偏移）
    specificOffsets: {
        // 公路偏移示例
        highways: {
            // 'G0711': [5, 10], // 公路ID: [x偏移, y偏移]
            // 'G30沪霍': [0, 5],
            // 添加更多公路偏移...
        },
        
        // 地标偏移示例
        landmarks: {
            // 'G30': [2, 3], // 地标ID: [x偏移, y偏移]
            // 'G0711': [0, -2],
            // 添加更多地标偏移...
        }
    }
};

export default offsetConfig;