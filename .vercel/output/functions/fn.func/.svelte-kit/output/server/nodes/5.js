

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/editor/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BGzaPLSE.js","_app/immutable/chunks/scheduler.Dc8tTJBu.js","_app/immutable/chunks/index.CUkUO2Ml.js","_app/immutable/chunks/slideObject.sSBwR6TN.js","_app/immutable/chunks/entry.CHzrKy0Y.js","_app/immutable/chunks/index.BKqyFUtU.js","_app/immutable/chunks/OpenFileButton.DpYLMTcY.js","_app/immutable/chunks/SaveFileButton.C-aOrtSI.js"];
export const stylesheets = ["_app/immutable/assets/slideObject.BIRMvm46.css"];
export const fonts = [];