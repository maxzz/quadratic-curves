var W=Object.defineProperty;var Q=(t,e,n)=>e in t?W(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var v=(t,e,n)=>(Q(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function Y(){const e=['[{"p1":{"x":126,"y":174},"p2":{"x":121,"y":429},"cp1":{"x":55,"y":246},"cp2":{"x":80,"y":324},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":177,"y":244},"p2":{"x":122,"y":429},"cp1":{"x":136,"y":287},"cp2":{"x":125,"y":329},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":127,"y":174},"p2":{"x":179,"y":243},"cp1":{"x":155,"y":183},"cp2":{"x":167,"y":209},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":164,"y":138},"p2":{"x":223,"y":229},"cp1":{"x":195,"y":145},"cp2":{"x":216,"y":177},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":166,"y":136},"p2":{"x":261,"y":82},"cp1":{"x":191,"y":98},"cp2":{"x":230,"y":91},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":318,"y":174},"p2":{"x":225,"y":230},"cp1":{"x":293,"y":196},"cp2":{"x":266,"y":215},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":262,"y":83},"p2":{"x":319,"y":175},"cp1":{"x":312,"y":98},"cp2":{"x":320,"y":143},"color":"hsla(240, 100%, 50%, 0.95)"}]','[{"p1":{"x":133,"y":33},"p2":{"x":32,"y":160},"cp1":{"x":78,"y":51},"cp2":{"x":52,"y":81},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":184,"y":89},"p2":{"x":30,"y":162},"cp1":{"x":119,"y":89},"cp2":{"x":79,"y":119},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":134,"y":33},"p2":{"x":189,"y":90},"cp1":{"x":152,"y":54},"cp2":{"x":165,"y":77},"color":"hsla(80, 100%, 50%, 0.95)"}]','[{"p1":{"x":146,"y":92},"p2":{"x":49,"y":282},"cp1":{"x":46,"y":92},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":147,"y":92},"p2":{"x":196,"y":138},"cp1":{"x":177,"y":102},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":197,"y":139},"p2":{"x":48,"y":285},"cp1":{"x":90,"y":143},"color":"hsla(80, 100%, 50%, 0.95)"}]','[{"p1":{"x":17,"y":281},"p2":{"x":51,"y":53},"cp1":{"x":9,"y":116},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":51,"y":53},"p2":{"x":112,"y":100},"cp1":{"x":105,"y":72},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":111,"y":100},"p2":{"x":16,"y":282},"cp1":{"x":56,"y":161},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":97,"y":23},"p2":{"x":197,"y":18},"cp1":{"x":154,"y":14},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":198,"y":18},"p2":{"x":234,"y":59},"cp1":{"x":238,"y":28},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":234,"y":59},"p2":{"x":157,"y":74},"cp1":{"x":218,"y":77},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":158,"y":75},"p2":{"x":99,"y":23},"cp1":{"x":180,"y":54},"color":"hsla(240, 100%, 50%, 0.95)"}]','[{"p1":{"x":36,"y":279},"p2":{"x":107,"y":84},"cp1":{"x":39,"y":129},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":107,"y":84},"p2":{"x":157,"y":133},"cp1":{"x":139,"y":99},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":157,"y":133},"p2":{"x":36,"y":280},"cp1":{"x":83,"y":173},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":144,"y":54},"p2":{"x":211,"y":16},"cp1":{"x":174,"y":23},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":211,"y":14},"p2":{"x":267,"y":78},"cp1":{"x":249,"y":32},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":266,"y":76},"p2":{"x":197,"y":105},"cp1":{"x":228,"y":81},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":198,"y":106},"p2":{"x":143,"y":54},"cp1":{"x":186,"y":65},"color":"hsla(240, 100%, 50%, 0.95)"}]'].map(r=>JSON.parse(r).map(i=>{const{p1:l,p2:a,cp1:h,cp2:u,color:f}=i;return{points:{p1:l,p2:a,cp1:h,...u&&{cp2:u}},color:f}}));return['[{"points":{"p1":{"x":36,"y":279},"p2":{"x":107,"y":84},"cp1":{"x":330,"y":392}},"color":"hsla(0, 100%, 50%, 0.95)"},{"points":{"p1":{"x":107,"y":84},"p2":{"x":157,"y":133},"cp1":{"x":139,"y":99}},"color":"hsla(40, 100%, 50%, 0.95)"},{"points":{"p1":{"x":157,"y":133},"p2":{"x":36,"y":280},"cp1":{"x":403,"y":433}},"color":"hsla(80, 100%, 50%, 0.95)"},{"points":{"p1":{"x":144,"y":54},"p2":{"x":212,"y":20},"cp1":{"x":51,"y":21}},"color":"hsla(120, 100%, 50%, 0.95)"},{"points":{"p1":{"x":212,"y":18},"p2":{"x":268,"y":102},"cp1":{"x":488,"y":32}},"color":"hsla(160, 100%, 50%, 0.95)"},{"points":{"p1":{"x":267,"y":100},"p2":{"x":197,"y":105},"cp1":{"x":313,"y":267}},"color":"hsla(200, 100%, 50%, 0.95)"},{"points":{"p1":{"x":198,"y":106},"p2":{"x":143,"y":54},"cp1":{"x":56,"y":333}},"color":"hsla(240, 100%, 50%, 0.95)"}]','[{"points":{"p1":{"x":589,"y":37},"p2":{"x":32,"y":160},"cp1":{"x":51,"y":31},"cp2":{"x":602,"y":178}},"color":"hsla(0, 100%, 50%, 0.95)"},{"points":{"p1":{"x":412,"y":394},"p2":{"x":30,"y":162},"cp1":{"x":313,"y":140},"cp2":{"x":30,"y":378}},"color":"hsla(40, 100%, 50%, 0.95)"},{"points":{"p1":{"x":590,"y":37},"p2":{"x":417,"y":395},"cp1":{"x":325,"y":35},"cp2":{"x":599,"y":402}},"color":"hsla(80, 100%, 50%, 0.95)"}]'].forEach(r=>e.push(JSON.parse(r))),e}const m={curve:{width:6,color:"hsla(216, 91%, 50%, 0.95)"},circles:{width:1,color:"#000",fill:"hsla(60, 93%, 50%, .35)"},ctrlLine:{width:1,color:""},point:{radius:15,width:5,color:"hsla(205, 98%, 50%, 0.95)",fill:"rgba(200, 0, 200, .9)",startAngle:0,endAngle:2*Math.PI},cpoint:{radius:10,width:2,color:"hsla(205, 98%, 50%, 0.95)",fill:"rgba(200, 0, 200, .9)",startAngle:0,endAngle:2*Math.PI}};function D(t){return`hsla(${t}, 100%, 50%, 0.95)`}function I(t){const e=[[t.p1.x,t.p1.y],[t.p2.x,t.p2.y],[t.cp1.x,t.cp1.y]];return t.cp2&&e.push([t.cp2.x,t.cp2.y]),e}var H={exports:{}},C={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},B={exports:{}},Z=function(e){return!e||typeof e=="string"?!1:e instanceof Array||Array.isArray(e)||e.length>=0&&(e.splice instanceof Function||Object.getOwnPropertyDescriptor(e,e.length-1)&&e.constructor.name!=="String")},X=Z,_=Array.prototype.concat,V=Array.prototype.slice,N=B.exports=function(e){for(var n=[],r=0,s=e.length;r<s;r++){var o=e[r];X(o)?n=_.call(n,V.call(o)):n.push(o)}return n};N.wrap=function(t){return function(){return t(N(arguments))}};var M=C,A=B.exports,R=Object.hasOwnProperty,J=Object.create(null);for(var z in M)R.call(M,z)&&(J[M[z]]=z);var x=H.exports={to:{},get:{}};x.get=function(t){var e=t.substring(0,3).toLowerCase(),n,r;switch(e){case"hsl":n=x.get.hsl(t),r="hsl";break;case"hwb":n=x.get.hwb(t),r="hwb";break;default:n=x.get.rgb(t),r="rgb";break}return n?{model:r,value:n}:null};x.get.rgb=function(t){if(!t)return null;var e=/^#([a-f0-9]{3,4})$/i,n=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,r=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,s=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,o=/^(\w+)$/,i=[0,0,0,1],l,a,h;if(l=t.match(n)){for(h=l[2],l=l[1],a=0;a<3;a++){var u=a*2;i[a]=parseInt(l.slice(u,u+2),16)}h&&(i[3]=parseInt(h,16)/255)}else if(l=t.match(e)){for(l=l[1],h=l[3],a=0;a<3;a++)i[a]=parseInt(l[a]+l[a],16);h&&(i[3]=parseInt(h+h,16)/255)}else if(l=t.match(r)){for(a=0;a<3;a++)i[a]=parseInt(l[a+1],0);l[4]&&(l[5]?i[3]=parseFloat(l[4])*.01:i[3]=parseFloat(l[4]))}else if(l=t.match(s)){for(a=0;a<3;a++)i[a]=Math.round(parseFloat(l[a+1])*2.55);l[4]&&(l[5]?i[3]=parseFloat(l[4])*.01:i[3]=parseFloat(l[4]))}else return(l=t.match(o))?l[1]==="transparent"?[0,0,0,0]:R.call(M,l[1])?(i=M[l[1]],i[3]=1,i):null:null;for(a=0;a<3;a++)i[a]=b(i[a],0,255);return i[3]=b(i[3],0,1),i};x.get.hsl=function(t){if(!t)return null;var e=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,n=t.match(e);if(n){var r=parseFloat(n[4]),s=(parseFloat(n[1])%360+360)%360,o=b(parseFloat(n[2]),0,100),i=b(parseFloat(n[3]),0,100),l=b(isNaN(r)?1:r,0,1);return[s,o,i,l]}return null};x.get.hwb=function(t){if(!t)return null;var e=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,n=t.match(e);if(n){var r=parseFloat(n[4]),s=(parseFloat(n[1])%360+360)%360,o=b(parseFloat(n[2]),0,100),i=b(parseFloat(n[3]),0,100),l=b(isNaN(r)?1:r,0,1);return[s,o,i,l]}return null};x.to.hex=function(){var t=A(arguments);return"#"+F(t[0])+F(t[1])+F(t[2])+(t[3]<1?F(Math.round(t[3]*255)):"")};x.to.rgb=function(){var t=A(arguments);return t.length<4||t[3]===1?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"};x.to.rgb.percent=function(){var t=A(arguments),e=Math.round(t[0]/255*100),n=Math.round(t[1]/255*100),r=Math.round(t[2]/255*100);return t.length<4||t[3]===1?"rgb("+e+"%, "+n+"%, "+r+"%)":"rgba("+e+"%, "+n+"%, "+r+"%, "+t[3]+")"};x.to.hsl=function(){var t=A(arguments);return t.length<4||t[3]===1?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"};x.to.hwb=function(){var t=A(arguments),e="";return t.length>=4&&t[3]!==1&&(e=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+e+")"};x.to.keyword=function(t){return J[t.slice(0,3)]};function b(t,e,n){return Math.min(Math.max(e,t),n)}function F(t){var e=Math.round(t).toString(16).toUpperCase();return e.length<2?"0"+e:e}const $=C,j={};for(const t of Object.keys($))j[$[t]]=t;const c={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};var G=c;for(const t of Object.keys(c)){if(!("channels"in c[t]))throw new Error("missing channels property: "+t);if(!("labels"in c[t]))throw new Error("missing channel labels property: "+t);if(c[t].labels.length!==c[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:n}=c[t];delete c[t].channels,delete c[t].labels,Object.defineProperty(c[t],"channels",{value:e}),Object.defineProperty(c[t],"labels",{value:n})}c.rgb.hsl=function(t){const e=t[0]/255,n=t[1]/255,r=t[2]/255,s=Math.min(e,n,r),o=Math.max(e,n,r),i=o-s;let l,a;o===s?l=0:e===o?l=(n-r)/i:n===o?l=2+(r-e)/i:r===o&&(l=4+(e-n)/i),l=Math.min(l*60,360),l<0&&(l+=360);const h=(s+o)/2;return o===s?a=0:h<=.5?a=i/(o+s):a=i/(2-o-s),[l,a*100,h*100]};c.rgb.hsv=function(t){let e,n,r,s,o;const i=t[0]/255,l=t[1]/255,a=t[2]/255,h=Math.max(i,l,a),u=h-Math.min(i,l,a),f=function(K){return(h-K)/6/u+1/2};return u===0?(s=0,o=0):(o=u/h,e=f(i),n=f(l),r=f(a),i===h?s=r-n:l===h?s=1/3+e-r:a===h&&(s=2/3+n-e),s<0?s+=1:s>1&&(s-=1)),[s*360,o*100,h*100]};c.rgb.hwb=function(t){const e=t[0],n=t[1];let r=t[2];const s=c.rgb.hsl(t)[0],o=1/255*Math.min(e,Math.min(n,r));return r=1-1/255*Math.max(e,Math.max(n,r)),[s,o*100,r*100]};c.rgb.cmyk=function(t){const e=t[0]/255,n=t[1]/255,r=t[2]/255,s=Math.min(1-e,1-n,1-r),o=(1-e-s)/(1-s)||0,i=(1-n-s)/(1-s)||0,l=(1-r-s)/(1-s)||0;return[o*100,i*100,l*100,s*100]};function tt(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}c.rgb.keyword=function(t){const e=j[t];if(e)return e;let n=1/0,r;for(const s of Object.keys($)){const o=$[s],i=tt(t,o);i<n&&(n=i,r=s)}return r};c.keyword.rgb=function(t){return $[t]};c.rgb.xyz=function(t){let e=t[0]/255,n=t[1]/255,r=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;const s=e*.4124+n*.3576+r*.1805,o=e*.2126+n*.7152+r*.0722,i=e*.0193+n*.1192+r*.9505;return[s*100,o*100,i*100]};c.rgb.lab=function(t){const e=c.rgb.xyz(t);let n=e[0],r=e[1],s=e[2];n/=95.047,r/=100,s/=108.883,n=n>.008856?n**(1/3):7.787*n+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,s=s>.008856?s**(1/3):7.787*s+16/116;const o=116*r-16,i=500*(n-r),l=200*(r-s);return[o,i,l]};c.hsl.rgb=function(t){const e=t[0]/360,n=t[1]/100,r=t[2]/100;let s,o,i;if(n===0)return i=r*255,[i,i,i];r<.5?s=r*(1+n):s=r+n-r*n;const l=2*r-s,a=[0,0,0];for(let h=0;h<3;h++)o=e+1/3*-(h-1),o<0&&o++,o>1&&o--,6*o<1?i=l+(s-l)*6*o:2*o<1?i=s:3*o<2?i=l+(s-l)*(2/3-o)*6:i=l,a[h]=i*255;return a};c.hsl.hsv=function(t){const e=t[0];let n=t[1]/100,r=t[2]/100,s=n;const o=Math.max(r,.01);r*=2,n*=r<=1?r:2-r,s*=o<=1?o:2-o;const i=(r+n)/2,l=r===0?2*s/(o+s):2*n/(r+n);return[e,l*100,i*100]};c.hsv.rgb=function(t){const e=t[0]/60,n=t[1]/100;let r=t[2]/100;const s=Math.floor(e)%6,o=e-Math.floor(e),i=255*r*(1-n),l=255*r*(1-n*o),a=255*r*(1-n*(1-o));switch(r*=255,s){case 0:return[r,a,i];case 1:return[l,r,i];case 2:return[i,r,a];case 3:return[i,l,r];case 4:return[a,i,r];case 5:return[r,i,l]}};c.hsv.hsl=function(t){const e=t[0],n=t[1]/100,r=t[2]/100,s=Math.max(r,.01);let o,i;i=(2-n)*r;const l=(2-n)*s;return o=n*s,o/=l<=1?l:2-l,o=o||0,i/=2,[e,o*100,i*100]};c.hwb.rgb=function(t){const e=t[0]/360;let n=t[1]/100,r=t[2]/100;const s=n+r;let o;s>1&&(n/=s,r/=s);const i=Math.floor(6*e),l=1-r;o=6*e-i,(i&1)!==0&&(o=1-o);const a=n+o*(l-n);let h,u,f;switch(i){default:case 6:case 0:h=l,u=a,f=n;break;case 1:h=a,u=l,f=n;break;case 2:h=n,u=l,f=a;break;case 3:h=n,u=a,f=l;break;case 4:h=a,u=n,f=l;break;case 5:h=l,u=n,f=a;break}return[h*255,u*255,f*255]};c.cmyk.rgb=function(t){const e=t[0]/100,n=t[1]/100,r=t[2]/100,s=t[3]/100,o=1-Math.min(1,e*(1-s)+s),i=1-Math.min(1,n*(1-s)+s),l=1-Math.min(1,r*(1-s)+s);return[o*255,i*255,l*255]};c.xyz.rgb=function(t){const e=t[0]/100,n=t[1]/100,r=t[2]/100;let s,o,i;return s=e*3.2406+n*-1.5372+r*-.4986,o=e*-.9689+n*1.8758+r*.0415,i=e*.0557+n*-.204+r*1.057,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,s=Math.min(Math.max(0,s),1),o=Math.min(Math.max(0,o),1),i=Math.min(Math.max(0,i),1),[s*255,o*255,i*255]};c.xyz.lab=function(t){let e=t[0],n=t[1],r=t[2];e/=95.047,n/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,r=r>.008856?r**(1/3):7.787*r+16/116;const s=116*n-16,o=500*(e-n),i=200*(n-r);return[s,o,i]};c.lab.xyz=function(t){const e=t[0],n=t[1],r=t[2];let s,o,i;o=(e+16)/116,s=n/500+o,i=o-r/200;const l=o**3,a=s**3,h=i**3;return o=l>.008856?l:(o-16/116)/7.787,s=a>.008856?a:(s-16/116)/7.787,i=h>.008856?h:(i-16/116)/7.787,s*=95.047,o*=100,i*=108.883,[s,o,i]};c.lab.lch=function(t){const e=t[0],n=t[1],r=t[2];let s;s=Math.atan2(r,n)*360/2/Math.PI,s<0&&(s+=360);const i=Math.sqrt(n*n+r*r);return[e,i,s]};c.lch.lab=function(t){const e=t[0],n=t[1],s=t[2]/360*2*Math.PI,o=n*Math.cos(s),i=n*Math.sin(s);return[e,o,i]};c.rgb.ansi16=function(t,e=null){const[n,r,s]=t;let o=e===null?c.rgb.hsv(t)[2]:e;if(o=Math.round(o/50),o===0)return 30;let i=30+(Math.round(s/255)<<2|Math.round(r/255)<<1|Math.round(n/255));return o===2&&(i+=60),i};c.hsv.ansi16=function(t){return c.rgb.ansi16(c.hsv.rgb(t),t[2])};c.rgb.ansi256=function(t){const e=t[0],n=t[1],r=t[2];return e===n&&n===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5)};c.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const n=(~~(t>50)+1)*.5,r=(e&1)*n*255,s=(e>>1&1)*n*255,o=(e>>2&1)*n*255;return[r,s,o]};c.ansi256.rgb=function(t){if(t>=232){const o=(t-232)*10+8;return[o,o,o]}t-=16;let e;const n=Math.floor(t/36)/5*255,r=Math.floor((e=t%36)/6)/5*255,s=e%6/5*255;return[n,r,s]};c.rgb.hex=function(t){const n=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(n.length)+n};c.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let n=e[0];e[0].length===3&&(n=n.split("").map(l=>l+l).join(""));const r=parseInt(n,16),s=r>>16&255,o=r>>8&255,i=r&255;return[s,o,i]};c.rgb.hcg=function(t){const e=t[0]/255,n=t[1]/255,r=t[2]/255,s=Math.max(Math.max(e,n),r),o=Math.min(Math.min(e,n),r),i=s-o;let l,a;return i<1?l=o/(1-i):l=0,i<=0?a=0:s===e?a=(n-r)/i%6:s===n?a=2+(r-e)/i:a=4+(e-n)/i,a/=6,a%=1,[a*360,i*100,l*100]};c.hsl.hcg=function(t){const e=t[1]/100,n=t[2]/100,r=n<.5?2*e*n:2*e*(1-n);let s=0;return r<1&&(s=(n-.5*r)/(1-r)),[t[0],r*100,s*100]};c.hsv.hcg=function(t){const e=t[1]/100,n=t[2]/100,r=e*n;let s=0;return r<1&&(s=(n-r)/(1-r)),[t[0],r*100,s*100]};c.hcg.rgb=function(t){const e=t[0]/360,n=t[1]/100,r=t[2]/100;if(n===0)return[r*255,r*255,r*255];const s=[0,0,0],o=e%1*6,i=o%1,l=1-i;let a=0;switch(Math.floor(o)){case 0:s[0]=1,s[1]=i,s[2]=0;break;case 1:s[0]=l,s[1]=1,s[2]=0;break;case 2:s[0]=0,s[1]=1,s[2]=i;break;case 3:s[0]=0,s[1]=l,s[2]=1;break;case 4:s[0]=i,s[1]=0,s[2]=1;break;default:s[0]=1,s[1]=0,s[2]=l}return a=(1-n)*r,[(n*s[0]+a)*255,(n*s[1]+a)*255,(n*s[2]+a)*255]};c.hcg.hsv=function(t){const e=t[1]/100,n=t[2]/100,r=e+n*(1-e);let s=0;return r>0&&(s=e/r),[t[0],s*100,r*100]};c.hcg.hsl=function(t){const e=t[1]/100,r=t[2]/100*(1-e)+.5*e;let s=0;return r>0&&r<.5?s=e/(2*r):r>=.5&&r<1&&(s=e/(2*(1-r))),[t[0],s*100,r*100]};c.hcg.hwb=function(t){const e=t[1]/100,n=t[2]/100,r=e+n*(1-e);return[t[0],(r-e)*100,(1-r)*100]};c.hwb.hcg=function(t){const e=t[1]/100,n=t[2]/100,r=1-n,s=r-e;let o=0;return s<1&&(o=(r-s)/(1-s)),[t[0],s*100,o*100]};c.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};c.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};c.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};c.gray.hsl=function(t){return[0,0,t[0]]};c.gray.hsv=c.gray.hsl;c.gray.hwb=function(t){return[0,100,t[0]]};c.gray.cmyk=function(t){return[0,0,0,t[0]]};c.gray.lab=function(t){return[t[0],0,0]};c.gray.hex=function(t){const e=Math.round(t[0]/100*255)&255,r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r};c.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]};const O=G;function et(){const t={},e=Object.keys(O);for(let n=e.length,r=0;r<n;r++)t[e[r]]={distance:-1,parent:null};return t}function nt(t){const e=et(),n=[t];for(e[t].distance=0;n.length;){const r=n.pop(),s=Object.keys(O[r]);for(let o=s.length,i=0;i<o;i++){const l=s[i],a=e[l];a.distance===-1&&(a.distance=e[r].distance+1,a.parent=r,n.unshift(l))}}return e}function rt(t,e){return function(n){return e(t(n))}}function st(t,e){const n=[e[t].parent,t];let r=O[e[t].parent][t],s=e[t].parent;for(;e[s].parent;)n.unshift(e[s].parent),r=rt(O[e[s].parent][s],r),s=e[s].parent;return r.conversion=n,r}var ot=function(t){const e=nt(t),n={},r=Object.keys(e);for(let s=r.length,o=0;o<s;o++){const i=r[o];e[i].parent!==null&&(n[i]=st(i,e))}return n};const P=G,it=ot,w={},lt=Object.keys(P);function at(t){const e=function(...n){const r=n[0];return r==null?r:(r.length>1&&(n=r),t(n))};return"conversion"in t&&(e.conversion=t.conversion),e}function ct(t){const e=function(...n){const r=n[0];if(r==null)return r;r.length>1&&(n=r);const s=t(n);if(typeof s=="object")for(let o=s.length,i=0;i<o;i++)s[i]=Math.round(s[i]);return s};return"conversion"in t&&(e.conversion=t.conversion),e}lt.forEach(t=>{w[t]={},Object.defineProperty(w[t],"channels",{value:P[t].channels}),Object.defineProperty(w[t],"labels",{value:P[t].labels});const e=it(t);Object.keys(e).forEach(r=>{const s=e[r];w[t][r]=ct(s),w[t][r].raw=at(s)})});var ht=w;const k=H.exports,g=ht,U=["keyword","gray","hex"],L={};for(const t of Object.keys(g))L[[...g[t].labels].sort().join("")]=t;const E={};function y(t,e){if(!(this instanceof y))return new y(t,e);if(e&&e in U&&(e=null),e&&!(e in g))throw new Error("Unknown model: "+e);let n,r;if(t==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof y)this.model=t.model,this.color=[...t.color],this.valpha=t.valpha;else if(typeof t=="string"){const s=k.get(t);if(s===null)throw new Error("Unable to parse color from string: "+t);this.model=s.model,r=g[this.model].channels,this.color=s.value.slice(0,r),this.valpha=typeof s.value[r]=="number"?s.value[r]:1}else if(t.length>0){this.model=e||"rgb",r=g[this.model].channels;const s=Array.prototype.slice.call(t,0,r);this.color=q(s,r),this.valpha=typeof t[r]=="number"?t[r]:1}else if(typeof t=="number")this.model="rgb",this.color=[t>>16&255,t>>8&255,t&255],this.valpha=1;else{this.valpha=1;const s=Object.keys(t);"alpha"in t&&(s.splice(s.indexOf("alpha"),1),this.valpha=typeof t.alpha=="number"?t.alpha:0);const o=s.sort().join("");if(!(o in L))throw new Error("Unable to parse color from object: "+JSON.stringify(t));this.model=L[o];const{labels:i}=g[this.model],l=[];for(n=0;n<i.length;n++)l.push(t[i[n]]);this.color=q(l)}if(E[this.model])for(r=g[this.model].channels,n=0;n<r;n++){const s=E[this.model][n];s&&(this.color[n]=s(this.color[n]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}y.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let e=this.model in k.to?this:this.rgb();e=e.round(typeof t=="number"?t:1);const n=e.valpha===1?e.color:[...e.color,this.valpha];return k.to[e.model](n)},percentString(t){const e=this.rgb().round(typeof t=="number"?t:1),n=e.valpha===1?e.color:[...e.color,this.valpha];return k.to.rgb.percent(n)},array(){return this.valpha===1?[...this.color]:[...this.color,this.valpha]},object(){const t={},{channels:e}=g[this.model],{labels:n}=g[this.model];for(let r=0;r<e;r++)t[n[r]]=this.color[r];return this.valpha!==1&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,this.valpha!==1&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,this.valpha!==1&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new y([...this.color.map(ft(t)),this.valpha],this.model)},alpha(t){return t!==void 0?new y([...this.color,Math.max(0,Math.min(1,t))],this.model):this.valpha},red:p("rgb",0,d(255)),green:p("rgb",1,d(255)),blue:p("rgb",2,d(255)),hue:p(["hsl","hsv","hsl","hwb","hcg"],0,t=>(t%360+360)%360),saturationl:p("hsl",1,d(100)),lightness:p("hsl",2,d(100)),saturationv:p("hsv",1,d(100)),value:p("hsv",2,d(100)),chroma:p("hcg",1,d(100)),gray:p("hcg",2,d(100)),white:p("hwb",1,d(100)),wblack:p("hwb",2,d(100)),cyan:p("cmyk",0,d(100)),magenta:p("cmyk",1,d(100)),yellow:p("cmyk",2,d(100)),black:p("cmyk",3,d(100)),x:p("xyz",0,d(95.047)),y:p("xyz",1,d(100)),z:p("xyz",2,d(108.833)),l:p("lab",0,d(100)),a:p("lab",1),b:p("lab",2),keyword(t){return t!==void 0?new y(t):g[this.model].keyword(this.color)},hex(t){return t!==void 0?new y(t):k.to.hex(this.rgb().round().color)},hexa(t){if(t!==void 0)return new y(t);const e=this.rgb().round().color;let n=Math.round(this.valpha*255).toString(16).toUpperCase();return n.length===1&&(n="0"+n),k.to.hex(e)+n},rgbNumber(){const t=this.rgb().color;return(t[0]&255)<<16|(t[1]&255)<<8|t[2]&255},luminosity(){const t=this.rgb().color,e=[];for(const[n,r]of t.entries()){const s=r/255;e[n]=s<=.04045?s/12.92:((s+.055)/1.055)**2.4}return .2126*e[0]+.7152*e[1]+.0722*e[2]},contrast(t){const e=this.luminosity(),n=t.luminosity();return e>n?(e+.05)/(n+.05):(n+.05)/(e+.05)},level(t){const e=this.contrast(t);return e>=7?"AAA":e>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(t[0]*2126+t[1]*7152+t[2]*722)/1e4<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let e=0;e<3;e++)t.color[e]=255-t.color[e];return t},lighten(t){const e=this.hsl();return e.color[2]+=e.color[2]*t,e},darken(t){const e=this.hsl();return e.color[2]-=e.color[2]*t,e},saturate(t){const e=this.hsl();return e.color[1]+=e.color[1]*t,e},desaturate(t){const e=this.hsl();return e.color[1]-=e.color[1]*t,e},whiten(t){const e=this.hwb();return e.color[1]+=e.color[1]*t,e},blacken(t){const e=this.hwb();return e.color[2]+=e.color[2]*t,e},grayscale(){const t=this.rgb().color,e=t[0]*.3+t[1]*.59+t[2]*.11;return y.rgb(e,e,e)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const e=this.hsl();let n=e.color[0];return n=(n+t)%360,n=n<0?360+n:n,e.color[0]=n,e},mix(t,e){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const n=t.rgb(),r=this.rgb(),s=e===void 0?.5:e,o=2*s-1,i=n.alpha()-r.alpha(),l=((o*i===-1?o:(o+i)/(1+o*i))+1)/2,a=1-l;return y.rgb(l*n.red()+a*r.red(),l*n.green()+a*r.green(),l*n.blue()+a*r.blue(),n.alpha()*s+r.alpha()*(1-s))}};for(const t of Object.keys(g)){if(U.includes(t))continue;const{channels:e}=g[t];y.prototype[t]=function(...n){return this.model===t?new y(this):n.length>0?new y(n,t):new y([...pt(g[this.model][t].raw(this.color)),this.valpha],t)},y[t]=function(...n){let r=n[0];return typeof r=="number"&&(r=q(n,e)),new y(r,t)}}function ut(t,e){return Number(t.toFixed(e))}function ft(t){return function(e){return ut(e,t)}}function p(t,e,n){t=Array.isArray(t)?t:[t];for(const r of t)(E[r]||(E[r]=[]))[e]=n;return t=t[0],function(r){let s;return r!==void 0?(n&&(r=n(r)),s=this[t](),s.color[e]=r,s):(s=this[t]().color[e],n&&(s=n(s)),s)}}function d(t){return function(e){return Math.max(0,Math.min(t,e))}}function pt(t){return Array.isArray(t)?t:[t]}function q(t,e){for(let n=0;n<e;n++)typeof t[n]!="number"&&(t[n]=0);return t}var dt=y;const yt=dt;function S(t){return t*Math.PI/180}function gt(t,e){let n={points:{p1:{x:39,y:18},p2:{x:49,y:282},cp1:{x:9,y:116},cp2:{x:15,y:195}},color:D(10)},r=JSON.parse(JSON.stringify(n));return t&&delete r.points.cp2,Object.values(r.points).forEach(s=>s.x=s.x+e*80),r.color=D(e*40),r}function xt(t,e,n,r,s){let o=r?m.cpoint:m.point;t.fillStyle=t.fillStyle=r?m.circles.fill:s?yt(s).alpha(.5).darken(.5).hexa():"",t.beginPath(),t.arc(e+1,n+1,o.radius+1,o.startAngle,o.endAngle,!0),t.fill(),t.lineWidth=r?5:m.circles.width,t.strokeStyle="#00000040",t.fillStyle=r?m.circles.fill:s||"",t.beginPath(),t.arc(e,n,o.radius,o.startAngle,o.endAngle,!0),t.fill(),t.stroke();const i=S(180),l=S(205),a=S(220),h=S(280);t.lineWidth=1,t.strokeStyle="#ffffffc0",t.beginPath(),t.arc(e,n,o.radius-4,i,l,!1),t.stroke(),t.beginPath(),t.arc(e,n,o.radius-4,a,h,!1),t.stroke()}function vt(t,e){const[n,r,s,o]=e;t.beginPath(),t.moveTo(n[0],n[1]),o?t.bezierCurveTo(s[0],s[1],o[0],o[1],r[0],r[1]):t.quadraticCurveTo(s[0],s[1],r[0],r[1]),t.stroke()}function mt(t,e){const n=e.points;t.lineWidth=m.curve.width,t.strokeStyle=e.color||"";const r=I(n);vt(t,r),t.setLineDash([2,2]),t.lineWidth=m.ctrlLine.width,t.strokeStyle=m.ctrlLine.color,t.beginPath(),t.moveTo(n.p1.x,n.p1.y),t.lineTo(n.cp1.x,n.cp1.y),n.cp2?(t.moveTo(n.p2.x,n.p2.y),t.lineTo(n.cp2.x,n.cp2.y)):t.lineTo(n.p2.x,n.p2.y),t.stroke(),t.setLineDash([]);for(const[s,o]of Object.entries(e.points)){let i=s==="cp1"||s==="cp2";if(!o)continue;const{x:l,y:a}=o;xt(t,l,a,i,e.color||"")}}function bt(t,e){const n=Math.pow(m.point.radius,2);for(const[r,s]of Object.entries(t.points)){let o=s.x-e.x,i=s.y-e.y;if(o*o+i*i<n)return{line:t,member:r}}}function wt(t,e){let n=[];function r(l){n=[];let a=i(l);for(var h=0;h<t.line.length;h++){var u=t.line[h];let f=bt(u,a);if(f&&(n.push({line:f.line,member:f.member,pt:a}),!t.checkDragGroup.checked))break}n.length&&setTimeout(()=>t.canvas.classList.add("cursor-move"),0)}function s(l){if(n.length){let a=i(l);n.forEach(h=>{var f;const u=h.member&&((f=h.line)==null?void 0:f.points[h.member]);u&&h.pt&&(u.x+=a.x-h.pt.x,u.y+=a.y-h.pt.y,h.pt=a)}),e(t)}}function o(l){n=[],t.canvas.classList.remove("cursor-move"),e(t)}function i(l){return{x:l.pageX-t.canvas.offsetLeft,y:l.pageY-t.canvas.offsetTop}}return{dragStart:r,dragging:s,dragDone:o}}function kt(t){const e=t.points;return`ctx.beginPath();
ctx.moveTo(${e.p1.x}, ${e.p1.y});
`+(e.cp2?`ctx.bezierCurveTo(${e.cp1.x}, ${e.cp1.y}, ${e.cp2.x}, ${e.cp2.y}, ${e.p2.x}, ${e.p2.y});
`:`ctx.quadraticCurveTo(${e.cp1.x}, ${e.cp1.y}, ${e.p2.x}, ${e.p2.y});
`)+`ctx.stroke();
`}function Mt(t){const e=t.points;return`{ p1: {x: ${e.p1.x}, y: ${e.p1.y}}, p2: {x: ${e.p2.x}, y: ${e.p2.y}}, `+(e.cp2?`cp1: {x: ${e.cp1.x}, y: ${e.cp1.y}}, cp2: {x: ${e.cp2.x}, y: ${e.cp2.y}}`:`cp1: {x: ${e.cp1.x}, y: ${e.cp1.y}}`)+" }"}function $t(t){return JSON.stringify(t)}function At(t){let e=`canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
ctx.lineWidth = ${m.curve.width};
`;t.forEach(r=>e+=`
${kt(r)}`);let n=`
const points = [`;return t.forEach(r=>n+=`
    ${Mt(r)},`),e+=`${n}
];`,e+=`
// prev = '${$t(t)}';

`,e}class Ft{constructor(e){v(this,"el");v(this,"summary");v(this,"content");v(this,"animation");v(this,"isClosing");v(this,"isExpanding");this.el=e,this.summary=e.querySelector("summary"),this.content=e.querySelector(".content"),this.animation=null,this.isClosing=!1,this.isExpanding=!1,this.summary.addEventListener("click",n=>this.onClick(n))}onClick(e){e.preventDefault(),this.el.style.overflow="hidden",this.isClosing||!this.el.open?this.open():(this.isExpanding||this.el.open)&&this.shrink()}expand(){this.isExpanding=!0;const e=this.el.offsetHeight,n=this.summary.offsetHeight+this.content.offsetHeight;this.startAmimation(e,n),this.animation.onfinish=()=>this.onAnimationFinish(!0),this.animation.oncancel=()=>this.isExpanding=!1}startAmimation(e,n){this.animation&&this.animation.cancel(),this.animation=this.el.animate({height:[`${e}px`,`${n}px`]},{duration:150,easing:"ease-out"})}onAnimationFinish(e){this.el.open=e,this.animation=null,this.isClosing=!1,this.isExpanding=!1,this.el.style.height=this.el.style.overflow=""}shrink(){this.isClosing=!0;const e=this.el.offsetHeight,n=this.summary.offsetHeight;this.startAmimation(e,n),this.animation.onfinish=()=>this.onAnimationFinish(!1),this.animation.oncancel=()=>this.isClosing=!1}open(){this.el.style.height=`${this.el.offsetHeight}px`,this.el.open=!0,window.requestAnimationFrame(()=>this.expand())}}class St{constructor(e){v(this,"appContext");v(this,"container");v(this,"onClick",e=>{const n=e.currentTarget;n&&n.dataset.idx!==void 0&&(this.appContext.current=+n.dataset.idx,this.appContext.line=this.appContext.lines[this.appContext.current],T(this.appContext))});this.appContext=e,this.container=document.getElementById("previews")}singleBox(e,n,r){const{width:s,height:o}=this.appContext.ctx.canvas;function i(l){const[a,h,u,f]=I(l.points);return f?`<path d="M${a[0]}, ${a[1]} C ${u[0]}, ${u[1]}, ${f[0]}, ${f[1]}, ${h[0]}, ${h[1]}" stroke="${l.color}" />`:`<path d="M${a[0]}, ${a[1]} S ${u[0]}, ${u[1]}, ${h[0]}, ${h[1]}" stroke="${l.color}" />`}return`
            <div class="hover:bg-slate-800 border-slate-400 border rounded shadow shadow-slate-700 cursor-pointer active:scale-[.97] grid items-center justify-center preview-box ${r?"ring-1 ring-offset-2 ring-offset-slate-800 ring-sky-500":""}"
                data-idx="${n}"
                title="Select this curve for editing"
            >
                <svg class="w-12 h-12" viewBox="0 0 ${s} ${o}" stroke-width="15" fill="none">
                    ${e.map(l=>i(l)).join(`
`)}
                </svg>
            </div>`}update(){let e=[...this.container.querySelectorAll(".preview-box")];e.forEach(r=>r.removeEventListener("click",this.onClick));const n=this.appContext.lines.map((r,s)=>this.singleBox(r,s,s===this.appContext.current));this.container.innerHTML=n.join(`
`),e=[...this.container.querySelectorAll(".preview-box")],e.forEach(r=>r.addEventListener("click",this.onClick))}}const Ot=`<div class="min-h-screen p-4 text-xs bg-slate-900 text-slate-400 flex flex-col items-center overflow-hidden">\r
    <div class="flex-1 w-full max-w-3xl flex flex-col">\r
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
        <div class="py-4 flex space-x-2" id="previews">\r
            Previews\r
        </div>\r
\r
        <div class="overflow-hidden">\r
            <details class="h-full">\r
                <summary class="cursor-pointer">Code</summary>\r
                <div class="h-60 content text-[.65rem] overflow-auto smallscroll">\r
                    <div class="px-2 " id="code">code</div>\r
                </div>\r
            </details>\r
        </div>\r
    </div>\r
\r
    <footer>\r
        <a class="text-xs text-slate-500 hover:underline" href="https://github.com/maxzz/quadratic-curves" target="_blank">Created by Max Zakharzhevskiy. Source code on Github.</a>\r
    </footer>\r
</div>`;function Et(){const t=document.createElement("div");document.body.appendChild(t),t.outerHTML=Ot;const e=document.getElementById("canvas"),n=e==null?void 0:e.getContext("2d"),r=document.getElementById("code"),s=document.getElementById("drag-group");if(!n||!r||!s){console.log("failed to init");return}const o={canvas:e,ctx:n,code:r,line:[],lines:[],current:0,checkDragGroup:s};return o.previews=new St(o),o}function zt(t){const{dragStart:e,dragging:n,dragDone:r}=wt(t,T);[{name:"mousedown",fn:e},{name:"mousemove",fn:n},{name:"mouseup",fn:r}].forEach(({name:l,fn:a})=>t.canvas.addEventListener(l,a));function o(l){for(const a of l)a.contentBoxSize&&(t.canvas.width=a.contentRect.width,t.canvas.height=a.contentRect.height,T(t))}new ResizeObserver(o).observe(t.canvas),document.querySelectorAll("details").forEach(l=>new Ft(l))}function Pt(t){t.lines=Y();function e(){const o=[];for(let i=0;i<7;i++)o.push(gt(!1,i));return o}const n=e();t.lines.unshift(n),t.current=0,t.line=t.lines[t.current]}function Lt(t){zt(t),t.checkDragGroup.checked=!0,t.ctx.lineCap="round",t.ctx.lineJoin="round",Pt(t),t.previews.update()}function T(t){t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height);let e=t.ctx.createLinearGradient(0,0,t.canvas.width,t.canvas.height);e.addColorStop(0,"tomato"),e.addColorStop(1,"purple"),t.ctx.fillStyle=e,t.ctx.fillRect(0,0,t.canvas.width,t.canvas.height),t.line.forEach(n=>mt(t.ctx,n)),t.code.innerText=At(t.line),t.previews.update()}function qt(){const t=Et();!t||Lt(t)}qt();
