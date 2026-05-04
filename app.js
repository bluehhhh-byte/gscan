// ── G-Scan App Logic ──

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initDashboard();
  initGovLists();
  initCompareTab();
  initDeptList();
  initChat();
  initAdminModal();
});

/* ═══ TAB SWITCHING ═══ */
function initTabs() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => showTab(tab.dataset.tab));
  });
}

function showTab(name) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + name));
}

/* ═══ DASHBOARD ═══ */
function initDashboard() {
  renderMetrics();
  renderBarChart();
  renderDonutChart();
  renderScatterChart();
}

function renderMetrics() {
  const wrap = document.getElementById('metricCards');
  wrap.innerHTML = DASHBOARD_METRICS.map(m =>
    `<div class="metric-card"><div class="metric-label">${m.label}</div><div class="metric-value">${m.value.toLocaleString()}</div></div>`
  ).join('');
}

function renderBarChart() {
  const ctx = document.getElementById('chartBar').getContext('2d');
  const data = [...DEPT_TOP20].reverse();
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        data: data.map(d => d.count),
        backgroundColor: '#3b82f6',
        borderRadius: 3,
        barThickness: 16,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

function renderDonutChart() {
  const ctx = document.getElementById('chartDonut').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ORG_TYPE_DIST.map(d => d.type),
      datasets: [{
        data: ORG_TYPE_DIST.map(d => d.count),
        backgroundColor: ORG_TYPE_DIST.map(d => d.color),
        borderWidth: 2,
        borderColor: '#fff',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: { position: 'right', labels: { font: { size: 12 }, padding: 14, usePointStyle: true } }
      }
    }
  });
}

