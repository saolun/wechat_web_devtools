'use strict';!function(require,directRequire){const a=require('react'),b=require('./3b5f8e2469c474c8d433c1c6926d8999.js'),c=require('./875171e7b864aa58d026d4fa0999fbd1.js');class d extends a.Component{constructor(a){super(a),this.state={lazyLoaded:a.show,show:a.show}}componentWillReceiveProps(a){a.show!=this.props.show&&this.setState({show:a.show,lazyLoaded:!0})}onSelectClick(a,b){b.stopPropagation(),'function'==typeof this.props.onSelectClick&&this.props.onSelectClick(a,b)}render(){if(!this.state.lazyLoaded)return null;let b=[];this.props.list&&this.props.list.map((c,d)=>{b.push(a.createElement('div',{className:'ui-dropdown-item',key:d,onClick:this.onSelectClick.bind(this,d)},c)),this.props.divider&&0<this.props.divider.length&&0<=this.props.divider.indexOf(d)&&b.push(a.createElement('div',{className:'ui-dropdown-divider',key:`divider_${d}`}))});let d={width:this.props.width||'auto',top:this.props.top||0};return'undefined'!=typeof this.props.left&&(d.left=this.props.left),'undefined'!=typeof this.props.right&&(d.right=this.props.right),a.createElement(c,{show:this.state.show,style:d,inClassName:'ui-popover',outClassName:'ui-animate-fadeOut ui-popover'},a.createElement('div',{className:'ui-dropdown',style:{height:this.props.height||'auto'}},this.props.header?a.createElement('div',{className:'ui-dropdown-item ui-dropdown-item-simple',style:{color:'#00C777'}},' ',this.props.header,' '):null,this.props.header?a.createElement('div',{className:'ui-dropdown-divider'}):null,b))}}module.exports=d}(require('lazyload'),require);