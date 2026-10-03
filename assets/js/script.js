'use strict';

/* ==========================================================
   PORTAFOLIO - Leyder Martínez
   Profesor, este archivo reemplaza al script.js de la plantilla.
   Cada bloque está comentado para explicar qué hace.
   ========================================================== */


/* ---------- 1. SIDEBAR (mostrar/ocultar contacto en móvil) ---------- */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// Al hacer clic, alterna la clase "active" que el CSS usa para desplegar el panel.
sidebarBtn.addEventListener('click', () => sidebar.classList.toggle('active'));


/* ---------- 2. NAVEGACIÓN ENTRE PÁGINAS ---------- */
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Comparo el valor data-nav-link del botón con el data-page de cada artículo.
    const target = link.dataset.navLink;

    pages.forEach(page => page.classList.toggle('active', page.dataset.page === target));
    navLinks.forEach(l => l.classList.toggle('active', l === link));

    window.scrollTo(0, 0); // vuelve arriba al cambiar de sección
  });
});


/* ---------- 3. FILTRO DE PROYECTOS ---------- */
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

// Muestra solo los proyectos cuya categoría coincide ("todos" muestra todo).
const filterProjects = (selected) => {
  const value = selected.toLowerCase();

  filterItems.forEach(item => {
    const show = value === 'todos' || item.dataset.category === value;
    item.classList.toggle('active', show);
  });
};

// Menú desplegable (versión móvil)
select.addEventListener('click', () => select.classList.toggle('active'));

selectItems.forEach(item => {
  item.addEventListener('click', () => {
    selectValue.innerText = item.innerText;
    select.classList.remove('active');
    filterProjects(item.innerText);
  });
});

// Botones de filtro (versión escritorio)
let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    selectValue.innerText = btn.innerText;
    filterProjects(btn.innerText);

    lastClickedBtn.classList.remove('active');
    btn.classList.add('active');
    lastClickedBtn = btn;
  });
});


/* ---------- 4. FORMULARIO DE CONTACTO FUNCIONAL ---------- */
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const formStatus = document.querySelector('[data-form-status]');

/* Servicio de envío: FormSubmit (gratuito, sin registro).
   Cambia este correo si quieres recibir los mensajes en otro buzón.
   IMPORTANTE: el primer mensaje que se envíe dispara un correo de activación
   a esta dirección; hay que confirmarlo una sola vez (revisa también Spam). */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/leyder-joseph.13@hotmail.es';

// Habilita el botón solo cuando todos los campos obligatorios son válidos.
formInputs.forEach(input => {
  input.addEventListener('input', () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Función auxiliar para mostrar mensajes de estado al visitante.
const setStatus = (text, type) => {
  formStatus.textContent = text;
  formStatus.className = 'form-status' + (type ? ' ' + type : '');
};

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // evita que la página se recargue

  // Convierto los campos del formulario a un objeto simple.
  const data = Object.fromEntries(new FormData(form).entries());

  // Campos especiales de FormSubmit: asunto y formato del correo.
  data._subject = 'Nuevo mensaje desde tu portafolio';
  data._template = 'table';

  formBtn.disabled = true;
  setStatus('Enviando mensaje...', '');

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // FormSubmit responde success "true" (texto) cuando todo salió bien.
    if (response.ok && String(result.success) === 'true') {
      setStatus('¡Mensaje enviado! Te responderé pronto.', 'ok');
      form.reset();
      formBtn.disabled = true; // el formulario quedó vacío, así que se vuelve a bloquear
    } else {
      throw new Error(result.message || 'Respuesta no válida del servidor');
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    setStatus('No se pudo enviar. Intenta de nuevo o escríbeme a leyder-joseph.13@hotmail.es', 'error');
    formBtn.disabled = !form.checkValidity();
  }
});