import EventEmitter from "./eventHandler.js";

const EVENTS = {
  AGREGAR: "agregar",
  BORRAR: "borrar",
  COMPLETAR: "completar",
};

class Tareas {
  constructor(key) {
    this.tareasKey = key;
    this.tareas = this.obtenerTareasDelLocalStorage() ?? [];
    this.eventEmitter = new EventEmitter();
  }

  obtenerTodas() {
    return this.tareas;
  }

  agregar(tarea) {
    this.tareas.push(tarea);
    this.eventEmitter.emit(EVENTS.AGREGAR, tarea);
    this.actualizarTareasEnLocalStorage();
  }

  completar(indice) {
    if (indice >= 0 && indice < this.tareas.length) {
      this.tareas[indice].completada = !this.tareas[indice].completada;
      this.eventEmitter.emit(EVENTS.COMPLETAR,this.tareas[indice]);
      this.actualizarTareasEnLocalStorage();
    }
  }

  borrar(indice) {
    if (indice >= 0 && indice < this.tareas.length) {
      const tareaEliminada = this.tareas.splice(indice, 1)[0];
      this.eventEmitter.emit(EVENTS.BORRAR,tareaEliminada);
      this.actualizarTareasEnLocalStorage();
    }
  }

  obtenerTareasDelLocalStorage() {
    const tareasString = localStorage.getItem(this.tareasKey);
    return JSON.parse(tareasString);
  }

  actualizarTareasEnLocalStorage() {
    const tareasString = JSON.stringify(this.tareas);
    localStorage.setItem(this.tareasKey, tareasString);
  }

  addEventListener(eventType, eventListener) {
    return this.eventEmitter.on(eventType, eventListener);
  }

  removeEventListener(eventType, eventListener) {
    this.eventEmitter.off(eventType, eventListener);
  }
}

export default Tareas;