function renderScatterChart() {
  const ctx = document.getElementById('chartScatter').getContext('2d');
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: POP_VS_DEPT.map(d => ({
        label: d.name,
        data: [{ x: d.dept, y: d.pop }],
        backgroundColor: d.color,
        pointRadius: 7,
        pointHoverRadius: 10,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { font: { size: 10 }, padding: 8, usePointStyle: true } },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: 부서 ${ctx.parsed.x}, 인구 ${ctx.parsed.y}만명`
          }
        }
      },
      scales: {
        x: { title: { display: true, text: '부서 수', font: { size: 12 } }, grid: { color: '#f3f4f6' } },
        y: { title: { display: true, text: '인구 (만명)', font: { size: 12 } }, grid: { color: '#f3f4f6' } }
      }
    }
  });
}

/* ═══ GOV LISTS (조직도 & 통계) ═══ */
function initGovLists() {
  buildGovList('orgGovList', 'orgSearch');
  buildGovList('statsGovList', 'statsSearch');
}

function buildGovList(containerId, searchId) {
  const container = document.getElementById(containerId);
  const search = document.getElementById(searchId);
  renderGovItems(container, '');
  search.addEventListener('input', () => renderGovItems(container, search.value));
}

function renderGovItems(container, filter) {
  const keys = Object.keys(LOCAL_GOVS).filter(k =>
    !filter || k.includes(filter) || LOCAL_GOVS[k].children.some(c => c.includes(filter))
  );
  container.innerHTML = keys.map(name => {
    const g = LOCAL_GOVS[name];
    const childrenHtml = g.children.map(c =>
      `<div class="gov-child">${c}</div>`
    ).join('');
    return `
      <div class="gov-item" data-gov="${name}">
        <span><span class="arrow">▶</span> ${name}</span>
        <span class="count">${g.count}</span>
      </div>
      <div class="gov-children" data-children="${name}">${childrenHtml}</div>
    `;
  }).join('');

  container.querySelectorAll('.gov-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.gov;
      const children = container.querySelector(`[data-children="${name}"]`);
      const isOpen = children.classList.contains('show');
      // close all
      container.querySelectorAll('.gov-children').forEach(c => c.classList.remove('show'));
      container.querySelectorAll('.gov-item').forEach(i => i.classList.remove('expanded'));
      if (!isOpen) {
        children.classList.add('show');
        item.classList.add('expanded');
      }
    });
  });
}

/* ═══ COMPARE TAB ═══ */
function initCompareTab() {
  renderCompareTags();
  renderCompareTable('cmpBasic', [
    { label: '인구(명)', key: 'pop', fmt: v => v.toLocaleString() },
    { label: '면적(km²)', key: 'area', fmt: v => v.toFixed(1) },
    { label: '인구밀도(명/km²)', key: 'density', fmt: v => v.toLocaleString() },
    { label: '평균연령', key: 'avgAge', fmt: v => v.toFixed(1) },
    { label: '노령화지수', key: 'aging', fmt: v => v.toFixed(1) },
  ]);
  renderCompareTable('cmpFinance', [
    { label: '세출예산(억원)', key: 'budget', fmt: v => v.toLocaleString() },
    { label: '일반회계 비중', key: 'genRatio', fmt: v => v.toFixed(1) + '%' },
    { label: '재정자립도(%)', key: 'fiscal', fmt: v => v.toFixed(1) },
    { label: '1인당 세출(원)', key: 'perCapita', fmt: v => v.toLocaleString() },
  ]);
  renderCompareTable('cmpHR', [
    { label: '공무원(명)', key: 'officers', fmt: v => v.toLocaleString() },
    { label: '1인당 인구', key: 'officerPer', fmt: v => v.toFixed(1) },
  ]);

  // filter chips
  document.querySelectorAll('.compare-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.compare-filters .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

function renderCompareTags() {
  const wrap = document.getElementById('compareTags');
  const all = [COMPARISON_BASE, ...COMPARISON_TARGETS];
  wrap.innerHTML = all.map((name, i) =>
    i === 0
      ? `<span class="tag base">${name} (기준)</span>`
      : `<span class="tag target">${name} <span class="remove">×</span></span>`
  ).join('');
}

function renderCompareTable(tableId, rows) {
  const table = document.getElementById(tableId);
  const cities = [COMPARISON_BASE, ...COMPARISON_TARGETS];
  const baseData = COMPARISON_DATA[COMPARISON_BASE];

  let headerHtml = '<thead><tr><th>지표</th>';
  cities.forEach((c, i) => {
    headerHtml += `<th>${c}${i === 0 ? ' (기준)' : ''}</th>`;
  });
  headerHtml += '</tr></thead>';

  let bodyHtml = '<tbody>';
  rows.forEach(row => {
    bodyHtml += '<tr>';
    bodyHtml += `<td>${row.label}</td>`;
    cities.forEach((city, i) => {
      const d = COMPARISON_DATA[city];
      if (!d) { bodyHtml += '<td>-</td>'; return; }
      const val = d[row.key];
      let cell = row.fmt(val);
      if (i > 0 && baseData) {
        const baseVal = baseData[row.key];
        if (baseVal !== 0) {
          const pct = ((val - baseVal) / baseVal * 100).toFixed(1);
          const abs = Math.abs(pct);
          if (pct > 0) cell += ` <span class="up">↑${abs}%</span>`;
          else if (pct < 0) cell += ` <span class="down">↓${abs}%</span>`;
          else cell += ` <span class="down">→0%</span>`;
        }
      }
      bodyHtml += `<td>${cell}</td>`;
    });
    bodyHtml += '</tr>';
  });
  bodyHtml += '</tbody>';
  table.innerHTML = headerHtml + bodyHtml;
}

/* ═══ DATA MANAGEMENT TAB ═══ */
function initDeptList() {
  const body = document.getElementById('deptListBody');
  body.innerHTML = DEPT_CRAWL_LIST.map(d =>
    `<div class="dept-item"><div class="name">${d.name}</div><div class="sub">${d.region} · ${d.type}</div></div>`
  ).join('');
}

/* ═══ CHAT WIDGET ═══ */
function initChat() {
  const toggle = document.getElementById('chatToggle');
  const widget = document.getElementById('chatWidget');
  const closeBtn = document.getElementById('chatClose');
  const resetBtn = document.getElementById('chatReset');
  const sugWrap = document.getElementById('chatSuggestions');

  // render suggestions
  sugWrap.innerHTML = CHAT_SUGGESTIONS.map(s =>
    `<button class="chat-suggestion">${s}</button>`
  ).join('');

  toggle.addEventListener('click', () => {
    widget.classList.add('open');
    toggle.classList.add('hidden');
  });
  closeBtn.addEventListener('click', () => {
    widget.classList.remove('open');
    toggle.classList.remove('hidden');
  });
  resetBtn.addEventListener('click', () => {
    document.getElementById('chatBody').scrollTop = 0;
  });

  // open by default
  widget.classList.add('open');
  toggle.classList.add('hidden');
}

/* ═══ ADMIN MODAL ═══ */
function initAdminModal() {
  const modal = document.getElementById('adminModal');
  const gearBtn = document.getElementById('gearBtn');
  const cancelBtn = document.getElementById('modalCancel');
  const confirmBtn = document.getElementById('modalConfirm');

  gearBtn.addEventListener('click', () => modal.classList.add('open'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('open'));
  confirmBtn.addEventListener('click', () => {
    alert('로컬 호스트에서만 진입할 수 있습니다.');
    modal.classList.remove('open');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}
