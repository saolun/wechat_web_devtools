"use strict";function init(){var r=require("fs"),e=require("path"),i=(require("glob"),require("../utils/tools.js"));i.noBrowser.join(",");_exports=function(i,o,n){for(var s=i.projectpath,t=e.join(s,"app.json"),p=JSON.parse(r.readFileSync(t,"utf8")),u=p.pages||[],a=0,j=u.length;a<j;a++){var l=u[a],x=e.join(s,l+".js"),c=e.join(s,l+".wxml");if(!r.existsSync(x))return void n("未找到 app.json 中定义的 "+l+" 的脚本文件。");if(!r.existsSync(c))return void n("未找到 app.json 中定义的 "+l+" 的 wxml 文件。")}n(null)}}var _exports;init(),module.exports=_exports;