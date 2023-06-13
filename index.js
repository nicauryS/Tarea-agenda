
    // Array para almacenar los contactos
    var contactos = [];

    // Mostrar sección según el botón seleccionado
    function mostrarSeccion(seccion) {
      // Ocultar todas las secciones
      document.getElementById('inicio').style.display = 'none';
      document.getElementById('crear').style.display = 'none';
      document.getElementById('mostrar').style.display = 'none';

      // Mostrar la sección seleccionada
      document.getElementById(seccion).style.display = 'block';

      // Si se selecciona la sección "mostrar", mostrar los contactos guardados
      if (seccion === 'mostrar') {
        mostrarContactos();
      }
    }

    // Guardar el contacto en el array y en el almacenamiento local
    function guardarContacto(event) {
      event.preventDefault(); // Evitar que el formulario se envíe

      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var telefono = document.getElementById('telefono').value;

      var contacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
      };

      contactos.push(contacto);
      guardarContactosEnAlmacenamientoLocal();

      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('telefono').value = '';

      alert('Contacto guardado correctamente');
    }

    // Mostrar los contactos guardados en la sección "mostrar"
    function mostrarContactos() {
      var tablaContactos = document.getElementById('tablaContactos');
      tablaContactos.innerHTML = '';

      for (var i = 0; i < contactos.length; i++) {
        var contacto = contactos[i];
        var fila = document.createElement('tr');
        fila.innerHTML = '<td>' + contacto.nombre + '</td><td>' + contacto.apellido + '</td><td>' + contacto.telefono + '</td>';
        tablaContactos.appendChild(fila);
      }
    }

    // Guardar los contactos en el almacenamiento local como JSON
    function guardarContactosEnAlmacenamientoLocal() {
      var contactosJSON = JSON.stringify(contactos);
      localStorage.setItem('contactos', contactosJSON);
    }

    // Obtener los contactos del almacenamiento local al cargar la página
    function obtenerContactosDelAlmacenamientoLocal() {
      var contactosJSON = localStorage.getItem('contactos');
      if (contactosJSON) {
        contactos = JSON.parse(contactosJSON);
      }
    }

    // Obtener los contactos del almacenamiento local al cargar la página
    window.onload = function() {
      obtenerContactosDelAlmacenamientoLocal();
    };

    // Escuchar el evento "submit" del formulario
    document.getElementById('formulario').addEventListener('submit', guardarContacto);
