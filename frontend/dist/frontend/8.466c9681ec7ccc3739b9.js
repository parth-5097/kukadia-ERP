(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{rRsA:function(e,t,n){"use strict";n.r(t),n.d(t,"CompanyModule",function(){return q});var b=n("ofXK"),a=n("tyNb"),o=n("3Pt+"),c=n("AytR"),i=n("fXoL"),r=n("5eHb"),d=n("6uu6");function l(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Bank name is required "),i.Ob())}function s(e,t){if(1&e&&(i.Pb(0,"div",44),i.tc(1,l,2,0,"div",45),i.Ob()),2&e){const e=i.ac();i.yb(1),i.ec("ngIf",e.f.bank_name.errors.required)}}function u(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Account name is required "),i.Ob())}function f(e,t){if(1&e&&(i.Pb(0,"div",44),i.tc(1,u,2,0,"div",45),i.Ob()),2&e){const e=i.ac();i.yb(1),i.ec("ngIf",e.f.account_name.errors.required)}}function m(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Branch name is required "),i.Ob())}function p(e,t){if(1&e&&(i.Pb(0,"div",44),i.tc(1,m,2,0,"div",45),i.Ob()),2&e){const e=i.ac();i.yb(1),i.ec("ngIf",e.f.branch_name.errors.required)}}function P(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Account number is required "),i.Ob())}function O(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Valid account number is require "),i.Ob())}function v(e,t){if(1&e&&(i.Pb(0,"div",44),i.tc(1,P,2,0,"div",45),i.tc(2,O,2,0,"div",45),i.Ob()),2&e){const e=i.ac();i.yb(1),i.ec("ngIf",e.f.account_no.errors.required),i.yb(1),i.ec("ngIf",e.f.account_no.errors.pattern)}}function y(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," IFSC code is required "),i.Ob())}function h(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Valid IFSC code is require "),i.Ob())}function g(e,t){if(1&e&&(i.Pb(0,"div",44),i.tc(1,y,2,0,"div",45),i.tc(2,h,2,0,"div",45),i.Ob()),2&e){const e=i.ac();i.yb(1),i.ec("ngIf",e.f.ifsc_code.errors.required),i.yb(1),i.ec("ngIf",e.f.ifsc_code.errors.pattern)}}function C(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Swift code is required "),i.Ob())}function _(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Valid swift code is require "),i.Ob())}function k(e,t){if(1&e&&(i.Pb(0,"div",44),i.tc(1,C,2,0,"div",45),i.tc(2,_,2,0,"div",45),i.Ob()),2&e){const e=i.ac();i.yb(1),i.ec("ngIf",e.f.swift_code.errors.required),i.yb(1),i.ec("ngIf",e.f.swift_code.errors.pattern)}}function I(e,t){1&e&&(i.Pb(0,"div"),i.uc(1," Authorize dealer code is required "),i.Ob())}function L(e,t){if(1&e&&(i.Pb(0,"div",44),i.tc(1,I,2,0,"div",45),i.Ob()),2&e){const e=i.ac();i.yb(1),i.ec("ngIf",e.f.dealer_code.errors.required)}}const B=function(){return["/settings/company/edit"]},w=function(e){return{"is-invalid":e}},x=[{path:"",component:(()=>{class e{constructor(e,t,n){this.formBuilder=e,this.toastrService=t,this.authService=n,this.subBank=!1,this.baseUrl=c.a.PORT_URL,this.data={}}ngOnInit(){this.bankForm=this.formBuilder.group({bank_name:["",[o.r.required]],account_name:["",[o.r.required]],branch_name:["",[o.r.required]],account_no:["",[o.r.required,o.r.pattern(/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/)]],ifsc_code:["",[o.r.required,o.r.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],swift_code:["",[o.r.required,o.r.pattern(/^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/)]],dealer_code:["",[o.r.required]]}),this.authService.get("company").subscribe(e=>{this.data=e.data[0]})}get f(){return this.bankForm.controls}onSubmit(){this.subBank=!0,this.bankForm.invalid||this.toastrService.info(this.bankForm.value)}onClose(){this.subBank=!1,this.bankForm.reset()}}return e.\u0275fac=function(t){return new(t||e)(i.Kb(o.d),i.Kb(r.b),i.Kb(d.a))},e.\u0275cmp=i.Eb({type:e,selectors:[["app-company-settings"]],decls:151,vars:52,consts:[[1,"row","row-space-class"],[1,"col-12"],[1,"comn-title-tag","d-flex","align-items-center"],[1,"ml-auto"],[1,"btn-theme-color",3,"routerLink"],["src","/assets/images/pro-edit-icon.svg","alt","",1,"mr-1"],[1,"dash-white-bx"],[1,"prf-section-main"],[1,"row"],[1,"col-12","form-group"],[1,"d-flex","align-items-center","cmpny-logo"],[1,"lbl-class","mr-4"],["alt","",3,"src"],[1,"col-md-6","form-group"],[1,"lbl-class"],["type","text","name","","disabled","",1,"form-control","input-style",3,"placeholder"],[1,"col-xl-3","col-md-6","form-group"],[1,"col-xl-2","col-md-4","form-group"],[1,"d-flex","align-items-center"],[1,"hgt-text"],["type","button","data-toggle","modal","data-target","#bank-details",1,"btn-theme-color"],[1,"my-sm-4","text-center"],["type","submit",1,"btn-theme-color",3,"routerLink"],["type","button",1,"btn-white","ml-2"],["id","bank-details","tabindex","-1","aria-labelledby","bank-details","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered","modal-cust-comn","modal-lg"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["src","/assets/images/modal-close-icon.svg","alt",""],[1,"modal-body"],[1,"row","comn-form",3,"formGroup","ngSubmit"],["type","text","name","","placeholder","ICICI Bank","formControlName","bank_name",1,"form-control","input-style",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["type","text","name","","placeholder","Test","formControlName","account_name",1,"form-control","input-style",3,"ngClass"],["type","text","name","","placeholder","ICICI Bank","formControlName","branch_name",1,"form-control","input-style",3,"ngClass"],["type","text","name","","placeholder","Test","formControlName","account_no",1,"form-control","input-style",3,"ngClass"],["type","text","name","","placeholder","ICICI Bank","formControlName","ifsc_code",1,"form-control","input-style",3,"ngClass"],["type","text","name","","placeholder","Test","formControlName","swift_code",1,"form-control","input-style",3,"ngClass"],["type","text","name","","placeholder","ICICI Bank","formControlName","dealer_code",1,"form-control","input-style",3,"ngClass"],[1,"btn-btm-inr-tabs","text-center","my-3"],["type","submit",1,"btn-theme-color","mr-2"],["type","button","data-dismiss","modal",1,"btn-white",3,"click"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(e,t){1&e&&(i.Pb(0,"div",0),i.Pb(1,"div",1),i.Pb(2,"div",2),i.Pb(3,"h1"),i.uc(4,"Company Settings"),i.Ob(),i.Pb(5,"div",3),i.Pb(6,"a",4),i.Lb(7,"img",5),i.uc(8," Edit Company Profile "),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Pb(9,"div",1),i.Pb(10,"div",6),i.Pb(11,"div",7),i.Pb(12,"form"),i.Pb(13,"div",8),i.Pb(14,"div",9),i.Pb(15,"div",10),i.Pb(16,"label",11),i.uc(17,"Company Logo :"),i.Ob(),i.Lb(18,"img",12),i.Ob(),i.Ob(),i.Pb(19,"div",13),i.Pb(20,"label",14),i.uc(21,"Company Name :"),i.Ob(),i.Lb(22,"input",15),i.Ob(),i.Pb(23,"div",16),i.Pb(24,"label",14),i.uc(25,"Phone No. :"),i.Ob(),i.Lb(26,"input",15),i.Ob(),i.Pb(27,"div",16),i.Pb(28,"label",14),i.uc(29,"Mobile No. :"),i.Ob(),i.Lb(30,"input",15),i.Ob(),i.Pb(31,"div",13),i.Pb(32,"label",14),i.uc(33,"Address :"),i.Ob(),i.Lb(34,"input",15),i.Ob(),i.Pb(35,"div",16),i.Pb(36,"label",14),i.uc(37,"Tax No. :"),i.Ob(),i.Lb(38,"input",15),i.Ob(),i.Pb(39,"div",16),i.Pb(40,"label",14),i.uc(41,"Pancard No. :"),i.Ob(),i.Lb(42,"input",15),i.Ob(),i.Pb(43,"div",17),i.Pb(44,"label",14),i.uc(45,"City :"),i.Ob(),i.Lb(46,"input",15),i.Ob(),i.Pb(47,"div",17),i.Pb(48,"label",14),i.uc(49,"State :"),i.Ob(),i.Lb(50,"input",15),i.Ob(),i.Pb(51,"div",17),i.Pb(52,"label",14),i.uc(53,"Country :"),i.Ob(),i.Lb(54,"input",15),i.Ob(),i.Pb(55,"div",16),i.Pb(56,"label",14),i.uc(57,"GST No. :"),i.Ob(),i.Lb(58,"input",15),i.Ob(),i.Ob(),i.Pb(59,"div",8),i.Pb(60,"div",1),i.Pb(61,"div",18),i.Pb(62,"span",19),i.uc(63,"Bank Detail"),i.Ob(),i.Pb(64,"div",3),i.Pb(65,"button",20),i.uc(66," Add Bank Detail "),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Pb(67,"div",16),i.Pb(68,"label",14),i.uc(69,"Bank Name :"),i.Ob(),i.Lb(70,"input",15),i.Ob(),i.Pb(71,"div",16),i.Pb(72,"label",14),i.uc(73,"Account Name :"),i.Ob(),i.Lb(74,"input",15),i.Ob(),i.Pb(75,"div",16),i.Pb(76,"label",14),i.uc(77,"Branch Name :"),i.Ob(),i.Lb(78,"input",15),i.Ob(),i.Pb(79,"div",16),i.Pb(80,"label",14),i.uc(81,"Authorise Dealer Code :"),i.Ob(),i.Lb(82,"input",15),i.Ob(),i.Pb(83,"div",17),i.Pb(84,"label",14),i.uc(85,"Account No. :"),i.Ob(),i.Lb(86,"input",15),i.Ob(),i.Pb(87,"div",17),i.Pb(88,"label",14),i.uc(89,"IFSC Code :"),i.Ob(),i.Lb(90,"input",15),i.Ob(),i.Pb(91,"div",17),i.Pb(92,"label",14),i.uc(93,"Swift Code :"),i.Ob(),i.Lb(94,"input",15),i.Ob(),i.Ob(),i.Pb(95,"div",21),i.Pb(96,"button",22),i.uc(97," Edit "),i.Ob(),i.Pb(98,"button",23),i.uc(99,"Cancel"),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Pb(100,"div",24),i.Pb(101,"div",25),i.Pb(102,"div",26),i.Pb(103,"div",27),i.Pb(104,"h5",28),i.uc(105,"Add Bank Details"),i.Ob(),i.Pb(106,"button",29),i.Lb(107,"img",30),i.Ob(),i.Ob(),i.Pb(108,"div",31),i.Pb(109,"form",32),i.Wb("ngSubmit",function(){return t.onSubmit()}),i.Pb(110,"div",13),i.Pb(111,"label",14),i.uc(112,"Bank Name :"),i.Ob(),i.Lb(113,"input",33),i.tc(114,s,2,1,"div",34),i.Ob(),i.Pb(115,"div",13),i.Pb(116,"label",14),i.uc(117,"Account Name :"),i.Ob(),i.Lb(118,"input",35),i.tc(119,f,2,1,"div",34),i.Ob(),i.Pb(120,"div",13),i.Pb(121,"label",14),i.uc(122,"Branch Name :"),i.Ob(),i.Lb(123,"input",36),i.tc(124,p,2,1,"div",34),i.Ob(),i.Pb(125,"div",13),i.Pb(126,"label",14),i.uc(127,"Account No. :"),i.Ob(),i.Lb(128,"input",37),i.tc(129,v,3,2,"div",34),i.Ob(),i.Pb(130,"div",13),i.Pb(131,"label",14),i.uc(132,"IFSC Code :"),i.Ob(),i.Lb(133,"input",38),i.tc(134,g,3,2,"div",34),i.Ob(),i.Pb(135,"div",13),i.Pb(136,"label",14),i.uc(137,"Swift Code :"),i.Ob(),i.Lb(138,"input",39),i.tc(139,k,3,2,"div",34),i.Ob(),i.Pb(140,"div",13),i.Pb(141,"label",14),i.uc(142,"Authorise Dealer Code :"),i.Ob(),i.Lb(143,"input",40),i.tc(144,L,2,1,"div",34),i.Ob(),i.Pb(145,"div",1),i.Pb(146,"div",41),i.Pb(147,"button",42),i.uc(148,"Save"),i.Ob(),i.Pb(149,"button",43),i.Wb("click",function(){return t.onClose()}),i.uc(150," Cancel "),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Ob(),i.Ob()),2&e&&(i.yb(6),i.ec("routerLink",i.hc(36,B)),i.yb(12),i.gc("src","",t.baseUrl,"",t.data.logo,"",i.pc),i.yb(4),i.fc("placeholder",t.data.name),i.yb(4),i.fc("placeholder",t.data.phone_no),i.yb(4),i.fc("placeholder",t.data.mobile_no),i.yb(4),i.fc("placeholder",t.data.address),i.yb(4),i.fc("placeholder",t.data.tax_no),i.yb(4),i.fc("placeholder",t.data.pancard_no),i.yb(4),i.fc("placeholder",t.data.city.name),i.yb(4),i.fc("placeholder",t.data.state.name),i.yb(4),i.fc("placeholder",t.data.country.name),i.yb(4),i.fc("placeholder",t.data.gst_no),i.yb(12),i.fc("placeholder",t.data.bank_name),i.yb(4),i.fc("placeholder",t.data.account_name),i.yb(4),i.fc("placeholder",t.data.branch_name),i.yb(4),i.fc("placeholder",t.data.dealer_code),i.yb(4),i.fc("placeholder",t.data.account_no),i.yb(4),i.fc("placeholder",t.data.ifsc_code),i.yb(4),i.fc("placeholder",t.data.swift_code),i.yb(2),i.ec("routerLink",i.hc(37,B)),i.yb(13),i.ec("formGroup",t.bankForm),i.yb(4),i.ec("ngClass",i.ic(38,w,t.subBank&&t.f.bank_name.errors)),i.yb(1),i.ec("ngIf",t.subBank&&t.f.bank_name.errors),i.yb(4),i.ec("ngClass",i.ic(40,w,t.subBank&&t.f.account_name.errors)),i.yb(1),i.ec("ngIf",t.subBank&&t.f.account_name.errors),i.yb(4),i.ec("ngClass",i.ic(42,w,t.subBank&&t.f.branch_name.errors)),i.yb(1),i.ec("ngIf",t.subBank&&t.f.branch_name.errors),i.yb(4),i.ec("ngClass",i.ic(44,w,t.subBank&&t.f.account_no.errors)),i.yb(1),i.ec("ngIf",t.subBank&&t.f.account_no.errors),i.yb(4),i.ec("ngClass",i.ic(46,w,t.subBank&&t.f.ifsc_code.errors)),i.yb(1),i.ec("ngIf",t.subBank&&t.f.ifsc_code.errors),i.yb(4),i.ec("ngClass",i.ic(48,w,t.subBank&&t.f.swift_code.errors)),i.yb(1),i.ec("ngIf",t.subBank&&t.f.swift_code.errors),i.yb(4),i.ec("ngClass",i.ic(50,w,t.subBank&&t.f.dealer_code.errors)),i.yb(1),i.ec("ngIf",t.subBank&&t.f.dealer_code.errors))},directives:[a.e,o.t,o.k,o.l,a.c,o.f,o.b,o.j,o.e,b.k,b.m],styles:[".hgt-text[_ngcontent-%COMP%]{color:var(--thm-color);font-weight:600;font-size:20px;padding:15px 0;display:block}.cmpny-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:160px}@media (max-width:575px){.comn-title-tag[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:15px}.comn-title-tag[_ngcontent-%COMP%]   .btn-theme-color[_ngcontent-%COMP%]{min-width:auto;font-size:12px;padding:9px 5px}}"]}),e})()},{path:"edit",loadChildren:()=>n.e(9).then(n.bind(null,"aZ1E")).then(e=>e.EditCompanyModule).catch(e=>console.error(e))}];let q=(()=>{class e{}return e.\u0275mod=i.Ib({type:e}),e.\u0275inj=i.Hb({factory:function(t){return new(t||e)},imports:[[b.b,a.f.forChild(x),o.h,o.p]]}),e})()}}]);