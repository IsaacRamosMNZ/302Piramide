/**
 * main.js — Funcionalidades Interativas
 * Lógica de: navegação, animações, cálculos em tempo real
 */

'use strict';

/* ============================================================
   INICIALIZAÇÃO
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAOS();
  initCalculations();
  initGalleryDetails();
  initWhatsappContacts();
});

/* ============================================================
   NAVEGAÇÃO
============================================================ */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle do menu mobile
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
    });
  }

  // Fechar menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (navToggle) navToggle.classList.remove('open');
    });
  });

  // Atualizar link ativo ao scroll
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   AOS (ANIMATE ON SCROLL)
============================================================ */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 100,
      delay: 0,
      disable: 'mobile'
    });
  } else {
    console.warn('AOS não foi carregado');
  }
}

/* ============================================================
   CÁLCULOS EM TEMPO REAL
============================================================ */
function initCalculations() {
  const baseSlider = document.getElementById('baseSlider');
  const heightSlider = document.getElementById('heightSlider');
  const fixedPyramidColor = '#e0f2fe';
  const resetBtn = document.getElementById('resetView');
  const wireframeBtn = document.getElementById('toggleWireframe');

  if (!baseSlider || !heightSlider) return;

  // Atualizar valores de entrada
  baseSlider.addEventListener('input', () => {
    document.getElementById('baseValue').textContent = baseSlider.value;
    updateCalculations();
    if (window.pyramidScene) {
      window.pyramidScene.updatePyramid(
        parseFloat(baseSlider.value),
        parseFloat(heightSlider.value),
        fixedPyramidColor
      );
    }
  });

  heightSlider.addEventListener('input', () => {
    document.getElementById('heightValue').textContent = heightSlider.value;
    updateCalculations();
    if (window.pyramidScene) {
      window.pyramidScene.updatePyramid(
        parseFloat(baseSlider.value),
        parseFloat(heightSlider.value),
        fixedPyramidColor
      );
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (window.pyramidScene) {
        window.pyramidScene.resetView();
      }
    });
  }

  if (wireframeBtn) {
    wireframeBtn.addEventListener('click', () => {
      if (window.pyramidScene) {
        const enabled = window.pyramidScene.toggleWireframe();
        wireframeBtn.textContent = enabled ? 'Wireframe: ON' : 'Wireframe: OFF';
      }
    });
  }

  updateCalculations();
}

function updateCalculations() {
  const baseSlider = document.getElementById('baseSlider');
  const heightSlider = document.getElementById('heightSlider');

  if (!baseSlider || !heightSlider) return;

  const base = parseFloat(baseSlider.value);
  const height = parseFloat(heightSlider.value);

  // Volume = (1/3) * base² * height
  const volume = (base * base * height) / 3;

  // Área da base (quadrado)
  const baseArea = base * base;

  // Altura inclinada (apótema) = sqrt(h² + (base/2)²)
  const slantHeight = Math.sqrt(height * height + (base / 2) * (base / 2));

  // Área lateral = 2 * base * slantHeight
  const lateralArea = 2 * base * slantHeight;

  // Atualizar display
  const volumeEl = document.getElementById('volumeValue');
  const baseAreaEl = document.getElementById('baseAreaValue');
  const slantHeightEl = document.getElementById('slantHeightValue');
  const lateralAreaEl = document.getElementById('lateralAreaValue');

  if (volumeEl) volumeEl.textContent = volume.toFixed(2) + ' m³';
  if (baseAreaEl) baseAreaEl.textContent = baseArea.toFixed(2) + ' m²';
  if (slantHeightEl) slantHeightEl.textContent = slantHeight.toFixed(2) + ' m';
  if (lateralAreaEl) lateralAreaEl.textContent = lateralArea.toFixed(2) + ' m²';
}

