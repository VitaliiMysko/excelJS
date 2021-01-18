export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // get listener
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }

        this.listeners[event].forEach(listener => {
            listener(...args)
        })


        return true
    }

    // add listener
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)

        return () =>
            this.listeners[event] =
                this.listeners[event].filter(emit => emit !== fn)
    }
}
