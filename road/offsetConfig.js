// offsetConfig.js - 偏移配置文件
const offsetConfig = {
    // 全局偏移（应用于所有元素）
    globalOffset: [5, 30], // [x, y] 偏移量
    
    // 特定元素的偏移（覆盖全局偏移）
    specificOffsets: {
        // 公路偏移
        highways: {
            // 'G0711': [5, 10], // 公路ID: [x偏移, y偏移]
            // 'G30沪霍': [0, 5],
            // 添加更多公路偏移...
        },
        
        // 地标偏移
        landmarks: {
            '台北': [0, 36], // 地标ID: [x偏移, y偏移]
            '上海': [-6, 36], // 地标ID: [x偏移, y偏移]
            '二连浩特': [-10, 15], // 地标ID: [x偏移, y偏移]
            '三沙市': [0, 0], // 地标ID: [x偏移, y偏移]
            '大庆': [0, 0], // 地标ID: [x偏移, y偏移]
            
            // 添加更多地标偏移...
        }
    }
};

export default offsetConfig;