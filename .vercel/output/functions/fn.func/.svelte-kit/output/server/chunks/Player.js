import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import "./client.js";
import { r as registerSlideTypes } from "./slideObject.js";
import "howler";
const PlayerWithSound = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slides } = $$props;
  let { audioData } = $$props;
  let { assets } = $$props;
  let { isBlob = false } = $$props;
  if ($$props.slides === void 0 && $$bindings.slides && slides !== void 0) $$bindings.slides(slides);
  if ($$props.audioData === void 0 && $$bindings.audioData && audioData !== void 0) $$bindings.audioData(audioData);
  if ($$props.assets === void 0 && $$bindings.assets && assets !== void 0) $$bindings.assets(assets);
  if ($$props.isBlob === void 0 && $$bindings.isBlob && isBlob !== void 0) $$bindings.isBlob(isBlob);
  return `${$$result.head += `<!-- HEAD_svelte-1i48p6k_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous"><!-- HEAD_svelte-1i48p6k_END -->`, ""}    <div class="h-full w-full bg-gray-800 text-white">${``}</div>`;
});
const PlayerNs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slides } = $$props;
  let { assets } = $$props;
  if ($$props.slides === void 0 && $$bindings.slides && slides !== void 0) $$bindings.slides(slides);
  if ($$props.assets === void 0 && $$bindings.assets && assets !== void 0) $$bindings.assets(assets);
  return `${$$result.head += `<!-- HEAD_svelte-1i48p6k_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous"><!-- HEAD_svelte-1i48p6k_END -->`, ""}    <div class="h-full w-full bg-gray-800 text-white">${``}</div>`;
});
const Player = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasAudio;
  let assets = null;
  registerSlideTypes();
  let { slides } = $$props;
  let { audioData = void 0 } = $$props;
  let { isBlob = false } = $$props;
  if ($$props.slides === void 0 && $$bindings.slides && slides !== void 0) $$bindings.slides(slides);
  if ($$props.audioData === void 0 && $$bindings.audioData && audioData !== void 0) $$bindings.audioData(audioData);
  if ($$props.isBlob === void 0 && $$bindings.isBlob && isBlob !== void 0) $$bindings.isBlob(isBlob);
  hasAudio = audioData !== void 0;
  return `${hasAudio && slides && assets ? `${validate_component(PlayerWithSound, "PlayerWithSound").$$render($$result, { slides, audioData, isBlob, assets }, {}, {})}` : `${slides ? `${validate_component(PlayerNs, "PlayerNs").$$render($$result, { slides, assets }, {}, {})}` : ``}`}`;
});
export {
  Player as P
};
