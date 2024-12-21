import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { S as SlideObject } from "../../../chunks/slideObject.js";
import "howler";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  SlideObject.EqsEditor;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
