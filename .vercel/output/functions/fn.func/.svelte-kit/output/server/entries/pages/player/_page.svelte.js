import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { T as ToolbarDiv } from "../../../chunks/slideObject.js";
import "howler";
import { P as Player } from "../../../chunks/Player.js";
import "katex";
import { O as OpenFileButton } from "../../../chunks/OpenFileButton.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slides = [];
  function callback(incomming) {
    if (typeof incomming !== "object") {
      alert("The imported slide is not an object");
    }
    slides = [...incomming];
  }
  return `${validate_component(ToolbarDiv, "ToolbarDiv").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(OpenFileButton, "OpenFileButton").$$render(
        $$result,
        {
          callback,
          importAccept: ".js",
          regexReplaceFilter: /export\s+const\s+\w+\s*=\s*/
        },
        {},
        {}
      )}`;
    }
  })} <div class="bg-gray-800 text-white w-full">${slides ? `<div class="flex justify-center w-full border-white border-2 text-center rounded-lg ">${validate_component(Player, "Player").$$render(
    $$result,
    {
      isBlob: false,
      slides,
      audioData: "/music1.opus"
    },
    {},
    {}
  )}</div>` : ``}</div>`;
});
export {
  Page as default
};
