(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{aZ1E:function(e,t,o){"use strict";o.r(t),o.d(t,"EditCompanyModule",function(){return ne});var n=o("ofXK"),i=o("tyNb"),r=o("3Pt+"),c=o("fXoL"),a=o("5eHb"),d=o("4Svi"),s=o("6uu6");function b(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Company name is required "),c.Ob())}function u(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,b,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.company_name.errors.required)}}function l(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Phone Number is required "),c.Ob())}function m(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,l,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.phoneNumber.errors.required)}}function f(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Mobile Number is required "),c.Ob())}function p(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,f,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.mobile_no.errors.required)}}function g(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"Address is required"),c.Ob())}function v(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,g,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.address.errors.required)}}function h(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"Tax no is required"),c.Ob())}function y(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,h,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.tax_no.errors.required)}}function O(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"Pan no is required"),c.Ob())}function P(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"Enter a valid pan no"),c.Ob())}function _(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,O,2,0,"div",49),c.tc(2,P,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.pan_no.errors.required),c.yb(1),c.ec("ngIf",e.f.pan_no.errors.pattern)}}function C(e,t){if(1&e&&(c.Pb(0,"option",50),c.uc(1),c.Ob()),2&e){const e=t.$implicit;c.ec("value",e.isoCode)("selected","US"==e.name?"United States":""),c.yb(1),c.wc(" ",e.name," ")}}function w(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"Country is required"),c.Ob())}function x(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,w,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.country.errors.required)}}const q=function(e,t){return[e,t]};function I(e,t){if(1&e&&(c.Pb(0,"option",51),c.uc(1),c.Ob()),2&e){const e=t.$implicit;c.ec("value",c.jc(2,q,e.countryCode,e.isoCode)),c.yb(1),c.wc(" ",e.name," ")}}function N(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"State is required"),c.Ob())}function F(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,N,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.state.errors.required)}}function S(e,t){if(1&e&&(c.Pb(0,"option"),c.uc(1),c.Ob()),2&e){const e=t.$implicit;c.yb(1),c.wc(" ",e.name," ")}}function k(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"City is required"),c.Ob())}function M(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,k,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.city.errors.required)}}function A(e,t){1&e&&(c.Pb(0,"div"),c.uc(1,"GST no is required"),c.Ob())}function L(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Must be a valid GST no "),c.Ob())}function Z(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,A,2,0,"div",49),c.tc(2,L,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.gst_no.errors.required),c.yb(1),c.ec("ngIf",e.f.gst_no.errors.pattern)}}function B(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Bank Name is required "),c.Ob())}function j(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,B,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.bank_name.errors.required)}}function z(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Account Name is required "),c.Ob())}function D(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,z,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.account_name.errors.required)}}function K(e,t){if(1&e&&(c.Pb(0,"option",51),c.uc(1),c.Ob()),2&e){const e=t.$implicit;c.fc("value",e.id),c.yb(1),c.wc(" ",e.name," ")}}function T(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Branch Name is required "),c.Ob())}function G(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,T,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.branch_name.errors.required)}}function W(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Dealer Code is required "),c.Ob())}function X(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,W,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.dealer_code.errors.required)}}function E(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Account Number is required "),c.Ob())}function H(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Must be an valid account number "),c.Ob())}function J(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,E,2,0,"div",49),c.tc(2,H,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.account_no.errors.required),c.yb(1),c.ec("ngIf",e.f.account_no.errors.pattern)}}function U(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," IFSC code is required "),c.Ob())}function V(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Must be an valid IFSC code "),c.Ob())}function Q(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,U,2,0,"div",49),c.tc(2,V,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.ifsc_code.errors.required),c.yb(1),c.ec("ngIf",e.f.ifsc_code.errors.pattern)}}function R(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Swift code is required "),c.Ob())}function Y(e,t){1&e&&(c.Pb(0,"div"),c.uc(1," Must be an valid Swift code "),c.Ob())}function ee(e,t){if(1&e&&(c.Pb(0,"div",48),c.tc(1,R,2,0,"div",49),c.tc(2,Y,2,0,"div",49),c.Ob()),2&e){const e=c.ac();c.yb(1),c.ec("ngIf",e.f.swift_code.errors.required),c.yb(1),c.ec("ngIf",e.f.swift_code.errors.pattern)}}const te=function(e){return{"is-invalid":e}},oe=[{path:"",component:(()=>{class e{constructor(e,t,o,n,i){this.formBuilder=e,this.toastrService=t,this.commonService=o,this.authService=n,this.router=i,this.submitted=!1,this.data={},this.branch=[],this.company_data={},this.bank_data={},this.country=[],this.state=[],this.city=[]}ngOnInit(){this.editCompForm=this.formBuilder.group({company_name:["",[r.r.required]],phoneNumber:["",[r.r.required]],mobile_no:["",[r.r.required]],address:["",[r.r.required]],tax_no:["",[r.r.required]],pan_no:["",[r.r.required,r.r.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)]],city:["",[r.r.required]],state:["",[r.r.required]],country:["",[r.r.required]],gst_no:["",[r.r.required,r.r.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],bank_name:["",[r.r.required]],dealer_code:["",[r.r.required]],account_name:["",[r.r.required]],branch_name:["",[r.r.required]],account_no:["",[r.r.required,r.r.pattern(/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/)]],ifsc_code:["",[r.r.required,r.r.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],swift_code:["",[r.r.required,r.r.pattern(/^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/)]]}),this.authService.get("company").subscribe(e=>{this.data=e.data[0]}),this.authService.get("branch").subscribe(e=>{this.branch=e.data}),this.commonService.get("defCSC").subscribe(e=>{this.country=e.country,this.state=e.state,this.city=e.city})}get f(){return this.editCompForm.controls}onSubmit(){this.submitted=!0,this.editCompForm.invalid||this.authService.put(`company/${this.data.company_id}`,{company_data:{name:this.editCompForm.value.name,phone_no:this.editCompForm.value.phone_no,mobile_no:this.editCompForm.value.mobile_no,address:this.editCompForm.value.address,tax_no:this.editCompForm.value.tax_no,pancard_no:this.editCompForm.value.pancard_no,city:this.editCompForm.value.city,state:this.editCompForm.value.state,country:this.editCompForm.value.country,gst_no:this.editCompForm.value.gst_no},bank_data:{bank_name:this.editCompForm.value.bank_name,account_name:this.editCompForm.value.account_name,branch_id:this.editCompForm.value.branch_name,dealer_code:this.editCompForm.value.dealer_code,account_no:this.editCompForm.value.account_no,ifsc_code:this.editCompForm.value.ifsc_code,swift_code:this.editCompForm.value.swift_code}}).subscribe(e=>{this.toastrService.success(e.message),setTimeout(()=>{this.router.navigate(["/settings/company"])},0)})}handleImageChange(e,t){const o=e.target.files[0],n=new FormData;n.append("image",o,o.name),this.authService.put(`logo/${t}`,n).subscribe(e=>{this.toastrService.success("Image updated successfully")})}onCancel(){this.submitted=!1,this.editCompForm.reset(),this.router.navigate(["/settings/company"])}onState(e){this.state=[],this.commonService.get(`state/${e}`).subscribe(e=>{this.state=e.data})}onCity(e){let t=e.split(",");this.city=[],this.commonService.get(`city/${t[0]}/${t[1]}`).subscribe(e=>{this.city=e.data})}ngAfterViewInit(){$("#load-saved-searches-dropdown").on("click",function(){$(".first-dropdown").toggle(),$(".second-dropdown").hide(),$(".third-dropdown").hide()}),$("#save-search-dropdown").on("click",function(){$(".second-dropdown").toggle(),$(".first-dropdown").hide(),$(".third-dropdown").hide()}),$("#standard-view-dropdown").on("click",function(){$(".third-dropdown").toggle(),$(".first-dropdown").hide(),$(".second-dropdown").hide()})}}return e.\u0275fac=function(t){return new(t||e)(c.Kb(r.d),c.Kb(a.b),c.Kb(d.a),c.Kb(s.a),c.Kb(i.b))},e.\u0275cmp=c.Eb({type:e,selectors:[["app-edit-company-settings"]],decls:129,vars:89,consts:[[1,"row","row-space-class"],[1,"col-12"],[1,"comn-title-tag"],[1,"dash-white-bx"],[1,"prf-section-main"],[3,"formGroup","ngSubmit"],[1,"row"],[1,"col-12","form-group"],[1,"d-sm-flex","cmpny-logo"],[1,"lbl-class","mr-4"],[1,"file-upload","text-center","ml-md-0","m-auto"],[1,"file-upload-inr","text-center"],[1,"file-upload-content"],["src","/assets/images/add-plus-icon.svg","alt","",1,"file-upload-image"],[1,"image-upload-wrap"],["type","file","accept","image/*",1,"file-upload-input",3,"change"],[1,"drag-text"],["href","javascript:void(0)"],[1,"col-md-6","form-group"],[1,"lbl-class"],["type","text","name","","formControlName","company_name",1,"form-control","input-style",3,"placeholder","ngClass"],["class","invalid-feedback",4,"ngIf"],[1,"col-xl-3","col-md-6","form-group"],["type","text","name","","formControlName","phoneNumber",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlName","mobile_no",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlname","address",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlName","tax_no",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlName","pan_no",1,"form-control","input-style",3,"placeholder","ngClass"],[1,"col-xl-2","col-md-4","form-group"],["formControlName","country",1,"custom-select","form-control","input-style",3,"ngClass","change"],["disabled",""],[3,"value","selected",4,"ngFor","ngForOf"],["formControlName","state",1,"custom-select","form-control","input-style",3,"ngClass","change"],[3,"value",4,"ngFor","ngForOf"],["formControlName","city",1,"custom-select","form-control","input-style",3,"ngClass"],[4,"ngFor","ngForOf"],["type","text","name","","formControlName","gst_no",1,"form-control","input-style",3,"placeholder","ngClass"],[1,"hgt-text"],["type","text","name","","formControlName","bank_name",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlName","account_name",1,"form-control","input-style",3,"placeholder","ngClass"],["formControlName","branch_name",1,"custom-select","form-control","input-style",3,"ngClass"],["type","text","name","","formControlName","dealer_code",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlName","account_no",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlName","ifsc_code",1,"form-control","input-style",3,"placeholder","ngClass"],["type","text","name","","formControlName","swift_code",1,"form-control","input-style",3,"placeholder","ngClass"],[1,"my-sm-4","text-center"],["type","submit",1,"btn-theme-color"],["type","button",1,"btn-white","ml-2",3,"click"],[1,"invalid-feedback"],[4,"ngIf"],[3,"value","selected"],[3,"value"]],template:function(e,t){1&e&&(c.Pb(0,"div",0),c.Pb(1,"div",1),c.Pb(2,"div",2),c.Pb(3,"h1"),c.uc(4,"Company Settings"),c.Ob(),c.Ob(),c.Ob(),c.Pb(5,"div",1),c.Pb(6,"div",3),c.Pb(7,"div",4),c.Pb(8,"form",5),c.Wb("ngSubmit",function(){return t.onSubmit()}),c.Pb(9,"div",6),c.Pb(10,"div",7),c.Pb(11,"div",8),c.Pb(12,"label",9),c.uc(13,"Company Logo :"),c.Ob(),c.Pb(14,"div",10),c.Pb(15,"div",11),c.Pb(16,"div",12),c.Lb(17,"img",13),c.Ob(),c.Pb(18,"div",14),c.Pb(19,"input",15),c.Wb("change",function(e){return t.handleImageChange(e,t.data.company_id)}),c.Ob(),c.Ob(),c.Pb(20,"div",16),c.Pb(21,"h3"),c.uc(22," Drag & Drop or "),c.Pb(23,"a",17),c.uc(24,"Browse"),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Pb(25,"div",18),c.Pb(26,"label",19),c.uc(27,"Company Name :"),c.Ob(),c.Lb(28,"input",20),c.tc(29,u,2,1,"div",21),c.Ob(),c.Pb(30,"div",22),c.Pb(31,"label",19),c.uc(32,"Phone No. :"),c.Ob(),c.Lb(33,"input",23),c.tc(34,m,2,1,"div",21),c.Ob(),c.Pb(35,"div",22),c.Pb(36,"label",19),c.uc(37,"Mobile No. :"),c.Ob(),c.Lb(38,"input",24),c.tc(39,p,2,1,"div",21),c.Ob(),c.Pb(40,"div",18),c.Pb(41,"label",19),c.uc(42,"Address :"),c.Ob(),c.Lb(43,"input",25),c.tc(44,v,2,1,"div",21),c.Ob(),c.Pb(45,"div",22),c.Pb(46,"label",19),c.uc(47,"Tax No. :"),c.Ob(),c.Lb(48,"input",26),c.tc(49,y,2,1,"div",21),c.Ob(),c.Pb(50,"div",22),c.Pb(51,"label",19),c.uc(52,"Pancard No. :"),c.Ob(),c.Lb(53,"input",27),c.tc(54,_,3,2,"div",21),c.Ob(),c.Pb(55,"div",28),c.Pb(56,"label",19),c.uc(57,"Country :"),c.Ob(),c.Pb(58,"select",29),c.Wb("change",function(e){return t.onState(e.target.value)}),c.Pb(59,"option",30),c.uc(60),c.Ob(),c.tc(61,C,2,3,"option",31),c.Ob(),c.tc(62,x,2,1,"div",21),c.Ob(),c.Pb(63,"div",28),c.Pb(64,"label",19),c.uc(65,"State :"),c.Ob(),c.Pb(66,"select",32),c.Wb("change",function(e){return t.onCity(e.target.value)}),c.Pb(67,"option",30),c.uc(68),c.Ob(),c.tc(69,I,2,5,"option",33),c.Ob(),c.tc(70,F,2,1,"div",21),c.Ob(),c.Pb(71,"div",28),c.Pb(72,"label",19),c.uc(73,"City :"),c.Ob(),c.Pb(74,"select",34),c.Pb(75,"option",30),c.uc(76),c.Ob(),c.tc(77,S,2,1,"option",35),c.Ob(),c.tc(78,M,2,1,"div",21),c.Ob(),c.Pb(79,"div",22),c.Pb(80,"label",19),c.uc(81,"GST No. :"),c.Ob(),c.Lb(82,"input",36),c.tc(83,Z,3,2,"div",21),c.Ob(),c.Ob(),c.Pb(84,"div",6),c.Pb(85,"div",1),c.Pb(86,"span",37),c.uc(87,"Bank Detail"),c.Ob(),c.Ob(),c.Pb(88,"div",22),c.Pb(89,"label",19),c.uc(90,"Bank Name :"),c.Ob(),c.Lb(91,"input",38),c.tc(92,j,2,1,"div",21),c.Ob(),c.Pb(93,"div",22),c.Pb(94,"label",19),c.uc(95,"Account Name :"),c.Ob(),c.Lb(96,"input",39),c.tc(97,D,2,1,"div",21),c.Ob(),c.Pb(98,"div",22),c.Pb(99,"label",19),c.uc(100,"Branch Name :"),c.Ob(),c.Pb(101,"select",40),c.tc(102,K,2,2,"option",33),c.Ob(),c.tc(103,G,2,1,"div",21),c.Ob(),c.Pb(104,"div",22),c.Pb(105,"label",19),c.uc(106,"Authorise Dealer Code :"),c.Ob(),c.Lb(107,"input",41),c.tc(108,X,2,1,"div",21),c.Ob(),c.Pb(109,"div",28),c.Pb(110,"label",19),c.uc(111,"Account No. :"),c.Ob(),c.Lb(112,"input",42),c.tc(113,J,3,2,"div",21),c.Ob(),c.Pb(114,"div",28),c.Pb(115,"label",19),c.uc(116,"IFSC Code :"),c.Ob(),c.Lb(117,"input",43),c.tc(118,Q,3,2,"div",21),c.Ob(),c.Pb(119,"div",28),c.Pb(120,"label",19),c.uc(121,"Swift Code :"),c.Ob(),c.Lb(122,"input",44),c.tc(123,ee,3,2,"div",21),c.Ob(),c.Ob(),c.Pb(124,"div",45),c.Pb(125,"button",46),c.uc(126,"Save"),c.Ob(),c.Pb(127,"button",47),c.Wb("click",function(){return t.onCancel()}),c.uc(128," Cancel "),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Ob()),2&e&&(c.yb(8),c.ec("formGroup",t.editCompForm),c.yb(20),c.fc("placeholder",t.data.name),c.ec("ngClass",c.ic(55,te,t.submitted&&t.f.company_name.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.company_name.errors),c.yb(4),c.fc("placeholder",t.data.phone_no),c.ec("ngClass",c.ic(57,te,t.submitted&&t.f.phoneNumber.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.phoneNumber.errors),c.yb(4),c.fc("placeholder",t.data.mobile_no),c.ec("ngClass",c.ic(59,te,t.submitted&&t.f.mobile_no.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.mobile_no.errors),c.yb(4),c.fc("placeholder",t.data.address),c.ec("ngClass",c.ic(61,te,t.submitted&&t.f.address.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.address.errors),c.yb(4),c.fc("placeholder",t.data.tax_no),c.ec("ngClass",c.ic(63,te,t.submitted&&t.f.tax_no.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.tax_no.errors),c.yb(4),c.fc("placeholder",t.data.pancard_no),c.ec("ngClass",c.ic(65,te,t.submitted&&t.f.pan_no.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.pan_no.errors),c.yb(4),c.ec("ngClass",c.ic(67,te,t.submitted&&t.f.country.errors)),c.yb(2),c.wc(" ",t.data.country.name," "),c.yb(1),c.ec("ngForOf",t.country),c.yb(1),c.ec("ngIf",t.submitted&&t.f.country.errors),c.yb(4),c.ec("ngClass",c.ic(69,te,t.submitted&&t.f.state.errors)),c.yb(2),c.wc(" ",t.data.state.name," "),c.yb(1),c.ec("ngForOf",t.state),c.yb(1),c.ec("ngIf",t.submitted&&t.f.state.errors),c.yb(4),c.ec("ngClass",c.ic(71,te,t.submitted&&t.f.city.errors)),c.yb(2),c.vc(t.data.city.name),c.yb(1),c.ec("ngForOf",t.city),c.yb(1),c.ec("ngIf",t.submitted&&t.f.city.errors),c.yb(4),c.fc("placeholder",t.data.gst_no),c.ec("ngClass",c.ic(73,te,t.submitted&&t.f.gst_no.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.gst_no.errors),c.yb(8),c.fc("placeholder",t.data.bank_name),c.ec("ngClass",c.ic(75,te,t.submitted&&t.f.bank_name.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.bank_name.errors),c.yb(4),c.fc("placeholder",t.data.account_name),c.ec("ngClass",c.ic(77,te,t.submitted&&t.f.account_name.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.account_name.errors),c.yb(4),c.ec("ngClass",c.ic(79,te,t.submitted&&t.f.branch_name.errors)),c.yb(1),c.ec("ngForOf",t.branch),c.yb(1),c.ec("ngIf",t.submitted&&t.f.branch_name.errors),c.yb(4),c.fc("placeholder",t.data.dealer_code),c.ec("ngClass",c.ic(81,te,t.submitted&&t.f.dealer_code.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.dealer_code.errors),c.yb(4),c.fc("placeholder",t.data.account_no),c.ec("ngClass",c.ic(83,te,t.submitted&&t.f.account_no.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.account_no.errors),c.yb(4),c.fc("placeholder",t.data.ifsc_code),c.ec("ngClass",c.ic(85,te,t.submitted&&t.f.ifsc_code.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.ifsc_code.errors),c.yb(4),c.fc("placeholder",t.data.swift_code),c.ec("ngClass",c.ic(87,te,t.submitted&&t.f.swift_code.errors)),c.yb(1),c.ec("ngIf",t.submitted&&t.f.swift_code.errors))},directives:[r.t,r.k,r.f,r.b,r.j,r.e,n.k,n.m,r.q,r.n,r.s,n.l],styles:[".hgt-text[_ngcontent-%COMP%]{color:var(--thm-color);font-weight:600;font-size:20px;padding:15px 0;display:block}.cmpny-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:160px}.file-upload[_ngcontent-%COMP%]{position:relative;background-color:#f8f8f8;border:1.5px dashed #c2c2c2;padding:0;overflow:hidden;cursor:pointer;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:200px;height:100px;display:flex;align-items:center;justify-content:center}.file-upload-inr[_ngcontent-%COMP%]{width:100%;height:100%}.file-upload-content[_ngcontent-%COMP%], .file-upload-inr[_ngcontent-%COMP%]{display:block;text-align:center}.file-upload[_ngcontent-%COMP%]   .file-upload-image[_ngcontent-%COMP%]{max-height:100px;max-width:100px;margin:auto;padding:10px;object-fit:contain;object-position:center;width:auto}.image-upload-wrap[_ngcontent-%COMP%]{margin:auto;vertical-align:middle;text-align:center}.file-upload-input[_ngcontent-%COMP%], .image-upload-wrap[_ngcontent-%COMP%]{width:100%;height:100%;bottom:0;left:0;right:0;position:absolute}.file-upload-input[_ngcontent-%COMP%]{margin:0;padding:0;outline:none;opacity:0;cursor:pointer;top:0}.drag-text[_ngcontent-%COMP%]{position:relative;top:0}.drag-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:var(--thm-color);font-weight:500;font-size:14px;margin-bottom:0;padding:0}.drag-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--thm-color);text-decoration:underline}"]}),e})()}];let ne=(()=>{class e{}return e.\u0275mod=c.Ib({type:e}),e.\u0275inj=c.Hb({factory:function(t){return new(t||e)},imports:[[n.b,i.f.forChild(oe),r.h,r.p]]}),e})()}}]);