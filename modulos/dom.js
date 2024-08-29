export function crearElementoTarea(id, descripcion, completada, botones) {
  const li = document.createElement('li');
  li.id = `tarea-${id}`;
  li.className = `tarea ${completada ? 'completada' : ''}`;
  li.setAttribute('data-tarea-id', id);

  const span = document.createElement('span');
  span.className = 'descripcion';
  span.textContent = descripcion;
  li.appendChild(span);

  const elementoAcciones = document.createElement('div');
  elementoAcciones.className = 'acciones';
  botones.forEach((boton) => {
    elementoAcciones.appendChild(boton);
  });
  li.appendChild(elementoAcciones);
  return li;
}

function crearBotonAccion(tareaId, texto, clase, handler) {
  const botonAccion = document.createElement('button');
  botonAccion.className = clase;
  botonAccion.setAttribute('data-tarea-id', tareaId);
  botonAccion.innerHTML = texto;
  botonAccion.addEventListener('click', handler);

  return botonAccion;
}

// Event handler para eliminar tarea
function borrarTarea(event, tareas) {
  console.log(event, event.target)
  const tareaId = event.target.getAttribute('data-tarea-id');
  tareas.borrar(tareaId);
}

// Event handler para completar tarea
function completarTarea(event, tareas) {
  const tareaId = event.target.getAttribute('data-tarea-id');
  tareas.completar(tareaId);
}

export function renderizarTareas(contenedor, tareas) {
  contenedor.innerHTML = '';
  tareas.obtenerTodas().forEach((tarea, index) => {
    const botones = [
      crearBotonAccion(index, 'check', 'completar', (e) => completarTarea(e,tareas)),
      crearBotonAccion(index, 'delete', 'borrar', (e) => borrarTarea(e,tareas)),
    ]
    const elementoTarea = crearElementoTarea(index, tarea.descripcion, tarea.completada, botones);
    
    contenedor.appendChild(elementoTarea);
  });
}  