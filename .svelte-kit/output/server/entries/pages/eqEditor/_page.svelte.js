import { c as create_ssr_component, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/people.js";
import "katex";
/* empty css                                                    */
const StartStopToolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slide } = $$props;
  let { currentTime } = $$props;
  let { start } = $$props;
  let { stop } = $$props;
  if ($$props.slide === void 0 && $$bindings.slide && slide !== void 0) $$bindings.slide(slide);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0) $$bindings.start(start);
  if ($$props.stop === void 0 && $$bindings.stop && stop !== void 0) $$bindings.stop(stop);
  return `<div class="flex p-0 m-0 bg-gray-900 text-white gap-2 py-1"><button class="text-[10px] rounded-md bg-stone-400 px-2" data-svelte-h="svelte-nrwq9o">Start</button> <button class="text-[10px] rounded-md bg-stone-400 px-2" data-svelte-h="svelte-vnrg3a">Stop</button> <button class="text-[10px] rounded-md bg-stone-400 px-2" data-svelte-h="svelte-1g8rk1w">Log</button> <div class="text-xs">Current Time : ${escape(currentTime)}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTime = 0;
  let slide;
  let interval;
  function stop() {
    currentTime = 0;
    clearInterval(interval);
  }
  function start() {
    interval = setInterval(
      () => {
        currentTime += 1;
      },
      1e3
    );
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(StartStopToolbar, "StartStopToolbar").$$render($$result, { currentTime, slide, start, stop }, {}, {})} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
