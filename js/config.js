/* =====================================================================
   config.js  -  AQUÍ PERSONALIZAS TODO
   ---------------------------------------------------------------------
   Todo lo que está escrito entre comillas ("así") es texto que puedes
   cambiar. Lo importante:
     - No borres las comillas, las comas ni las llaves { } y [ ].
     - Cada elemento de una lista termina con una coma
       (el último elemento de la lista no la necesita).
     - Todo lo marcado como EJEMPLO es de prueba: reemplázalo por lo tuyo.
   ===================================================================== */

const CONFIG = {

  /* ---------- 1. PANTALLA DEL CORAZÓN ---------- */
  inicio: {
    sobretitulo: "Feliz segundo mes de noviecitossssss",      // EJEMPLO: texto pequeño de arriba
    titulo: "Mi chiquita",                      // EJEMPLO: aquí va su nombre o apodo
    instruccion: "Mantén presionado el corazón",
    tiempoLlenado: 2200                     // milisegundos que debe mantenerlo (2200 = 2,2 segundos)
  },

  /* ---------- PORTADA (lo primero que ve al desbloquear) ---------- */
  portada: {
    titulo: "segundo mes de novios",                                                  // EJEMPLO
    texto: "Esto lo hice para ti mi amorcito lindooooooooo."            // EJEMPLO
  },

  /* ---------- 2. GALERÍA DE RECUERDOS ----------
     Para cada foto necesitas 4 datos:
       archivo : ruta de la imagen dentro de la carpeta del proyecto
       titulo  : texto corto que aparece debajo de la foto
       fecha   : fecha que aparece al girar la foto
       mensaje : texto que aparece al girar la foto
     Para agregar otra foto: copia un bloque completo { ... }, pégalo debajo
     (con su coma) y cambia los datos. Para quitar una, borra su bloque.   */
  fotos: [
    {
      archivo: "img/1.jpeg",
      titulo: "fotito 1",                                             // EJEMPLO
      fecha: "15 de septiembre",                                   // EJEMPLO
      mensaje: "Esta foto me hace recordar cuando volvi de Bogotá despues de tanto tiempo y salimos"   // EJEMPLO
    },
    {
      archivo: "img/2.jpeg",
      titulo: "fotito 2",                                             // EJEMPLO
      fecha: "1 de octubre",                                       // EJEMPLO
      mensaje: "Este dia fue el dia en el q mejor la pase, ese dia en Rionegro hicimos varias cosas y compramos los peluchessss"      // EJEMPLO
    },
    {
      archivo: "img/3.jpeg",
      titulo: "fotito 3",                                             // EJEMPLO
      fecha: "4 de noviembre",                                // EJEMPLO
      mensaje: "Amor mio este fue uno de los gestos mas hermosos q alguien ha tenido conmigo, ese dia me fuiste a despedir al aeropuerto y me diste una cartita, que por cierto es mi carta favorita pq es la mas personal"             // EJEMPLO
    },
    {
      archivo: "img/4.jpeg",
      titulo: "fotito 4",                                             // EJEMPLO
      fecha: "12 de noviembre",                                      // EJEMPLO
      mensaje: "mi chiquita este dia fuimos a rionegro, fue un dia muy especial para mi, la pasamos muy bien, me rei demasiado y me acuerdo de la besuqueada q nos dimos jajajjjajaj, tmbn de las fotitos q nos tomamos"   // EJEMPLO
    }
  ],

  /* ---------- 3. VIDEO DEL POEMA ----------
     titulo    : título de la sección
     subtitulo : texto pequeño bajo el título (puede quedar vacío: "")
     archivo   : ruta de TU video dentro de la carpeta video/
                 (si lo dejas vacío: "" la sección completa se oculta)
     portada   : imagen opcional que se ve antes de darle play,
                 por ejemplo "img/portada-video.jpg" (o "" para no usar)
     poema     : texto del poema (opcional). Cada elemento de la lista es una
                 estrofa, y \n separa los versos. Si no quieres mostrarlo,
                 deja la lista vacía:  poema: []                           */
  video: {
    titulo: "ES ALGO SUPER CHIQUITO PERO CON MUCHO AMOR, TE AMOOOOO DEMASIADO",                                         // EJEMPLO
    subtitulo: "mi niña",                           // EJEMPLO
    poema: [                                                            // EJEMPLO
      "Aquí va la primera estrofa de tu poema,\ncon cada verso en su propia línea.",
      "Aquí va la segunda estrofa.\nPuedes poner todas las que quieras."
    ]
  },

  /* ---------- PIE DE PÁGINA ---------- */
  pie: "ES ALGO SUPER CHIQUITO PERO CON MUCHO AMOR TE AMOOOOO DEMASIADO"                                                 // EJEMPLO
};
