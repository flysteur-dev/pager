(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t){},116:function(e,t){},131:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(75),r=n.n(i),o=n(3),c=n.n(o),l=n(14),d=n(6),u=n(9),p=n(10),m=n(12),h=n(11),f=n(13),v=n(48),g=s.a.createContext({db_feeds:new v.a("pager_feeds"),db_feeds_items:new v.a("pager_feeds_items")}),w=(n(85),"https://cors-anywhere.herokuapp.com/"),b="https://s2.googleusercontent.com/s2/favicons?domain_url=",E=n(38),k=n.n(E),x=n(25),_=n.n(x),y=n(20),O=n.n(y),j=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).onFeedChange=function(){n.listener=n.context.db_feeds_items.changes({since:"now",live:!0,include_docs:!0}).on("change",function(e){-1!==_.a.indexOf(n.state.unread,e.doc._id)&&!1===e.doc.unread&&n.setState({unread:n.state.unread.filter(function(t){return t!==e.doc._id})})})},n.filter=function(){alert("Not implemented.")},n.listener=null,n.state={loading:!0,id:n.props.id,icon:n.props.icon,title:n.props.title,uri:n.props.uri,unread:n.props.unread||[]},n}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=Object(d.a)(c.a.mark(function e(){var t,n,a,s,i,r=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.onFeedChange(),t=new k.a,n="".concat(w).concat(this.state.uri),e.prev=3,e.next=6,t.parseURL(n);case 6:return a=e.sent,s=[],a.items.forEach(function(e){var t=e.isoDate||e.pubDate?e.pubDate.replace(/CET|CEST/gi,""):O()(),n=O()(t).unix();s.push({_id:e.guid||e.id,feedId:r.state.id,icon:r.state.icon,title:e.title,desc:e.contentSnippet,content:e["content:encoded"]||e.content,date:n,link:e.link,unread:!0,favorite:!1})}),e.next=11,this.context.db_feeds_items.bulkDocs(s);case 11:i=(i=e.sent).filter(function(e){return!0===e.ok}),this.setState({loading:!1,unread:_.a.uniq([].concat(Object(l.a)(this.state.unread),Object(l.a)(i.map(function(e){return e.id}))))}),this.props.loaded(this.state),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(3),console.error("Unable to fetch feed: ".concat(n," reason: ").concat(e.t0));case 20:case"end":return e.stop()}},e,this,[[3,17]])}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.listener.cancel(),this.listener=null}},{key:"render",value:function(){return s.a.createElement("li",{onClick:this.filter,title:this.state.title},s.a.createElement("div",{className:"n"},this.state.loading?"...":this.state.unread.length),s.a.createElement("div",{className:"i"},s.a.createElement("img",{src:this.state.icon,alt:"-"})),s.a.createElement("div",{className:"t"},this.state.title.substring(0,30)))}}]),t}(a.Component);j.contextType=g;var A=j,L=function(e){return s.a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),s.a.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),s.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))},C=function(e){return s.a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),s.a.createElement("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}),s.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))},N=function(e){return s.a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),s.a.createElement("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"}),s.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))},F=function(e){return s.a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),s.a.createElement("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),s.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))},S=function(e){return s.a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),s.a.createElement("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),s.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))},M=function(e){return s.a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),s.a.createElement("path",{d:"M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"}),s.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}))},D=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleChange=function(e){n.setState({rss:e.target.value.toLowerCase().trim()})},n.handleAppForeground=function(e){if(n.lastupdate<=(Date.now()/1e3).toFixed()-60){var t=n.state.feeds;n.lastupdate=(Date.now()/1e3).toFixed(),n.setState({feeds:[],loaded:0}),n.setState({feeds:t})}},n.closeFeed=function(){document.getElementsByClassName("App-Feeds")[0].classList.add("hide")},n.addFeed=Object(d.a)(c.a.mark(function e(){var t,a,s,i,r,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==n.state.rss){e.next=3;break}return alert("Please add rss feed link first."),e.abrupt("return");case 3:if(/^(http|https):\/\//.test(n.state.rss)){e.next=6;break}return alert("Missing http/https scheme."),e.abrupt("return");case 6:return n.setState({loading:!0}),t={_id:n.state.rss,uri:n.state.rss,title:n.state.rss,icon:""},e.prev=8,a=new k.a,s="".concat(w).concat(n.state.rss),e.next=13,a.parseURL(s);case 13:return(i=e.sent).title&&(t.title=i.title),r=i.link||n.state.rss,e.next=18,fetch("".concat(w).concat(b).concat(r));case 18:return o=e.sent,e.next=21,o.arrayBuffer().then(function(e){var n="";[].slice.call(new Uint8Array(e)).forEach(function(e){return n+=String.fromCharCode(e)});var a=window.btoa(n);t.icon="data:image/png;base64,".concat(a)});case 21:e.next=29;break;case 23:return e.prev=23,e.t0=e.catch(8),n.setState({loading:!1}),console.error("Unable to add feed: ".concat(n.state.rss," reason: ").concat(e.t0)),alert("Ooops something goes wrong.."),e.abrupt("return");case 29:return e.prev=29,e.next=32,n.context.db_feeds.put(t);case 32:n.setState({loading:!1,rss:"",feeds:[].concat(Object(l.a)(n.state.feeds),[t])}),e.next=39;break;case 35:e.prev=35,e.t1=e.catch(29),n.setState({loading:!1}),console.error("Unable to add feed: ".concat(n.state.rss," reason: ").concat(e.t1));case 39:case"end":return e.stop()}},e,null,[[8,23],[29,35]])})),n.onFeedLoad=function(){n.setState({loaded:n.state.loaded+1})},n.lastupdate=(Date.now()/1e3).toFixed(),n.state={rss:"",loading:!1,loaded:0,feeds:n.props.feeds},n}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("visibilitychange",this.handleAppForeground)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("visibilitychange",this.handleAppForeground)}},{key:"componentWillReceiveProps",value:function(e){e.feeds!==this.props.feeds&&this.setState({feeds:e.feeds})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App-Feeds-Container"},s.a.createElement("div",{className:"App-Feeds-Loader"},this.state.feeds.length!==this.state.loaded&&s.a.createElement("div",{className:"loader"})),s.a.createElement("div",{className:"App-Feeds hide"},s.a.createElement("h1",null,s.a.createElement("img",{alt:"pager",src:"./favicon.png"}),s.a.createElement("button",{className:"App-Feeds-Toggle",onClick:this.closeFeed},s.a.createElement(L,null))),s.a.createElement("input",{className:"App-Feeds-Input",type:"text",ref:function(t){return e._input=t},value:this.state.rss,onChange:this.handleChange,placeholder:"Add rss feed link here.."}),this.state.loading?s.a.createElement("button",{disabled:!0,className:"App-Feeds-Add"},"LOADING..."):s.a.createElement("button",{className:"App-Feeds-Add",onClick:this.addFeed},"ADD (+)"),s.a.createElement("ul",null,this.state.feeds.map(function(t){return s.a.createElement(A,{key:t._id,id:t._id,icon:t.icon,title:t.title,uri:t.uri,unread:t.unread,loaded:e.onFeedLoad})}))))}}]),t}(a.Component);D.contextType=g;var B=D,z=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).openFeedList=function(){document.getElementsByClassName("App-Feeds")[0].classList.remove("hide")},n.markAllAsRead=Object(d.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(t=n.state.items).map(function(e){e.unread=!1}),e.next=5,n.context.db_feeds_items.bulkDocs(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.warn("Unable to mark all as read, reason: ".concat(e.t0));case 10:case"end":return e.stop()}},e,null,[[0,7]])})),n.showFavoriteItems=Object(d.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.setState({loading:!0,items:[],optionFavorite:!n.state.optionFavorite}),!1!==n.state.optionFavorite){e.next=11;break}return n.oldItems=n.state.items,e.next=5,n.context.db_feeds_items.allDocs({include_docs:!0});case 5:t=(t=(t=e.sent).rows.filter(function(e){return!0===e.doc.favorite})).map(function(e){return e.doc}),n.setState({loading:!1,items:t}),e.next=13;break;case 11:n.setState({loading:!1,items:n.oldItems}),delete n.oldItems;case 13:case"end":return e.stop()}},e)})),n.switchDisplayMode=function(){return alert("Display mode is not implemented yet."),!1},n.load=function(){var e=Object(d.a)(c.a.mark(function e(t,a){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n.props.openViewer(a),e.prev=2,e.next=5,n.context.db_feeds_items.get(a._id);case 5:return(a=e.sent).unread=!1,e.next=9,n.context.db_feeds_items.put(a);case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),console.warn("Unable to mark as read item: ".concat(a._id," reason: ").concat(e.t0));case 14:case"end":return e.stop()}},e,null,[[2,11]])}));return function(t,n){return e.apply(this,arguments)}}(),n.listener=null,n.state={loading:!0,items:n.props.items,optionFavorite:!1},n}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.listener=this.context.db_feeds_items.changes({since:"now",live:!0,include_docs:!0}).on("change",function(t){e.state.items.filter(function(e){return e._id===t.doc._id}).length>0?e.setState({items:e.state.items.map(function(e){return e._id===t.doc._id?Object.assign({},e,t.doc):e})}):e.setState({items:[].concat(Object(l.a)(e.state.items),[t.doc])})})}},{key:"componentWillUnmount",value:function(){this.listener.cancel(),this.listener=null}},{key:"componentWillReceiveProps",value:function(e){e.items!==this.props.items&&this.setState({loading:!1,items:e.items})}},{key:"render",value:function(){var e=this,t=s.a.createElement("div",{className:"App-List-Empty"},s.a.createElement("h1",null,"(o_O)"),s.a.createElement("p",null,"There is nothing to read right now..")),n=s.a.createElement("div",{className:"App-List-Empty"},s.a.createElement("p",null,"loading...")),a=s.a.createElement("div",{className:"App-List-Mark-As-Read-Button",onClick:this.markAllAsRead},s.a.createElement("p",null,"MARK ALL AS READ")),i=_.a.sortBy(this.state.items,[function(e){return-e.date}]),r=this.state.items.filter(function(e){return!0===e.unread});return s.a.createElement("div",{className:"App-List"},s.a.createElement("div",{className:"App-List-Options"},s.a.createElement("button",{onClick:this.openFeedList,className:"App-List-Options-Open-Feeds"},"Feeds"),s.a.createElement("button",{onClick:this.showFavoriteItems,title:"Show only favorites",className:this.state.optionFavorite?"active":""},s.a.createElement(F,null)),s.a.createElement("button",{onClick:this.switchDisplayMode,title:"Switch to compact view"},s.a.createElement(M,null))),s.a.createElement("ul",null,i.map(function(t){return s.a.createElement("a",{key:t._id,href:t.link,onClick:function(n){return e.load(n,t)},target:"_blank",rel:"noopener noreferrer"},s.a.createElement("li",{className:t.unread?"unread":""},s.a.createElement("div",{className:"i"},s.a.createElement("img",{alt:"icon",src:t.icon})),s.a.createElement("div",{className:"ts"},O.a.unix(t.date).fromNow(!0)),s.a.createElement("div",{className:"t"},t.title?t.title.substring(0,150):""),s.a.createElement("div",{className:"d"},t.desc?t.desc.substring(0,180):"","...")))})),!0===this.state.loading&&n,!1===this.state.loading&&0===i.length&&t,r.length>0&&a)}}]),t}(a.Component);z.contextType=g;var U=z,V=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleBackButton=function(){n.state.active&&n.close()},n.close=function(){n.setState({active:!1,content:null}),window.history.replaceState(null,null," ")},n.favorite=Object(d.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.context.db_feeds_items.get(n.state._id);case 3:return(t=e.sent).favorite=!n.state.favorite,e.next=7,n.context.db_feeds_items.put(t);case 7:n.setState({favorite:t.favorite}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.warn("Unable to toggle favorite item: ".concat(n.state._id," reason: ").concat(e.t0));case 13:case"end":return e.stop()}},e,null,[[0,10]])})),n.share=function(){if(navigator&&navigator.share)navigator.share({title:n.state.title,text:n.state.title,url:n.state.link});else{var e=document.createElement("textarea");e.value=n.state.link,e.style.position="absolute",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),alert("Copied to clipboard!")}},n.state={_id:null,_rev:null,icon:null,title:null,date:null,content:null,link:null,favorite:!1,active:!1},n}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("popstate",this.handleBackButton)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("popstate",this.handleBackButton)}},{key:"componentWillReceiveProps",value:function(e){var t=e.viewer;t&&(this.setState({_id:t._id,_rev:t._rev,icon:t.icon,title:t.title,date:t.date,content:t.content,link:t.link,favorite:t.favorite||!1,active:!0}),window.location.hash=t._rev)}},{key:"render",value:function(){return s.a.createElement("div",{className:this.state.active?"App-Viewer active":"App-Viewer"},s.a.createElement("div",{className:"App-Viewer-Options"},s.a.createElement("button",{className:"App-Viewer-Options-Close",onClick:this.close},s.a.createElement(L,null)),s.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:this.state.link,onClick:this.close},s.a.createElement("button",{title:"Open to new tab"},s.a.createElement(C,null))),s.a.createElement("button",{title:"Share link",onClick:this.share},s.a.createElement(N,null)),s.a.createElement("button",{title:"Add to favorite",onClick:this.favorite},this.state.favorite?s.a.createElement(F,null):s.a.createElement(S,null))),s.a.createElement("div",{className:"App-Viewer-Title"},s.a.createElement("h1",null,s.a.createElement("img",{alt:"icon",src:this.state.icon})," ",this.state.title),s.a.createElement("p",null,O.a.unix(this.state.date).format("LLLL"))),s.a.createElement("div",{className:"App-Viewer-Content",dangerouslySetInnerHTML:{__html:this.state.content}}))}}]),t}(a.Component);V.contextType=g;var I=V,W=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).openViewer=function(e){n.setState({viewer:e})},n.state={loading:!0,viewer:null,feeds:[],feedsItems:[]},n}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=Object(d.a)(c.a.mark(function e(){var t,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.context.db_feeds_items.allDocs({include_docs:!0});case 2:return t=(t=(t=e.sent).rows.filter(function(e){return!0===e.doc.unread})).map(function(e){return e.doc}),e.next=7,this.context.db_feeds.allDocs({include_docs:!0});case 7:n=(n=e.sent).rows.map(function(e){return e.doc.unread=t.filter(function(t){return t.feedId===e.id}),e.doc.unread=e.doc.unread.map(function(e){return e._id}),console.log("Feed ".concat(e.id," has ").concat(e.doc.unread.length," unread.")),e.doc}),this.setState({loading:!1,feeds:Object(l.a)(n),feedsItems:Object(l.a)(t)});case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(B,{feeds:this.state.feeds}),s.a.createElement(U,{items:this.state.feedsItems,openViewer:this.openViewer}),s.a.createElement(I,{viewer:this.state.viewer}))}}]),t}(a.Component);W.contextType=g;var R=W,T=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function H(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(s.a.createElement(R,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat(".","/service-worker.js");T?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):H(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):H(t,e)})}}()},76:function(e,t,n){e.exports=n(131)},85:function(e,t,n){},92:function(e,t){},94:function(e,t){}},[[76,1,2]]]);
//# sourceMappingURL=main.627588ca.chunk.js.map