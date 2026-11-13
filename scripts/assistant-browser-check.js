return await (async () => {
  const panel = document.querySelector('.assistant-panel');
  const launch = document.querySelector('[data-assistant-launch]');
  const log = document.querySelector('[data-assistant-log]');
  const bounds = panel.getBoundingClientRect();
  return JSON.stringify({
    url: location.href, open: panel.open,
    expanded: launch.getAttribute('aria-expanded'),
    focused: document.activeElement.id || document.activeElement.getAttribute('data-assistant-launch') !== null && 'launcher',
    viewport: { width: innerWidth, height: innerHeight },
    panel: {left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom},
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    messages: [...log.children].map(x => x.textContent),
    links: [...log.querySelectorAll('a')].map(x => ({text: x.textContent, path: x.getAttribute('href')})),
    inputCleared: document.querySelector('#assistant-question').value === '',
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    networkSinceLoad: performance.getEntriesByType('resource').map(x => x.name),
  }, null, 2);
})();
