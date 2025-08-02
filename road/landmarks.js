// landmarks.js - 地标数据配置文件
const landmarks = [
    // 图片地标
    {
        id: 'G30',
        name: '沪霍高速',
        type: '仅图标',
        positions: [[172, 263],[210,287],[386,345]], // 地图坐标 [x, y]
        imageUrl: 'icon/G30.svg', // 图标路径
        width: 5,
        height: 5,
        info: `
                    <h3>G30沪霍高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>上海</p>
                   <p><strong>终点：</strong>新疆维吾尔自治区伊犁哈萨克自治州霍尔果斯市</p>
                   <p><strong>途径城市：</strong>上海、合肥、武汉、延安、乌鲁木齐、霍尔果斯</p>
                   <p><strong>途径路段被共线高速：</strong>S1（新高速）、乌鲁木齐西支线、G0711喀什支线、G55二广高速、G42沪蓉高速</p>
                   <p><strong>简介：</strong>中国最长高速公路</p>
        `
    },
    
    // 文本地标
    // {
    //     id: 'lm2',
    //     name: '收费站',
    //     type: '仅文本',
    //     position: [450, 350],
    //     text: '收费站A',
    //     textStyle: {
    //         color: '#fff',
    //         fontSize: '14px',
    //         backgroundColor: 'rgba(0,0,0,0.5)',
    //         padding: '4px 8px',
    //         borderRadius: '4px'
    //     },
    //     info: `<h3>收费站A</h3>
    //            <p>收费：¥15/次</p>
    //            <p>开放时间：24小时</p>`
    // },
    
    // 图文组合地标
    // {
    //     id: 'lm3',
    //     name: '服务区',
    //     type: '图文组合',
    //     position: [600, 450],
    //     imageUrl: 'icons/service.png',
    //     width: 24,
    //     height: 24,
    //     text: '朝阳服务区',
    //     textOffset: [0, 30], // 文本相对于图标的偏移 [dx, dy]
    //     textStyle: {
    //         color: '#ff0',
    //         fontSize: '12px',
    //         fontWeight: 'bold'
    //     },
    //     info: `<h3>朝阳服务区</h3>
    //            <p>设施：加油站、餐厅、卫生间</p>
    //            <p>距离下一站：50km</p>`
    // },
    
    // 更多地标...
    // {
    //     id: 'lm4',
    //     name: '边境检查站',
    //     type: '仅图标',
    //     position: [910, 564],
    //     imageUrl: 'icons/border.png',
    //     width: 28,
    //     height: 28,
    //     info: `<h3>霍尔果斯边境检查站</h3>
    //            <p>连接哈萨克斯坦</p>
    //            <p>通关时间：8:00-22:00</p>`
    // }
];