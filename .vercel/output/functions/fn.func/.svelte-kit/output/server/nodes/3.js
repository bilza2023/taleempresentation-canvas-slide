

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/canvasEditor/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CkQf_b13.js","_app/immutable/chunks/scheduler.Dc8tTJBu.js","_app/immutable/chunks/index.CUkUO2Ml.js","_app/immutable/chunks/slideObject.sSBwR6TN.js","_app/immutable/chunks/entry.CHzrKy0Y.js","_app/immutable/chunks/OpenFileButton.DpYLMTcY.js","_app/immutable/chunks/SaveFileButton.C-aOrtSI.js"];
export const stylesheets = ["_app/immutable/assets/slideObject.BIRMvm46.css"];
export const fonts = [];
