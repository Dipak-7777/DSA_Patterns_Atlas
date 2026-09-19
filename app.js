(() => {
  'use strict';

  const patterns = Array.isArray(window.PATTERNS) ? window.PATTERNS : [];
  const STORAGE_KEY = 'dsa_progress_v2';
  const LEGACY_STORAGE_KEY = 'dsa_progress_v1';
  const THEME_KEY = 'dsa_theme_v2';
  const totalProblems = patterns.reduce((total, pattern) => total + pattern.problems.length, 0);
  const solved = loadSolved();
  let currentDiff = 'all';
  let currentSearch = '';
  let lastFocusedElement = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const status = $('#status');

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
  }

  function safeURL(value) {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch (error) {
      return '';
    }
  }

  function problemKey(pattern, problem, index) {
    return problem.id || `${pattern.id}-${index}`;
  }

  function loadSolved() {
    const read = key => {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || '{}');
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
      } catch (error) {
        return {};
      }
    };
    const current = read(STORAGE_KEY);
    if (Object.keys(current).length) return current;
    const legacy = read(LEGACY_STORAGE_KEY);
    if (!Object.keys(legacy).length) return {};

    const migrated = {};
    patterns.forEach(pattern => pattern.problems.forEach((problem, index) => {
      if (legacy[`${pattern.id}_${index}`]) migrated[problemKey(pattern, problem, index)] = true;
    }));
    return migrated;
  }

  function saveSolved() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(solved)); } catch (error) { /* Storage is optional. */ }
  }

  function announce(message) {
    if (!status) return;
    status.textContent = '';
    window.setTimeout(() => { status.textContent = message; }, 20);
  }

  function getDoneCount(pattern) {
    return pattern.problems.reduce((count, problem, index) => count + (solved[problemKey(pattern, problem, index)] ? 1 : 0), 0);
  }

  function getTotalDone() {
    return patterns.reduce((total, pattern) => total + getDoneCount(pattern), 0);
  }

  function difficultyLabel(diff) {
    return diff === 'easy' ? 'Easy' : diff === 'med' ? 'Medium' : 'Hard';
  }

  function buildToc() {
    const nav = $('#tocNav');
    if (!nav) return;
    nav.innerHTML = patterns.map(pattern => {
      const count = pattern.problems.length;
      return `<a href="#${escapeHTML(pattern.id)}" class="toc-link" data-pid="${escapeHTML(pattern.id)}">
        <span class="toc-num">${escapeHTML(pattern.num)}</span>
        <span class="toc-name">${escapeHTML(pattern.name)}</span>
        <span class="toc-done" aria-label="0 solved">0</span>
        <span class="toc-count">${count}</span>
      </a>`;
    }).join('');
    $$('.toc-link', nav).forEach(link => link.addEventListener('click', event => {
      const id = link.dataset.pid;
      openCard(id, false);
      closeSidebar();
      if (window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
      else event.preventDefault();
    }));
  }

  function tableHead(pattern) {
    return `<caption>${escapeHTML(pattern.name)} practice problems</caption><thead><tr>
      <th class="check-cell" scope="col"><span class="sr-only">Solved</span></th>
      <th scope="col">Problem</th><th scope="col">Difficulty</th><th scope="col">Pattern role</th><th scope="col">Links</th>
    </tr></thead><tbody>`;
  }

  function buildRow(pattern, problem, index) {
    const key = problemKey(pattern, problem, index);
    const checked = Boolean(solved[key]);
    const firstURL = safeURL(problem.links?.[0]?.u);
    const problemName = firstURL
      ? `<a href="${escapeHTML(firstURL)}" target="_blank" rel="noopener noreferrer">${escapeHTML(problem.name)}</a>`
      : `<span class="plain-name">${escapeHTML(problem.name)}</span>`;
    const links = (problem.links || []).map(link => {
      const url = safeURL(link.u);
      return url
        ? `<a class="link-btn" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.l)}</a>`
        : `<span class="link-btn" aria-label="${escapeHTML(link.l)} link unavailable" style="opacity:.5">${escapeHTML(link.l)}</span>`;
    }).join('') || '<span class="link-btn" style="opacity:.5">Study note</span>';
    const label = `${problem.name}, ${difficultyLabel(problem.diff)}. ${problem.role}`;
    return `<tr data-key="${escapeHTML(key)}" data-diff="${escapeHTML(problem.diff)}" data-search="${escapeHTML(`${problem.name} ${problem.meta} ${problem.role} ${pattern.name}`.toLowerCase())}">
      <td class="check-cell"><input type="checkbox" class="prob-check" data-key="${escapeHTML(key)}" ${checked ? 'checked' : ''} aria-label="Mark ${escapeHTML(label)} as solved"></td>
      <td><div class="prob-name">${problemName}<div class="prob-sub">${escapeHTML(problem.meta)}</div></div></td>
      <td><span class="diff ${escapeHTML(problem.diff)}">${difficultyLabel(problem.diff)}</span></td>
      <td class="role-cell">${escapeHTML(problem.role)}</td><td><div class="links-cell">${links}</div></td>
    </tr>`;
  }

  function buildPatterns() {
    const list = $('#patternList');
    if (!list) return;
    list.innerHTML = patterns.map(pattern => {
      const done = getDoneCount(pattern);
      const count = pattern.problems.length;
      const bodyId = `${pattern.id}-body`;
      const rows = [];
      pattern.problems.forEach((problem, index) => {
        if (problem.section) rows.push(`<tr class="section-row"><td colspan="5"><div class="section-sub">${escapeHTML(problem.section)}</div></td></tr>`);
        rows.push(buildRow(pattern, problem, index));
      });
      const template = pattern.template ? `<div class="template-block"><div class="tb-head">${escapeHTML(pattern.template.label)}</div><pre>${pattern.template.code}</pre></div>` : '';
      return `<article class="pattern-card" id="${escapeHTML(pattern.id)}" data-pattern="${escapeHTML(pattern.name.toLowerCase())}">
        <button class="pattern-header" type="button" aria-expanded="false" aria-controls="${bodyId}">
          <span class="ph-left"><span class="ph-meta"><span class="kicker">Pattern ${escapeHTML(pattern.num)}</span><span class="count-badge">${count} problems</span><span class="done-badge">${done} done</span></span>
          <span class="ph-title">${escapeHTML(pattern.name)} <span>— ${escapeHTML(pattern.sub)}</span></span>
          <span class="ph-desc">${escapeHTML(pattern.desc)}</span>
          <span class="complexity-row"><span class="cx-tag"><b>Time</b> ${escapeHTML(pattern.time)}</span><span class="cx-tag"><b>Space</b> ${escapeHTML(pattern.space)}</span><span class="cx-tag"><b>Signal</b> ${escapeHTML(pattern.signal)}</span></span></span>
          <span class="ph-right"><span class="toggle-icon" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></span><span class="mini-progress"><span class="mp-bar"><span class="mp-fill" style="width:${count ? Math.round(done / count * 100) : 0}%"></span></span><span class="mp-label">${done}/${count}</span></span></span>
        </button>
        <div class="when-strip"><b>Reach for it when</b><p>${escapeHTML(pattern.when)}</p></div>
        <div class="pattern-body" id="${bodyId}">${template}<div class="table-wrap"><table>${tableHead(pattern)}${rows.join('')}</tbody></table></div></div>
      </article>`;
    }).join('');

    $$('.pattern-header', list).forEach(button => button.addEventListener('click', () => {
      const card = button.closest('.pattern-card');
      toggleCard(card);
    }));
    $$('.prob-check', list).forEach(checkbox => checkbox.addEventListener('change', onCheck));
  }

  function toggleCard(card, force) {
    if (!card) return;
    const button = $('.pattern-header', card);
    const next = typeof force === 'boolean' ? force : !card.classList.contains('open');
    card.classList.toggle('open', next);
    button?.setAttribute('aria-expanded', String(next));
  }

  function openCard(id, scroll = true) {
    const card = document.getElementById(id);
    if (!card) return;
    toggleCard(card, true);
    if (scroll) window.setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  }

  function updateProgress() {
    const done = getTotalDone();
    const percent = totalProblems ? Math.round(done / totalProblems * 100) : 0;
    $('#doneCount').textContent = done;
    $('#totalCount').textContent = totalProblems;
    $('#progressPct').textContent = `${percent}% complete`;
    $('#progressFill').style.width = `${percent}%`;
    $('.progress-bar')?.setAttribute('aria-valuenow', String(percent));
    $('#heroSolved').textContent = done;
    $('#resetBanner').hidden = done === 0;
    patterns.forEach(pattern => {
      const card = document.getElementById(pattern.id);
      const patternDone = getDoneCount(pattern);
      const patternTotal = pattern.problems.length;
      if (!card) return;
      $('.mp-fill', card).style.width = `${patternTotal ? Math.round(patternDone / patternTotal * 100) : 0}%`;
      $('.mp-label', card).textContent = `${patternDone}/${patternTotal}`;
      const badge = $('.done-badge', card);
      badge.textContent = `${patternDone} done`;
      badge.hidden = patternDone === 0;
      const link = $(`.toc-link[data-pid="${CSS.escape(pattern.id)}"]`);
      if (link) {
        const doneBadge = $('.toc-done', link);
        doneBadge.textContent = patternDone;
        doneBadge.hidden = patternDone === 0;
        doneBadge.setAttribute('aria-label', `${patternDone} solved`);
        link.classList.toggle('has-done', patternDone > 0);
      }
    });
  }

  function onCheck(event) {
    const key = event.target.dataset.key;
    if (event.target.checked) solved[key] = true;
    else delete solved[key];
    saveSolved();
    updateProgress();
    announce(event.target.checked ? 'Problem marked solved.' : 'Problem marked unsolved.');
  }

  function applyFilters() {
    const query = currentSearch.toLowerCase();
    let visible = 0;
    $$('#patternList tr[data-key]').forEach(row => {
      const matchesDifficulty = currentDiff === 'all' || row.dataset.diff === currentDiff;
      const matchesSearch = !query || row.dataset.search.includes(query);
      const show = matchesDifficulty && matchesSearch;
      row.hidden = !show;
      if (show) visible += 1;
    });
    $$('.pattern-card').forEach(card => {
      const hasVisible = $$('tr[data-key]:not([hidden])', card).length > 0;
      card.classList.toggle('is-hidden', (Boolean(query) || currentDiff !== 'all') && !hasVisible);
      if (hasVisible && (query || currentDiff !== 'all')) toggleCard(card, true);
    });
    const filtering = Boolean(query) || currentDiff !== 'all';
    $('#filterCount').textContent = filtering ? `${visible} problem${visible === 1 ? '' : 's'} found` : '';
    $('#emptyState').hidden = visible !== 0;
    announce(filtering ? `${visible} matching problems.` : 'Showing all problems.');
  }

  function setSearch(value) {
    currentSearch = value.trim();
    $('#searchInput').value = currentSearch;
    $('#searchInputMobile').value = currentSearch;
    applyFilters();
  }

  function setDifficulty(diff) {
    currentDiff = diff;
    $$('.filter-chip').forEach(button => {
      const active = button.dataset.diff === diff;
      button.classList.toggle('on', active);
      button.setAttribute('aria-pressed', String(active));
    });
    applyFilters();
  }

  function clearFilters() {
    setSearch('');
    setDifficulty('all');
  }

  function exportProgress() {
    const payload = { version: 2, exportedAt: new Date().toISOString(), solved };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pattern-atlas-progress.json';
    link.click();
    URL.revokeObjectURL(url);
    announce('Progress backup downloaded.');
  }

  function importProgress(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        const incoming = payload && typeof payload.solved === 'object' ? payload.solved : payload;
        if (!incoming || Array.isArray(incoming)) throw new Error('Invalid format');
        Object.keys(solved).forEach(key => delete solved[key]);
        patterns.forEach(pattern => pattern.problems.forEach((problem, index) => {
          const key = problemKey(pattern, problem, index);
          if (incoming[key] || incoming[`${pattern.id}_${index}`]) solved[key] = true;
        }));
        saveSolved();
        updateProgress();
        announce('Progress backup imported.');
      } catch (error) {
        window.alert('That file is not a valid Pattern Atlas progress backup.');
      }
    };
    reader.readAsText(file);
  }

  function resetProgress() {
    if (!window.confirm('Reset all solved problems? This cannot be undone unless you exported a backup.')) return;
    Object.keys(solved).forEach(key => delete solved[key]);
    saveSolved();
    $$('.prob-check').forEach(checkbox => { checkbox.checked = false; });
    updateProgress();
    announce('All progress reset.');
  }

  function setTheme(theme) {
    if (theme === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch (error) { /* Theme preference is optional. */ }
    const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    $('#themeToggleBtn').setAttribute('aria-pressed', String(dark));
    $('#themeToggleBtn').title = `Theme: ${theme}. Click to change`;
    $('#themeToggleBtn').setAttribute('aria-label', `Theme: ${theme}. Click to change`);
    $('#themeIcon').innerHTML = dark
      ? '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'
      : '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
  }

  function cycleTheme() {
    let current = 'system';
    try { current = localStorage.getItem(THEME_KEY) || 'system'; } catch (error) { /* Use system default. */ }
    setTheme(current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system');
  }

  function openSidebar() {
    lastFocusedElement = document.activeElement;
    $('#sidebar').classList.add('open');
    $('#sidebarOverlay').hidden = false;
    $('#sidebarOverlay').classList.add('visible');
    $('#sidebarToggleBtn').setAttribute('aria-expanded', 'true');
    $('.toc-link')?.focus();
  }

  function closeSidebar() {
    $('#sidebar').classList.remove('open');
    $('#sidebarOverlay').classList.remove('visible');
    $('#sidebarOverlay').hidden = true;
    $('#sidebarToggleBtn').setAttribute('aria-expanded', 'false');
    if (lastFocusedElement && window.matchMedia('(max-width: 900px)').matches) lastFocusedElement.focus();
  }

  function updateActiveToc(id) {
    $$('.toc-link').forEach(link => {
      const active = link.dataset.pid === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function setupObserver() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) updateActiveToc(entry.target.id);
    }), { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    $$('.pattern-card').forEach(card => observer.observe(card));
  }

  function init() {
    $('#heroPatterns').textContent = patterns.length;
    $('#heroProblems').textContent = totalProblems;
    $('#heroProblemText').textContent = `${totalProblems} problems`;
    $('#heroPatternText').textContent = `${patterns.length} patterns`;
    $('#footerStats').textContent = `${patterns.length} patterns · ${totalProblems} problems`;
    buildToc();
    buildPatterns();
    updateProgress();
    setupObserver();

    let theme = 'system';
    try { theme = localStorage.getItem(THEME_KEY) || 'system'; } catch (error) { /* Use system default. */ }
    setTheme(['system', 'light', 'dark'].includes(theme) ? theme : 'system');

    $('#searchInput').addEventListener('input', event => setSearch(event.target.value));
    $('#searchInputMobile').addEventListener('input', event => setSearch(event.target.value));
    $$('.filter-chip').forEach(button => button.addEventListener('click', () => setDifficulty(button.dataset.diff)));
    $('#clearFiltersBtn').addEventListener('click', clearFilters);
    $('#printBtn').addEventListener('click', () => window.print());
    $('#backupBtn').addEventListener('click', exportProgress);
    $('#importBtn').addEventListener('click', () => $('#importInput').click());
    $('#importInput').addEventListener('change', event => importProgress(event.target.files[0]));
    $('#resetBtn').addEventListener('click', resetProgress);
    $('#howtoBtn').addEventListener('click', () => $('#howSection').scrollIntoView({ behavior: 'smooth' }));
    $('#themeToggleBtn').addEventListener('click', cycleTheme);
    $('#sidebarToggleBtn').addEventListener('click', () => $('#sidebar').classList.contains('open') ? closeSidebar() : openSidebar());
    $('#sidebarOverlay').addEventListener('click', closeSidebar);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeSidebar(); });
    window.addEventListener('hashchange', () => openCard(window.location.hash.slice(1), true));
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) openCard(hash, true);
    else {
      const first = $('.pattern-card');
      if (first) toggleCard(first, true);
    }
  }

  init();
})();
