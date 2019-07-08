import config from '../base.config';

export default async () => {
  const [htmlCode, jsCode, cssCode] = await Promise.all([
    import(/* webpackChunkName: "demo-demo1" */ '!raw-loader!../index.html'),
    import(/* webpackChunkName: "demo-demo1" */ '!raw-loader!./index.glsl'),
    import(/* webpackChunkName: "demo-demo1" */ '!raw-loader!../style.css'),
  ]);

  return config(htmlCode, cssCode, jsCode);
};