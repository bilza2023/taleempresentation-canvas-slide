

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.TMKknGc1.js","_app/immutable/chunks/scheduler.TTby4YTt.js","_app/immutable/chunks/index.CBa6vb3G.js"];
export const stylesheets = [];
export const fonts = [];
