/**
 * Theme toggle - blocks in <head> to prevent flash of wrong theme.
 * Priority: localStorage > dark (default)
 * Sets data-theme on <html> before first paint.
 */
(function () {
  var stored = localStorage.getItem('everystate-theme');
  var theme = stored || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('everystate-theme')) {
      var t = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      updateToggleIcon(t);
    }
  });

  window.__toggleTheme = function () {
    document.documentElement.classList.add('theme-transitioning');
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('everystate-theme', next);
    updateToggleIcon(next);
    setTimeout(function () {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  };

  function updateToggleIcon(t) {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.textContent = t === 'dark' ? '☀' : '☾';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { updateToggleIcon(theme); });
  } else {
    updateToggleIcon(theme);
  }
})();