/* ============================================================
   GALERIA — DETALHES POR CLIQUE
============================================================ */
function initGalleryDetails() {
  const items = document.querySelectorAll('.gallery-item[data-pyramid]');
  const panel = document.getElementById('galleryDetail');
  const backdrop = document.getElementById('galleryDetailBackdrop');
  const titleEl = document.getElementById('galleryDetailTitle');
  const subtitleEl = document.getElementById('galleryDetailSubtitle');
  const listEl = document.getElementById('galleryDetailList');
  const closeBtn = document.getElementById('galleryDetailClose');

  if (!items.length || !panel || !backdrop || !titleEl || !subtitleEl || !listEl || !closeBtn) return;

  const details = {
    triangular: {
      title: 'Pirâmide Triangular (Tetraedro)',
      subtitle: 'Base triangular e menor quantidade possível de faces em uma pirâmide.',
      bullets: [
        'Possui 4 faces no total.',
        'Tem 4 vértices e 6 arestas.',
        'Quando regular, todas as faces são triângulos equiláteros.',
        'Muito usada em modelos de estruturas leves.'
      ]
    },
    quadrangular: {
      title: 'Pirâmide Quadrangular',
      subtitle: 'Forma clássica com base quadrada e quatro faces laterais triangulares.',
      bullets: [
        'Possui 5 faces, 5 vértices e 8 arestas.',
        'Volume: V = (A_base x h) / 3.',
        'É a forma mais comum em exemplos didáticos.',
        'Relaciona-se diretamente com as pirâmides do Egito.'
      ]
    },
    pentagonal: {
      title: 'Pirâmide Pentagonal',
      subtitle: 'Base em pentágono com cinco faces laterais triangulares.',
      bullets: [
        'Possui 6 faces, 6 vértices e 10 arestas.',
        'A base pode ser regular ou irregular.',
        'Em versão regular, as arestas laterais são congruentes.',
        'Apótema lateral é essencial para área total.'
      ]
    },
    hexagonal: {
      title: 'Pirâmide Hexagonal',
      subtitle: 'Base em hexágono e seis faces laterais triangulares.',
      bullets: [
        'Possui 7 faces, 7 vértices e 12 arestas.',
        'Maior número de faces laterais que os exemplos anteriores.',
        'Boa para comparar crescimento de arestas com o número de lados da base.',
        'Em base regular, mantém simetria elevada.'
      ]
    },
    egipcia: {
      title: 'Pirâmide Egípcia',
      subtitle: 'Referência histórica de engenharia e proporções geométricas.',
      bullets: [
        'Geralmente modelada como pirâmide quadrangular.',
        'Combina estabilidade estrutural e distribuição de massa eficiente.',
        'É símbolo clássico de aplicação real da geometria espacial.',
        'Excelente exemplo para estudar inclinação e altura lateral.'
      ]
    },
    regular: {
      title: 'Pirâmide Regular',
      subtitle: 'Base regular e ápice alinhado ao centro da base.',
      bullets: [
        'Todas as faces laterais são congruentes entre si.',
        'Arestas laterais têm a mesma medida.',
        'Permite cálculos simplificados de área lateral e apótema.',
        'É o principal modelo teórico em exercícios de geometria.'
      ]
    }
  };

  function openDetails(key, item) {
    const content = details[key];
    if (!content) return;

    titleEl.textContent = content.title;
    subtitleEl.textContent = content.subtitle;
    listEl.innerHTML = content.bullets.map((text) => `<li>${text}</li>`).join('');
    backdrop.hidden = false;
    panel.hidden = false;

    items.forEach((card) => card.classList.remove('is-active'));
    if (item) item.classList.add('is-active');
  }

  function closeDetails() {
    panel.hidden = true;
    backdrop.hidden = true;
    items.forEach((card) => card.classList.remove('is-active'));
  }

  items.forEach((item) => {
    const key = item.dataset.pyramid;
    item.addEventListener('click', () => openDetails(key, item));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDetails(key, item);
      }
    });
  });

  closeBtn.addEventListener('click', closeDetails);
  backdrop.addEventListener('click', closeDetails);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      closeDetails();
    }
  });
}

/* ============================================================
   CONTATOS WHATSAPP COM CONFIRMACAO
============================================================ */
function initWhatsappContacts() {
  const contactButtons = document.querySelectorAll('.member-avatar-btn[data-whatsapp-phone]');
  const modal = document.getElementById('waConfirmModal');
  const backdrop = document.getElementById('waConfirmBackdrop');
  const text = document.getElementById('waConfirmText');
  const cancelBtn = document.getElementById('waCancelBtn');
  const confirmBtn = document.getElementById('waConfirmBtn');

  if (!contactButtons.length || !modal || !backdrop || !text || !cancelBtn || !confirmBtn) return;

  let pendingName = '';
  let pendingPhone = '';

  function normalizePhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (!digits) return '';
    return digits.startsWith('55') ? digits : `55${digits}`;
  }

  function closeModal() {
    modal.hidden = true;
    backdrop.hidden = true;
    pendingName = '';
    pendingPhone = '';
  }

  contactButtons.forEach((button) => {
    button.addEventListener('click', () => {
      pendingName = button.dataset.whatsappName || 'essa pessoa';
      pendingPhone = normalizePhone(button.dataset.whatsappPhone);
      text.textContent = `Deseja mesmo enviar mensagem para ${pendingName}?`;
      modal.hidden = false;
      backdrop.hidden = false;
    });
  });

  cancelBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  confirmBtn.addEventListener('click', () => {
    if (!pendingPhone) {
      closeModal();
      return;
    }
    const url = `https://wa.me/${pendingPhone}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

/* ============================================================
   SMOOTH SCROLL PARA BOTÕES
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

/* ============================================================
   PARALLAX EFFECT
============================================================ */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  parallaxElements.forEach(el => {
    const speed = el.dataset.parallax || 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

console.log('✅ Main.js carregado com sucesso');
