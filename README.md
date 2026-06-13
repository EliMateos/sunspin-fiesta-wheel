# SunSpin Fiesta Wheel

Ruleta interactiva de cumpleaños con estética veraniega tipo Positano.

## Qué incluye

- Ruleta en español.
- Giro del círculo grande.
- Pantalla de casilla ganadora con estética similar a la ruleta.
- Pregunta aleatoria sobre la cumpleañera.
- Confeti en premios.
- Código estático listo para GitHub Pages.

## Estructura

```txt
sunspin-fiesta-wheel/
├── index.html
├── styles/
│   └── summer-campaign.css
├── scripts/
│   └── spin-experience.js
├── assets/
│   └── brand-wheel-positano-edition.jpeg
└── README.md
```

## Cómo subirlo a GitHub Pages

1. Crea un repositorio nuevo.
2. Sube todos los archivos de esta carpeta.
3. Ve a `Settings > Pages`.
4. En `Build and deployment`, elige:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Guarda.
6. GitHub generará una URL pública para abrir la ruleta.

## Editar preguntas

Las preguntas están en `scripts/spin-experience.js`, dentro de la casilla:

```js
title: "Pregunta cumpleañera"
```

