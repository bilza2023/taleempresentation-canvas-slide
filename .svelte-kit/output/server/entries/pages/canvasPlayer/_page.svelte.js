import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "../../../chunks/people.js";
import "katex";
/* empty css                                                    */
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  <div class="h-full w-full bg-gray-800 text-white p-2 m-0">${``}</div>`;
});
export {
  Page as default
};
