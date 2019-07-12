export default async () => {
  const [html, css, javascript] = await Promise.all([
    await import('!raw-loader!./index.html'),
    await import('!raw-loader!./style.css'),
    await import('!raw-loader!./index.js'),
  ]);

  return {
    javascript,
    html,
    css: {
      code: css,
    },
  };
};