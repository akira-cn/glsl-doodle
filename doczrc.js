export default {
  // files: './doc-src/**/*.{md,markdown,mdx}',
  src: './doc-src',
  indexHtml: './doc-src/index.html',
  theme: 'docz-theme-yuque',
  public: 'doc-src/public',
  menu: [
    '简介',
    {
      name: '快速入门',
      menu: [
        '基本用法',
        '高级用法',
      ],
    },
    {
      name: '详细文档',
      menu: [
        '介绍',
        '内建模块',
        '内建 uniforms',
      ],
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
