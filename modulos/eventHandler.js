class EventEmitter {
  constructor() {
    this.eventListeners = new Map();
  }

  on(eventType, eventListener) {
    if (this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType).push(eventListener);
    } else {
      this.eventListeners.set(eventType, [eventListener]);
    }
    return () => this.off(eventType, eventListener);
  }

  off(eventType, eventListener) {
    if (this.eventListeners.has(eventType)) {
      const listeners = this.eventListeners.get(eventType).filter((e) => e !== eventListener);
      if (listeners.length > 0) {
        this.eventListeners.set(eventType, listeners);
      } else {
        this.eventListeners.delete(eventType);
      }
    }
  }

  emit(eventType, eventData) {
    if (this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType).forEach((eventListener) => {
        eventListener(eventData);
      });
    }
  }
}

export default EventEmitter;