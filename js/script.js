// ============================================================================
// SECCIÓN 1: MENÚ HAMBURGUESA (para dispositivos móviles)
// ============================================================================

const hamburger = document.getElementById('hamburger');    // Obtiene el botón hamburguesa (☰) del HTML
const navMenu = document.getElementById('navMenu');        // Obtiene el contenedor del menú de navegación
const navLinks = document.querySelectorAll('.nav-link');   // Obtiene TODOS los enlaces del menú (devuelve lista)

hamburger.addEventListener('click', () => {                // Agrega evento click al botón hamburguesa
    navMenu.classList.toggle('active');                    // toggle = si tiene 'active' lo quita, si no lo tiene lo agrega
});                                                         // Esto muestra u oculta el menú en móviles

navLinks.forEach(link => {                                 // forEach = recorre CADA enlace del menú uno por uno
    link.addEventListener('click', () => {                 // Agrega evento click a cada enlace
        navMenu.classList.remove('active');                // remove = elimina la clase 'active' (cierra el menú)
    });                                                     // Así el menú se cierra automáticamente al hacer clic en un enlace
});


// ============================================================================
// SECCIÓN 3: VALIDACIÓN DEL FORMULARIO (lo más importante)
// ============================================================================

// ---------- 2.1 OBTENER ELEMENTOS DEL FORMULARIO ----------

const form = document.getElementById('reservaForm');        // Obtiene todo el formulario por su ID
const nombreInput = document.getElementById('nombre');      // Obtiene el campo nombre
const emailInput = document.getElementById('email');        // Obtiene el campo email
const telefonoInput = document.getElementById('telefono');  // Obtiene el campo teléfono
const fechaInput = document.getElementById('fecha');        // Obtiene el campo fecha
const personasSelect = document.getElementById('personas'); // Obtiene el select de personas

// ---------- 2.2 OBTENER LOS ESPACIOS PARA MENSAJES DE ERROR ----------

const errorNombre = document.getElementById('errorNombre');     // Espacio donde muestra error del nombre
const errorEmail = document.getElementById('errorEmail');       // Espacio donde muestra error del email
const errorTelefono = document.getElementById('errorTelefono'); // Espacio donde muestra error del teléfono
const errorFecha = document.getElementById('errorFecha');       // Espacio donde muestra error de la fecha
const errorPersonas = document.getElementById('errorPersonas'); // Espacio donde muestra error del select
const formMensaje = document.getElementById('formMensaje');     // Espacio donde muestra éxito o error general

// ---------- 2.3 FUNCIONES DE VALIDACIÓN (usan expresiones regulares) ----------

function validarNombre(nombre) {                            // Función que recibe un nombre y devuelve true/false
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;          // Expresión regular:
                                                           // ^ = inicio del texto
                                                           // [a-zA-ZáéíóúÁÉÍÓÚñÑ\s] = letras mayúsculas, minúsculas, con tildes, ñ y espacios
                                                           // {3,} = mínimo 3 caracteres
                                                           // $ = fin del texto
    return regex.test(nombre.trim());                      // test() comprueba si cumple, trim() elimina espacios al inicio/final
}

function validarEmail(email) {                             // Función que valida formato de email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;           // ^ = inicio, [^\s@]+ = uno o más caracteres que NO sean espacio ni @
                                                           // @ = el símbolo arroba
                                                           // [^\s@]+ = dominio (sin espacios ni @)
                                                           // \. = punto literal
                                                           // [^\s@]+ = extensión (com, org, etc)
                                                           // $ = fin
    return regex.test(email);                              // Devuelve true si el email tiene formato válido
}

function validarTelefono(telefono) {                       // Función que valida teléfonos chilenos
    const regex = /^(\+?56)?\s?9\s?\d{8}$|^\d{9}$/;       // Primera opción: +569 12345678 o 9 12345678
                                                           // \+? = signo + opcional
                                                           // 56? = código 56 opcional
                                                           // \s? = espacio opcional
                                                           // 9 = el número 9
                                                           // \s? = espacio opcional
                                                           // \d{8} = exactamente 8 dígitos
                                                           // | = O (operador OR)
                                                           // ^\d{9}$ = segunda opción: exactamente 9 dígitos seguidos
    return regex.test(telefono.trim().replace(/\s/g, '')); // replace elimina todos los espacios para la validación
}

