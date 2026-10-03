# Portafolio - Leyder Joseph Martínez López

🔗 **Sitio en vivo:** https://leyderjoseph.github.io/leyder-martinez-repositorio/

Portafolio personal de **Contador Público y Desarrollador Junior**, construido con HTML, CSS y JavaScript puro. Es responsive y funciona en escritorio y móvil.

## Secciones

- **Sobre mí:** perfil profesional, competencias y a qué me dedico.
- **Currículum:** formación, experiencia y habilidades técnicas.
- **Proyectos:** repositorios destacados con filtro por categoría.
- **Contacto:** datos de contacto, mapa y formulario funcional que envía los mensajes a mi correo.

## Tecnologías

HTML5, CSS3, JavaScript (ES6) e [Ionicons](https://ionic.io/ionicons). Publicado con GitHub Pages.

## Estructura

```
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── images/          (foto, proyectos y favicon LM)
│   └── cv-leyder-martinez.pdf
├── LICENSE
└── README.md
```

## Formulario de contacto

El formulario usa [FormSubmit](https://formsubmit.co). Al enviar el primer mensaje llega un correo de activación a la dirección configurada en `assets/js/script.js` (constante `FORM_ENDPOINT`); hay que confirmarlo una sola vez. Para probarlo hay que abrir el sitio desde un servidor (Live Server de VS Code o GitHub Pages), no con doble clic sobre el archivo.

## Cómo verlo en local

```bash
git clone https://github.com/LeyderJoseph/leyder-martinez-repositorio.git
```

Abre la carpeta en VS Code y usa la extensión **Live Server** sobre `index.html`.

## Créditos y licencia

Diseño base: plantilla [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) de codewithsadee, adaptada y traducida con mi contenido. Se distribuye bajo licencia MIT (ver `LICENSE`).