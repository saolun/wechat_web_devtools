'use strict';!function(require,directRequire){async function a(a){return new Promise(async(b,c)=>{let d=m.getAllWXSSFiles(),g=m.srcPath;var h=await i.getFileList(a);let k=0,l=[],n={};for(let a in d.forEach((a)=>{n[a]=!0}),h.forEach((a)=>{n[`${a}.wxss`]&&(k++,l.push(`./${a}.wxss`),delete n[`${a}.wxss`])}),n)l.push(`./${a}`);let o=['-db','-pc',k].concat(l),p=e(j,o,{cwd:g}),q=[],r=[];p.on('close',(a)=>{if(0===a){let a=Buffer.concat(q).toString(),c=a.split('='),d={};for(let a=0,b=c.length;a<b&&c[a+1];a+=2)d[c[a]]=c[a+1];return b(d)}let d=Buffer.concat(r).toString(),e=new Error(`编译 .wxss 文件错误，错误信息如上，可在控制台查看更详细信息`);return e.code=f,e.msgForConsole=d,c(e)}),p.stdout.on('data',(a)=>{q.push(a)}),p.stderr.on('data',(a)=>{r.push(a)})})}function b(a,b){let c=d.extname(b);'.wxss'===c?l():'plugin.json'==b&&l()}async function c(a){let c=await h(a);m&&m.srcPath==c.srcPath||(l(),m&&m.unWatch(b),m=c,m.watch(b))}const d=require('path'),{spawn:e}=require('child_process'),{TRANS_WXSS_JS_ERR:f}=require('./949d8235c744ced2a80121e4dba34c28.js'),g=require('./d28a711224425b00101635efe1034c99.js'),h=require('./a63026ab5a5a3c59a61a9749a18aa2ca.js'),i=require('./e53dfc2b83456f986002c49964f30fbf.js'),j=g.getWXSSParsePath();var k;const l=()=>{k=void 0};var m;module.exports=async function(b,d={}){let{app:e,page:f}=d;return await c(b),k||(k=await a(b)),k?e?k.comm:k[`./${f}.wxss`]||'':''}}(require('lazyload'),require);