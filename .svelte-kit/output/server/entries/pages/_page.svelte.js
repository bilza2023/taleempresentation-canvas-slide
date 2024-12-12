import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-gray-800 text-white min-h-screen p-8" data-svelte-h="svelte-pr72fx"><h1 class="text-3xl font-bold mb-8 border-b-2 border-white pb-2">Taleem Presentation</h1> <ul class="space-y-6 text-lg font-semibold"><li><a href="/canvasPlayer" class="block border-b border-white pb-2 text-green-600">canvasPlayer</a></li> <li><a href="/canvasEditor" class="block border-b border-white pb-2 text-orange-700">canvasEditor:</a></li> <li><a href="/eqPlayer" class="block border-b border-white pb-2 text-orange-700">EqPlayer: </a></li> <li><a href="/eqEditor" class="block border-b border-white pb-2 text-orange-700">EqEditor: </a></li> </ul> </div>`;
});
export {
  Page as default
};
