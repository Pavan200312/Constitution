// PROMPT_ID: F1.1-B1-events-bus-v1
// DATE_ISO: 2025-09-29

export type Handler = (data: any) => void;

const bus = new Map<string, Set<Handler>>();

export function on(evt: string, h: Handler): void {
    if (!bus.has(evt)) {
        bus.set(evt, new Set());
    }
    bus.get(evt)!.add(h);
}

export function off(evt: string, h: Handler): void {
    const handlers = bus.get(evt);
    if (handlers) {
        handlers.delete(h);
        if (handlers.size === 0) {
            bus.delete(evt);
        }
    }
}

export function emit(evt: string, data?: any): void {
    const handlers = bus.get(evt);
    if (handlers) {
        for (const h of handlers) {
            try {
                h(data);
            } catch {
                // swallow errors silently
            }
        }
    }
}
