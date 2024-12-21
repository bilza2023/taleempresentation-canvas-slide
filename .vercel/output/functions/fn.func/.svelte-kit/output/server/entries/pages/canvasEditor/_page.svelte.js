import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { S as SlideObject } from "../../../chunks/slideObject.js";
import "howler";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${SlideObject ? `${``} <div class="w-full bg-gray-700 text-white py-2 px-1 min-h-screen ">${``}</div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
