export default async function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }

  const findEl = async (hash, x) => document.querySelector(hash)
      || new Promise((resolve, reject) => {
        if (x > 50) {
          return resolve();
        }
        setTimeout(() => { resolve(findEl(hash, ++x || 1)); }, 100);
      });

  if (to.hash) {
    const el = await findEl(to.hash);
    if ('scrollBehavior' in document.documentElement.style) {
      return window.scrollTo({ top: el.offsetTop - 150, behavior: 'smooth' });
    }
    return window.scrollTo(0, el.offsetTop);
  }

  if (to.name === 'DetailProduct') {
    return false;
  }

  return { x: 0, y: 0 };
}
