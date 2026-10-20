# Portafolio web de Cristóbal Sanhueza

Sitio estático (HTML, CSS y JavaScript sin dependencias), pensado para publicarse en Netlify desde GitHub en cristobalsanhueza.cl.

```
portafolio-web/
├── index.html            Estructura, contenido y datos estructurados (JSON-LD)
├── casos-de-exito.html   Seis casos de éxito anonimizados, con gráficos SVG y formulario
├── gracias.html          Página de confirmación del formulario (noindex)
├── robots.txt            Reglas para buscadores y crawlers de IA
├── sitemap.xml           Mapa del sitio
├── llms.txt              Resumen del sitio para modelos de lenguaje
└── assets/
    ├── css/styles.css    Todos los estilos
    ├── js/main.js        Reloj de Viña del Mar, menú, formulario y animación del embudo
    └── img/              Retratos y og-image.png (vista previa al compartir)
```

robots.txt, sitemap.xml y llms.txt deben quedar en la raíz del sitio. Las rutas de assets son relativas, así que el sitio funciona igual abierto desde el disco o publicado.

La página casos-de-exito.html usa los mismos estilos y el mismo JavaScript. Su formulario se llama contacto-casos en Netlify Forms (el del inicio se llama contacto), así que aparecen como dos formularios distintos en el panel.
