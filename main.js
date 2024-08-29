const TAREAS_KEY = 'tareas';
const SELECTORS = {
  inputTarea: 'texto-tarea',
  botonAgregarTarea: 'boton-agregar-tarea',
  listaTareas: 'lista-tareas',
  borrarTarea: 'borrar-tarea',
  completarTarea: 'completar-tarea'
};

function cargarTareas() {
  try {
    return JSON.parse(window.localStorage.getItem(TAREAS_KEY)) ?? [];
  } catch (error) {
    console.error('Error loading tasks from localStorage', error);
    return [];
  }
}

function actualizarTareas(tareas) {
  try {
    window.localStorage.setItem(TAREAS_KEY, JSON.stringify(tareas));
  } catch (error) {
    console.error('Error updating tasks in localStorage', error);
  }
}

const inputTarea = document.getElementById(SELECTORS.inputTarea);
const botonAgregarTarea = document.getElementById(SELECTORS.botonAgregarTarea);
const listaTareas = document.getElementById(SELECTORS.listaTareas);

let tareas = cargarTareas();

if (tareas.length > 0) {
  mostrarTareas(listaTareas, tareas);
}

botonAgregarTarea.addEventListener('click', () => {
  const descripcion = inputTarea.value.trim();
  if (!descripcion) {
    return;
  }
  tareas.push({ descripcion, completada: false });
  actualizarTareas(tareas);
  inputTarea.value = '';
  inputTarea.focus();
  mostrarTareas(listaTareas, tareas);
});

listaTareas.addEventListener('click', (event) => {
  const target = event.target;
  const tareaId = target.dataset.tareaId;
  if (target.classList.contains(SELECTORS.borrarTarea)) {
    borrarTarea(tareaId);
  } else if (target.classList.contains(SELECTORS.completarTarea)) {
    completarTarea(tareaId);
  }
});

function crearTarea(id, descripcion, completada) {
  const tarea = document.createElement('li');
  tarea.id = `tarea-${id}`;
  tarea.classList.add('tarea');
  if (completada) {
    tarea.classList.add('completada');
  }
  tarea.dataset.tareaId = id;

  const spanDescripcion = document.createElement('span');
  spanDescripcion.classList.add('descripcion');
  spanDescripcion.textContent = descripcion;

  const divAcciones = document.createElement('div');
  divAcciones.classList.add('acciones');
  
  const botonBorrar = crearBotonAccion(SELECTORS.borrarTarea, id, 'eliminar');
  const botonCompletar = crearBotonAccion(SELECTORS.completarTarea, id, completada ? 'desmarcar' : 'marcar');

  divAcciones.appendChild(botonBorrar);
  divAcciones.appendChild(botonCompletar);

  tarea.appendChild(spanDescripcion);
  tarea.appendChild(divAcciones);

  return tarea;
}

function crearBotonAccion(className, tareaIndex, texto) {
  const boton = document.createElement('button');
  boton.classList.add(className);
  boton.dataset.tareaId = tareaIndex;
  boton.textContent = texto;
  return boton;
}

function mostrarTareas(contenedor, tareas) {
  contenedor.innerHTML = '';
  tareas.forEach((tarea, index) => {
    const tareaElement = crearTarea(index, tarea.descripcion, tarea.completada);
    contenedor.appendChild(tareaElement);
  });
}

function completarTarea(id) {
  tareas[id].completada = !tareas[id].completada;
  actualizarTareas(tareas);
  mostrarTareas(listaTareas, tareas);
}

function borrarTarea(id) {
  tareas.splice(id, 1);
  actualizarTareas(tareas);
  mostrarTareas(listaTareas, tareas);
}