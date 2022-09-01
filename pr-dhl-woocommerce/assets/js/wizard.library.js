let i18n={empty_wz:"Not found any element to generate the Wizard with.",empty_nav:"Nav does not exist or is empty.",empty_content:"Content does not exist or is empty.",diff_steps:"Discordance between the steps of nav and content.",random:"There has been a problem, check the configuration and use of the wizard.",title:"Step"};class Wizard{constructor(a){let b={wz_class:a!=void 0&&a.hasOwnProperty("wz_class")?a.wz_class:".wizard",wz_nav:a!=void 0&&a.hasOwnProperty("wz_nav")?a.wz_nav:".wizard-nav",wz_ori:a!=void 0&&a.hasOwnProperty("wz_ori")?a.wz_ori:".horizontal",wz_nav_style:a!=void 0&&a.hasOwnProperty("wz_nav_style")?a.wz_nav_style:"dots",wz_content:a!=void 0&&a.hasOwnProperty("wz_content")?a.wz_content:".wizard-content",wz_buttons:a!=void 0&&a.hasOwnProperty("wz_buttons")?a.wz_buttons:".wizard-buttons",wz_button:a!=void 0&&a.hasOwnProperty("wz_button")?a.wz_button:".wizard-btn",wz_button_style:a!=void 0&&a.hasOwnProperty("wz_button_style")?a.wz_button_style:".btn",wz_step:a!=void 0&&a.hasOwnProperty("wz_step")?a.wz_step:".wizard-step",wz_form:a!=void 0&&a.hasOwnProperty("wz_form")?a.wz_form:".wizard-form",wz_next:a!=void 0&&a.hasOwnProperty("wz_next")?a.wz_next:".next",wz_prev:a!=void 0&&a.hasOwnProperty("wz_prev")?a.wz_prev:".prev",wz_finish:a!=void 0&&a.hasOwnProperty("wz_finish")?a.wz_prev:".finish",current_step:a!=void 0&&a.hasOwnProperty("current_step")?a.current_step:0,steps:a!=void 0&&a.hasOwnProperty("steps")?a.steps:0,navigation:a!=void 0&&a.hasOwnProperty("navigation")?a.navigation:"all",buttons:!(a!=void 0&&a.hasOwnProperty("buttons"))||a.buttons,next:a!=void 0&&a.hasOwnProperty("next")?a.next:"Next",prev:a!=void 0&&a.hasOwnProperty("prev")?a.prev:"Prev",finish:a!=void 0&&a.hasOwnProperty("finish")?a.finish:"Submit"};this.wz_class=b.wz_class,this.wz_ori=b.wz_ori,this.wz_nav=b.wz_nav,this.wz_nav_style=b.wz_nav_style,this.wz_content=b.wz_content,this.wz_buttons=b.wz_buttons,this.wz_button=b.wz_button,this.wz_button_style=b.wz_button_style,this.wz_step=b.wz_step,this.wz_form=b.wz_form,this.wz_next=b.wz_next,this.wz_prev=b.wz_prev,this.wz_finish=b.wz_finish,this.steps=b.steps,this.current_step=b.current_step,this.last_step=this.current_step,this.navigation=b.navigation,this.buttons=b.buttons,this.prev=b.prev,this.next=b.next,this.finish=b.finish,this.form=!1,this.locked=!1,this.locked_step=null}init(){var a,c,b,d;try{let e=$_.exists($_.getSelector(this.wz_class))?$_.getSelector(this.wz_class):$_.throwException(i18n.empty_wz);e.classList.add(this.wz_ori.replace(".","")),e.tagName==="FORM"&&(this.form=!0),this.setNav();let f=$_.exists($_.getSelector(this.wz_nav,e))?$_.getSelector(this.wz_nav,e):$_.throwException(i18n.empty_nav),g=$_.exists($_.getSelector(this.wz_content,e))?$_.getSelector(this.wz_content,e):$_.throwException(i18n.empty_content);switch(a=$_.getSelectorAll(this.wz_step,f),c=a.length>0?a.length:$_.throwException(i18n.empty_nav),b=$_.getSelectorAll(this.wz_step,g),d=b.length>0?b.length:$_.throwException(i18n.empty_content),c!=d&&$_.throwException(i18n.diff_steps),this.navigation){case"nav":this.buttons=!1;break}switch(this.steps=c,this.set(a,b),this.navigation){case"all":case"nav":this.setNavEvent(),this.setBtnEvent();break;case"buttons":this.setBtnEvent();break}e.style.display=$_.hasClass(e,"vertical")?"flex":"block"}catch(a){throw a}}set(a,c){var d=!1,b=0;for(let e=0;e<a.length;e++){let f=a[e];d=d===!1?$_.hasClass(f,"active"):d,b=$_.hasClass(f,"active")?e:b,f.setAttribute("data-step",e),c[e].setAttribute("data-step",e)}$_.removeClassList(a,"active"),a[b].classList.add("active"),$_.removeClassList(c,"active"),c[b].classList.add("active"),$_.getSelector(this.wz_nav).classList.add(this.wz_nav_style),this.setButtons()}reset(){this.setCurrentStep(0);let a=$_.getSelector(this.wz_class),c=$_.getSelector(this.wz_nav,a),d=$_.getSelector(this.wz_content,a),b=$_.getSelector(this.wz_buttons,a),e=$_.getSelector(this.wz_button+this.wz_next,b),f=$_.getSelector(this.wz_button+this.wz_prev,b),g=$_.getSelector(this.wz_button+this.wz_finish,b);this.checkButtons(e,f,g);let h=$_.getSelectorAll(this.wz_step,c);$_.removeClassList(h,"active");let i=$_.getSelectorAll(this.wz_step,d);$_.removeClassList(i,"active"),$_.getSelector(`${this.wz_step}[data-step="${this.getCurrentStep()}"]`,c).classList.add("active"),$_.getSelector(`${this.wz_step}[data-step="${this.getCurrentStep()}"]`,d).classList.add("active"),document.dispatchEvent(new Event("resetWizard"))}lock(){this.locked=!0,this.locked_step=this.getCurrentStep()}unlock(){this.locked=!1,this.locked_step=null,document.dispatchEvent(new Event("unlockWizard"))}update2Form(){let c=$_.getSelector(this.wz_class),a=$_.getSelector(this.wz_content,c);if(a.tagName!=="FORM"){let d=a.getAttribute("class"),e=a.innerHTML;a.remove();var b=document.createElement("form");b.setAttribute("method","POST"),b.setAttribute("class",d+" "+this.wz_form.replace(".","")),b.innerHTML=e,c.appendChild(b)}}checkForm(){let c=$_.getSelector(this.wz_class),d=$_.getSelector(this.wz_content,c),e=$_.getSelectorAll(this.wz_step,d),f=e[this.getCurrentStep()];var a=!1;let b=$_.getSelectorAll("input,textarea,select",f);return b.length>0?a=$_.formValidator(b):this.throwException(i18n.random),a}setNav(){var c,g,h,a,b,e,f;let d=$_.getSelector(this.wz_class),k=$_.getSelector(this.wz_nav,d),i=$_.getSelector(this.wz_content,d),j=$_.getSelectorAll(this.wz_step,i);if($_.exists(k)===!1){c=document.createElement("ASIDE"),c.classList.add(this.wz_nav.replace(".","")),g=$_.getSelectorAll(this.wz_step,i),h=g.length;for(a=0;a<h;a++){b=document.createElement("DIV");let d=j[a].hasAttribute("data-title")?j[a].getAttribute("data-title"):`${i18n.title} ${a}`;b.classList.add(this.wz_step.replace(".","")),e=document.createElement("SPAN"),e.classList.add('dot'),b.appendChild(e),f=document.createElement("SPAN"),f.innerHTML=d,b.appendChild(f),c.appendChild(b)}d.prepend(c)}return!0}setButtons(){var d,e,a,b,c;let f=$_.getSelector(this.wz_class),g=$_.getSelector(this.wz_buttons,f);return $_.exists(g)===!1&&(d=document.createElement("ASIDE"),d.classList.add(this.wz_buttons.replace(".","")),e=this.wz_button_style.replaceAll(".",""),e=e.split(" "),a=document.createElement("BUTTON"),a.innerHTML=this.prev,a.classList.add(this.wz_button.replace(".","")),a.classList.add(...e),a.classList.add(this.wz_prev.replace(".","")),$_.str2bool(this.buttons)===!1&&(a.style.display="none"),d.appendChild(a),b=document.createElement("BUTTON"),b.innerHTML=this.next,b.classList.add(this.wz_button.replace(".","")),b.classList.add(...e),b.classList.add(this.wz_next.replace(".","")),$_.str2bool(this.buttons)===!1&&(b.style.display="none"),d.appendChild(b),c=document.createElement("BUTTON"),c.innerHTML=this.finish,c.classList.add(this.wz_button.replace(".","")),c.classList.add(...e),c.classList.add(this.wz_finish.replace(".","")),d.appendChild(c),this.checkButtons(b,a,c),f.appendChild(d)),!0}checkButtons(a,b,c){let d=this.getCurrentStep(),e=this.steps-1;d==0?b.setAttribute("disabled",!0):b.removeAttribute("disabled"),d==e?(a.setAttribute("disabled",!0),c.style.display="block"):(c.style.display="none",a.removeAttribute("disabled"))}onClick(g){let b=g;if(this.locked&&this.locked_step===this.getCurrentStep())return document.dispatchEvent(new Event("lockWizard")),!1;let c=$_.getParent(b,this.wz_class),e=$_.getSelector(this.wz_nav,c),f=$_.getSelector(this.wz_content,c);var h=$_.hasClass(b,this.wz_button);let a=$_.str2bool(b.getAttribute("data-step"))!==!1?parseInt(b.getAttribute("data-step")):this.getCurrentStep();if(h&&($_.hasClass(b,this.wz_prev)?(a=a-1,document.dispatchEvent(new Event("prevWizard"))):$_.hasClass(b,this.wz_next)&&(a=a+1,document.dispatchEvent(new Event("nextWizard")))),this.form&&this.navigation!="buttons"&&a>this.getCurrentStep()&&a!==this.getCurrentStep()+1&&(a>=this.last_step?a=this.last_step:a=this.getCurrentStep()+1),this.form){if(this.checkForm()===!0){if(this.last_step=this.getCurrentStep(),this.getCurrentStep()<a)return!1}}$_.str2bool(a)&&this.setCurrentStep(a);let d=$_.getSelector(this.wz_buttons,c),i=$_.getSelector(this.wz_button+this.wz_next,d),j=$_.getSelector(this.wz_button+this.wz_prev,d),k=$_.getSelector(this.wz_button+this.wz_finish,d);this.checkButtons(i,j,k);let l=$_.getSelectorAll(this.wz_step,e);$_.removeClassList(l,"active");let m=$_.getSelectorAll(this.wz_step,f);$_.removeClassList(m,"active"),$_.getSelector(`${this.wz_step}[data-step="${this.getCurrentStep()}"]`,e).classList.add("active"),$_.getSelector(`${this.wz_step}[data-step="${this.getCurrentStep()}"]`,f).classList.add("active")}onClickFinish(a){this.form?this.checkForm()!==!0&&document.dispatchEvent(new Event("submitWizard")):document.dispatchEvent(new Event("endWizard"))}setCurrentStep(a){this.current_step=this.setStep(a)}getCurrentStep(){return this.current_step}setStep(a){let c=$_.getSelector(this.wz_class),b=$_.getSelector(this.wz_content,c),d=$_.getSelector(`${this.wz_step}[data-step="${a}"]`,b);if($_.exists(d)===!1){let c=$_.getSelectorAll(this.wz_step,b).length-1,d=this.closetNubmer(c,a);a=d}return this.last_step=a>this.last_step?a:this.last_step,parseInt(a)}closetNubmer(c,a){var b=[];for(let a=0;a<=c;a++)b.push(a);let d=b.reduce(function(b,c){return Math.abs(c-a)<Math.abs(b-a)?c:b});return d}setNavEvent(){let a=this;$_.delegate(document,"click",this.wz_nav+" "+this.wz_step,function(b){b.preventDefault(),a.onClick(this)})}setBtnEvent(){let a=this;$_.delegate(document,"click",this.wz_buttons+" "+this.wz_button,function(b){b.preventDefault(),$_.hasClass(b.target,a.wz_finish)?a.onClickFinish(this):a.onClick(this)})}}var $_={getID:function(a,b=document){return b.getElementById(a)},getClass:function(a,b=document){return b.getElementsByClassName(a)},getTag:function(a,b=document){return b.getElementsByTagName(a)},getSelector:function(a,b=document){return b.querySelector(a)},getSelectorAll:function(a,b=document){return b.querySelectorAll(a)},hasClass:function(b,a){return a=a.replace(".",""),new RegExp('(\\s|^)'+a+'(\\s|$)').test(b.className)},getParent:function(a,c){for(var b=void 0;a.parentNode.tagName!=="BODY"&&b===void 0;)a=a.parentNode,a.matches(c)&&(b=a);return b},delegate:function(a,b,c,d){a.addEventListener(b,function(b){for(var a=b.target;a&&a!==this;)a.matches(c)&&d.call(a,b),a=a.parentNode})},removeClassList:function(a,b){for(let c of a)c.classList.remove(b)},objToString:function(a,d=";"){var c='',b;for(b in a)a.hasOwnProperty(b)&&(c+=b+':'+a[b]+d);return c},isHidden:function(a){var b=window.getComputedStyle(a);return b.display==='none'},str2bool:function(a){switch(a=String(a),a.toLowerCase()){case'false':case'no':case'n':case'':case'null':case'undefined':return!1;default:return!0}},exists:function(a){return typeof a!='undefined'&&a!=null},throwException:function(c){var b,a;try{throw new Error('myError')}catch(a){b=a}if(!b)return;throw a=b.stack.split("\n"),a.splice(0,2),a=a.join('\n"'),c+' \n'+a},formValidator:function(c){var b=!1,a;for(let d of c)if($_.hasClass(d,"required")||$_.exists(d.getAttribute("required"))){switch(a=!1,d.tagName){case"INPUT":a=$_.dispatchInput(d);break;case"SELECT":case"TEXTAREA":a=$_.isEmpty(d.value);break}a===!1&&(b=!0,console.log(d),$_.highlight(d,"error"))}return b},highlight:function(a,b="error"){let c="highlight-"+b;a.classList.add(c),setTimeout(function(){document.querySelectorAll('[class*="highlight"]').forEach(a=>{for(let b=a.classList.length-1;b>=0;b--){let c=a.classList[b];c.startsWith('highlight')&&a.classList.remove(c)}})},1e3)},dispatchInput:function(a){let c=a.getAttribute("type");var b=!1;switch(c){case"email":b=$_.isEmail(a.value);break;case"url":b=$_.isValidURL(a.value);break;case"checkbox":case"radio":b=a.checked;break;default:b=$_.isEmpty(a.value);break}return b},isEmpty:function(a){return a!=void 0&&a!=null&&a.length>0},isEmail:function(a){var b=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;return b.test(a)},isValidURL:function(a){var b=new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');return!!b.test(a)}}