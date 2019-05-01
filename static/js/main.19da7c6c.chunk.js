(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t){},116:function(e,t){},131:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(75),i=n.n(r),c=n(5),o=n.n(c),l=n(13),u=n(17),d=n(8),f=n(9),p=n(11),m=n(10),h=n(12),v=n(48),b=s.a.createContext({db_feeds:new v.a("pager_feeds"),db_feeds_items:new v.a("pager_feeds_items")}),g=(n(85),"https://cors-anywhere.herokuapp.com/"),w="https://s2.googleusercontent.com/s2/favicons?domain_url=",k=n(38),E=n.n(k),O=n(24),_=n.n(O),x=n(25),j=n.n(x),y=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).onFeedChange=function(){n.listener=n.context.db_feeds_items.changes({since:"now",live:!0,include_docs:!0}).on("change",function(e){-1!==_.a.indexOf(n.state.unread,e.doc._id)&&!1===e.doc.unread&&n.setState({unread:n.state.unread.filter(function(t){return t!==e.doc._id})})})},n.filter=function(){alert("Not implemented.")},n.listener=null,n.state={loading:!0,id:n.props.id,icon:n.props.icon,title:n.props.title,uri:n.props.uri,unread:n.props.unread||[]},n}return Object(h.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(o.a.mark(function e(){var t,n,a,s,r,i=this;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.onFeedChange(),t=new E.a,n="".concat(g).concat(this.state.uri),e.prev=3,e.next=6,t.parseURL(n);case 6:return a=e.sent,s=[],a.items.forEach(function(e){var t=e.isoDate||e.pubDate?e.pubDate.replace(/CET|CEST/gi,""):j()(),n=j()(t).unix();s.push({_id:e.guid||e.id,feedId:i.state.id,icon:i.state.icon,title:e.title,desc:e.contentSnippet,date:n,link:e.link,unread:!0})}),e.next=11,this.context.db_feeds_items.bulkDocs(s);case 11:r=(r=e.sent).filter(function(e){return!0===e.ok}),this.setState({loading:!1,unread:_.a.uniq([].concat(Object(l.a)(this.state.unread),Object(l.a)(r.map(function(e){return e.id}))))}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(3),console.error("Unable to fetch feed: ".concat(n," reason: ").concat(e.t0));case 19:case"end":return e.stop()}},e,this,[[3,16]])}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.listener.cancel(),this.listener=null}},{key:"render",value:function(){return s.a.createElement("li",{onClick:this.filter,title:this.state.title},s.a.createElement("div",{className:"n"},this.state.loading?"...":this.state.unread.length),s.a.createElement("div",{className:"i"},s.a.createElement("img",{src:this.state.icon,alt:"-"})),s.a.createElement("div",{className:"t"},this.state.title.substring(0,30)))}}]),t}(a.Component);y.contextType=b;var N=y,C=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){n.setState({rss:e.target.value.trim()})},n.closeFeed=function(){document.getElementsByClassName("App-Feeds")[0].classList.add("hide")},n.addFeed=Object(u.a)(o.a.mark(function e(){var t,a,s,r,i,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==n.state.rss){e.next=3;break}return alert("Please add rss feed link first."),e.abrupt("return");case 3:if(/^(http|https):\/\//.test(n.state.rss)){e.next=6;break}return alert("Missing http/https scheme."),e.abrupt("return");case 6:return n.setState({loading:!0}),t={_id:n.state.rss,uri:n.state.rss,title:n.state.rss,icon:""},e.prev=8,a=new E.a,s="".concat(g).concat(n.state.rss),e.next=13,a.parseURL(s);case 13:return(r=e.sent).title&&(t.title=r.title),i=r.link||n.state.rss,e.next=18,fetch("".concat(g).concat(w).concat(i));case 18:return c=e.sent,e.next=21,c.arrayBuffer().then(function(e){var n="";[].slice.call(new Uint8Array(e)).forEach(function(e){return n+=String.fromCharCode(e)});var a=window.btoa(n);t.icon="data:image/png;base64,".concat(a)});case 21:e.next=29;break;case 23:return e.prev=23,e.t0=e.catch(8),n.setState({loading:!1}),console.error("Unable to add feed: ".concat(n.state.rss," reason: ").concat(e.t0)),alert("Ooops something goes wrong.."),e.abrupt("return");case 29:return e.prev=29,e.next=32,n.context.db_feeds.put(t);case 32:n.setState({loading:!1,rss:"",feeds:[].concat(Object(l.a)(n.state.feeds),[t])}),e.next=39;break;case 35:e.prev=35,e.t1=e.catch(29),n.setState({loading:!1}),console.error("Unable to add feed: ".concat(n.state.rss," reason: ").concat(e.t1));case 39:case"end":return e.stop()}},e,null,[[8,23],[29,35]])})),n.state={rss:"",loading:!1,feeds:n.props.feeds},n}return Object(h.a)(t,e),Object(f.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.feeds!==this.props.feeds&&this.setState({feeds:e.feeds})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App-Feeds hide"},s.a.createElement("h1",null,s.a.createElement("img",{src:"./favicon.png"})," ",s.a.createElement("span",{className:"App-Feeds-Toggle",onClick:this.closeFeed},"x")),s.a.createElement("input",{className:"App-Feeds-Input",type:"text",ref:function(t){return e._input=t},value:this.state.rss,onChange:this.handleChange,placeholder:"Add rss feed link here.."}),this.state.loading?s.a.createElement("button",{disabled:!0,className:"App-Feeds-Add"},"LOADING..."):s.a.createElement("button",{className:"App-Feeds-Add",onClick:this.addFeed},"ADD (+)"),s.a.createElement("ul",null,this.state.feeds.map(function(e){return s.a.createElement(N,{key:e._id,id:e._id,icon:e.icon,title:e.title,uri:e.uri,unread:e.unread})})))}}]),t}(a.Component);C.contextType=b;var A=C,S=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).openFeedList=function(){document.getElementsByClassName("App-Feeds")[0].classList.remove("hide")},n.load=function(){var e=Object(u.a)(o.a.mark(function e(t,a){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.next=3;break;case 3:return e.prev=3,e.next=6,n.context.db_feeds_items.get(a._id);case 6:return(a=e.sent).unread=!1,e.next=10,n.context.db_feeds_items.put(a);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),console.warn("Unable to mark as read item: ".concat(a._id," reason: ").concat(e.t0));case 15:case"end":return e.stop()}},e,null,[[3,12]])}));return function(t,n){return e.apply(this,arguments)}}(),n.listener=null,n.state={loading:!0,items:n.props.items},n}return Object(h.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.listener=this.context.db_feeds_items.changes({since:"now",live:!0,include_docs:!0}).on("change",function(t){e.state.items.filter(function(e){return e._id===t.doc._id}).length>0?e.setState({items:e.state.items.map(function(e){return e._id===t.doc._id?Object.assign({},e,t.doc):e})}):e.setState({items:[].concat(Object(l.a)(e.state.items),[t.doc])})})}},{key:"componentWillUnmount",value:function(){this.listener.cancel(),this.listener=null}},{key:"componentWillReceiveProps",value:function(e){e.items!==this.props.items&&this.setState({loading:!1,items:e.items})}},{key:"render",value:function(){var e=this,t=s.a.createElement("div",{className:"App-List-Empty"},s.a.createElement("h1",null,"(o_O)"),s.a.createElement("p",null,"There is nothing to see right now..")),n=s.a.createElement("div",{className:"App-List-Empty"},s.a.createElement("p",null,"loading...")),a=_.a.sortBy(this.state.items,[function(e){return-e.date}]);return s.a.createElement("div",{className:"App-List"},s.a.createElement("div",{className:"App-List-Options"},s.a.createElement("button",{onClick:this.openFeedList},"Feeds")),s.a.createElement("ul",null,a.map(function(t){return s.a.createElement("a",{key:t._id,href:t.link,onClick:function(n){return e.load(n,t)},target:"_blank",rel:"noopener noreferrer"},s.a.createElement("li",{className:t.unread?"unread":""},s.a.createElement("div",{className:"i"},s.a.createElement("img",{src:t.icon})),s.a.createElement("div",{className:"ts"},j.a.unix(t.date).fromNow(!0)),s.a.createElement("div",{className:"t"},t.title?t.title.substring(0,150):""),s.a.createElement("div",{className:"d"},t.desc?t.desc.substring(0,180):"","...")))})),!0===this.state.loading&&n,!1===this.state.loading&&0===a.length&&t)}}]),t}(a.Component);S.contextType=b;var F=S,L=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).state={},n}return Object(h.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App-Viewer"},s.a.createElement("div",null))}}]),t}(a.Component),D=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).state={loading:!0,feeds:[],feedsItems:[]},n}return Object(h.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(o.a.mark(function e(){var t,n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.context.db_feeds_items.allDocs({include_docs:!0});case 2:return t=(t=(t=e.sent).rows.filter(function(e){return!0===e.doc.unread})).map(function(e){return e.doc}),e.next=7,this.context.db_feeds.allDocs({include_docs:!0});case 7:n=(n=e.sent).rows.map(function(e){return e.doc.unread=t.filter(function(t){return t.feedId===e.id}),e.doc.unread=e.doc.unread.map(function(e){return e._id}),console.log("Feed ".concat(e.id," has ").concat(e.doc.unread.length," unread.")),e.doc}),this.setState({loading:!1,feeds:Object(l.a)(n),feedsItems:Object(l.a)(t)});case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(A,{feeds:this.state.feeds}),s.a.createElement(F,{items:this.state.feedsItems}),s.a.createElement(L,null))}}]),t}(a.Component);D.contextType=b;var U=D,W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function T(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(s.a.createElement(U,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat(".","/service-worker.js");W?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):T(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):T(t,e)})}}()},76:function(e,t,n){e.exports=n(131)},85:function(e,t,n){},92:function(e,t){},94:function(e,t){}},[[76,1,2]]]);
//# sourceMappingURL=main.19da7c6c.chunk.js.map