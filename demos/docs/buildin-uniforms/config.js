export default async () => {
  const [html, css] = await Promise.all([
    await import('!raw-loader!./index.html'),
    await import('!raw-loader!../style.css'),
  ]);

  return {
    html,
    css,
  };
};