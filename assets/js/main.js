/**
 * main.js — Pirâmide Geométrica
 * Lógica de: navegação, calculadora interativa, exercícios (gabarito),
 * animações de scroll e interações gerais.
 */

'use strict';

/* ============================================================
   NAVEGAÇÃO — menu hambúrguer + active link
============================================================ */
(function initNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  // Abre/fecha menu mobile
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha menu ao clicar num link
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Destacar link ativo conforme scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOpts = {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, observerOpts);

  sections.forEach(s => sectionObserver.observe(s));
})();

/* ============================================================
   ANIMAÇÕES DE SCROLL (Intersection Observer)
============================================================ */
(function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.card, .example-card, .exercise-card, .formula-section'
  );

  targets.forEach(el => el.classList.add('animate-on-scroll'));

  if (!('IntersectionObserver' in window)) {
    // Fallback: mostrar tudo
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeno delay escalonado para cards filhos do mesmo container
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ============================================================
   GABARITO — toggle com acessibilidade
============================================================ */
(function initGabarito() {
  const buttons = document.querySelectorAll('.btn-gabarito');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const panel    = document.getElementById(targetId);
      if (!panel) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        panel.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span class="gab-icon" aria-hidden="true">👁</span> Ver Gabarito';
      } else {
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        btn.innerHTML = '<span class="gab-icon" aria-hidden="true">🙈</span> Ocultar Gabarito';
        // Scroll suave até o gabarito
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();

/* ============================================================
   CALCULADORA INTERATIVA
============================================================ */
(function initCalculadora() {
  const form        = document.getElementById('calcForm');
  const baseTypeEl  = document.getElementById('baseType');
  const inputFields = document.getElementById('inputFields');
  const resultsEl   = document.getElementById('calcResults');
  const clearBtn    = document.getElementById('clearCalc');

  if (!form || !baseTypeEl || !inputFields || !resultsEl) return;

  /* ---- Definição dos campos por tipo de base ---- */
  const baseConfig = {
    square: {
      label: 'Quadrada',
      fields: [
        { id: 'lado_a', label: 'Lado da base (a)', placeholder: 'ex: 6', unit: 'cm' }
      ],
    },
    rectangle: {
      label: 'Retangular',
      fields: [
        { id: 'lado_a', label: 'Comprimento (a)', placeholder: 'ex: 8', unit: 'cm' },
        { id: 'lado_b', label: 'Largura (b)',     placeholder: 'ex: 6', unit: 'cm' }
      ],
    },
    equilateral: {
      label: 'Triangular Equilátera',
      fields: [
        { id: 'lado_a', label: 'Lado do triângulo (a)', placeholder: 'ex: 5', unit: 'cm' }
      ],
    },
  };

  /* ---- Renderiza os campos de entrada dinamicamente ---- */
  function renderFields(type) {
    const config = baseConfig[type];
    if (!config) return;

    inputFields.innerHTML = config.fields.map(f => `
      <div class="form-group">
        <label for="${f.id}" class="form-label">${f.label}</label>
        <div class="input-unit-wrap">
          <input type="number" id="${f.id}" name="${f.id}" class="form-control"
                 placeholder="${f.placeholder}" min="0.01" step="any"
                 aria-describedby="${f.id}Error" required />
          <span class="input-unit">${f.unit}</span>
        </div>
        <span id="${f.id}Error" class="form-error" role="alert" aria-live="polite"></span>
      </div>
    `).join('');
  }

  /* ---- Helpers ---- */
  function round2(n) { return Math.round(n * 100) / 100; }
  function sqrt(n)   { return Math.sqrt(n); }

  /**
   * Obtém e valida o valor de um input numérico.
   * Retorna null se inválido (e exibe mensagem de erro).
   */
  function getValidValue(id, label) {
    const input = document.getElementById(id);
    const errEl = document.getElementById(`${id}Error`);
    if (!input) return null;

    const val = parseFloat(input.value.replace(',', '.'));

    input.classList.remove('error');
    if (errEl) errEl.textContent = '';

    if (input.value.trim() === '' || isNaN(val)) {
      input.classList.add('error');
      if (errEl) errEl.textContent = `${label} é obrigatório.`;
      return null;
    }
    if (val <= 0) {
      input.classList.add('error');
      if (errEl) errEl.textContent = `${label} deve ser maior que zero.`;
      return null;
    }
    return val;
  }

  /* ---- Cálculos por tipo ---- */
  function calcSquare(a, h) {
    const Ab = round2(a * a);
    const ab = round2(a / 2); // apótema da base
    const ap = round2(sqrt(h * h + ab * ab)); // apótema da pirâmide
    const P  = round2(4 * a);
    const AL = round2((P * ap) / 2);
    const AT = round2(Ab + AL);
    const V  = round2((Ab * h) / 3);

    return {
      inputs: `a = ${a} cm, h = ${h} cm`,
      results: [
        { label: 'Área da base (Aᵦ)',    value: `${Ab} cm²`, highlight: false },
        { label: 'Apótema da base (aᵦ)', value: `${ab} cm`, highlight: false },
        { label: 'Apótema (aₚ)',          value: `${ap} cm`, highlight: false },
        { label: 'Perímetro (P)',          value: `${P} cm`,  highlight: false },
        { label: 'Área lateral (Aₗ)',     value: `${AL} cm²`, highlight: false },
        { label: 'Área total (A꜀)',       value: `${AT} cm²`, highlight: false },
        { label: 'Volume (V)',             value: `${V} cm³`,  highlight: true  },
      ],
      steps: [
        `Área da base: Aᵦ = a² = ${a}² = ${Ab} cm²`,
        `Apótema da base: aᵦ = a/2 = ${a}/2 = ${ab} cm`,
        `Apótema da pirâmide: aₚ = √(h² + aᵦ²) = √(${h}² + ${ab}²) = √${round2(h*h + ab*ab)} = ${ap} cm`,
        `Perímetro: P = 4 × ${a} = ${P} cm`,
        `Área lateral: Aₗ = (P × aₚ) / 2 = (${P} × ${ap}) / 2 = ${AL} cm²`,
        `Área total: A꜀ = Aᵦ + Aₗ = ${Ab} + ${AL} = ${AT} cm²`,
        `Volume: V = (Aᵦ × h) / 3 = (${Ab} × ${h}) / 3 = ${round2(Ab*h)} / 3 = ${V} cm³`,
      ],
    };
  }

  function calcRectangle(a, b, h) {
    const Ab   = round2(a * b);
    const ab_a = round2(b / 2); // apótema em relação ao lado a
    const ab_b = round2(a / 2); // apótema em relação ao lado b
    const ap_a = round2(sqrt(h * h + ab_a * ab_a));
    const ap_b = round2(sqrt(h * h + ab_b * ab_b));
    const P    = round2(2 * (a + b));
    // Área lateral: 2 pares de faces
    const AL   = round2(a * ap_a + b * ap_b);
    const AT   = round2(Ab + AL);
    const V    = round2((Ab * h) / 3);

    return {
      inputs: `a = ${a} cm, b = ${b} cm, h = ${h} cm`,
      results: [
        { label: 'Área da base (Aᵦ)',       value: `${Ab} cm²`,  highlight: false },
        { label: 'Aₚ (faces c/ lado a)',     value: `${ap_a} cm`, highlight: false },
        { label: 'Aₚ (faces c/ lado b)',     value: `${ap_b} cm`, highlight: false },
        { label: 'Área lateral (Aₗ)',        value: `${AL} cm²`,  highlight: false },
        { label: 'Área total (A꜀)',          value: `${AT} cm²`,  highlight: false },
        { label: 'Volume (V)',                value: `${V} cm³`,   highlight: true  },
      ],
      steps: [
        `Área da base: Aᵦ = a × b = ${a} × ${b} = ${Ab} cm²`,
        `Apótema em relação a 'a': aₚₐ = √(h² + (b/2)²) = √(${h*h} + ${ab_a*ab_a}) = ${ap_a} cm`,
        `Apótema em relação a 'b': aₚᵦ = √(h² + (a/2)²) = √(${h*h} + ${ab_b*ab_b}) = ${ap_b} cm`,
        `Área lateral: Aₗ = 2×(a×aₚₐ)/2 + 2×(b×aₚᵦ)/2 = a×aₚₐ + b×aₚᵦ`,
        `Aₗ = ${a}×${ap_a} + ${b}×${ap_b} = ${round2(a*ap_a)} + ${round2(b*ap_b)} = ${AL} cm²`,
        `Área total: A꜀ = ${Ab} + ${AL} = ${AT} cm²`,
        `Volume: V = (${Ab} × ${h}) / 3 = ${round2(Ab*h)} / 3 = ${V} cm³`,
      ],
    };
  }

  function calcEquilateral(a, h) {
    const sqrt3 = Math.sqrt(3);
    const Ab    = round2((a * a * sqrt3) / 4);
    const ab    = round2(a / (2 * sqrt3)); // apótema da base (inradius)
    const ap    = round2(sqrt(h * h + ab * ab));
    const P     = round2(3 * a);
    const AL    = round2((P * ap) / 2);
    const AT    = round2(Ab + AL);
    const V     = round2((Ab * h) / 3);

    return {
      inputs: `a = ${a} cm (triângulo equilátero), h = ${h} cm`,
      results: [
        { label: 'Área da base (Aᵦ)',    value: `${Ab} cm²`,  highlight: false },
        { label: 'Apótema base (aᵦ)',    value: `${ab} cm`,   highlight: false },
        { label: 'Apótema piram. (aₚ)',  value: `${ap} cm`,   highlight: false },
        { label: 'Área lateral (Aₗ)',    value: `${AL} cm²`,  highlight: false },
        { label: 'Área total (A꜀)',      value: `${AT} cm²`,  highlight: false },
        { label: 'Volume (V)',            value: `${V} cm³`,   highlight: true  },
      ],
      steps: [
        `Área da base (triâng. equilátero): Aᵦ = (a²√3)/4 = (${a}²×1,732)/4 = ${Ab} cm²`,
        `Apótema da base: aᵦ = a/(2√3) = ${a}/(2×1,732) = ${ab} cm`,
        `Apótema da pirâmide: aₚ = √(h² + aᵦ²) = √(${h*h} + ${round2(ab*ab)}) = ${ap} cm`,
        `Perímetro: P = 3 × ${a} = ${P} cm`,
        `Área lateral: Aₗ = (P × aₚ) / 2 = (${P} × ${ap}) / 2 = ${AL} cm²`,
        `Área total: A꜀ = ${Ab} + ${AL} = ${AT} cm²`,
        `Volume: V = (${Ab} × ${h}) / 3 = ${V} cm³`,
      ],
    };
  }

  /* ---- Renderiza os resultados ---- */
  function renderResults(data) {
    const resultsHTML = data.results.map(r => `
      <div class="result-item ${r.highlight ? 'highlight' : ''}">
        <div class="result-label">${r.label}</div>
        <div class="result-value">${r.value}</div>
      </div>
    `).join('');

    const stepsHTML = data.steps.map(s => `
      <div class="step-mini">${s}</div>
    `).join('');

    resultsEl.innerHTML = `
      <div class="results-title">Resultados — Base ${data.baseLabel}</div>
      <div class="result-grid">${resultsHTML}</div>
      <div class="result-steps">
        <div class="result-steps-title">Passo a passo</div>
        ${stepsHTML}
      </div>
    `;
  }

  /* ---- Submit ---- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = baseTypeEl.value;
    const h    = getValidValue('altura', 'Altura');
    if (h === null) return;

    let data = null;

    if (type === 'square') {
      const a = getValidValue('lado_a', 'Lado da base');
      if (a === null) return;
      data = calcSquare(a, h);
      data.baseLabel = 'Quadrada';
    } else if (type === 'rectangle') {
      const a = getValidValue('lado_a', 'Comprimento');
      const b = getValidValue('lado_b', 'Largura');
      if (a === null || b === null) return;
      data = calcRectangle(a, b, h);
      data.baseLabel = 'Retangular';
    } else if (type === 'equilateral') {
      const a = getValidValue('lado_a', 'Lado do triângulo');
      if (a === null) return;
      data = calcEquilateral(a, h);
      data.baseLabel = 'Triangular Equilátera';
    }

    if (data) renderResults(data);
  });

  /* ---- Limpar ---- */
  clearBtn && clearBtn.addEventListener('click', () => {
    form.reset();
    renderFields(baseTypeEl.value);
    resultsEl.innerHTML = `
      <div class="results-placeholder">
        <span aria-hidden="true">△</span>
        <p>Preencha os dados e clique em <strong>Calcular</strong> para ver os resultados aqui.</p>
      </div>
    `;
  });

  /* ---- Troca de tipo de base ---- */
  baseTypeEl.addEventListener('change', () => {
    renderFields(baseTypeEl.value);
    resultsEl.innerHTML = `
      <div class="results-placeholder">
        <span aria-hidden="true">△</span>
        <p>Preencha os dados e clique em <strong>Calcular</strong> para ver os resultados aqui.</p>
      </div>
    `;
  });

  /* ---- Init ---- */
  renderFields(baseTypeEl.value);
})();
