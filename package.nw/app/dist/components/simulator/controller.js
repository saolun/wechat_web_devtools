"use strict";function init(){var e=(require("fs"),require("../../lib/react.js")),t=require("../../lib/react-dom.js"),i=require("./toolbar/toolbar.js"),r=require("./webviewtab.js"),s=require("./share/webviewWeappShare.js"),a=require("querystring"),n=require("./webview.js"),o=require("../../weapp/utils/tools.js"),c=require("../../stores/webviewStores.js"),l=require("../../stores/windowStores.js"),h=require("../../actions/windowActions.js"),u=(require("../../actions/webviewActions.js"),require("../../stores/projectStores.js"),require("../../cssStr/cssStr.js")),p=(require("../../common/log/log.js"),require("../../common/request/request.js"),require("./actions/simulatorActions.js")),w=require("./webviewBackwardMask.js"),v=require("./payment/webviewpayment.js"),b=(require("../../utils/tools.js"),require("url")),f=(require("../../config/urlConfig.js"),require("../../weapp/utils/projectManager.js")),d=require("./webview/modal.js"),g=require("./webview/toast.js"),m=require("./webview/picker"),W=require("./webview/actionSheet.js"),E=require("./webview/authorizeDialog.js"),S=require("./webview/settingDialog.js"),I=require("./webview/confirm.js"),_=require("./webview/previewImage.js"),N=require("../../config/sceneConfig.js"),D=(N.getValueByScene,N.defaultScene),j=require("../../config/weappConfig.js"),T=j.default_tabheight,R=j.default_backgroundColor,A=require("./sdkimplement/index.js"),O=0,y=e.createClass({displayName:"Controller",getInitialState:function(){var e="app/html/about.html",t=0,i=0,r=0,s={},a={window:{}},n={},o={},l=c.getOffset(),u=!1,p=!1,w="",v="",b="",d="",g=this.props.project;if(g){try{if(e=f.getAppEntranceSync(g),a=f.getAppJSONSync(g),s=a.tabBar||{},g.initPath&&g.initPath.enable&&g.initPath.page)o=f.getPageJSONSync(g,g.initPath.page);else{var m=a.pages||[];o=f.getPageJSONSync(g,m[0])}}catch(t){e=""}var W=this.getTabPageIndex(e,s);u=W>-1&&this.getRouteName(s.list[W].pagePath),setTimeout(function(){h.changeUrl(e,t)})}var E=!1;return{currentWebviewID:t,topWebviewID:i,showCard:p,tabBar:s,appJSON:a,offset:l,cardInfo:n,showRecordWording:E,list:{0:{href:e,dataURI:w,preWebviewID:r,pageJSON:o,isTabbar:u,shareBtnShow:!1,shareWithTicket:!1,shareDataURI:void 0}},shareInfo:{show:!1,imgUrl:"",title:"",desc:""},uuid:v,qrcode:b,qrcodeState:d,scene:g&&g.initPath&&g.initPath.enable&&g.initPath.scene||D,beta:global.appConfig.isBeta}},createWebviewId:function(){return O++},setAnimateImg:function(e,i){var r=document.createElement("div");if(i.dataURI){var s=document.createElement("img");r.appendChild(s),s.src=i.dataURI}r.className="simulator-animate-png";var a=t.findDOMNode(this.refs["webview"+this.state.currentWebviewID]),n=a.getBoundingClientRect(),o=n.top,c=n.left,l=n.height,h=n.width;e?r.style.cssText="background-color:"+i.color+";width:"+h+"px;height:"+l+"px;top:"+o+"px;left:"+c+"px;transform:translate3d("+h+"px,0,0)":r.style.cssText="margin-top:42px;width:"+h+"px;height:"+(l-42)+"px;top:"+o+"px;left:"+c+"px;transform:translate3d(0,0,0)",global.contentDocumentBody.appendChild(r);r.offsetTop;return r},getRouteName:function(e){return b.parse(e).pathname.split(".")[0].replace(/^\//,"")},postAppRoute:function(e,t,i){if(this.props.project){var r=b.parse(e),s=r.pathname.replace(/^\//,""),a=(r.query||"").split("&"),n={};a.forEach(function(e){var t=e.split("=");n[t[0]]=t[1]}),this.getSimulatorActions("S_POSTMSG_TO_AS",null,{eventName:"onAppRoute",type:"ON_APPLIFECYCLE_EVENT",data:{path:s||"index.html",query:n,openType:i},webviewID:parseInt(t)})}},goBack:function(e,i,r,s){var a=this;if(s=s||1,this.props.project||!i.canGoBack()||r){if(e===this.state.topWebviewID||1==Object.keys(this.state.list).length)return;var n=i.src,c=this.getTabPageIndex(this.getRouteName(n));if(c>=0)return;for(var l,h=e,u=[];s--&&this.state.list[h]&&0!=h;)u.push(h),l=this.state.list[h],h=l.prevWebviewID;this.state.list[h]||(h=0);var p=t.findDOMNode(this.refs["webview"+e]),w=p.querySelector(".webviewbody"+e);w.captureVisibleRegion(function(e){var r=a.setAnimateImg(!1,{dataURI:e}),s=w.offsetWidth,n=Object.assign({},a.state.list);for(var c in u)delete n[u[c]];a.setState({list:n,currentWebviewID:h},function(){r.addEventListener("transitionend",function(){global.contentDocumentBody.removeChild(r);var e=t.findDOMNode(a.refs["webview"+h]),s=e.querySelector(".webviewbody"+h);if(a.props.project){var n=i.src,c=o.getBaseURL(a.props.project);0===n.indexOf(c)&&a.postAppRoute(s.src,a.state.currentWebviewID,"navigateBack")}for(var l in u)a.getSimulatorActions("S_DELETE_WEBVIEW",null,{webviewID:u[l]});a.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:h})}),r.style.transform="translate3d("+s+"px,0,0)"})})}else i.back()},_getOpenWebviewNum:function(){var e=this.state.list,t=1;for(var i in e)e.hasOwnProperty(i)&&e[i]&&!e[i].isTabbar&&t++;return t},_openNewWebview:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r=e.url,s=e.isMap,a=e.type,n=this.state.currentWebviewID;if(!e.isMap&&this._getOpenWebviewNum()>=5)return void i("webview count limit exceed");var o=this.state.appJSON,c={},l=R;if(!s){try{c=f.getPageJSONSync(this.props.project,r)}catch(e){}l=c.backgroundColor||o.window.backgroundColor||R}var h=this.setAnimateImg(!0,{color:l});h.style.transform="translate3d(0,0,0)",h.addEventListener("transitionend",function(){h.parentNode.removeChild(h),O++;var e=Object.assign({},t.state.list);e[O]={prevWebviewID:n,href:r,pageJSON:c,isMap:s,type:a},t.setState({currentWebviewID:O,list:e}),t.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:O}),i(null,O)})},_openNewWindowWebview:function(e){var t=this,i=e.url,r=this.getRouteName(i),s={},a=this.props.project;try{s=f.getPageJSONSync(a,i)}catch(e){}var n=(s.backgroundColor||"#ffffff",o.getBaseURL(a));i=b.resolve(n,i+".html");var c=Object.assign({},this.state.list),l={},h={};for(var u in c){var p=c[u];p.isTabbar&&(p.isTabbar===r&&(h.currentWebviewID=parseInt(u)),l[u]=p)}h.list=l;var w=!1;void 0===h.currentWebviewID&&(h.currentWebviewID=++O,h.list[O]={showUrl:!1,hideBack:!0,isTabbar:r,href:i,pageJSON:s,type:"switchTab"},w=!0);var v=h.currentWebviewID,d=h.currentWebviewID!=this.state.currentWebviewID;return this.setState(h,function(){setTimeout(function(){!w&&d&&t.postAppRoute(i,v,"switchTab"),t.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:v})},0)}),v},_changeWebviewID:function(e){this.setState({currentWebviewID:e})},_setWebviewInfo:function(e){var t=this.state.tabBar;t.list||[];e.height&&this.setState({offset:{height:e.height,width:e.width,dpr:e.dpr}})},_setWebviewSnapshot:function(e,t){var i=Object.assign({},this.state.list);i[e].dataURI=t,this.setState({list:i})},_postMessageToAllWebview:function(e){var t=this,i=e.webviewIds||[],r=0===i.length;setTimeout(function(){e.act="sendMsgFromAppService";var s=void 0;s=r?Object.keys(t.state.list):i,s.forEach(function(i){t.getSimulatorActions("S_SET_ACTION",i,e)})},17)},doSimulaterActions:function(e,i,r){var s=function(){"function"==typeof r&&r.apply(r,arguments)};switch(e){case"OPEN_NEW_WEBVIEW":this._openNewWebview(i,s);break;case"OPEN_NEW_WINDOW_WEBVIEW":this._openNewWindowWebview(i),s(null);break;case"WEBVIEW_BACK":var a=this.state.currentWebviewID,n=t.findDOMNode(this.refs["webview"+a]),o=n.querySelector(".webviewbody"+a);this.goBack(this.state.currentWebviewID,o,!1,i.delta);break;case"CAPTRUE_WEBVIEW":var c=this.state.currentWebviewID,l=t.findDOMNode(this.refs["webview"+c]),h=l.querySelector(".webviewbody"+c);h.captureVisibleRegion(function(e){s(null,e)})}},getWebviewList:function(e){return Object.assign({},this.state.list)},_upWebviewStatus:function(e,t){this.upCurrentWebviewURL(t.url)},_toggleRecordWording:function(e){this.setState({showRecordWording:e})},_onSumilatorNetworkChange:function(e){this.getSimulatorActions("S_POSTMSG_TO_AS",null,{eventName:"onNetworkStatusChange",data:{networkType:e,isConnected:"none"!=e},webviewID:parseInt(this.state.currentWebviewID)})},_onWebviewInterface:function(e,i,r,s){var a=this;if("initReady"===i){var n=t.findDOMNode(this.refs["webview"+e]),o=n.querySelector(".webviewbody"+e);setTimeout(function(){try{o.captureVisibleRegion(function(t){var i=Object.assign({},a.state.list);i[e]&&(i[e].shareDataURI=t,a.setState({list:i}))})}catch(e){}},200)}},getTabPageIndex:function(e,t){var i=o.getFileNameFromUrl(e,this.props.project).replace(/\.wxml$/,"");t=t||this.state.tabBar;var r=t.list||[],s=r.findIndex(function(e){return e.pagePath===i});return s},upCurrentWebviewURL:function(e){},getSimulatorActions:function(e,i,r){var s={currentWebviewID:this.state.currentWebviewID};if(p(e,i,r,s),"S_CHANGE_CURRENT_WEBVIEW"===e){var a=r.webviewID;if(a===this.state.currentWebviewID){var n=t.findDOMNode(this.refs["webview"+a]),o=n.querySelector("webview"),c=o.src;this.upCurrentWebviewURL(c),h.changeUrl(c,a)}}},projectHasTab:function(){var e=this.state.tabBar.list||[],t=e.length;return t&&e.length<=5&&e.length>=2},_onAppEnterForground:function(e){this.setState({scene:e.scene})},componentDidMount:function(){c.on("CHANGE_WEBVIEW_ID",this._changeWebviewID),c.on("SET_WEBVIEW_INFO",this._setWebviewInfo),c.on("AS_PUBLISH",this._postMessageToAllWebview),c.on("SET_WEBVIEW_SNAPSHOT",this._setWebviewSnapshot),c.on("UP_WEBVIEW_STATUS",this._upWebviewStatus),c.on("TOGGLE_RECORD_WORDING",this._toggleRecordWording),c.on("SET_INTERFACE_ASYNC_RES",this._onWebviewInterface),c.on("SIMULATOR_NETWORK_CHANGE",this._onSumilatorNetworkChange),l.on("APP_ENTER_FOREGROUND",this._onAppEnterForground);var e=this.props.project?1:12;chrome.fontSettings.setMinimumFontSize({pixelSize:e}),A.register(this)},componentWillUnmount:function(){c.removeListener("CHANGE_WEBVIEW_ID",this._changeWebviewID),c.removeListener("SET_WEBVIEW_INFO",this._setWebviewInfo),c.removeListener("AS_PUBLISH",this._postMessageToAllWebview),c.removeListener("SET_WEBVIEW_SNAPSHOT",this._setWebviewSnapshot),c.removeListener("UP_WEBVIEW_STATUS",this._upWebviewStatus),c.removeListener("TOGGLE_RECORD_WORDING",this._toggleRecordWording),c.removeListener("SET_INTERFACE_ASYNC_RES",this._onWebviewInterface),c.removeListener("SIMULATOR_NETWORK_CHANGE",this._onSumilatorNetworkChange),l.removeListener("APP_ENTER_FOREGROUND",this._onAppEnterForground),A.unregister(this)},chooseLocation:function(){},closeLocation:function(){},hideShare:function(){var e={show:!1};this.setState({shareInfo:e})},render:function(){var t=[];for(var o in this.state.list){var c=o==this.state.currentWebviewID?{}:u.webviewDisplayNone,l=this.state.list[o],h=this.getTabPageIndex(l.href),p=null,f=null,N=Object.assign({},this.state.offset);if(this.projectHasTab()&&h>-1){var j=this.state.tabBar.position,R={width:this.state.offset.width,margin:"0 auto"},A=e.createElement("div",{style:R},e.createElement(r,{webviewID:o,tabPageIndex:h,project:this.props.project,_openNewWindowWebview:this._openNewWindowWebview,tabBar:this.state.tabBar}));"top"===j?p=A:f=A,N.height=N.height-T}t.push(e.createElement("div",{key:o,style:c},e.createElement("div",{className:"simulator-shadow",style:{width:N.width}},e.createElement(n,{showRecordWording:this.state.showRecordWording,type:l.type,ref:"webview"+o,webviewID:o,project:this.props.project,offset:N,isTabWebview:h>-1,href:l.href,pageJSON:l.pageJSON,appJSON:this.state.appJSON,isMap:l.isMap,chooseLocation:this.chooseLocation,closeLocation:this.closeLocation,hideBack:!!l.hideBack,goBack:this.goBack,getSimulatorActions:this.getSimulatorActions,postAppRoute:this.postAppRoute,topTabDom:p,shareBtnShow:l.shareBtnShow,shareWithTicket:l.shareWithTicket}),f)))}var O=this.props.project?e.createElement(s,{shareInfo:this.state.shareInfo,hideShare:this.hideShare}):null,y=!!this.props.project,q=u.displayNone,B=void 0,C=void 0,P=u.displayNone,k=void 0;if(y){var U=this.state.list[this.state.currentWebviewID];if(U.href){var L=b.parse(U.href);q={},B=L.pathname.replace(".html","").replace(/^\//,"");var x=a.parse(L.query||""),M=[];for(var V in x)M.push(V+"="+x[V]);C=M.join("&")}C&&(P={}),k=this.state.scene||D}return e.createElement("div",{className:"simulator-wrapper"},e.createElement(i,{getSimulatorActions:this.getSimulatorActions,list:this.state.list,currentWebviewID:this.state.currentWebviewID,project:this.props.project,show:this.props.show}),e.createElement("div",{className:"simulator-list-wrapper",style:{width:this.state.offset.width}},O,t,e.createElement(W,{webviewID:this.state.currentWebviewID}),e.createElement(g,{project:this.props.project,webviewID:this.state.currentWebviewID}),e.createElement(d,{webviewID:this.state.currentWebviewID}),e.createElement(I,{webviewID:this.state.currentWebviewID}),e.createElement(m,{webviewID:this.state.currentWebviewID}),e.createElement(_,{width:this.state.offset.width,project:this.props.project}),e.createElement(v,null),e.createElement(E,null),e.createElement(S,{project:this.props.project})),e.createElement(w,null),e.createElement("div",{className:"simulator-status-bar",style:q},e.createElement("p",{className:"simulator-status-bar-item",style:this.state.beta?u.displayNone:{}},e.createElement("label",null,"场景值："),e.createElement("span",{title:k},k)),e.createElement("p",{className:"simulator-status-bar-item"},e.createElement("label",null,"页面路径："),e.createElement("span",{title:B},B)),e.createElement("p",{style:P,className:"simulator-status-bar-item"},e.createElement("label",null,"页面参数："),e.createElement("span",{title:C},C))))}});_exports=y}var _exports;init(),module.exports=_exports;