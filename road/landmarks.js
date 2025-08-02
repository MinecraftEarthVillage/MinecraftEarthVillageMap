// landmarks.js - 地标数据配置文件
const landmarks = [
    // 图片地标
    {
        id: 'G30',
        name: '沪霍高速',
        type: '仅图标',
        positions: [[172, 263], [210, 287], [386, 345], [504, 372], [597, 404], [706, 408], [790, 460], [790, 557], [270, 315]], // 地图坐标 [x, y]
        imageUrl: 'icon/G30.svg', // 图标路径
        width: 8,
        height: 8,
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
    {
        id: 'G0711',
        name: 'G0711喀什支线',
        type: '仅图标',
        positions: [[326, 314], [180, 323], [39, 370]], // 地图坐标 [x, y]
        imageUrl: 'icon/G0711.svg', // 图标路径
        width: 8,
        height: 8,
        info: `
                    <h3>G0711喀什支线</h3>
                   <p><strong>类别：</strong>支线</p>
                   <p><strong>起点：</strong>G7京新高速乌鲁木齐东南立交桥</p>
                   <p><strong>终点：</strong>新疆维吾尔自治区喀什地区（连通边境）</p>
                   <p><strong>途径城市：</strong>（暂无可发展城市）</p>
                   <p><strong>途径路段被共线高速：</strong>G30沪霍高速</p>
                   <p><strong>简介：</strong>有望成为连通欧洲、非洲的中国支线高速公路</p>
        `
    },
    {
        id: 'G701',
        name: 'G701乌市环线',
        type: '仅图标',
        positions: [[236, 236]], // 地图坐标 [x, y]
        imageUrl: 'icon/G0701.svg', // 图标路径
        width: 8,
        height: 8,
        info: `
                   <h3>G0701乌市环线</h3>
                   <p><strong>类别：</strong>环城高速</p>
                   <p><strong>起点：</strong>---</p>
                   <p><strong>终点：</strong>---</p>
                   <p><strong>途径城市：</strong>上乌鲁木齐</p>
                   <p><strong>途径路段被共线高速：</strong>G30沪霍高速、G7京新高速</p>
                   <p><strong>简介：</strong>中国第一条环城高速公路</p>
        `
    },
    {
        id: 'G7',
        name: 'G7京新高速',
        type: '仅图标',
        positions: [[335, 270], [386, 319],[542,337],[773,379],[690,362]], // 地图坐标 [x, y]
        imageUrl: 'icon/G7.svg', // 图标路径
        width: 8,
        height: 8,
        info: `
                   <h3>G7京新高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京市</p>
                   <p><strong>终点：</strong>乌鲁木齐</p>
                   <p><strong>途径城市：</strong>北京、张家口、呼和浩特、乌海市、乌鲁木齐</p>
                   <p><strong>途径路段被共线高速：</strong>G6京藏高速</p>
                   <p><strong>简介：</strong>中国第一条跨沙漠高速公路</p>
        `
    },
    // //文本地标
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
    {
        id: '乌鲁木齐市',
        name: '乌鲁木齐市',
        type: '图文组合',
        positions: [[246, 251]],
        imageUrl: 'icon/城市.png',
        width: 20,
        height: 20,
        text: '乌鲁木齐',
        textOffset: [0, 5], // 文本相对于图标的偏移 [dx, dy]
        textStyle: {
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        info: `一座城市`
    },

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
    // {
    //     id: 'fancy-text',
    //     name: '装饰文本示例',
    //     type: 'text',
    //     positions: [[500, 300]],
    //     text: '高速公路',
    //     textStyle: {
    //         // 字体属性
    //         fontFamily: 'Microsoft YaHei, sans-serif',
    //         fontSize: '24px',
    //         fontWeight: 'bold',
    //         fontStyle: 'italic',

    //         // 颜色与描边
    //         color: '#ffffff',
    //         strokeStyle: '#000000', // 描边颜色
    //         strokeWidth: 2,         // 描边宽度

    //         // 背景效果
    //         backgroundColor: 'rgba(52, 152, 219, 0.8)',
    //         backgroundPadding: [8, 15], // [垂直, 水平]
    //         borderRadius: 8,
    //         borderColor: '#f1c40f',
    //         borderWidth: 2,

    //         // 阴影效果
    //         textShadow: true,
    //         shadowBlur: 5,
    //         shadowColor: 'rgba(0,0,0,0.7)',
    //         shadowOffsetX: 2,
    //         shadowOffsetY: 2,

    //         // 旋转
    //         rotation: -5 // 倾斜角度
    //     },
    //     info: '装饰性文本示例'
    // }
];