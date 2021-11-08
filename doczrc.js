import {css} from 'docz-plugin-css';

export default {
  // files: './doc-src/**/*.{md,markdown,mdx}',
  src: './doc-src',
  indexHtml: './doc-src/index.html',
  theme: 'docz-theme-yuque',
  public: 'doc-src/public',
  plugins: [
    css({
      preprocessor: 'postcss',
      cssmodules: false,
    }),
  ],
  menu: [
    '简介',
    {
      name: '快速入门',
      menu: [
        '介绍',
        '基本用法',
        '高级用法',
        '内建模块',
        '内建 uniforms',
      ],
    },
    '📖 关于本书',
    {
      name: '📖 开始',
      menu: [
        '什么是片段着色器',
        'Hello world!',
        'Uniforms值',
        '运行你的shader',
        '💥用GPU来实现抽奖程序',
      ],
    },
    {
      name: '📖 用算法绘画',
      menu: [
        '造型函数',
        '颜色',
        '形状',
        '矩阵',
        '图案',
        '💥距离场与文字',
      ],
    },
    {
      name: '📖 生成设计',
      menu: [
        '随机',
        '噪声',
        '网格噪声',
        '分形布朗运动',
        '分形',
      ],
    },
    {
      name: '📖 图像处理',
      menu: [
        '纹理',
        '图像处理',
        '卷积核',
        '滤镜',
        '后处理',
      ],
    },
    {
      name: '📖 模拟',
      menu: [
        '乒乓',
        'Conway生命游戏',
        '水波',
        '水彩',
        '反应扩散',
        '流体',
      ],
    },
    {
      name: '📖 3D图形',
      menu: [
        '光照',
        '阴影',
        '法线贴图',
        '凹凸贴图',
        '光线跟踪',
        '环境贴图',
        '折射和反射',
      ],
    },
    {
      name: '📖 致谢',
    },
    {
      name: '🔗 相关资源',
      menu: [
        {name: 'The Book of Shaders', href: 'https://thebookofshaders.com/'},
        {name: 'GL renderer', href: 'https://github.com/akira-cn/gl-renderer'},
        {name: 'Docz', href: 'https://www.docz.site/'},
        {name: 'Demosify', href: 'https:/www.demosify.com/'},
      ],
    },
  ],
};
