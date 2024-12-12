

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/eqEditor/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.Dj-1m3rd.js","_app/immutable/chunks/scheduler.TTby4YTt.js","_app/immutable/chunks/index.CBa6vb3G.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/people.Bwk4B_3_.js","_app/immutable/chunks/EqPanel.svelte_svelte_type_style_lang.DpfjZrEj.js","_app/immutable/chunks/Katex.DlasxhB1.js"];
export const stylesheets = ["_app/immutable/assets/people.C1k6Yo8L.css","_app/immutable/assets/EqPanel.BhBxKCG4.css"];
export const fonts = [];
