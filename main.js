import { renderizarTareas } from "./modulos/dom.js";
import Tareas from "./modulos/tareas.js";

const SELECTORS = {
  inputTarea: 'texto-tarea',
  botonAgregarTarea: 'boton-agregar-tarea',
  listaTareas: 'lista-tareas',
};

const inputTarea = document.getElementById(SELECTORS.inputTarea);
const botonAgregarTarea = document.getElementById(SELECTORS.botonAgregarTarea);
const listaTareas = document.getElementById(SELECTORS.listaTareas);

const tareas = new Tareas('miss-tareas');

function mostrarTareas() {
  renderizarTareas(listaTareas, tareas)
}

tareas.addEventListener('agregar', mostrarTareas)

tareas.addEventListener('completar', mostrarTareas)

tareas.addEventListener('borrar', mostrarTareas)

if (tareas.obtenerTodas().length > 0) {
  mostrarTareas();
}

botonAgregarTarea.addEventListener('click', () => {
  const descripcion = inputTarea.value.trim();
  if (!descripcion) {
    return;
  }
  tareas.agregar({ descripcion, completada: false });
  inputTarea.value = '';
  inputTarea.focus();
});