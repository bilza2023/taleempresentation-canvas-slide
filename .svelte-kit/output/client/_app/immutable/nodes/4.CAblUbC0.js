import{s as F,e as u,t as k,b as d,k as g,q as C,h as f,f as c,i as $,r as _,x as P,y as A,n as y,z as D,j as T,l as q}from"../chunks/scheduler.TTby4YTt.js";import{S,i as I,t as m,a as h,c as J,b,d as v,m as w,e as E,g as L}from"../chunks/index.CBa6vb3G.js";import{C as V,l as z}from"../chunks/loadAssets.R_OGbWW8.js";import{S as B}from"../chunks/people.Bwk4B_3_.js";import"../chunks/EqPanel.svelte_svelte_type_style_lang.DpfjZrEj.js";function M(i){let s,r,e,a,t,l;return{c(){s=u("div"),r=u("label"),e=k(`Import 📂
      `),a=u("input"),this.h()},l(n){s=d(n,"DIV",{class:!0});var o=g(s);r=d(o,"LABEL",{class:!0});var p=g(r);e=C(p,`Import 📂
      `),a=d(p,"INPUT",{type:!0,accept:!0,class:!0}),p.forEach(f),o.forEach(f),this.h()},h(){c(a,"type","file"),c(a,"accept",".js"),c(a,"class","hidden"),c(r,"class","text-[10px] ml-2 cursor-pointer"),c(s,"class","flex p-0 m-0 bg-gray-900 text-white gap-2 py-1")},m(n,o){$(n,s,o),_(s,r),_(r,e),_(r,a),t||(l=P(a,"change",function(){A(i[0])&&i[0].apply(this,arguments)}),t=!0)},p(n,[o]){i=n},i:y,o:y,d(n){n&&f(s),t=!1,l()}}}function N(i,s,r){let{importFile:e}=s;return i.$$set=a=>{"importFile"in a&&r(0,e=a.importFile)},[e]}class O extends S{constructor(s){super(),I(this,s,N,M,F,{importFile:0})}}function x(i){let s,r,e,a;return s=new O({props:{importFile:i[2]}}),e=new V({props:{items:i[0].items,slideExtra:i[0].slideExtra,assets:i[1]}}),{c(){b(s.$$.fragment),r=T(),b(e.$$.fragment)},l(t){v(s.$$.fragment,t),r=q(t),v(e.$$.fragment,t)},m(t,l){w(s,t,l),$(t,r,l),w(e,t,l),a=!0},p(t,l){const n={};l&1&&(n.items=t[0].items),l&1&&(n.slideExtra=t[0].slideExtra),l&2&&(n.assets=t[1]),e.$set(n)},i(t){a||(m(s.$$.fragment,t),m(e.$$.fragment,t),a=!0)},o(t){h(s.$$.fragment,t),h(e.$$.fragment,t),a=!1},d(t){t&&f(r),E(s,t),E(e,t)}}}function U(i){let s,r,e=i[0]&&i[1]&&x(i);return{c(){s=u("div"),e&&e.c(),this.h()},l(a){s=d(a,"DIV",{class:!0});var t=g(s);e&&e.l(t),t.forEach(f),this.h()},h(){c(s,"class","h-full w-full bg-gray-800 text-white p-2 m-0")},m(a,t){$(a,s,t),e&&e.m(s,null),r=!0},p(a,[t]){a[0]&&a[1]?e?(e.p(a,t),t&3&&m(e,1)):(e=x(a),e.c(),m(e,1),e.m(s,null)):e&&(L(),h(e,1,1,()=>{e=null}),J())},i(a){r||(m(e),r=!0)},o(a){h(e),r=!1},d(a){a&&f(s),e&&e.d()}}}function G(i,s,r){let e=null,a=null;D(async()=>{r(1,a=await z()),r(0,e=B.Canvas.demoSlide())});async function t(l){const n=l.target.files[0];if(n)try{const p=(await n.text()).replace(/export\s+const\s+\w+\s*=\s*/,""),j=new Function(`return ${p}`)();r(0,e=j)}catch(o){console.error("Error loading JS file:",o),alert("Error loading file. Please ensure it is a valid JS file with a slide object.")}}return[e,a,t]}class X extends S{constructor(s){super(),I(this,s,G,U,F,{})}}export{X as component};
