import { c as create_ssr_component, b as add_attribute, e as escape } from "./ssr.js";
const OpenFileButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { importAccept = ".js" } = $$props;
  let { title = "OpenFile" } = $$props;
  let { style = "text-[10px] ml-2 cursor-pointer text-white" } = $$props;
  let { callback = () => {
  } } = $$props;
  let { regexReplaceFilter = /export\s+const\s+\w+\s*=\s*/ } = $$props;
  if ($$props.importAccept === void 0 && $$bindings.importAccept && importAccept !== void 0) $$bindings.importAccept(importAccept);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.callback === void 0 && $$bindings.callback && callback !== void 0) $$bindings.callback(callback);
  if ($$props.regexReplaceFilter === void 0 && $$bindings.regexReplaceFilter && regexReplaceFilter !== void 0) $$bindings.regexReplaceFilter(regexReplaceFilter);
  return ` <label${add_attribute("class", style, 0)}>${escape(title)} 📂
    <input type="file"${add_attribute("accept", importAccept, 0)} class="hidden"></label>`;
});
export {
  OpenFileButton as O
};
