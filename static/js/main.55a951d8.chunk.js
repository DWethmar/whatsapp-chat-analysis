(this["webpackJsonpwhatsapp-chat-analysis"]=this["webpackJsonpwhatsapp-chat-analysis"]||[]).push([[0],{163:function(e,t,a){},164:function(e,t,a){},166:function(e,t,a){},167:function(e,t,a){},168:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(22),l=a.n(s),c=(a(64),a(1)),i=(a(65),a(66),function(){return r.a.createElement("header",null,r.a.createElement("h1",null,"WhatsApp Chat Analysis"),r.a.createElement("p",null,"Upload a Whatsapp chat archive to view the messages and stats."),r.a.createElement("p",null,"Everything is done in the browser, so no data is sent to a server and the data is not stored anywhere. But don't use this if you have",r.a.createElement("b",null,"any")," privacy concerns."),r.a.createElement("p",null,"Click ",r.a.createElement("a",{href:"https://faq.whatsapp.com/en/android/23756533/"},"here ")," ","to find out how to export a chat on android."),r.a.createElement("p",null,r.a.createElement("a",{download:!0,href:"https://raw.githubusercontent.com/DWethmar/whatsapp-chat-analysis/master/public/_chat.txt"},"Example Whatsapp chat")))}),o=function(e){return r.a.createElement("div",null,r.a.createElement("input",{type:"file",id:"file",className:"input-file",accept:".txt",onChange:function(t){return!!t.target&&!!t.target.files&&(a=t.target.files[0],void e.setFile(a));var a}}))},u=a(6),m=a.n(u);var d=a(57),h=a(10),f=a(23),p=(a(160),a(162)(["tol","qualitative"],50,0).map((function(e){return"#".concat(e)})));function v(e){return p[e%p.length]}var E=function(e){var t=e.messages,a=Object(n.useState)("month"),s=Object(c.a)(a,2),l=s[0],i=s[1];if(!Array.isArray(t)||0===t.length)return r.a.createElement("span",null,"Chart has no data.");var o,u={},p="",E=Object(h.a)(t);try{for(E.s();!(o=E.n()).done;){var g=o.value,b="";switch(l){case"minute":b=m()(g.dateTime).startOf("minute").format("DD/MM/YYYY HH:mm"),p="DD/MM/YYYY HH:mm";break;case"hour":b=m()(g.dateTime).startOf("hour").format("DD/MM/YYYY HH:mm"),p="DD/MM/YYYY HH:mm";break;case"day":b=m()(g.dateTime).format("DD/MM/YYYY"),p="DD/MM/YYYY";break;case"week":b=m()(g.dateTime).startOf("week").format("DD/MM/YYYY"),p="DD/MM/YYYY";break;case"month":b=m()(g.dateTime).format("MM/YYYY"),p="MM/YYYY"}u.hasOwnProperty(g.sender)||(u[g.sender]={}),u[g.sender].hasOwnProperty(b)||(u[g.sender][b]=0),u[g.sender][b]++}}catch(j){E.e(j)}finally{E.f()}var y={datasets:Object(d.a)(Object.keys(u).map((function(e,t){return{label:e,data:Object.entries(u[e]).map((function(e){return{x:e[0],y:e[1]}})),fill:!1,borderColor:"Whatsapp"===e?"#075E54":v(t)}})))},O={responsive:!0,animation:!1,elements:{line:{tension:0}},title:{display:!0,text:"Messages over time."},plugins:{zoom:{pan:{enabled:!0,mode:"x"},zoom:{enabled:!0,mode:"x"}}},scales:{xAxes:[{type:"time",time:{parser:p},scaleLabel:{display:!0,labelString:"Date"}}],yAxes:[{scaleLabel:{display:!0,labelString:"Number of messages"},ticks:{stepSize:1,beginAtZero:!0}}]}};return r.a.createElement("div",null,r.a.createElement("select",{value:l,onChange:function(e){return i(e.target.value)}},["day","week","month"].map((function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))),r.a.createElement(f.b,{data:y,options:O}))},g=(a(163),a(51)),b=a(52),y=a(56),O=a(58),j=(a(164),document.getElementById("modal")),Y=function(e){Object(O.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(g.a)(this,a),(n=t.call(this,e)).element=void 0,n.element=document.createElement("div"),n}return Object(b.a)(a,[{key:"componentDidMount",value:function(){j&&j.appendChild(this.element)}},{key:"componentWillUnmount",value:function(){j&&j.removeChild(this.element)}},{key:"render",value:function(){return Object(s.createPortal)(this.props.children,this.element)}}]),a}(r.a.Component),w=function(e){var t=e.message,a=e.close,n=e.children;return r.a.createElement(Y,null,r.a.createElement("div",{className:"message-modal"},r.a.createElement("button",{className:"message-modal__close",onClick:a},"close"),r.a.createElement("h2",null,t.sender),r.a.createElement("span",null,t.dateTime.toUTCString()),n&&r.a.createElement("div",null,n),r.a.createElement("div",{className:"message-modal__message"},t.message.split("\n").map((function(e,t){return r.a.createElement("p",{key:t},e)})))))},k=a(53),M=a(33),x=a.n(M),C=x.a.mark(D);function D(e,t){var a,n,r;return x.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:a=0,n=Object(h.a)(e),s.prev=2,n.s();case 4:if((r=n.n()).done){s.next=12;break}if(!r.value.message.toLocaleLowerCase().includes(t)){s.next=9;break}return s.next=9,a;case 9:a++;case 10:s.next=4;break;case 12:s.next=17;break;case 14:s.prev=14,s.t0=s.catch(2),n.e(s.t0);case 17:return s.prev=17,n.f(),s.finish(17);case 20:case"end":return s.stop()}}),C,null,[[2,14,17,20]])}var S=function(e){var t=r.a.useState(""),a=Object(c.a)(t,2),s=a[0],l=a[1],i=Object(n.useCallback)(Object(k.debounce)((function(t){if(t.length>2){var a=Array.from(D(e.messages,t.toLocaleLowerCase()));e.searchResult(a)}}),500),[]);return Object(n.useEffect)((function(){i(s)}),[s,i]),r.a.createElement("div",null,r.a.createElement("input",{type:"text",placeholder:"Search (min ".concat(2," chars)"),onChange:function(e){return l(e.target.value)}}))},A=function(e){var t=e.messageIndexes,a=e.select,s=Object(n.useState)(0),l=Object(c.a)(s,2),i=l[0],o=l[1];return Object(n.useEffect)((function(){t.length>0&&i>=0&&i<t.length&&a(t[i])}),[t,i,a]),r.a.createElement("div",null,t.length>0&&r.a.createElement("div",null,r.a.createElement("span",null,"Search results: ",i+1,"/",e.messageIndexes.length),r.a.createElement("button",{disabled:0===i,onClick:function(){return o(i-1)}},"Previous"),r.a.createElement("button",{disabled:i>=t.length-1,onClick:function(){return o(i+1)}},"Next")))},N=a(55),_=a(54),T=(a(166),a(167),function(e){var t=e.message;return r.a.createElement("div",{className:"message"},r.a.createElement("div",{className:"message__sender"+(t.isWhatsApp?" message__sender--whatsapp":"")},t.sender),r.a.createElement("div",{className:"message__date-time"},t.dateTime.toLocaleString()),r.a.createElement("div",{className:"message__message",title:t.message},t.message.split("\n").map((function(e,t){return r.a.createElement("p",{key:t},e)}))))}),B=function(e){var t=e.messages,a=e.highlighted,s=e.select,l=e.scrollToItem,c=r.a.createRef();Object(n.useEffect)((function(){var e;l&&(null===(e=c.current)||void 0===e||e.scrollToItem(l,"start"))}),[c,l]);var i=function(e){var n=e.index,l=e.style,c=t[n];return r.a.createElement("div",{style:l,key:n,className:"message-list-row message-list-row--"+(n%2===0?"even":"odd")+(a.includes(n)?" message--selected":"")},r.a.createElement(T,{message:c}),r.a.createElement("div",{className:"message-list-row__actions"},r.a.createElement("button",{onClick:function(){return s(n)}},"view")))};return r.a.createElement("div",{className:"message-list"},r.a.createElement(_.a,null,(function(e){var a=e.height,n=e.width;return r.a.createElement(N.a,{ref:c,height:a,itemCount:t.length,itemSize:40,width:n},i)})))},L=function(e){var t=e.messages,a=Object(n.useState)([]),s=Object(c.a)(a,2),l=s[0],i=s[1],o=Object(n.useState)(null),u=Object(c.a)(o,2),m=u[0],d=u[1],h=Object(n.useState)(null),f=Object(c.a)(h,2),p=f[0],v=f[1];return r.a.createElement("div",{className:"chat"},null!==p&&r.a.createElement(w,{message:t[p],close:function(){return v(null)}},p>0&&r.a.createElement("button",{onClick:function(){return v(p-1)}},"Previous"),p<t.length-1&&r.a.createElement("button",{onClick:function(){return v(p+1)}},"Next")),r.a.createElement(S,{messages:t,searchResult:function(e){return i(e)}}),r.a.createElement(A,{messageIndexes:l,select:function(e){return d(e)}}),r.a.createElement("hr",null),r.a.createElement(B,{messages:t,highlighted:l,select:function(e){return v(e)},scrollToItem:m||0}))},H=function(e){var t=e.messages;if(!Array.isArray(t)||0===t.length)return r.a.createElement("span",null,"Chart has no data.");var a,n={},s=[],l=0,i=Object(h.a)(t);try{for(i.s();!(a=i.n()).done;){var o=a.value;n.hasOwnProperty(o.sender)||(n[o.sender]=0,s.push(v(l)),l++),n[o.sender]++}}catch(p){i.e(p)}finally{i.f()}var u=[],m=[];Object.entries(n).forEach((function(e){var t=Object(c.a)(e,2),a=t[0],n=t[1];u.push(n),m.push(a)}));var d={datasets:[{data:u,backgroundColor:s}],labels:m};return r.a.createElement("div",null,r.a.createElement(f.a,{data:d,options:{responsive:!0,animation:!1,elements:{line:{tension:0}},title:{display:!0,text:"Amount of messages per chat participant."}}}))},I=new Worker("/whatsapp-chat-analysis/workers/parse-archive.js");var P=function(){var e=Object(n.useState)(),t=Object(c.a)(e,2),a=t[0],s=t[1],l=Object(n.useState)(),u=Object(c.a)(l,2),m=u[0],d=u[1],h=Object(n.useState)(0),f=Object(c.a)(h,2),p=f[0],v=f[1],g=Object(n.useState)([]),b=Object(c.a)(g,2),y=b[0],O=b[1];return Object(n.useEffect)((function(){var e=function(e){e.data.hasOwnProperty("percentage")&&v(Math.round(e.data.percentage)),e.data.hasOwnProperty("messages")&&O(e.data.messages)};return I.addEventListener("message",e,!1),function(){return I.removeEventListener("message",e)}})),Object(n.useEffect)((function(){Array.isArray(m)&&(v(0),O([]),I.postMessage(m))}),[m]),Object(n.useEffect)((function(){var e=[];a&&function(e,t,a,n){var r=new TextDecoder,s=0,l=0,c="",i=new FileReader;function o(){if(l!==t){if(0!==s&&s>=e.size)return a(c),void n();var r=e.slice(s,s+5e4);i.readAsArrayBuffer(r)}else n()}i.onload=function(){var e=(c+=r.decode(i.result,{stream:!0})).split("\n");c=e.pop(),(l+=e.length)>t&&(e.length-=l-t,l=t);for(var n=0;n<e.length;++n)a(e[n]+"\n");s+=5e4,o()},i.onerror=function(){n(i.error)},o()}(a,1e9,(function(t){return e.push(t)}),(function(t){if(t)throw t;d(e)}))}),[a]),r.a.createElement("div",{className:"App"},r.a.createElement(i,null),r.a.createElement("hr",null),r.a.createElement(o,{setFile:s}),r.a.createElement("br",null),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Size:"),r.a.createElement("td",null,a?function(e){if(0===e)return"0 Byte";var t=Math.floor(Math.log(e)/Math.log(1024));return Math.round(e/Math.pow(1024,t))+" "+["Bytes","KB","MB","GB","TB"][t]}(a.size):0)),r.a.createElement("tr",null,r.a.createElement("td",null,"Loading:"),r.a.createElement("td",null,p,"%")),r.a.createElement("tr",null,r.a.createElement("td",null,"Messages:"),r.a.createElement("td",null,y.length)))),r.a.createElement("hr",null),100===p&&y.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement(L,{messages:y}),r.a.createElement("hr",null),r.a.createElement(E,{messages:y}),r.a.createElement("hr",null),r.a.createElement(H,{messages:y})))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root"))},59:function(e,t,a){e.exports=a(168)},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){}},[[59,1,2]]]);
//# sourceMappingURL=main.55a951d8.chunk.js.map