function validarFecha(fecha) {                             // Función que valida que la fecha sea hoy o futuro
    if (!fecha) return false;                              // Si la fecha está vacía, retorna false (inválida)
    
    const hoy = new Date();                                // Crea objeto Date con la fecha y hora actual
    hoy.setHours(0, 0, 0, 0);                             // Pone la hora a 00:00:00 (medianoche)
                                                           // Así comparamos solo fechas, sin importar la hora
    
    const fechaSeleccionada = new Date(fecha);             // Convierte el string de fecha (ej: "2026-05-20") a objeto Date
    
    return fechaSeleccionada >= hoy;                       // Retorna true si la fecha seleccionada es mayor o igual a hoy
}

// ---------- 2.4 VALIDACIÓN EN TIEMPO REAL (mientras el usuario escribe) ----------

nombreInput.addEventListener('input', () => {              // 'input' = evento que se activa CADA VEZ que escribe o borra
    if (!validarNombre(nombreInput.value)) {               // Si el nombre NO es válido (! significa NO)
        errorNombre.textContent = '❌ Mínimo 3 letras, solo caracteres válidos'; // Muestra mensaje de error
    } else {                                               // Si el nombre SÍ es válido
        errorNombre.textContent = '';                      // Limpia el mensaje de error (lo deja vacío)
    }
});

emailInput.addEventListener('input', () => {               // Cada vez que escribe en el campo email
    if (!validarEmail(emailInput.value)) {                 // Si el email NO es válido
        errorEmail.textContent = '❌ Email inválido (ej: nombre@dominio.com)'; // Muestra error
    } else {                                               // Si el email SÍ es válido
        errorEmail.textContent = '';                       // Limpia el error
    }
});

telefonoInput.addEventListener('input', () => {            // Cada vez que escribe en el campo teléfono
    if (!validarTelefono(telefonoInput.value)) {           // Si el teléfono NO es válido
        errorTelefono.textContent = '❌ Teléfono inválido (ej: 912345678 o +569 12345678)'; // Error
    } else {                                               // Si el teléfono SÍ es válido
        errorTelefono.textContent = '';                    // Limpia error
    }
});

fechaInput.addEventListener('change', () => {              // 'change' = cuando el usuario SELECCIONA una fecha (no mientras escribe)
    if (!validarFecha(fechaInput.value)) {                 // Si la fecha NO es válida (es pasada)
        errorFecha.textContent = '❌ La fecha debe ser hoy o posterior'; // Error
    } else {                                               // Si la fecha SÍ es válida
        errorFecha.textContent = '';                       // Limpia error
    }
});

personasSelect.addEventListener('change', () => {          // Cuando el usuario cambia la selección del select
    if (personasSelect.value === '') {                     // Si el valor está vacío (opción "Selecciona...")
        errorPersonas.textContent = '❌ Selecciona número de personas'; // Error
    } else {                                               // Si seleccionó una opción válida
        errorPersonas.textContent = '';                    // Limpia error
    }
});

// ---------- 3.5 VALIDACIÓN FINAL AL ENVIAR EL FORMULARIO ----------

