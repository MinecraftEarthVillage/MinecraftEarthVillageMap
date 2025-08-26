// landmarks.js - 地标数据配置文件
let landmarks = [
    // 图片地标
    {
        id: 'G30',//如果公路的id也是这个，那么你就可以去掉下面的highwayId了，这里因为ID不一样，所以必须指定公路ID，否则点击路牌图标只会显示沿线图标，线段是不会亮起来的（不会有人喜欢这个吧）
        名称: '沪霍高速',
        图标类型: '仅图标',
        绑定公路ID: ['G30沪霍'],//点击该图标时同时亮起指定ID某条公路，需要在config.js里有这个
        positions: [[172, 263], [210, 287], [386, 345], [504, 372], [597, 404], [706, 408], [790, 460], [790, 557], [270, 315]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G30.svg', // 图标路径
        宽: 8,
        高: 8,
        信息: `
                    <h3>G30沪霍高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>上海</p>
                   <p><strong>终点：</strong>新疆维吾尔自治区伊犁哈萨克自治州霍尔果斯市</p>
                   <p><strong>途径城市：</strong>上海、合肥、武汉、延安、乌鲁木齐、霍尔果斯</p>
                   <p><strong>途径路段被共线高速：</strong>S1（新高速）、乌鲁木齐西支线、G0711喀什支线、G55二广高速、G42沪蓉高速</p>
                   <p><strong>简介：</strong>中国最长高速公路</p>
        `,
        分组: '冰高速', // 添加分组属性
    },
    {
        id: 'G0711',//这个ID在config.js里也能找到，所以无需再设定highwayId字段
        名称: 'G0711喀什支线',
        图标类型: '仅图标',
        positions: [[326, 314], [180, 323], [39, 370]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G0711.svg', // 图标路径
        宽: 8,
        高: 8,
        分组: '冰高速',
        信息: `
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
        id: '乌鲁木齐绕城',
        绑定公路ID: [''], // 绑定公路ID，这里不需要了
        名称: 'G701乌市环线',
        图标类型: '仅图标',
        positions: [[275, 274], [246, 236],], // 地图坐标 [x, y]
        图标图片路径: 'icon/G0701.svg', // 图标路径
        宽: 8,
        高: 8,
        分组: '冰高速',
        绑定公路ID: ['G0701'],
        信息: `
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
        id: 'G7京新高速',//config.js里找不到对应的id，
        绑定公路ID: ['G7'],//需要在此处指定config.js里的ID
        名称: 'G7京新高速',
        图标类型: '仅图标',
        positions: [[335, 270], [386, 319], [542, 337], [773, 379], [690, 362]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G7.svg', // 图标路径
        宽: 8,
        分组: '冰高速',

        高: 8,
        信息: `
                   <h3>G7京新高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京市</p>
                   <p><strong>终点：</strong>乌鲁木齐</p>
                   <p><strong>途径城市：</strong>北京、张家口、呼和浩特、乌海市、乌鲁木齐</p>
                   <p><strong>途径路段被共线高速：</strong>G6京藏高速</p>
                   <p><strong>简介：</strong>中国第一条跨沙漠高速公路</p>
        `
    },
    {
        id: 'G1',
        名称: 'G1京哈高速',
        图标类型: '仅图标',
        绑定公路ID: ['G1'],
        positions: [[900, 392], [956, 294], [1021, 267],], // 地图坐标 [x, y]
        图标图片路径: 'icon/G1.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G1京哈高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京市</p>
                   <p><strong>终点：</strong>哈尔滨</p>
                   <p><strong>途径城市：</strong>哈尔滨、大庆、北京</p>
                   <p><strong>途径路段被共线高速：</strong>G13哈海高速、G45大广高速、G4京港澳高速</p>
                   <p><strong>简介：</strong>包含渤海湾跨海大桥的主线高速</p>
        `
    },
    {
        id: 'G17',
        名称: 'G17新藏高速',
        图标类型: '仅图标',
        positions: [[344, 484],], // 地图坐标 [x, y]
        图标图片路径: 'icon/G17.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                            <h3>G17新藏高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>G30连霍高速巴音郭勒立交桥</p>
                   <p><strong>终点：</strong>拉萨</p>
                   <p><strong>途径城市：</strong>拉萨</p>
                   <p><strong>途径路段被共线高速：</strong>G6京藏高速</p>
                   <p><strong>简介：</strong>中国跨越阶梯爬坡最<bold>陡</bold>的高速</p>
        `
    },
    {
        id: 'G45',
        名称: 'G45大广高速',
        图标类型: '仅图标',
        positions: [[955, 253], [842, 467], [836, 551], [784, 635]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G45.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        绑定公路ID: ['G45'],
        高: 8,
        信息: `
                   <h3>G45大广高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>黑龙江省大庆市</p>
                   <p><strong>终点：</strong>广州</p>
                   <p><strong>途径城市：</strong>大庆、郑州、深圳、广州</p>
                   <p><strong>途径路段被共线高速：</strong>G1京哈高速、G13哈海高速、G55二广高速、G4京港澳高速</p>
                   <p><strong>简介：</strong>中国南北走向冰高速路中全线被共线（仅次于京港澳高速）</p>
        `
    },
    {
        id: 'G4',
        名称: 'G4京港澳高速',
        图标类型: '仅图标',
        positions: [[809, 730], [808, 626], [829, 466]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G4.svg', // 图标路径
        宽: 8,
        绑定公路ID: ['G4'],
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G4京港澳高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京</p>
                   <p><strong>终点：</strong>深圳</p>
                   <p><strong>途径城市：</strong>北京、郑州、深圳</p>
                   <p><strong>途径路段被共线高速：</strong>G1京哈高速、G2京沪高速、G3京台高速、G5京昆高速、G14沪拉高速、G45大广高速、G13哈海高速</p>
                   <p><strong>简介：</strong>中国第一条高速公路（开山鼻祖）</p>
        `
    },
    {
        id: 'G3',
        名称: 'G3京台高速',
        图标类型: '仅图标',
        positions: [[873, 704], [805, 634], [822, 545]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G3.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        绑定公路ID: ['G3'],
        高: 8,
        信息: `
                   <h3>G3京台高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京</p>
                   <p><strong>终点：</strong>台北</p>
                   <p><strong>途径城市：</strong>北京、郑州、台北</p>
                   <p><strong>途径路段被共线高速：</strong>G4京港澳高速</p>
                   <p><strong>简介：</strong>与G0迪台国际高速共用一个起点，也是唯一一条通向台湾的冰高速</p>
        `
    },
    {
        id: 'G13',
        名称: 'G13哈海高速',
        图标类型: '仅图标',
        positions: [[712, 777]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G13.svg', // 图标路径
        // 绑定公路ID: ['G13'],
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G13哈海高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>哈尔滨</p>
                   <p><strong>终点：</strong>海口市</p>
                   <p><strong>途径城市：</strong>哈尔滨、大庆、北京、郑州、深圳、广州、海口</p>
                   <p><strong>途径路段被共线高速：</strong>G4京港澳高速、G1京哈高速、G45大广高速</p>
                   <p><strong>简介：</strong>第一条到海南的高速公路</p>
        `
    },
    {
        id: 'G2',
        名称: 'G2京沪高速',
        图标类型: '仅图标',
        positions: [[871, 539], [829, 470], [845, 408]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G2.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G2京沪高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京</p>
                   <p><strong>终点：</strong>上海</p>
                   <p><strong>途径城市：</strong>北京、郑州、上海</p>
                   <p><strong>途径路段被共线高速：</strong>G4京港澳高速、G14沪拉高速</p>
                   <p><strong>简介：</strong>第一条到上海的高速公路<br><s>（废话）</s></p>
        `
    },
    {
        id: 'G55',
        名称: 'G55二广高速',
        图标类型: '仅图标',
        positions: [[784, 643], [790, 548], [747, 389]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G55.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G55二广高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>二连浩特</p>
                   <p><strong>终点：</strong>广州</p>
                   <p><strong>途径城市：</strong>二连浩特、武汉、深圳、广州</p>
                   <p><strong>途径路段被共线高速：</strong><br>G30沪霍高速<br>G4京港澳高速<br>G45大广高速<br>G13哈海高速</p>
                   <p><strong>简介：</strong>中国第一条山区高速公路</p>
        `
    }, {
        id: 'S2',
        名称: 'S2成都支线',
        图标类型: '仅图标',
        positions: [[629, 642]], // 地图坐标 [x, y]
        图标图片路径: 'icon/S2.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>S2成都支线</h3>
                   <p><strong>类别：</strong>省级主线</p>
                   <p><strong>起点：</strong>G14成都南立交</p>
                   <p><strong>终点：</strong>成都</p>
                   <p><strong>途径城市：</strong>成都</p>
                   <p><strong>途径路段被共线高速：</strong>无</p>
                   <p><strong>简介：</strong>四川向拉萨、广州和国外城市的重要省级高速</p>
        `
    },
    {
        id: 'G5',
        名称: 'G5京昆高速',
        图标类型: '仅图标',
        positions: [[509, 704], [643, 704], [805, 645], [822, 504], [844, 418]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G5.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G5京昆高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京</p>
                   <p><strong>终点：</strong>瑞丽市（与G0国际高速连接）</p>
                   <p><strong>途径城市：</strong>北京、郑州</p>
                   <p><strong>途径路段被共线高速：</strong>G4京港澳高速</p>
                   <p><strong>简介：</strong>中国第一条与国外互通的高速公路</p>
        `
    },
    {
        id: 'G75',
        名称: 'G5海蓉高速',
        图标类型: '仅图标',
        positions: [[720, 718],], // 地图坐标 [x, y]
        图标图片路径: 'icon/G75.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G75海蓉高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>G13高速海口北立交桥</p>
                   <p><strong>终点：</strong>G14高速安和西立交桥</p>
                   <p><strong>途径城市：</strong>无</p>
                   <p><strong>途径路段被共线高速：</strong>无</p>
                   <p><strong>简介：</strong>是广州向中国西北乃至国外的重要干线主线高速</p>
        `
    }, {
        id: 'G14',
        名称: 'G14沪拉高速',
        图标类型: '仅图标',
        positions: [[362, 600], [509, 611], [606, 683], [732, 683], [811, 617], [863, 539]], // 地图坐标 [x, y]
        图标图片路径: 'icon/G14.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G14沪拉高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>拉萨</p>
                   <p><strong>终点：</strong>上海</p>
                   <p><strong>途径城市：</strong>拉萨、上海</p>
                   <p><strong>途径路段被共线高速：</strong>G4京港澳高速（京港高速）</p>
                   <p><strong>简介：</strong>中国第一条藏区高原高速公路</p>
        `
    }, {
        id: 'G67',
        名称: 'G67乌蓉高速',
        图标类型: '仅图标',
        positions: [[665, 477],], // 地图坐标 [x, y]
        图标图片路径: 'icon/G67.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G67乌蓉高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>乌海市</p>
                   <p><strong>终点：</strong>成都市东</p>
                   <p><strong>途径城市：</strong>乌海、成都</p>
                   <p><strong>途径路段被共线高速：</strong>无</p>
                   <p><strong>简介：</strong>中国唯一跨秦岭仍然保持双向四车道的冰高速路</p>
        `
    }, {
        id: 'G42',
        名称: 'G42沪蓉高速',
        图标类型: '仅图标',
        positions: [[740, 578],], // 地图坐标 [x, y]
        图标图片路径: 'icon/G42.svg', // 图标路径
        宽: 8,
        分组: '冰高速',
        高: 8,
        信息: `
                   <h3>G42沪蓉高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>成都市东</p>
                   <p><strong>终点：</strong>上海</p>
                   <p><strong>途径城市：</strong>成都、武汉、上海</p>
                   <p><strong>途径路段被共线高速：</strong>G30沪霍高速</p>
                   <p><strong>简介：</strong>中国东西走向高速公路中最短的一条<s>废话</s></p>
        `
    },
    // //文本地标
    // {
    //     id: 'lm2',
    //     名称: '收费站',
    //     图标类型: '仅文本',
    //     positions: [450, 350],
    //     text: '收费站A',
    //     文本样式: {
    //         color: '#fff',
    //         fontSize: '14px',
    //         backgroundColor: 'rgba(0,0,0,0.5)',
    //         padding: '4px 8px',
    //         borderRadius: '4px'
    //     },
    //     信息: `<h3>收费站A</h3>
    //            <p>收费：¥15/次</p>
    //            <p>开放时间：24小时</p>`
    // },

    // 图文组合地标
    {
        id: '乌鲁木齐',
        名称: '乌鲁木齐市贴图',
        图标类型: '仅图标',
        positions: [[250, 281], [228, 282], [270, 286], [239, 281], [260, 288], [283, 294], [298, 282], [227, 306], [222, 259]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        分组: '主要城市',
        文本样式: {
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `服务器最大，最繁华的城市`
    },
    // {
    //     id: '乌鲁木齐的文字',
    //     名称: '装饰文本示例',
    //     图标类型: '仅文本',
    //     positions: [[256,294]],
    //     text: '乌鲁木齐',
    //     文本样式: {
    //         // 字体属性
    //         fontFamily: 'Microsoft YaHei, sans-serif',
    //         fontSize: '24px',
    //         fontWeight: 'bold',
    //         fontStyle: 'italic',

    //         // 颜色与描边
    //         color: '#673f3fff',
    //         strokeStyle: '#000000', // 描边颜色
    //         strokeWidth: 22,         // 描边宽度

    //         // 背景效果
    //         backgroundColor: 'rgba(52, 152, 219, 0.8)',
    //         backgroundPadding: [8, 15], // [垂直, 水平]
    //         borderRadius: 8,
    //         borderColor: '#f1c40f',
    //         border宽: 2,

    //         // 阴影效果
    //         textShadow: true,
    //         shadowBlur: 5,
    //         shadowColor: 'rgba(219, 198, 198, 0.7)',
    //         shadowOffsetX: 2,
    //         shadowOffsetY: 2,

    //         // 旋转
    //         rotation: -51 // 倾斜角度
    //     },
    //     信息: '装饰性文本示例'
    // },
    {
        id: '乌鲁木齐',
        名称: '乌鲁木齐的城市名称',
        图标类型: '仅文本',
        positions: [[260, 324]],
        分组: '主要城市',
        text: '乌鲁木齐',
        文本样式: {//填写Canvas属性
            // 字体属性
            fontFamily: 'Microsoft YaHei, sans-serif',
            fontSize: '20px',
            fontWeight: 'bold',
            fontStyle: 'italic',

            // 颜色与描边
            color: '#ffffffff',
            strokeStyle: '#000000', // 描边颜色
            strokeWidth: 1,         // 描边宽度
        },
        信息: '一个id和乌鲁木齐市图标一样的文本，它已经和图标绑定显示了'
    },
    {
        id: '郑州市',
        名称: '郑州市',
        图标类型: '图文组合',
        positions: [[833, 524]],
        图标图片路径: 'icon/城市.png',
        宽: 6.5,
        高: 4,
        text: '郑州',
        分组: '主要城市',
        文本偏移: [2, 2], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '2px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 0.2,
        },
        信息: `一座半废弃的城市`
    },
    {
        id: '广州',
        名称: '广州',
        图标类型: '仅图标',
        positions: [[751, 750], [760, 751], [755, 760], [775, 742], [770, 752], [770, 766], [780, 760], [740, 770], [750, 775]],
        图标图片路径: 'icon/城市.png',
        宽: 16,
        高: 16,
        分组: '主要城市',

    }, {
        id: '广州',
        名称: '广州',
        图标类型: '图文组合',
        positions: [[790, 746]],
        图标图片路径: 'icon/城市.png',
        宽: 30,
        高: 20,
        text: '广州',
        分组: '主要城市',
        文本偏移: [-10, 15], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>大粤之首都、亚洲经济之王</h3>
        `
    },
    {
        id: '拉萨',
        名称: '拉萨',
        图标类型: '图文组合',
        positions: [[348, 611]],
        图标图片路径: 'icon/城市.png',
        宽: 30,
        高: 20,
        text: '拉萨',
        分组: '主要城市',
        文本偏移: [0, 0], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3><s>实际游戏里就一个火车站和一个机场</s></h3>
        `
    },
    {
        id: '成都',
        名称: '成都',
        图标类型: '图文组合',
        positions: [[636, 607]],
        图标图片路径: 'icon/城市.png',
        宽: 50,
        高: 40,
        text: '成都',
        分组: '主要城市',
        文本偏移: [0, 5], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3><s>IsabellaX发展的第二座城市（废话）</s></h3>
        `
    },
    {
        id: '二连浩特',
        名称: '二连浩特',
        图标类型: '图文组合',
        positions: [[756, 290]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '二连浩特',
        分组: '主要城市',
        文本偏移: [0, 10], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '5px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 2,
        },
        信息: `
        <h3>边境小城（？）</h3>
        `
    },
    {
        id: '上海',
        名称: '上海',
        图标类型: '图文组合',
        positions: [[910, 580]],
        图标图片路径: 'icon/城市.png',
        宽: 60,
        高: 60,
        text: '上 海',
        分组: '主要城市',
        文本偏移: [-10, 30], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 2,
        },
        信息: `
        <h3>IsabellaX发展的的一座城市</h3>
        `
    },
    {
        id: '北京',
        名称: '北京',
        图标类型: '图文组合',
        positions: [[821, 420]],
        图标图片路径: 'icon/城市.png',
        宽: 50,
        高: 50,
        text: '北 京',
        分组: '主要城市',
        文本偏移: [-10, 26], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 2,
        },
        信息: `
        <h3>中华人民共和国首都</h3>
        `
    }, {
        id: '乌海市',
        名称: '乌海市',
        图标类型: '图文组合',
        positions: [[631, 390]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '乌海市',
        分组: '主要城市',
        文本偏移: [-1, 5], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '6px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3><s>具有四大天王高速的不普通城市（doge</s></h3>
        `
    },
    {
        id: '台北',
        名称: '台北',
        图标类型: '图文组合',
        positions: [[927, 738]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '台北',
        分组: '主要城市',
        文本偏移: [-10, 10], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '8px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 2,
        },
        信息: `
        <h3>台湾岛唯一的一座城市</h3>
        `
    },
    {
        id: '海口',
        名称: '海口',
        图标类型: '图文组合',
        positions: [[716, 844]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '海口',
        分组: '主要城市',
        文本偏移: [0, 10], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '5px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>G13哈海高速终点</h3>
        `
    },{
        id: '三沙市',
        名称: '三沙市',
        图标类型: '图文组合',
        positions: [[770, 916]],
        图标图片路径: 'icon/城市.png',
        宽: 10,
        高: 10,
        text: '三沙市',
        分组: '主要城市',
        文本偏移: [0, 3], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '5px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3><s>啥也木有的城市（bush</s></h3>
        `
    },
    {
        id: '哈尔滨',
        名称: '哈尔滨',
        图标类型: '图文组合',
        positions: [[1045, 242]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '哈尔滨',
        分组: '主要城市',
        文本偏移: [0, 13], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '5px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>东北重要城市</h3>
        `
    }, {
        id: '大庆',
        名称: '大庆市',
        图标类型: '图文组合',
        positions: [[961, 266]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '大庆市',
        分组: '主要城市',
        文本偏移: [0, 10], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '5px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>G45大广高速起点</h3>
        `
    },{
        id: '迪拜市',
        名称: '迪拜市(Dubayy)',
        图标类型: '图文组合',
        positions: [[-648, 780]],
        图标图片路径: 'icon/城市.png',
        宽: 30,
        高: 30,
        text: '迪拜市(Dubayy)',
        分组: '主要城市',
        文本偏移: [0, 3], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>国外的一座城市</h3>
        `
    },{
        id: '德黑兰',
        名称: '德黑兰(Tehran)',
        图标类型: '图文组合',
        positions: [[-748, 462]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '德黑兰(Tehran)',
        分组: '主要城市',
        文本偏移: [0, 3], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>国外的一座城市</h3>
        `
    },{
        id: '里斯本',
        名称: '里斯本(Lisboa)',
        图标类型: '图文组合',
        positions: [[-3046, 266]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '里斯本(Lisboa)',
        分组: '主要城市',
        文本偏移: [0, 3], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>国外的一座城市</h3>
        `
    },{
        id: '纽约市',
        名称: '纽约市(New York)',
        图标类型: '图文组合',
        positions: [[-6029, 69]],
        图标图片路径: 'icon/城市.png',
        宽: 30,
        高: 30,
        text: '纽约市(New York)',
        分组: '主要城市',
        文本偏移: [0, 3], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
    },
    信息: `
        <h3>国外的一座城市</h3>
        `
    },{
        id: '柏林',
        名称: '柏林(Berlin)',
        图标类型: '图文组合',
        positions: [[-2231, -153]],
        图标图片路径: 'icon/城市.png',
        宽: 20,
        高: 20,
        text: '柏林(Berlin)',
        分组: '主要城市',
        文本偏移: [0, 3], // 文本相对于图标的偏移 [dx, dy]
        文本样式: {
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            strokeStyle: 'black',
            strokeWidth: 1,
        },
        信息: `
        <h3>国外的一座城市</h3>
        `
    },

        
    
    // 更多地标...
    {
        id: 'G30的立交桥',
        // 绑定公路ID: ['G30沪霍'],
        名称: 'G30连霍高速巴音郭勒立交桥',
        图标类型: '仅图标',
        positions: [[358, 374],], // 地图坐标 [x, y]
        图标图片路径: 'icon/交通枢纽.png', // 图标路径
        宽: 18,
        分组: '冰高速',
        高: 18,
        信息: `
                   <h3>这是一个交通枢纽，公路的分岔口</h3>
        `
    },{
        id: 'G7的立交桥',
        名称: 'G7的立交桥',
        图标类型: '仅图标',
        positions: [[643, 379],], // 地图坐标 [x, y]
        图标图片路径: 'icon/交通枢纽.png', // 图标路径
        宽: 18,
        分组: '冰高速',
        高: 18,
        信息: `
                   <h3>这是一个交通枢纽，公路的分岔口</h3>
        `
    }, {
        id: '成都东立交桥',
        名称: '成都东立交桥',
        图标类型: '仅图标',
        positions: [[669, 600],], // 地图坐标 [x, y]
        图标图片路径: 'icon/交通枢纽.png', // 图标路径
        宽: 18,
        分组: '冰高速',
        高: 18,
        信息: `
                   <h3>成都东立交桥</h3>
                   <p>这是一个交通枢纽，公路的分岔口</p>
        `
    },
    {
        id: '立交桥',
        名称: '未分类立交桥',
        图标类型: '仅图标',
        positions: [[751, 439],[751,386]], // 地图坐标 [x, y]
        图标图片路径: 'icon/交通枢纽.png', // 图标路径
        宽: 18,
        分组: '冰高速',
        高: 18,
        信息: `
    
                   <p>这是一个交通枢纽，公路的分岔口</p>
        `
    },
    {
        id: 'G102',
        名称: 'G102',
        图标类型: '仅图标',
        positions: [[1011, 290],], // 地图坐标 [x, y]
        图标图片路径: 'icon/G102.png', // 图标路径
        宽: 18,
        分组: '混凝土国道',
        高: 18,
        信息: `
                   <h3>G102京哈线</h3>
                   <p><strong>类别：</strong>国家级干线公路</p>
                   <p><strong>起点：</strong>北京市</p>
                   <p><strong>终点：</strong>哈尔滨市</p>
                   <p><strong>途径城市：</strong>北京</p>
                   <p><strong>途径城市：</strong>沈阳</p>
                   <p><strong>途径城市：</strong>哈尔滨</p>
                   <p><strong>途径路段被共线国道：</strong>G101京沈线</p>
                   <p><strong>简介：</strong>中国东北重要干线的国道</p>
        `
    },
    // {
    //     id: '国道',
    //     名称: '国道映射',
    //     图标类型: '仅图标',
    //     positions: [[594, 495],], // 地图坐标 [x, y]
    //     图标图片路径: 'icon/国道映射.svg', // 图标路径
    //     宽: 900,
    //     分组: '损坏',
    //     高: 550,
    //     信息: `
    //                <h3>所有的国道都在这里了</h3>
    //                <p><strong>类别：</strong></p>
    //                <p><strong>起点：</strong> </p>
    //                <p><strong>终点：</strong>   </p>
    //                <p><strong>途径城市：</strong>   </p>
    //                <p><strong>途径城市：</strong>    </p>
    //                <p><strong>途径城市：</strong>           </p>
    //                <p><strong>途径路段被共线国道：</strong>         </p>
    //                <p><strong>简介：</strong>缺点是这是一个整体，哈哈🤪</p>
    //     `
    // },
    {
            id: 'g101',
            名称: '101国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[879, 400],],
            图标图片路径: 'icon/G101.png', // 图标路径
            宽: 18,
            高:18,
            信息: `<h3>101国道</h3>
                   <p><strong>起点：</strong>北京市</p>
                   <p><strong>终点：</strong>沈阳市</p>
                   <p><strong>Information信息：</strong>东北地区首条干线公路</p>`
        },    {
            id: 'g109',
            名称: '109国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[824, 377],[690,382],[634,455],[567,488],[413,573],[455,502]],
            图标图片路径: 'icon/G109.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
            <h3>109国道</h3>
                   <p><strong>类别：</strong>国家级别干线公路</p>
                   <p><strong>起点：</strong>北京市</p>
                   <p><strong>终点：</strong>拉萨市</p>
                   <p><strong>Information信息：</strong>中国第一条进藏国道</p>
            `
        },{
            id: 'g201',
            名称: '201国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[271,241],[348,322],[369,429],[431,498]],
            图标图片路径: 'icon/G201.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
             <h3>201国道</h3>
            <p><strong>类别：</strong>国家级别干线公路</p>
            <p><strong>起点：</strong>阿勒泰市</p>
            <p><strong>终点：</strong>G109国道</p>
            <p><strong>Information信息：</strong>中国连接西北地区至西南地区重要国家支线</p>
            `
        },{
            id: 'g312',
            名称: '312国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[180,316],[316,291],[449,360],[601,384],[692,462],[808,508],[877,555]],
            图标图片路径: 'icon/G312.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
             <h3>312国道</h3>
            <p><strong>起点：</strong>上海市</p>
            <p><strong>终点：</strong>霍尔果斯市</p>
            <p><strong>Information信息：</strong>中国最长国道</p>
            `
        },{
            id: 'g208',
            名称: '208国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[751,353]],
            图标图片路径: 'icon/G208.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
             <h3>208国道</h3>
                   <p><strong>类别：</strong>国家级别干线公路</p>
                   <p><strong>起点：</strong>二连浩特市</p>
                   <p><strong>终点：</strong>G109国道（乌兰察布）</p>
                   <p><strong>Information信息：</strong>连接边境小城的国道（？）</p>
            `
        },{
            id: 'g202',
            名称: '202国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[656,518]],
            图标图片路径: 'icon/G202.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
        <h3>202国道</h3>
            <p><strong>类别：</strong>国家级别干线公路</p>
            <p><strong>起点：</strong>成都市（从318国道“成都东环路”分离出来）</p>
            <p><strong>终点：</strong>G109国道</p>
            <p><strong>Information信息：</strong>中国连接西北地区至成都市的重要国家支线</p>
            `
        },{
            id: 'g318',
            名称: '318国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[870,600],[750,583],[538,613],[379,612]],
            图标图片路径: 'icon/G318.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
            <h3>318国道</h3>
            <p><strong>类别：</strong>国家级别干线公路</p>
            <p><strong>起点：</strong>上海市</p>
            <p><strong>终点：</strong>拉萨市</p>
            <p><strong>Information信息：</strong>中国东西走向最趋近于直线的国道</p>  
            `
        },{
            id: 'g321',
            名称: '321国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[730,700],[673,641],],
            图标图片路径: 'icon/G321.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
            <h3>321国道</h3>
            <p><strong>类别：</strong>国家级别干线公路</p>
            <p><strong>起点：</strong>成都市（318国道成都东环路）</p>
            <p><strong>终点：</strong>广州市</p>
            <p><strong>Information信息：</strong>中国西南至华南的重要国家支线</p>   
            `
        },{
            id: 'g107',
            名称: '107国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[784,711],[833,617],[854,484],[823,390]],
            图标图片路径: 'icon/G107.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
         <h3>107国道</h3>
            <p><strong>类别：</strong>国家级别干线公路</p>
            <p><strong>起点：</strong>北京市</p>
            <p><strong>终点：</strong>深圳市</p>
            <p><strong>Information信息：</strong>中国南北走向最长的国道</p>  
            `
        },{
            id: 'g106',
            名称: '106国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[798,400],[808,500],[815,617],[784,718]],
            图标图片路径: 'icon/G106.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
         <h3>106国道</h3>
            <p><strong>类别：</strong>国家级别干线公路</p>
            <p><strong>起点：</strong>北京市</p>
            <p><strong>终点：</strong>广州市</p>
            <p><strong>Information信息：</strong>中国南北走向最趋近于直线的国道</p> 
            `
        },
        {
            id: 'G6',
            名称: 'G6京藏高速',
            图标类型:'仅图标',
            分组: '冰高速',
            positions: [[349,522],[414,503],[530,479],[670,422],[787,409]],
            图标图片路径: 'icon/G6.svg', // 图标路径
            宽: 8,
            高:8,
            信息: 
            `                    
                   <h3>G6京藏高速</h3>
                   <p><strong>类别：</strong>主线</p>
                   <p><strong>起点：</strong>北京市</p>
                   <p><strong>终点：</strong>拉萨市</p>
                   <p><strong>途径城市：</strong>北京市、乌海市、拉萨市</p>
                   <p><strong>途径路段被共线高速：</strong>G17新藏高速、G67乌蓉高速、G7京新高速</p>
                   <p><strong>简介：</strong>跨越青藏高原开凿隧道最多的主线高速</p>
                   `
        },{
            id: 'g320',
            名称: '320国道',
            图标类型:'仅图标',
            分组: '混凝土国道',
            positions: [[119, 396],[248, 359],],
            图标图片路径: 'icon/G320.png', // 图标路径
            宽: 18,
            高:18,
            信息: `
            <h3>320国道</h3>
            <p><strong>类别：</strong>国家级别干线公路</p>
            <p><strong>起点：</strong>喀什地区</p>
            <p><strong>终点：</strong>乌鲁木齐</p>
            <p><strong>Information信息：</strong>绕着塔克拉玛干沙漠北部的公路</p>     
            `
        },
];
