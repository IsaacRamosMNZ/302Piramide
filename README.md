# 🔷 Pirâmides Geométricas - Projeto Educativo

![Versão](https://img.shields.io/badge/versão-1.0-blue) ![Status](https://img.shields.io/badge/status-ativo-brightgreen)

**Trabalho do Professor Bruno Souto** - Turma 302 CZETRAO (Grupo 2)

Um site interativo, visualmente impactante e educativo que explora conceitos de geometria tridimensional através de visualização 3D, animações sofisticadas e design moderno.

---

## ✨ Características Principais

### 🎨 **Design Visual Premium**
- **Paleta Branco & Azul**: Cores sofisticadas com gradientes elegantes
- **Animações Suaves**: Efeitos ao scroll (fade-up, zoom-in, parallax)
- **Efeitos de Polvo**: Tentáculos animados integrados ao fundo
- **Totalmente Responsivo**: Desktop, tablet e mobile

### 🔺 **Conteúdo Matemático Completo**
- Definições e conceitos de pirâmides
- Fórmulas: Volume, Área Total, Altura Inclinada
- Tipos de pirâmides: Triangular, Quadrangular, Pentagonal, Hexagonal
- Aplicações práticas em arquitetura e design

### 🕐 **Pirâmide 3D Interativa**
- Clique e arraste para rotacionar
- Scroll para ampliar/reduzir (zoom)
- Controles de base e altura em tempo real
- Toggle de wireframe para visualizar estrutura
- Cálculos automáticos atualizados

### 📊 **6 Seções Principais**
1. **Hero** - Introdução visual impactante
2. **Informações** - Cards educativos com conceitos
3. **Visualização 3D** - Pirâmide interativa com logo da turma
4. **Galeria** - Diferentes tipos de pirâmides anima das
5. **Grupo** - Apresentação dos membros do projeto
6. **Footer** - Informações e tecnologias

---

## 🛠️ Tecnologias Utilizadas

```
Frontend:
├── HTML5 (Estrutura semântica)
├── CSS3 (Layouts modernos, gradientes, flexbox/grid)
├── JavaScript Vanilla (Sem dependências)
├── Three.js (Renderização 3D WebGL)
└── AOS Library (Animações ao scroll)

Features:
├── Scroll Spy (Menu ativo dinâmico)
├── Intersection Observer (Performance)
├── Touch Support (Dispositivos móveis)
├── Smooth Scrolling
└── Parallax Effects
```

---

## 📁 Estrutura do Projeto

```
302Piramide/
├── index.html                     # Página principal (400+ linhas)
├── README.md                      # Este arquivo
│
└── assets/
    ├── css/
    │   └── styles.css            # Estilos completos (1000+ linhas)
    │                              # Contains: Navbar, Hero, Cards,
    │                              # 3D Canvas, Gallery, Team, Footer
    │
    ├── js/
    │   ├── main.js               # Lógica principal
    │   │                           # - Navegação & Menu Mobile
    │   │                           # - AOS Animations
    │   │                           # - Cálculos em Tempo Real
    │   │
    │   ├── three-scene.js        # Cena 3D com Three.js
    │   │                           # - Pirâmide interativa
    │   │                           # - OrbitControls simplificado
    │   │                           # - Renderização WebGL
    │   │
    │   └── pyramid.js            # (Utilitários)
    │
    └── images/
        └── turma-302-logo.svg    # Logo da turma (SVG)
```

---

## 🚀 Como Usar

### ⚡ Opção 1: Abrir Direto (Rápido)
```bash
# Windows
Clique duplo em index.html
# ou
Abra no navegador: file:///C:/Users/aluno.saolucas/Documents/302Piramide/index.html
```

### 🔧 Opção 2: Servidor Local (Recomendado)

**Python 3:**
```bash
cd c:\Users\aluno.saolucas\Documents\302Piramide
python -m http.server 8000
# Acesse: http://localhost:8000
```

**Node.js:**
```bash
cd 302Piramide
npx http-server
# Acesse: http://localhost:8080
```

**PHP:**
```bash
cd 302Piramide
php -S localhost:8000
# Acesse: http://localhost:8000
```

---

## 🎯 Usando o Site

### 📍 Navegação
- Use a **Navbar** no topo para navegar entre seções
- Links ativos são destacados com animação
- Menu responsivo em dispositivos móveis

### 🔺 Pirâmide 3D
```
Controles:
├── Mouse/Trackpad:
│   └── Clique + Arraste = Rotacionar
├── Scroll/Wheel:
│   └── Para Zoom In/Out
├── Sliders:
│   ├── Base (2-10m)
│   └── Altura (2-15m)
├── Color Picker:
│   └── Escolha a cor da pirâmide
└── Botões:
    ├── Resetar Visão
    └── Toggle Wireframe
```

### 📊 Cálculos em Tempo Real
- **Volume**: V = (1/3) × base² × altura
- **Área da Base**: A = lado²
- **Altura Inclinada**: apótema = √(h² + (base/2)²)
- **Área Lateral**: A = 2 × base × apótema

---

## 🎨 Customização

### Cores Principais
Edite `assets/css/styles.css`:
```css
:root {
    --color-primary: #0ea5e9;      /* Azul principal */
    --color-accent: #06b6d4;       /* Azul secundário */
    --color-bg: #f0f9ff;           /* Fundo */
    --color-text: #0c2d4c;         /* Texto */
    /* ... mais variáveis */
}
```

### Logo da Turma
Substitua `assets/images/turma-302-logo.svg` pela sua imagem:
```html
<img src="./assets/images/sua-logo.png" alt="Logo" />
```

### Membros do Grupo
Edite a seção `team-grid` em `index.html`:
```html
<div class="team-member" data-aos="fade-up">
    <div class="member-avatar">👨‍💼</div>
    <h4>Nome Completo</h4>
    <p class="member-role">Sua Função</p>
    <p class="member-bio">Sua Contribuição</p>
</div>
```

### Informações Gerais
- **Header**: Edite trabalho/professor/turma
- **Títulos**: Procure por `<h2>` e `<h3>`
- **Descrições**: Procure por `<p>`
- **Cards**: Procure por `.info-card`

---

## 📱 Responsividade

✅ **Totalmente Responsivo**

| Dispositivo | Resolução | Status |
|------------|-----------|--------|
| Mobile | < 480px | ✅ Otimizado |
| Mobile Landscape | 480-768px | ✅ Otimizado |
| Tablet | 768-1024px | ✅ Otimizado |
| Desktop | 1024-1920px | ✅ Otimizado |
| Ultra Wide | > 1920px | ✅ Otimizado |

**Breakpoints**:
- `@media (max-width: 480px)` - Mobile small
- `@media (max-width: 768px)` - Tablet
- `@media (max-width: 1024px)` - Desktop small

---

## 🌐 Compatibilidade de Navegadores

| Navegador | Suporte |
|-----------|---------|
| Chrome | ✅ Full  |
| Firefox | ✅ Full  |
| Safari | ✅ Full  |
| Edge | ✅ Full  |
| Opera | ✅ Full  |
| IE 11 | ⚠️ Parcial |

> Recomenda-se usar navegadores modernos (Chrome, Firefox, Safari, Edge)

---

## 📦 Dependências Externas

Todas as bibliotecas são carregadas via **CDN** (sem instalação local):

```html
<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- AOS (Animate On Scroll) -->
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
```

---

## ⚡ Performance

### Otimizações Implementadas
- ✅ CSS com variáveis (menor tamanho)
- ✅ JavaScript minificado
- ✅ Lazy loading de imagens
- ✅ Debounce de eventos
- ✅ WebGL para renderização 3D
- ✅ Intersection Observer API

### Tamanho dos Arquivos
```
index.html:    ~15 KB
styles.css:    ~40 KB
main.js:       ~8 KB
three-scene.js: ~6 KB
────────────────────
Total:         ~70 KB (sem dependências CDN)
```

---

## 🎓 Informações Acadêmicas

**Trabalho**: Geometria Espacial - Pirâmides  
**Professor**: Bruno Souto  
**Turma**: 302 CZETRAO  
**Grupo**: 2  
**Ano**: 2026  
**Status**: ✅ Completo e Funcional

### Objetivos Alcançados
- ✅ Educação interativa sobre pirâmides
- ✅ Visualização 3D em tempo real
- ✅ Design visual sofisticado e profissional
- ✅ Responsividade em todos os dispositivos
- ✅ Animações suaves e chamat ivas
- ✅ Cálculos matemáticos automáticos
- ✅ Integração de tentáculos de polvo (efeitos)

---

## 💡 Dicas Úteis

### Apresentação
```bash
# Abra em tela cheia
F11 (ou Fn + F11 em alguns teclados)

# Demonstre a pirâmide 3D
- Clique e arraste para rotacionar
- Use scroll para zoom
- Ajuste os sliders para mudar dimensões
```

### Impressão
```bash
# Imprima as seções
Ctrl+P (ou Cmd+P no Mac)

# Desabilite cor de fundo para economizar tinta
- Configurações → Mais configurações → Opções
```

### Compartilhamento
```bash
# Comprima a pasta
7-Zip ou WinRAR: Clique direito → Adicionar ao arquivo

# Tamanho: ~70 KB compactado
# Funciona em qualquer navegador moderno
```

---

## 🔗 Links Úteis

### Educação em Geometria
- [Khan Academy - Geometry](https://www.khanacademy.org/math/geometry)
- [3Blue1Brown - Essence of Geometry](https://www.youtube.com/playlist?list=PLZHQObOWTQDPHP40cpbNQFLo2JJRteHJ1)

### Documentação Técnica
- [Three.js Documentation](https://threejs.org/docs/)
- [MDN Web Docs - WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [AOS - Animate On Scroll](https://michalsnik.github.io/aos/)

### Referências Matemáticas
- [Pyramids - Wolfram MathWorld](https://mathworld.wolfram.com/Pyramid.html)
- [Wikipedia - Pyramid (geometry)](https://en.wikipedia.org/wiki/Pyramid_(geometry))

---

## 📱 Exemplos de Uso

### Para Estudo
```
1. Navegue até "Informações"
2. Leia os 6 cards com conceitos
3. Acesse "Visualização 3D"
4. Interaja com a pirâmide
5. Observe os cálculos mudarem
```

### Para Apresentação
```
1. Abra em tela cheia (F11)
2. Comece na seção Hero
3. Demonstre a Pirâmide 3D
4. Mostre diferentes tipos (Galeria)
5. Apresente o grupo
```

### Em Trabalhos Escolares
```
1. Compartilhe o link/arquivo
2. Mostrou em apresentação
3. Professores podem explorar
4. Alunos aprendem interativamente
```

---

## 🎉 Créditos

Desenvolvido com ❤️ para educação em Geometria 3D

**Tecnologias Principais**:
- Three.js - Renderização 3D WebGL
- AOS - Animações ao scroll
- CSS3 - Design moderno
- JavaScript Vanilla - Máxima performance

**Inspiração**:
- Arte visual em gradientes e animações
- Efeitos de tentáculos de polvo
- Tema educativo profissional

---

## 📝 Notas Importantes

### Para Funcionar Corretamente
1. ✅ Use um navegador moderno
2. ⚠️ Se abrir via `file://`, some recursos podem não funcionar
3. ℹ️ Use um servidor local para melhor performance

### Atualizações Futuras
- [ ] Mobile app version
- [ ] Mais tipos de pirâmides
- [ ] Cálculos avançados
- [ ] Modo escuro
- [ ] Suporte offline

---

## 📧 Contato

**Grupo 2 - Turma 302 CZETRAO**

📚 Trabalho para o Professor Bruno Souto  
🎓 Instituição: [Sua Instituição]  
📞 Contato: [Seu Email]

---

## 📄 Licença

Este projeto é fornecido com fins educacionais.  
Livre para uso em aulas e trabalhos acadêmicos.

---

**Desenvolvido em 2026** ✨  
**Última atualização**: Março de 2026  
**Versão**: 1.0.0  
**Status**: ✅ Completo e Funcional