form.addEventListener('submit', (e) => {                    // 'submit' = cuando el usuario hace clic en "Enviar" o presiona Enter
    e.preventDefault();                                    // previene que el formulario se envíe a un servidor (recarga página)
                                                           // Así podemos validar sin que se recargue la página
    
    let esValido = true;                                   // Variable bandera: empieza asumiendo que todo está válido
    
    // Validar campo NOMBRE
    if (!validarNombre(nombreInput.value)) {               // Si nombre NO es válido
        errorNombre.textContent = '❌ Nombre inválido (mínimo 3 letras)'; // Mensaje de error
        esValido = false;                                  // Cambia bandera a false (hay error)
    }
    
    // Validar campo EMAIL
    if (!validarEmail(emailInput.value)) {                 // Si email NO es válido
        errorEmail.textContent = '❌ Email inválido';       // Mensaje de error
        esValido = false;                                  // Hay error
    }
    
    // Validar campo TELÉFONO
    if (!validarTelefono(telefonoInput.value)) {           // Si teléfono NO es válido
        errorTelefono.textContent = '❌ Teléfono inválido'; // Mensaje de error
        esValido = false;                                  // Hay error
    }
    
    // Validar campo FECHA
    if (!validarFecha(fechaInput.value)) {                 // Si fecha NO es válida
        errorFecha.textContent = '❌ Fecha no válida';      // Mensaje de error
        esValido = false;                                  // Hay error
    }
    
    // Validar SELECT de PERSONAS
    if (personasSelect.value === '') {                     // Si no seleccionó ninguna opción
        errorPersonas.textContent = '❌ Selecciona cantidad de personas'; // Error
        esValido = false;                                  // Hay error
    }
    
    // ---------- 3.6 PROCESAR EL RESULTADO DE LA VALIDACIÓN ----------
    
    if (esValido) {                                        // Si esValido sigue siendo true (todo correcto)
        
        formMensaje.className = 'form-mensaje exito';      // Asigna clase CSS para estilo de éxito (fondo verde)
        formMensaje.innerHTML = `✅ ¡Solicitud enviada correctamente!<br><strong>${nombreInput.value}</strong>, en breve recibirás un correo con tu cotización.`;
        // innerHTML = contenido HTML del mensaje, usando template string (comillas invertidas) para insertar el nombre
        
        form.reset();                                      // reset() limpia TODOS los campos del formulario
        
        // Limpia manualmente todos los mensajes de error (por si acaso)
        errorNombre.textContent = '';
        errorEmail.textContent = '';
        errorTelefono.textContent = '';
        errorFecha.textContent = '';
        errorPersonas.textContent = '';
        
        formMensaje.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Hace scroll suave hasta el mensaje
        
        setTimeout(() => {                                 // setTimeout ejecuta una función después de X milisegundos
            formMensaje.style.display = 'none';            // Oculta el mensaje (display: none)
            formMensaje.className = 'form-mensaje';        // Restaura la clase original (sin colores)
        }, 5000);                                          // 5000 milisegundos = 5 segundos
        
    } else {                                               // Si esValido es false (hay errores)
        
        formMensaje.className = 'form-mensaje error';      // Asigna clase CSS para estilo de error (fondo rojo)
        formMensaje.innerHTML = '⚠️ Por favor corrige los errores marcados.'; // Mensaje general de error
        
        setTimeout(() => {                                 // Después de 4 segundos...
            formMensaje.style.display = 'none';            // Oculta el mensaje de error
        }, 4000);                                          // 4000 milisegundos = 4 segundos
    }
    
    formMensaje.style.display = 'block';                   // Muestra el mensaje (block = visible, no oculto)
});

// ============================================================================
// SECCIÓN 3: BADGE "DESTACADO" EN LA PRIMERA TARJETA DE SERVICIOS
// ============================================================================

const primeraTarjeta = document.querySelector('.servicio-card'); // Obtiene la PRIMERA tarjeta de servicios (solo una)

if (primeraTarjeta && !primeraTarjeta.querySelector('.badge-nuevo')) { // Si existe la tarjeta Y aún no tiene badge
    // && = Y (ambas condiciones deben cumplirse)
    // ! = NO (que NO tenga badge-nuevo)
    
    const badge = document.createElement('span');          // createElement = crea un nuevo elemento HTML <span>
    
    badge.textContent = '⭐ Destacado';                   // textContent = texto que va a mostrar el badge
    
    badge.style.backgroundColor = '#f4a261';              // Cambia color de fondo a naranja
    badge.style.color = 'white';                          // Cambia color del texto a blanco
    badge.style.padding = '4px 12px';                     // padding = espacio interno (4px arriba/abajo, 12px izquierda/derecha)
    badge.style.borderRadius = '30px';                    // borderRadius = esquinas redondeadas (30px = circular)
    badge.style.fontSize = '0.7rem';                      // font-size = tamaño de texto pequeño
    badge.style.marginTop = '10px';                       // marginTop = separación hacia arriba de 10px
    badge.style.display = 'inline-block';                 // display = que se comporte como bloque en línea
    
    primeraTarjeta.appendChild(badge);                    // appendChild = agrega el badge DENTRO de la tarjeta
}

// ============================================================================
// SECCIÓN 4: AÑO DINÁMICO EN EL FOOTER (se actualiza automáticamente)
// ============================================================================

const footerParrafo = document.querySelector('.footer p:first-of-type'); // Obtiene el PRIMER párrafo dentro del footer

if (footerParrafo) {                                     // Si existe ese párrafo (para evitar errores)
    const year = new Date().getFullYear();               // new Date() = fecha actual, getFullYear() = año actual (2026)
    
    footerParrafo.innerHTML = `&copy; ${year} EcoTurismo El Salvador. Todos los derechos reservados.`;
    // innerHTML = reemplaza el contenido del párrafo
    // &copy; = símbolo de copyright ©
    // ${year} = inserta el año actual automáticamente
}
