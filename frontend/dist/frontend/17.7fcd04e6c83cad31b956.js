(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{EuZs:function(t,e,n){"use strict";n.r(e),n.d(e,"TrackModule",function(){return j});var i=n("ofXK"),s=n("tyNb"),o=n("njyG"),a=n("XNiG"),c=n("fXoL"),r=n("6uu6"),b=n("5eHb");const d=function(){return["message"]};function l(t,e){1&t&&(c.Pb(0,"tr"),c.Pb(1,"td"),c.Pb(2,"div",19),c.Pb(3,"label",20),c.Lb(4,"input",21),c.Lb(5,"span",22),c.Ob(),c.Ob(),c.Ob(),c.Pb(6,"td"),c.uc(7,"123456"),c.Ob(),c.Pb(8,"td"),c.uc(9,"01/01/2021"),c.Ob(),c.Pb(10,"td",23),c.Pb(11,"span",24),c.uc(12,"John Doe "),c.Ob(),c.Pb(13,"span",24),c.uc(14,"johndoe@gmail.com"),c.Ob(),c.Pb(15,"span",24),c.uc(16,"+91 1234567895"),c.Ob(),c.Ob(),c.Pb(17,"td",23),c.Pb(18,"span",24),c.uc(19,"Kukadia corp."),c.Ob(),c.Pb(20,"span",24),c.uc(21,"123 abcv"),c.Ob(),c.Pb(22,"span",24),c.uc(23,"Surat 395004"),c.Ob(),c.Ob(),c.Pb(24,"td"),c.uc(25,"1"),c.Ob(),c.Pb(26,"td"),c.uc(27,"$2,00,000.00"),c.Ob(),c.Pb(28,"td"),c.uc(29,"$5,00,000.00"),c.Ob(),c.Pb(30,"td"),c.Pb(31,"span",25),c.uc(32,"delivered"),c.Ob(),c.Ob(),c.Pb(33,"td"),c.Pb(34,"a",30),c.Lb(35,"img",31),c.Ob(),c.Ob(),c.Ob()),2&t&&(c.yb(34),c.ec("routerLink",c.hc(1,d)))}function g(t,e){if(1&t&&(c.Pb(0,"tbody"),c.tc(1,l,36,2,"tr",29),c.Ob()),2&t){const t=c.ac();c.yb(1),c.ec("ngForOf",t.data)}}const p=function(){return["/ship/new-ship"]};let u=(()=>{class t{constructor(t,e){this.authService=t,this.toastr=e,this.dtOptions={},this.dtTrigger=new a.a,this.data=[],this.selectedData=[]}ngOnInit(){this.dtOptions={pagingType:"simple_numbers",pageLength:25,paging:!0,processing:!0,ordering:!1,destroy:!0,scrollX:!0,scrollY:"50vh",language:{paginate:{next:'<i class="fa fa-angle-double-right"></i>',previous:'<i class="fa fa-angle-double-left"></i>',first:'<i class="fa fa-angle-double-right"></i>',last:'<i class="fa fa-angle-double-left"></i>'}}},this.getDbData().then(t=>{this.dtTrigger.next()})}getDbData(){return new Promise((t,e)=>{this.data=[],this.authService.get("track").subscribe(e=>{this.data=e.data,console.log(this.data),t(e)})})}reload(){this.getDbData().then(t=>{this.dtTrigger.next()})}rerender(){this.dtTrigger.next()}}return t.\u0275fac=function(e){return new(e||t)(c.Kb(r.a),c.Kb(b.b))},t.\u0275cmp=c.Eb({type:t,selectors:[["app-track"]],viewQuery:function(t,e){if(1&t&&c.yc(o.a,1),2&t){let t;c.kc(t=c.Xb())&&(e.datatableElement=t.first)}},decls:122,vars:5,consts:[[1,"row","row-space-class"],[1,"col-12"],[1,"position-relative"],[1,"top-tabs-pos"],[1,"cust-tabs-emp"],["role","tablist",1,"nav","nav-pills","justify-content-center"],["role","presentation",1,"nav-item"],["id","pills-Incoming-tab","data-toggle","pill","href","#pills-Incoming","role","tab","aria-controls","pills-Incoming","aria-selected","true",1,"nav-link","active"],["id","pills-Outgoing-tab","data-toggle","pill","href","#pills-Outgoing","role","tab","aria-controls","pills-Outgoing","aria-selected","false",1,"nav-link"],[1,"tab-content"],["id","pills-Incoming","role","tabpanel","aria-labelledby","pills-Incoming-tab",1,"tab-pane","fade","show","active"],[1,"comn-title-tag","d-xl-flex","align-items-center","justify-content-between"],[1,"mr-auto","position-relative"],[1,"ml-auto","text-center","position-relative","mt-4","mt-xl-0"],["type","button",1,"btn-white","mr-sm-2","mr-1"],[1,"btn-white","mr-sm-2","mr-1","d-inline-block",3,"routerLink"],["type","button",1,"btn-white"],[1,"dash-white-bx"],["id","incoming-shipment-list",1,"display"],[1,"cust-checkbox-new"],[1,"cust-chk-bx"],["type","checkbox"],[1,"cust-chkmark"],[1,"text-left"],[1,"d-block"],[1,"status-class","status-delivered"],["id","pills-Outgoing","role","tabpanel","aria-labelledby","pills-Outgoing-tab",1,"tab-pane","fade"],["datatable","","id","outgoing-shipment-list",1,"display",3,"dtOptions","dtTrigger"],[4,"ngIf"],[4,"ngFor","ngForOf"],[3,"routerLink"],["src","assets/images/chat-icon.svg","alt",""]],template:function(t,e){1&t&&(c.Pb(0,"div",0),c.Pb(1,"div",1),c.Pb(2,"div",2),c.Pb(3,"div",3),c.Pb(4,"div",4),c.Pb(5,"ul",5),c.Pb(6,"li",6),c.Pb(7,"a",7),c.uc(8,"Incoming Shipment"),c.Ob(),c.Ob(),c.Pb(9,"li",6),c.Pb(10,"a",8),c.uc(11,"Outgoing Shipment"),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Pb(12,"div",9),c.Pb(13,"div",10),c.Pb(14,"div",11),c.Pb(15,"h1",12),c.uc(16,"Track"),c.Ob(),c.Pb(17,"div",13),c.Pb(18,"button",14),c.uc(19," Save & Close "),c.Ob(),c.Pb(20,"a",15),c.uc(21,"Save & New"),c.Ob(),c.Pb(22,"button",16),c.uc(23,"Clear"),c.Ob(),c.Ob(),c.Ob(),c.Pb(24,"div",17),c.Pb(25,"table",18),c.Pb(26,"thead"),c.Pb(27,"tr"),c.Pb(28,"th"),c.Pb(29,"div",19),c.Pb(30,"label",20),c.Lb(31,"input",21),c.Lb(32,"span",22),c.Ob(),c.Ob(),c.Ob(),c.Pb(33,"th"),c.uc(34,"Tracking number"),c.Ob(),c.Pb(35,"th"),c.uc(36,"Shipment date"),c.Ob(),c.Pb(37,"th"),c.uc(38,"Customer Detail"),c.Ob(),c.Pb(39,"th"),c.uc(40,"Shipping Detail"),c.Ob(),c.Pb(41,"th"),c.uc(42,"Total carats"),c.Ob(),c.Pb(43,"th"),c.uc(44,"Total value"),c.Ob(),c.Pb(45,"th"),c.uc(46,"total"),c.Ob(),c.Pb(47,"th"),c.uc(48,"Status"),c.Ob(),c.Ob(),c.Ob(),c.Pb(49,"tbody"),c.Pb(50,"tr"),c.Pb(51,"td"),c.Pb(52,"div",19),c.Pb(53,"label",20),c.Lb(54,"input",21),c.Lb(55,"span",22),c.Ob(),c.Ob(),c.Ob(),c.Pb(56,"td"),c.uc(57,"123456"),c.Ob(),c.Pb(58,"td"),c.uc(59,"01/01/2021"),c.Ob(),c.Pb(60,"td",23),c.Pb(61,"span",24),c.uc(62,"John Doe "),c.Ob(),c.Pb(63,"span",24),c.uc(64,"johndoe@gmail.com"),c.Ob(),c.Pb(65,"span",24),c.uc(66,"+91 1234567895"),c.Ob(),c.Ob(),c.Pb(67,"td",23),c.Pb(68,"span",24),c.uc(69,"Kukadia corp."),c.Ob(),c.Pb(70,"span",24),c.uc(71,"123 abcv"),c.Ob(),c.Pb(72,"span",24),c.uc(73,"Surat 395004"),c.Ob(),c.Ob(),c.Pb(74,"td"),c.uc(75,"1"),c.Ob(),c.Pb(76,"td"),c.uc(77,"$2,00,000.00"),c.Ob(),c.Pb(78,"td"),c.uc(79,"$5,00,000.00"),c.Ob(),c.Pb(80,"td"),c.Pb(81,"span",25),c.uc(82,"delivered"),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Pb(83,"div",26),c.Pb(84,"div",11),c.Pb(85,"h1",12),c.uc(86,"Track"),c.Ob(),c.Pb(87,"div",13),c.Pb(88,"button",14),c.uc(89," Save & Close "),c.Ob(),c.Pb(90,"button",14),c.uc(91," Save & New "),c.Ob(),c.Pb(92,"button",16),c.uc(93,"Clear"),c.Ob(),c.Ob(),c.Ob(),c.Pb(94,"div",17),c.Pb(95,"table",27),c.Pb(96,"thead"),c.Pb(97,"tr"),c.Pb(98,"th"),c.Pb(99,"div",19),c.Pb(100,"label",20),c.Lb(101,"input",21),c.Lb(102,"span",22),c.Ob(),c.Ob(),c.Ob(),c.Pb(103,"th"),c.uc(104,"Tracking Number"),c.Ob(),c.Pb(105,"th"),c.uc(106,"Shipment Date"),c.Ob(),c.Pb(107,"th"),c.uc(108,"Customer Detail"),c.Ob(),c.Pb(109,"th"),c.uc(110,"Shipping Detail"),c.Ob(),c.Pb(111,"th"),c.uc(112,"Total Carats"),c.Ob(),c.Pb(113,"th"),c.uc(114,"Total Value"),c.Ob(),c.Pb(115,"th"),c.uc(116,"Total"),c.Ob(),c.Pb(117,"th"),c.uc(118,"Status"),c.Ob(),c.Pb(119,"th"),c.uc(120,"Action"),c.Ob(),c.Ob(),c.Ob(),c.tc(121,g,2,1,"tbody",28),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob()),2&t&&(c.yb(20),c.ec("routerLink",c.hc(4,p)),c.yb(75),c.ec("dtOptions",e.dtOptions)("dtTrigger",e.dtTrigger),c.yb(26),c.ec("ngIf",0!=(null==e.data?null:e.data.length)))},directives:[s.e,o.a,i.m,i.l],styles:[".top-tabs-pos[_ngcontent-%COMP%]{position:absolute;left:0;right:0;top:21px}.status-class[_ngcontent-%COMP%]{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;display:inline-block;font-size:14px;font-weight:600;text-transform:capitalize;padding:9px 20px 8px;min-width:110px}.status-delivered[_ngcontent-%COMP%]{background:rgba(40,199,111,.12);color:#28c76f}.status-cancelled[_ngcontent-%COMP%]{background:rgba(234,84,85,.12);color:#ea5455}.status-hold[_ngcontent-%COMP%]{background:rgba(0,207,232,.12);color:#00cfe8}.status-processing[_ngcontent-%COMP%]{background:rgba(115,103,240,.12);color:#7367f0}.table-detls-section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-weight:600;font-size:16px;line-height:23px;color:#000;display:inline-block;vertical-align:top}.table-detls-section[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500}.table-detls-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{text-align:left}@media (max-width:1450px){.top-tabs-pos[_ngcontent-%COMP%]{left:-350px}}@media (max-width:1199px){.top-tabs-pos[_ngcontent-%COMP%]{left:0;top:15px}}@media (max-width:767px){.comn-title-tag[_ngcontent-%COMP%]   .ml-auto[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.comn-title-tag[_ngcontent-%COMP%]   .ml-auto[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-width:auto;flex-basis:0;flex-grow:1;max-width:100%;white-space:nowrap;padding:9px 5px;font-size:12px}.top-tabs-pos[_ngcontent-%COMP%]{position:unset;margin-top:15px}.ord-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}}@media (max-width:575px){.comn-title-tag[_ngcontent-%COMP%]   .ml-auto[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:10px}.cust-tabs-emp[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{padding:8px 10px;font-size:13px}}"]}),t})();var h=n("10Wk"),m=n("3Pt+");function O(t,e){if(1&t){const t=c.Qb();c.Pb(0,"div"),c.Pb(1,"div",20),c.Wb("click",function(){c.nc(t);const n=e.$implicit;return c.ac().onSelectedUser(n)}),c.uc(2),c.Ob(),c.Lb(3,"br"),c.Ob()}if(2&t){const t=e.$implicit;c.yb(2),c.wc(" ",t.name," ")}}function P(t,e){if(1&t&&(c.Pb(0,"span"),c.uc(1),c.Ob()),2&t){const t=c.ac().$implicit;c.yb(1),c.vc(t.msg)}}function f(t,e){1&t&&(c.Pb(0,"span"),c.uc(1,"Online"),c.Ob())}function x(t,e){if(1&t&&(c.Pb(0,"span"),c.uc(1),c.bc(2,"date"),c.Ob()),2&t){const t=c.ac().$implicit;c.yb(1),c.vc(c.dc(2,1,t.lastOnline,"yyyy-MM-dd hh:mm"))}}function v(t,e){if(1&t&&(c.Pb(0,"span"),c.uc(1),c.Ob()),2&t){const t=c.ac(2);c.yb(1),c.vc(t.todayDate)}}const _=function(t){return{"active-chat-div":t}};function C(t,e){if(1&t){const t=c.Qb();c.Pb(0,"div",21),c.Wb("click",function(){c.nc(t);const n=e.$implicit,i=c.ac();return[i.selectedUser=n,i.onChatSelectUser(n)]}),c.Pb(1,"div",8),c.Pb(2,"div",22),c.Pb(3,"div",23),c.Lb(4,"img",24),c.Ob(),c.Pb(5,"div",25),c.Pb(6,"p"),c.uc(7),c.Ob(),c.tc(8,P,2,1,"span",26),c.tc(9,f,2,0,"span",26),c.Ob(),c.Pb(10,"div",27),c.tc(11,x,3,4,"span",26),c.tc(12,v,2,1,"span",26),c.Pb(13,"div",28),c.Lb(14,"img",29),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob()}if(2&t){const t=e.$implicit,n=c.ac();c.ec("ngClass",c.ic(7,_,n.selectedUser==t)),c.yb(7),c.vc(t.name),c.yb(1),c.ec("ngIf",t.msg),c.yb(1),c.ec("ngIf",t.isOnline&&!t.msg),c.yb(2),c.ec("ngIf",t.lastOnline),c.yb(1),c.ec("ngIf",!t.lastOnline),c.yb(2),c.ec("src",0==t.status?"assets/images/single_tick.svg":1==t.status?"assets/images/gray_tick.svg":2==t.status?"assets/images/blue_tick.svg":"assets/images/pending_tick.svg",c.pc)}}function M(t,e){1&t&&(c.Pb(0,"span"),c.uc(1,"Online"),c.Ob())}function w(t,e){if(1&t&&(c.Pb(0,"span"),c.uc(1),c.bc(2,"date"),c.Ob()),2&t){const t=c.ac(2);c.yb(1),c.wc("Last Online: ",c.dc(2,1,null==t.selectedUser?null:t.selectedUser.lastOnline,"yyyy-MM-dd hh:mm"),"")}}function y(t,e){if(1&t&&(c.Pb(0,"p"),c.uc(1),c.Ob()),2&t){const t=c.ac().index,e=c.ac().$implicit,n=c.ac(2);c.yb(1),c.vc(n.parseJson(e.msg[t]).msg)}}const k=function(t,e){return{"incoming-chat":t,"outgoing-chat":e}};function S(t,e){if(1&t&&(c.Pb(0,"div",57),c.Pb(1,"div",58),c.Pb(2,"span"),c.uc(3),c.Ob(),c.tc(4,y,2,1,"p",26),c.Pb(5,"div",28),c.Lb(6,"img",29),c.Ob(),c.Pb(7,"div",59),c.Lb(8,"img",29),c.Ob(),c.Ob(),c.Ob()),2&t){const t=e.index,n=c.ac().$implicit,i=c.ac(2);c.ec("ngClass",c.jc(5,k,i.currentUser.id!=n.from_id[t],i.currentUser.id==n.from_id[t])),c.yb(3),c.vc(n.time[t]),c.yb(1),c.ec("ngIf",n.msg),c.yb(2),c.ec("src",0==n.status[t]?"assets/images/single_tick.svg":1==n.status[t]?"assets/images/gray_tick.svg":2==n.status[t]?"assets/images/blue_tick.svg":"assets/images/pending_tick.svg",c.pc),c.yb(2),c.ec("src",i.currentUser.id!=n.from_id[t]?"assets/images/tri-shap.svg":"assets/images/tri-shap-2.svg",c.pc)}}function U(t,e){if(1&t&&(c.Pb(0,"div",54),c.Pb(1,"span",55),c.uc(2),c.bc(3,"date"),c.Ob(),c.tc(4,S,9,8,"div",56),c.Ob()),2&t){const t=e.$implicit;c.yb(2),c.vc(c.dc(3,2,t.date,"yyyy-MM-dd")),c.yb(2),c.ec("ngForOf",t.id)}}function z(t,e){if(1&t){const t=c.Qb();c.Pb(0,"div",30),c.Pb(1,"div",31),c.Pb(2,"div",32),c.Pb(3,"div",8),c.Pb(4,"div",33),c.Pb(5,"div",23),c.Lb(6,"img",29),c.Ob(),c.Pb(7,"div",25),c.Pb(8,"p"),c.uc(9),c.Ob(),c.tc(10,M,2,0,"span",26),c.tc(11,w,3,4,"span",26),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Pb(12,"div",34),c.tc(13,U,5,5,"div",35),c.Ob(),c.Pb(14,"div",36),c.Pb(15,"div",37),c.Pb(16,"input",38),c.Wb("ngModelChange",function(e){return c.nc(t),c.ac().message=e}),c.Ob(),c.Pb(17,"div",39),c.Pb(18,"span",40),c.Pb(19,"a",41),c.Wb("click",function(){return c.nc(t),c.ac().onFilesButton()}),c.Lb(20,"img",42),c.Ob(),c.Pb(21,"div",43),c.Pb(22,"ul",44),c.Pb(23,"li"),c.Pb(24,"div",45),c.Pb(25,"a",46),c.Lb(26,"img",47),c.Ob(),c.Pb(27,"input",48),c.Wb("change",function(e){return c.nc(t),c.ac().onFileUpload(e)}),c.Ob(),c.Ob(),c.Ob(),c.Pb(28,"li"),c.Pb(29,"div",45),c.Pb(30,"a",46),c.Lb(31,"img",49),c.Ob(),c.Pb(32,"input",50),c.Wb("change",function(e){return c.nc(t),c.ac().onFileUpload(e)}),c.Ob(),c.Ob(),c.Ob(),c.Pb(33,"li"),c.Pb(34,"div",45),c.Pb(35,"a",46),c.Lb(36,"img",51),c.Ob(),c.Pb(37,"input",52),c.Wb("change",function(e){return c.nc(t),c.ac().onFileUpload(e)}),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Pb(38,"a",41),c.Wb("click",function(){return c.nc(t),c.ac().onSend()}),c.Lb(39,"img",53),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob()}if(2&t){const t=c.ac();c.yb(6),c.ec("src",t.selectedUser?t.selectedUser.avatar:"assets/images/users-icon.png",c.pc),c.yb(3),c.vc(null==t.selectedUser?null:t.selectedUser.name),c.yb(1),c.ec("ngIf",null==t.selectedUser?null:t.selectedUser.isOnline),c.yb(1),c.ec("ngIf",!(null!=t.selectedUser&&t.selectedUser.isOnline)),c.yb(2),c.ec("ngForOf",t.userChat),c.yb(3),c.ec("ngModel",t.message)}}function I(t,e){if(1&t&&(c.Pb(0,"p"),c.uc(1),c.Ob()),2&t){const t=c.ac(2);c.yb(1),c.vc(null==t.selectedUser?null:t.selectedUser.bio)}}function L(t,e){1&t&&(c.Pb(0,"p"),c.uc(1," It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web site still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). "),c.Ob())}function T(t,e){if(1&t&&(c.Pb(0,"div",60),c.Pb(1,"div",61),c.Pb(2,"div",62),c.Lb(3,"img",29),c.Pb(4,"span"),c.uc(5),c.Ob(),c.Ob(),c.Pb(6,"div",63),c.Pb(7,"div",64),c.Pb(8,"span"),c.uc(9,"Email."),c.Ob(),c.Pb(10,"span"),c.uc(11),c.Ob(),c.Ob(),c.Pb(12,"div",64),c.Pb(13,"span"),c.uc(14,"Mobile No."),c.Ob(),c.Pb(15,"span"),c.uc(16),c.Ob(),c.Ob(),c.tc(17,I,2,1,"p",26),c.tc(18,L,2,0,"p",26),c.Ob(),c.Ob(),c.Ob()),2&t){const t=c.ac();c.yb(3),c.ec("src",t.selectedUser?t.selectedUser.avatar:"assets/images/prf-section-img.png",c.pc),c.yb(2),c.vc(null==t.selectedUser?null:t.selectedUser.name),c.yb(6),c.vc(null==t.selectedUser?null:t.selectedUser.email),c.yb(5),c.vc(null==t.selectedUser?null:t.selectedUser.mobile_no),c.yb(1),c.ec("ngIf",null==t.selectedUser?null:t.selectedUser.bio),c.yb(1),c.ec("ngIf",!(null!=t.selectedUser&&t.selectedUser.bio))}}function D(t,e){1&t&&(c.Pb(0,"div",30),c.Pb(1,"p"),c.uc(2,"Welcome to Chat..."),c.Ob(),c.Ob())}const E=[{path:"",component:u},{path:"message",component:(()=>{class t{constructor(t,e,n){this.authService=t,this.socketService=e,this.toastr=n,this.search=[],this.users=[],this.userChat=[],this.message="",this.currentUser=localStorage.getItem("loginUser")?JSON.parse(localStorage.getItem("loginUser")):JSON.parse(sessionStorage.getItem("loginUser")),this.socketService.listen("CHAT_RECIEVE").subscribe(t=>{this.userChat.map(e=>(e.date.split("T")[0]==new Date(t.data.timestamp).toISOString().split("T")[0]&&(e.id.push(t.data.id),e.from_id.push(t.data.from_id),e.to_id.push(t.data.to_id),e.msg.push(t.data.msg),e.status.push(t.data.status),e.time.push(new Date(t.data.timestamp).toISOString().split("T")[1].split(".")[0]),t.data.from_id==this.currentUser.id&&(e.status[e.id.indexOf(t.data.id)]=t.data.status)),e))}),this.socketService.listen("CHAT_PENDING").subscribe(t=>{this.userChat.map(e=>(e.date.split("T")[0]==new Date(t.data.timestamp).toISOString().split("T")[0]&&(e.id.push(t.data.id),e.from_id.push(t.data.from_id),e.to_id.push(t.data.to_id),e.msg.push(t.data.msg),e.status.push(t.data.status),e.time.push(new Date(t.data.timestamp).toISOString().split("T")[1].split(".")[0]),e.status[e.id.indexOf(t.data.id)]=t.data.status),e))}),this.socketService.listen("LATEST_CONNECTED_USER").subscribe(t=>{this.selectedUser.id==t.user_id&&(this.selectedUser.isOnline=1)}),this.socketService.listen("LATEST_DISCONNECTED_USER").subscribe(t=>{this.selectedUser.id==t.user_id&&(this.selectedUser.isOnline=0)}),this.socketService.listen("SERVER_ERROR").subscribe(t=>{console.log(t),this.toastr.info(t.message)})}ngOnInit(){this.todayDate=(new Date).toISOString().split("T")[0],this.authService.get("user-chat").subscribe(t=>{this.users=t.data})}onSelectedUser(t){this.users.push(t),this.search=[]}onChatSelectUser(t){this.userChat=[],this.authService.get(`user-chat/${t.user_id}`).subscribe(t=>{this.userChat=t.data,this.selectedUser=Object.assign(Object.assign({},this.selectedUser),t.userData)})}onFilesButton(){document.getElementById("add-menu-icon").classList.contains("show-class")?document.getElementById("add-menu-icon").classList.remove("show-class"):document.getElementById("add-menu-icon").classList.add("show-class")}onFileUpload(t){let e=t.target.files[0],n=new FormData;n.append("file",e,e.name),n.append("from_id",this.currentUser.id),n.append("to_id",this.selectedUser.user_id),this.authService.post("chat-file",n).subscribe(t=>{this.toastr.success(t.message)})}onSearch(t){t&&this.authService.get(`search-users/${t}`).subscribe(t=>{this.search=t.data})}onSend(){this.socketService.emit("CHAT_SEND",{from_id:this.currentUser.id,to_id:this.selectedUser.user_id,msg:this.message})}parseJson(t){return JSON.parse(t)}ngAfterViewInit(){$(window).width()<=991&&($(document).on("click",".left-sde-body-inr",function(){$(".chatdiv").show(),$(".left-sde-body").hide(),$(".mobile-super-admin").hide()}),$(document).on("click",".mbl-text-show",function(){$(".chatdiv").hide(),$(".mobile-super-admin").show()}),$(document).on("click",".respns-arrow-class",function(){$(".mobile-super-admin").hide(),$(".chatdiv").show(),$(".left-sde-body").show()}))}}return t.\u0275fac=function(e){return new(e||t)(c.Kb(r.a),c.Kb(h.a),c.Kb(b.b))},t.\u0275cmp=c.Eb({type:t,selectors:[["app-message"]],decls:22,vars:5,consts:[[1,"row","row-space-class"],[1,"col-12","mt-3"],[1,"dash-white-bx","mb-0"],[1,"main-chat-scrl-div"],[1,"row"],[1,"col-xl-3","col-lg-4","d-flex","flex-column","mb-lg-0","mb-3"],[1,"left-sde-chat-bg"],[1,"src-box-main-chart"],[1,"d-flex","align-items-center"],["src","assets/images/arrow-left-reponsive.svg","alt","",1,"respns-arrow-class","d-lg-none","mr-3"],[1,"input-group","my-3","cust-input-class"],[1,"input-group-prepend"],[1,"input-group-text","border-left"],["src","assets/images/search-icon.svg","alt",""],["type","text","placeholder","Search Name or Email",1,"form-control","input-style","border-left-0",3,"input"],[4,"ngFor","ngForOf"],[1,"left-sde-body"],["class","left-sde-body-inr",3,"ngClass","click",4,"ngFor","ngForOf"],["class","chatdiv col-xl col-lg-4 flex-column mb-lg-0 mb-3",4,"ngIf"],["class","col-xl-3 col-lg-4 mobile-super-admin",4,"ngIf"],[1,"input-style",3,"click"],[1,"left-sde-body-inr",3,"ngClass","click"],[1,"d-flex","align-items-center","lft-text-inr","w-100"],[1,"lft-text-inr-imgs"],["src","assets/images/users-icon.png","alt",""],[1,"ml-2"],[4,"ngIf"],[1,"ml-auto","text-right"],[1,"message-status-image-div"],["alt","",3,"src"],[1,"chatdiv","col-xl","col-lg-4","flex-column","mb-lg-0","mb-3"],[1,"chat-src-box-inner","mb_chat_section"],[1,"d-flex","align-items-center","justify-content-between","mbl-text-show"],[1,"d-flex","align-items-center","lft-text-inr"],[1,"chat-container-wrapper"],["class","chat-bubble-main",4,"ngFor","ngForOf"],[1,"chat-text-field","mt-auto"],[1,"input-group"],["type","text","name","message","placeholder","Type Messege here.....",1,"form-control",3,"ngModel","ngModelChange"],[1,"input-group-append"],[1,"input-group-text"],["href","javascript:void(0)",3,"click"],["src","assets/images/add-icon.svg","alt",""],["id","add-menu-icon",1,"add-menu-icon"],[1,"add-menu-icon-inner","d-flex","flex-column"],[1,"upload-btn-wrapper"],["href","javascript:void(0)"],["src","assets/images/icon-file-menu.svg","alt",""],["type","file","name","pdf","accept","application/pdf",3,"change"],["src","assets/images/image-icon.svg","alt",""],["type","file","name","image","accept","image/*",3,"change"],["src","assets/images/film-icon.svg","alt",""],["type","file","name","film",3,"change"],["src","assets/images/send-icon.svg","alt",""],[1,"chat-bubble-main"],[1,"date-time-row"],["class","chat-bubble",3,"ngClass",4,"ngFor","ngForOf"],[1,"chat-bubble",3,"ngClass"],[1,"chat-message"],[1,"shap-pos"],[1,"col-xl-3","col-lg-4","mobile-super-admin"],[1,"right-side-chat-section"],[1,"right-side-chat-section-top","text-center","p-3"],[1,"right-side-chat-section-btm"],[1,"d-flex","align-items-center","justify-content-between","right-side-chat-section-btm-top"]],template:function(t,e){1&t&&(c.Pb(0,"div",0),c.Pb(1,"div",1),c.Pb(2,"div",2),c.Pb(3,"div",3),c.Pb(4,"div",4),c.Pb(5,"div",5),c.Pb(6,"div",6),c.Pb(7,"div",7),c.Pb(8,"p",8),c.Lb(9,"img",9),c.uc(10," Messaging "),c.Ob(),c.Pb(11,"div",10),c.Pb(12,"div",11),c.Pb(13,"span",12),c.Lb(14,"img",13),c.Ob(),c.Ob(),c.Pb(15,"input",14),c.Wb("input",function(t){return e.onSearch(t.target.value)}),c.Ob(),c.Ob(),c.tc(16,O,4,1,"div",15),c.Ob(),c.Pb(17,"div",16),c.tc(18,C,15,9,"div",17),c.Ob(),c.Ob(),c.Ob(),c.tc(19,z,40,6,"div",18),c.tc(20,T,19,6,"div",19),c.tc(21,D,3,0,"div",18),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob()),2&t&&(c.yb(16),c.ec("ngForOf",e.search),c.yb(2),c.ec("ngForOf",e.users),c.yb(1),c.ec("ngIf",e.selectedUser),c.yb(1),c.ec("ngIf",e.selectedUser),c.yb(1),c.ec("ngIf",!e.selectedUser))},directives:[i.l,i.m,i.k,m.b,m.j,m.m],pipes:[i.d],styles:['.main-chat-scrl-div[_ngcontent-%COMP%]{height:calc(100vh - 180px);overflow:hidden}.left-sde-chat-bg[_ngcontent-%COMP%]{background:#fff;border:1px solid #f1f5f8;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;padding:0}.src-box-main-chart[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px}.src-box-main-chart[_ngcontent-%COMP%]{padding:15px 15px 0}.src-box-main-chart[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-left:10px}.lft-text-inr-imgs[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{background:#f8f8f8;border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;width:50px;min-width:50px;height:50px}.lft-text-inr[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-transform:capitalize;margin-bottom:5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lft-text-inr[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .lft-text-inr[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--color-dark);font-size:13px}.lft-text-inr[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500}.left-sde-body-inr[_ngcontent-%COMP%]{padding:15px;border-top:1px solid rgba(203,213,220,.5);cursor:pointer}.active-chat-div.left-sde-body-inr[_ngcontent-%COMP%]{border-top:0}.left-sde-body-inr-info-div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#232323;font-size:13px;text-transform:capitalize;margin-bottom:5px;font-weight:700}.left-sde-body-inr-info-div[_ngcontent-%COMP%]{border:.402174px solid #cbd5dc;border-radius:4.02174px;-webkit-border-radius:4.02174px;-moz-border-radius:4.02174px;display:flex;align-items:center;justify-content:space-between;padding:15px 7px 15px 15px;position:relative;overflow:hidden}.left-sde-body-inr-info-div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--color-dark);font-size:13px;font-weight:500}.sde-body-inr-info[_ngcontent-%COMP%]{padding:0 15px 0 20px;position:relative}.sde-body-inr-info[_ngcontent-%COMP%]:before{position:absolute;content:"";top:0;bottom:0;border-left:.402174px solid #cbd5dc;left:0;height:100vh;margin-top:auto;margin-bottom:auto}.left-sde-body[_ngcontent-%COMP%]{height:calc(100vh - 300px)}.chat-container-wrapper[_ngcontent-%COMP%], .left-sde-body[_ngcontent-%COMP%]{overflow-y:auto;max-height:100%;overflow-x:hidden}.chat-container-wrapper[_ngcontent-%COMP%]{height:calc(100vh - 345px)}.chat-bubble-imgs[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%}.chat-message[_ngcontent-%COMP%]{background:#f8f8f8;border-radius:5.93027px;-webkit-border-radius:5.93027px;-moz-border-radius:5.93027px;padding:10px;position:relative}.chat-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--color-dark);font-size:14px;margin-bottom:5px;font-weight:600}.chat-message[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--color-dark);font-size:13px;font-weight:500;text-align:right;display:block}.incoming-chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]{margin-left:15px}.outgoing-chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]{margin-right:15px;background:#dbf1dc}.chat-bubble-imgs[_ngcontent-%COMP%]{text-align:center;width:110px}.chat-bubble-imgs[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#232323;font-size:13px;text-transform:capitalize;margin-bottom:0;margin-top:5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chat-bubble[_ngcontent-%COMP%]{padding:10px 0;display:flex;align-items:flex-end}.outgoing-chat[_ngcontent-%COMP%]{justify-content:flex-end}.shap-pos[_ngcontent-%COMP%]{position:absolute;left:-15px;bottom:-3px}.outgoing-chat[_ngcontent-%COMP%]   .shap-pos[_ngcontent-%COMP%]{right:-10px;left:auto;bottom:-4px}.chat-text-field[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{background:#dbf1dc;border:.5px solid rgba(3,54,3,.1);border-radius:30px;-webkit-border-radius:30px;-moz-border-radius:30px;box-shadow:none;-webkit-box-shadow:none;-moz-box-shadow:none;outline:none;color:var(--thm-color);padding:10px 50px 10px 12px;height:55px;font-weight:600;border-right:0}.chat-text-field[_ngcontent-%COMP%]   .input-group-text[_ngcontent-%COMP%]{background:#dbf1dc;border-left:0;border-top-right-radius:30px;-webkit-border-top-right-radius:30px;-moz-border-top-right-radius:30px;border-bottom-right-radius:30px;-webkit-border-bottom-right-radius:30px;-moz-border-bottom-right-radius:30px}.chat-text-field[_ngcontent-%COMP%]   .input-group-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:25px;margin:0 8px}.lft-text-inr[_ngcontent-%COMP%]   .ml-2[_ngcontent-%COMP%]{display:grid}.upload-btn-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{filter:brightness(0) invert(1);-webkit-filter:brightness(0) invert(1);-moz-filter:brightness(0) invert(1)}.text-top[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#232323;font-size:13px;text-transform:capitalize;margin-bottom:5px;font-weight:700}.text-top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--color-dark);font-size:13px;font-weight:500}.input-group-text[_ngcontent-%COMP%]{background:#fff;border-left:0;position:relative}.chat-src-box-inner[_ngcontent-%COMP%]{padding:10px;background:#033603;border-radius:5px 5px 0 0}.chat-src-box-inner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .chat-src-box-inner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--color-white)}.chatdiv[_ngcontent-%COMP%]{background:#fff;border:1px solid #e2e2e2;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;padding:15px;display:flex}.active-chat-div[_ngcontent-%COMP%]{background:#dbf1dc}.message-status-image-div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:15px}.left-sde-body-inr[_ngcontent-%COMP%]   .ml-auto.text-right[_ngcontent-%COMP%]{min-width:100px}.src-box-main-chart[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px;font-weight:600;color:var(--color-dark)}.cust-input-class[_ngcontent-%COMP%]   .input-style[_ngcontent-%COMP%]{border-radius:0 25px 25px 0;-webkit-border-radius:0 25px 25px 0;-moz-border-radius:0 25px 25px 0;box-shadow:none;border:1px solid #ced4da;height:40px;padding-left:0;background-color:var(--color-white)}.cust-input-class[_ngcontent-%COMP%]   .input-group-text[_ngcontent-%COMP%]{border-radius:25px 0 0 25px;-webkit-border-radius:25px 0 0 25px;-moz-border-radius:25px 0 0 25px;padding:0 13px}.cust-input-class[_ngcontent-%COMP%]   .input-group-text[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:18px}.date-time-row[_ngcontent-%COMP%]{font-weight:600;font-size:14px;color:#838282;text-transform:uppercase;text-align:center;display:block;padding:5px}.right-side-chat-section[_ngcontent-%COMP%]{background:#fff;border:1px solid #e2e2e2;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;height:calc(100vh - 180px);padding:15px;overflow-x:hidden;overflow-y:auto}.right-side-chat-section-top[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;height:80px;object-fit:cover;object-position:center}.right-side-chat-section-top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:700;font-size:20px;line-height:25px;display:block;text-align:center;color:#033603;margin-top:10px}.right-side-chat-section-btm[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:400;font-size:16px;line-height:27px;text-align:justify;color:#000;font-weight:500}.right-side-chat-section-btm-top[_ngcontent-%COMP%]{border-bottom:1px solid rgba(203,213,220,.5);padding:10px 0;margin-bottom:10px}.right-side-chat-section-btm-top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:16px;line-height:20px;text-align:right;color:#000;text-transform:capitalize;font-weight:500}.add-menu-icon[_ngcontent-%COMP%]{position:absolute;list-style:none;text-align:right;top:0;opacity:0;visibility:hidden;transition:all .3s;-webkit-transition:all .3s;-moz-transition:all .3s;-ms-transition:all .3s;-o-transition:all .3s;transform:translate(-3px,-100%);-moz-transform:translate(-3px,-100%);-webkit-transform:translate(-3px,-100%);-o-transform:translate(-3px,-100%);-ms-transform:translate(-3px,-100%)}.show-class[_ngcontent-%COMP%]{opacity:1;visibility:visible}.upload-btn-wrapper[_ngcontent-%COMP%]{position:relative;overflow:hidden;display:inline-block}.add-menu-icon-inner[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .upload-btn-wrapper[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{padding:10px;margin-bottom:5px;display:flex;align-items:center;justify-content:center;background:var(--thm-color)}.add-menu-icon-inner[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .upload-btn-wrapper[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .upload-btn-wrapper[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]{border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;width:45px;height:45px}.upload-btn-wrapper[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]{z-index:5;cursor:pointer;position:absolute;left:0;top:0;opacity:0}@media (max-width:1199px){.main-chat-scrl-div[_ngcontent-%COMP%]{height:calc(100vh - 130px)}.left-sde-body[_ngcontent-%COMP%]{height:calc(100vh - 250px)}.right-side-chat-section[_ngcontent-%COMP%]{height:calc(100vh - 130px)}.chat-container-wrapper[_ngcontent-%COMP%]{height:calc(100vh - 300px)}}@media (max-width:991px){.chat-container-wrapper[_ngcontent-%COMP%]{height:calc(100vh - 430px)}.right-side-chat-section[_ngcontent-%COMP%]{height:calc(100vh - 265px)}}@media (max-width:767px){.chat-container-wrapper[_ngcontent-%COMP%]{height:calc(100vh - 410px)}.right-side-chat-section[_ngcontent-%COMP%]{height:calc(100vh - 260px)}.respns-arrow-class[_ngcontent-%COMP%]{cursor:pointer;width:20px}}']}),t})()}];let j=(()=>{class t{}return t.\u0275mod=c.Ib({type:t}),t.\u0275inj=c.Hb({factory:function(e){return new(e||t)},imports:[[i.b,s.f.forChild(E),m.h,m.p,o.b]]}),t})()}}]);