"use strict";function init(){var e=require("../../../lib/react.js"),t=require("../../../cssStr/cssStr.js"),i=require("../../../stores/windowStores.js"),o=require("../../../config/DeviceModules.js"),s=require("../../../actions/windowActions.js"),r="devicemodules",l=e.createClass({displayName:"DeviceModules",getInitialState:function(){var e=i.getWebviewInfo(),t=e&&(e.model?e.model:"iPhone 6");return{show:!1,device:t}},handleOnClick:function(e){e.stopPropagation();var t=!this.state.show;this.setState({show:t}),s.clickToolsbar(r)},_clickToolsbar:function(e){r!=e&&this.setState({show:!1})},componentDidMount:function(){i.on("CLICK_TOOLSBAR",this._clickToolsbar),i.on("BODY_CLICK",this._clickToolsbar)},componentWillUnmount:function(){i.removeListener("CLICK_TOOLSBAR",this._clickToolsbar),i.removeListener("BODY_CLICK",this._clickToolsbar)},selectDevice:function(e){var t=o[e],i=t.screen;this.props.getSimulatorActions("S_SET_WEBVIEW_INFO",null,{height:i.vertical.height,width:i.vertical.width,device:t.title,model:t.title,dpr:i["device-pixel-ratio"],ua:t["user-agent"],os:t.os})},clickDevice:function(e){e.stopPropagation();var t=e.currentTarget,i=t.dataset;this.selectDevice(i.device),this.setState({show:!1,device:i.device})},render:function(){var i=this.state.show?{}:t.displayNone,s=[],r=this.state.show?"simulator-toolbar-model-icon-up":"simulator-toolbar-model-icon-down";for(var l in o){var c=o[l],n=c.screen.vertical,a=c.screen["device-pixel-ratio"],d="simulator-toolbar-model-content-item "+(c.title===this.state.device?"simulator-toolbar-model-content-item-current":"");s.push(e.createElement("div",{onClick:this.clickDevice,className:d,"data-device":l,key:l},e.createElement("h4",null,n.width," X ",n.height," ; Dpr: ",a),e.createElement("p",null,c.title)))}return e.createElement("div",{className:"simulator-toolbar-model",onClick:this.handleOnClick},e.createElement("p",null,this.state.device),e.createElement("i",{className:r}),e.createElement("div",{className:"simulator-toolbar-model-content",style:i},s))}});_exports=l}var _exports;init(),module.exports=_exports;