"use strict";
// PROMPT_ID: F1.1-B1-events-bus-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.emit = exports.off = exports.on = void 0;
const bus = new Map();
function on(evt, h) {
    if (!bus.has(evt)) {
        bus.set(evt, new Set());
    }
    bus.get(evt).add(h);
}
exports.on = on;
function off(evt, h) {
    const handlers = bus.get(evt);
    if (handlers) {
        handlers.delete(h);
        if (handlers.size === 0) {
            bus.delete(evt);
        }
    }
}
exports.off = off;
function emit(evt, data) {
    const handlers = bus.get(evt);
    if (handlers) {
        for (const h of handlers) {
            try {
                h(data);
            }
            catch {
                // swallow errors silently
            }
        }
    }
}
exports.emit = emit;
//# sourceMappingURL=events.js.map