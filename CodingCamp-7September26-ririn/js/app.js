(function () {
  'use strict';

  // ─── Constants ───────────────────────────────────────────────────────────────

  const KEYS = {
    NAME: 'tld_name',
    THEME: 'tld_theme',
    DURATION: 'tld_pomodoro_duration',
    TASKS: 'tld_tasks',
    LINKS: 'tld_links',
  };

  const DEFAULTS = {
    NAME: '',
    THEME: 'light',
    DURATION: 25,
    TASKS: [],
    LINKS: [],
  };

  const LIMITS = {
    NAME_MAX: 50,
    TASK_TEXT_MAX: 255,
    TASK_COUNT_MAX: 100,
    LINK_LABEL_MAX: 50,
    LINK_URL_MAX: 2048,
    LINK_COUNT_MAX: 50,
    DURATION_MIN: 1,
    DURATION_MAX: 120,
  };

  // ─── Storage Module ───────────────────────────────────────────────────────────

  const Storage = {
    _available: false,

    init() {
      try {
        const probe = '__tld_probe__';
        localStorage.setItem(probe, '1');
        localStorage.getItem(probe);
        localStorage.removeItem(probe);
        this._available = true;
      } catch (e) {
        this._available = false;
        this._showBanner('localStorage is unavailable. Changes will not be saved.');
      }
    },

    get(key, fallback) {
      if (!this._available) return fallback;
      try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },

    set(key, value) {
      if (!this._available) return;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        this._showBanner('Could not save changes to storage.', { temporary: true });
      }
    },

    remove(key) {
      if (!this._available) return;
      try {
        localStorage.removeItem(key);
      } catch (e) {
        // swallow errors silently
      }
    },

    _showBanner(message, options) {
      const banner = document.getElementById('storage-warning');
      if (banner) {
        banner.textContent = message;
        if (options && options.temporary === true) {
          setTimeout(() => {
            banner.textContent = '';
          }, 4000);
        }
      }
    },
  };

  // ─── Clock Module ─────────────────────────────────────────────────────────────

  const Clock = {
    init(nameGetter) {},
    _tick() {},
    _getGreeting(hour) {},
    _formatTime(date) {},
    _formatDate(date) {},
  };

  // ─── Timer Module ─────────────────────────────────────────────────────────────

  const Timer = {
    _state: 'IDLE',
    _remaining: 0,
    _duration: 25,
    _intervalId: null,
    init() {},
    _start() {},
    _stop() {},
    _reset() {},
    _tick() {},
    _setDuration(rawValue) {},
    _render() {},
    _playAlert() {},
    _formatSeconds(seconds) {},
    _validateDuration(value) {},
  };

  // ─── Tasks Module ─────────────────────────────────────────────────────────────

  const Tasks = {
    _tasks: [],
    init() {},
    _add(text) {},
    _beginEdit(id) {},
    _confirmEdit(id, newText) {},
    _cancelEdit(id) {},
    _toggle(id) {},
    _delete(id) {},
    _isDuplicate(text, excludeId) {},
    _persist() {},
    _render() {},
  };

  // ─── Links Module ─────────────────────────────────────────────────────────────

  const Links = {
    _links: [],
    init() {},
    _add(label, rawUrl) {},
    _delete(id) {},
    _normaliseUrl(url) {},
    _isDuplicate(url) {},
    _persist() {},
    _render() {},
  };

  // ─── Theme Module ─────────────────────────────────────────────────────────────

  const Theme = {
    init() {},
    _toggle() {},
    _apply(theme) {},
  };

  // ─── Bootstrap ───────────────────────────────────────────────────────────────

  function init() {
    Storage.init();
    // Additional modules will be wired here in later tasks
  }

  document.addEventListener('DOMContentLoaded', init);
})();
