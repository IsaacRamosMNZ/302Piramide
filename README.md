# 302Pirâmide — Site Educativo de Geometria Espacial

Site educativo completo sobre **Pirâmide em Matemática**, com conteúdo didático em português, calculadora interativa e visualização 3D.

## ✨ Funcionalidades

- 📚 **Conteúdo educativo** — Elementos, tipos, fórmulas (área, volume), exemplos resolvidos passo a passo e exercícios com gabarito ocultável
- 🧮 **Calculadora interativa** — Escolha a base (quadrada, retangular ou triangular equilátera), informe as medidas e veja volume, áreas e apótemas calculados com passo a passo
- 🔮 **Pirâmide 3D** — Visualização interativa com Three.js; orbite, dê zoom e ajuste base e altura com sliders em tempo real
- 📱 **Responsivo** — Layout adaptado para mobile e desktop

## 🚀 Como rodar localmente

> É necessário servir os arquivos via HTTP (não abrir `index.html` diretamente no navegador) para que o Three.js carregue corretamente.

### Opção 1 — Node.js (npx serve)

```bash
npx serve .
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Opção 2 — Python

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Acesse: [http://localhost:8080](http://localhost:8080)

### Opção 3 — VS Code Live Server

Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), clique com botão direito em `index.html` → *Open with Live Server*.

## 🌐 GitHub Pages

Para publicar no GitHub Pages:

1. Vá em **Settings → Pages** no repositório
2. Em *Source*, selecione a branch `main` (ou `master`) e a pasta `/ (root)`
3. Clique em **Save**
4. Aguarde alguns minutos e acesse `https://<seu-usuario>.github.io/302Piramide/`

## 📂 Estrutura do Projeto

```
302Piramide/
├── index.html               # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css       # Estilos (responsivo, moderno)
│   └── js/
│       ├── main.js          # Calculadora, navegação, exercícios
│       └── three-scene.js   # Cena 3D com Three.js
└── README.md
```

## 🛠 Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Layout responsivo, animações, variáveis CSS |
| JavaScript (ES5+) | Calculadora, interações, acessibilidade |
| [Three.js](https://threejs.org) v0.160 | Renderização 3D via WebGL (CDN) |

## 📖 Conteúdo Abordado

- Definição e elementos da pirâmide (vértice, base, faces, arestas, apótemas, altura)
- Relação de Euler (V − A + F = 2)
- Tipos: triangular, quadrangular, pentagonal, hexagonal, regular e oblíqua
- Fórmulas: área da base, área lateral, área total e volume
- 3 exemplos resolvidos passo a passo
- 4 exercícios com gabarito ocultável