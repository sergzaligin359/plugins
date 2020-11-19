export class Emitter {

    constructor() {
      this.listeners = {};
    }
  
    emit(event, ...args) {
      if (!Array.isArray(this.listeners[event])) return false;
      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
      return true;
    }
  
    subscribe(event, fn) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(fn);
  
      return () => {
        this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
      };
    }

}

// const emitter = new Emitter;

// export const $emit = (event, ...args) => {
//     emitter.emit(event, ...args);
// }

// export const $on = (event, fn) => {
//     emitter.subscribe(event, fn);
// }