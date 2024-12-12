

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CvO4rvrr.js","_app/immutable/chunks/scheduler.TTby4YTt.js","_app/immutable/chunks/index.CBa6vb3G.js"];
export const stylesheets = [];
export const fonts = [];
