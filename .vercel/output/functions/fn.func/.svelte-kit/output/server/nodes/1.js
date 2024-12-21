

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.p5fmt7Kf.js","_app/immutable/chunks/scheduler.Dc8tTJBu.js","_app/immutable/chunks/index.CUkUO2Ml.js","_app/immutable/chunks/entry.CHzrKy0Y.js"];
export const stylesheets = [];
export const fonts = [];
