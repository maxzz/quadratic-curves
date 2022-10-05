var v=Object.defineProperty;var g=(t,e,s)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var h=(t,e,s)=>(g(t,typeof e!="symbol"?e+"":e,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();const d={curve:{width:6,color:"hsla(216, 91%, 50%, 0.95)"},circles:{width:1,color:"#000",fill:"hsla(60, 93%, 50%, .35)"},ctrlLine:{width:1,color:""},point:{radius:15,width:5,color:"hsla(205, 98%, 50%, 0.95)",fill:"rgba(200, 0, 200, .9)",startAngle:0,endAngle:2*Math.PI},cpoint:{radius:10,width:2,color:"hsla(205, 98%, 50%, 0.95)",fill:"rgba(200, 0, 200, .9)",startAngle:0,endAngle:2*Math.PI}};function p(t){return`hsla(${t}, 100%, 50%, 0.95)`}function x(t){const e=t.points;return`ctx.beginPath();
ctx.moveTo(${e.p1.x}, ${e.p1.y});
`+(e.cp2?`ctx.bezierCurveTo(${e.cp1.x}, ${e.cp1.y}, ${e.cp2.x}, ${e.cp2.y}, ${e.p2.x}, ${e.p2.y});
`:`ctx.quadraticCurveTo(${e.cp1.x}, ${e.cp1.y}, ${e.p2.x}, ${e.p2.y});
`)+`ctx.stroke();
`}function b(t){const e=t.points;return`{ p1: {x: ${e.p1.x}, y: ${e.p1.y}}, p2: {x: ${e.p2.x}, y: ${e.p2.y}}, `+(e.cp2?`cp1: {x: ${e.cp1.x}, y: ${e.cp1.y}}, cp2: {x: ${e.cp2.x}, y: ${e.cp2.y}}`:`cp1: {x: ${e.cp1.x}, y: ${e.cp1.y}}`)+" }"}function w(t){return JSON.stringify(t)}function $(t){let e=`canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
ctx.lineWidth = ${d.curve.width};
`;t.forEach(n=>e+=`
${x(n)}`);let s=`
const points = [`;return t.forEach(n=>s+=`
    ${b(n)},`),e+=`${s}
];`,e+=`
// prev = '${w(t)}';

`,e}var m;(t=>{function e(n,r){let i={points:{p1:{x:39,y:18},p2:{x:49,y:282},cp1:{x:9,y:116},cp2:{x:15,y:195}},color:p(10)},c=JSON.parse(JSON.stringify(i));return n&&delete c.points.cp2,Object.values(c.points).forEach(o=>o.x=o.x+r*80),c.color=p(r*40),c}t.initLine=e;function s(n,r){const i=r.points;n.lineWidth=d.curve.width,n.strokeStyle=r.color||"",n.beginPath(),n.moveTo(i.p1.x,i.p1.y),i.cp2?n.bezierCurveTo(i.cp1.x,i.cp1.y,i.cp2.x,i.cp2.y,i.p2.x,i.p2.y):n.quadraticCurveTo(i.cp1.x,i.cp1.y,i.p2.x,i.p2.y),n.stroke(),n.setLineDash([2,2]),n.lineWidth=d.ctrlLine.width,n.strokeStyle=d.ctrlLine.color,n.beginPath(),n.moveTo(i.p1.x,i.p1.y),n.lineTo(i.cp1.x,i.cp1.y),i.cp2?(n.moveTo(i.p2.x,i.p2.y),n.lineTo(i.cp2.x,i.cp2.y)):n.lineTo(i.p2.x,i.p2.y),n.stroke(),n.setLineDash([]);for(const[c,o]of Object.entries(r.points)){let l=c==="cp1"||c==="cp2";n.lineWidth=l?5:d.circles.width,n.strokeStyle="#00000040",n.fillStyle=l?d.circles.fill:r.color||"";let a=l?d.cpoint:d.point;n.beginPath(),n.arc(o.x,o.y,a.radius,a.startAngle,a.endAngle,!0),n.fill(),n.stroke()}}t.drawLine=s})(m||(m={}));function k(t,e){const s=Math.pow(d.point.radius,2);for(const[n,r]of Object.entries(t.points)){let i=r.x-e.x,c=r.y-e.y;if(i*i+c*c<s)return{line:t,member:n}}}function E(t,e){let s=[];function n(o){s=[];let l=c(o);for(var a=0;a<t.lines.length;a++){var f=t.lines[a];let u=k(f,l);if(u&&(s.push({line:u.line,member:u.member,pt:l}),!t.checkDragGroup.checked))break}s.length&&setTimeout(()=>t.canvas.classList.add("cursor-move"),0)}function r(o){if(s.length){let l=c(o);s.forEach(a=>{var u;const f=a.member&&((u=a.line)==null?void 0:u.points[a.member]);f&&a.pt&&(f.x+=l.x-a.pt.x,f.y+=l.y-a.pt.y,a.pt=l)}),e(t)}}function i(o){s=[],t.canvas.classList.remove("cursor-move"),e(t)}function c(o){return{x:o.pageX-t.canvas.offsetLeft,y:o.pageY-t.canvas.offsetTop}}return{dragStart:n,dragging:r,dragDone:i}}class A{constructor(e){h(this,"el");h(this,"summary");h(this,"content");h(this,"animation");h(this,"isClosing");h(this,"isExpanding");this.el=e,this.summary=e.querySelector("summary"),this.content=e.querySelector(".content"),this.animation=null,this.isClosing=!1,this.isExpanding=!1,this.summary.addEventListener("click",s=>this.onClick(s))}onClick(e){e.preventDefault(),this.el.style.overflow="hidden",this.isClosing||!this.el.open?this.open():(this.isExpanding||this.el.open)&&this.shrink()}expand(){this.isExpanding=!0;const e=this.el.offsetHeight,s=this.summary.offsetHeight+this.content.offsetHeight;this.startAmimation(e,s),this.animation.onfinish=()=>this.onAnimationFinish(!0),this.animation.oncancel=()=>this.isExpanding=!1}startAmimation(e,s){this.animation&&this.animation.cancel(),this.animation=this.el.animate({height:[`${e}px`,`${s}px`]},{duration:150,easing:"ease-out"})}onAnimationFinish(e){this.el.open=e,this.animation=null,this.isClosing=!1,this.isExpanding=!1,this.el.style.height=this.el.style.overflow=""}shrink(){this.isClosing=!0;const e=this.el.offsetHeight,s=this.summary.offsetHeight;this.startAmimation(e,s),this.animation.onfinish=()=>this.onAnimationFinish(!1),this.animation.oncancel=()=>this.isClosing=!1}open(){this.el.style.height=`${this.el.offsetHeight}px`,this.el.open=!0,window.requestAnimationFrame(()=>this.expand())}}const L=`<div class="min-h-screen overflow-hidden p-4 text-xs bg-slate-900 text-slate-400 flex flex-col items-center">\r
    <div class="flex-1 w-full max-w-4xl flex flex-col">\r
        <div class="">Quadratic curves</div>\r
\r
        <div class="w-full self-center">\r
            <canvas class="w-full h-full aspect-square" id='canvas'></canvas>\r
        </div>\r
\r
        <div class="py-4">\r
            <label class="flex items-center space-x-1">\r
                <input class="form-checkbox text-slate-700 rounded" type="checkbox" id="drag-group">\r
                <div>Drag overlapping points as a group</div>\r
            </label>\r
        </div>\r
\r
        <div class="overflow-hidden h-60">\r
            <details open class="h-full overflow-auto smallscroll">\r
                <summary class="cursor-pointer">Code</summary>\r
                <div class="">\r
                    <div class="content text-[.65rem] ">\r
                        <div class="px-2 " id="code">code</div>\r
                    </div>\r
                </div>\r
            </details>\r
        </div>\r
    </div>\r
    <footer>\r
        <a class="text-xs text-slate-500 hover:underline" href="https://github.com/maxzz/quadratic-curves" target="_blank">Created by Max Zakharzhevskiy. Source code on Github.</a>\r
    </footer>\r
</div>\r
`;function S(){const t=document.createElement("div");document.body.appendChild(t),t.outerHTML=L;const e=document.getElementById("canvas"),s=e==null?void 0:e.getContext("2d"),n=document.getElementById("code"),r=document.getElementById("drag-group");if(!s||!n||!r){console.log("failed init");return}return{canvas:e,ctx:s,code:n,lines:[],checkDragGroup:r}}function T(t){const{dragStart:e,dragging:s,dragDone:n}=E(t,y);[{name:"mousedown",fn:e},{name:"mousemove",fn:s},{name:"mouseup",fn:n}].forEach(({name:o,fn:l})=>t.canvas.addEventListener(o,l));function i(o){for(const l of o)l.contentBoxSize&&(t.canvas.width=l.contentRect.width,t.canvas.height=l.contentRect.height,y(t))}new ResizeObserver(i).observe(t.canvas),document.querySelectorAll("details").forEach(o=>new A(o))}function H(t,e,s,n){for(let r=0;r<e;r++)t.lines.push(m.initLine(s,r))}function O(t){T(t),t.checkDragGroup.checked=!0,t.ctx.lineCap="round",t.ctx.lineJoin="round",H(t,7,!1)}function y(t){t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height);let e=t.ctx.createLinearGradient(0,0,t.canvas.width,t.canvas.height);e.addColorStop(0,"tomato"),e.addColorStop(1,"purple"),t.ctx.fillStyle=e,t.ctx.fillRect(0,0,t.canvas.width,t.canvas.height),t.lines.forEach(s=>m.drawLine(t.ctx,s)),t.code.innerText=$(t.lines)}function P(){const t=S();!t||O(t)}P();
