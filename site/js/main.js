var B='https://www.ademolaadeagbo.com.ng',F='https://www.figma.com/proto/';
var D=[['Aura Archive','A luxury fashion house in your pocket: the SS27 collection, private viewings and a concierge.',28,[['Case study',B+'/aura/case-study.html'],['Prototype',F+'cx7qx7Fsg8hfzxcFAGoHhD/AURA-ARCHIVE']],'assets/projects/aura/aura-1.jpg'],
['Marque','Buy, rent or hand it to the concierge: 24 motorcars and one price before you pay.',215,[['Case study',B+'/marque/case-study.html'],['Prototype',F+'cafrS3VswCIDf054Pd3B3o/Marque']],'assets/projects/marque/marque-1.jpg'],
['Abode','Rent straight from verified landlords, with no agent fee.',160,[['Case study',B+'/abode/case-study.html'],['Prototype',F+'ibOFGRywhWBnyVy7Rm6RMe/Adobe']],'assets/projects/abode-1.jpg'],
['Sprout','Banking and money lessons for children aged 4 to 16.',130,[['Project page',B+'/work/sprout.html'],['Prototype',F+'P9DDusZ0kUDMD0mGjU6ue6/Sprout']],'assets/projects/sprout-1.jpg'],
['Munchdeck','Jollof, suya and more from restaurants near you.',12,[['Project page',B+'/work/munchdeck.html'],['Prototype',F+'9kut1EwVmDs7Bs52OqHwsY/Munch-Deck']],'assets/projects/munch-1.jpg'],
['Quick Cart','One-tap shopping from local merchants.',270,[['Project page',B+'/work/quickcart.html'],['Prototype',F+'k3WZ0Ln8K2m2cSDRcOoIcT/QUICK-CART']],'assets/projects/quickcart-wide.jpg'],
['Rolly’s Collection','Everyday essentials and handmade beaded bags, for a real business.',340,[['Project page',B+'/work/rollys.html'],['Visit website','https://rollys-collection.netlify.app/']],'assets/projects/rollys-1.jpg'],
['VibesManLux','Bespoke menswear from a Lagos tailoring studio.',45,[['Project page',B+'/work/vibesmanlux.html'],['Visit website','https://vibesmanlux.netlify.app/']],'assets/projects/vibesmanlux-1.jpg']];
var car=document.getElementById('car');
car.innerHTML=D.map(function(p){return '<article class="pc"><img alt="'+p[0]+' project screens" src="'+p[4]+'" loading="lazy" decoding="async"><h3>'+p[0]+'</h3><p>'+p[1]+'</p><div>'+p[3].map(function(l,i){return '<a class="btn s'+(i?' p':'')+'" href="'+l[1]+'" target="_blank" rel="noopener">'+l[0]+'</a>'}).join('')+'</div></article>'}).join('');
document.getElementById('pv').onclick=function(){car.scrollBy({left:-380,behavior:'smooth'})};document.getElementById('nx').onclick=function(){car.scrollBy({left:380,behavior:'smooth'})};

var big=document.getElementById('big'),gt=document.getElementById('giant'),rd=matchMedia('(prefers-reduced-motion:reduce)').matches;
function sc(){var r=big.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));gt.style.transform='scale('+(rd?1:.7+p*.55)+')';gt.style.opacity=rd?1:.2+p*.8;document.body.classList.toggle('light',p>.6||r.bottom<0)}
addEventListener('scroll',sc,{passive:true});sc();
var L=[].slice.call(document.querySelectorAll('nav a')),io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){L.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
['home','about','portfolio','contact'].forEach(function(i){io.observe(document.getElementById(i))});
document.getElementById('f').onsubmit=function(e){e.preventDefault();var f=e.target;location.href='mailto:adeagboademola345@gmail.com?subject='+encodeURIComponent('Portfolio message from '+f.n.value)+'&body='+encodeURIComponent(f.m.value+'\n\n'+f.n.value+'\n'+f.e.value)};

(function(){
var $=function(s){return [].slice.call(document.querySelectorAll(s))},rd=matchMedia('(prefers-reduced-motion:reduce)').matches;
var T=['Product design','UI/UX','Prototyping','Web development','User research','Design systems'],mq=document.getElementById('mqt');if(mq)mq.innerHTML=T.concat(T).concat(T).concat(T).map(function(t){return '<span>'+t+'</span>'}).join('');
if(rd)return;
document.documentElement.classList.add('fx');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
var h=document.querySelector('.about h1');
if(h){var n=0,w=function(t){return t.split(' ').map(function(x){return '<span class="wd"><i style="transition-delay:'+(n++*.09)+'s">'+x+'</i></span>'}).join(' ')};h.innerHTML='<em>'+w('Ademola Adeagbo')+'</em>';io.observe(h)}
['.about p','.cta','.pf','h2.t','.tl h3','.it','.fd','.pc','#contact form','.fm','.sub'].forEach(function(s){$(s).forEach(function(el,i){el.classList.add('rv');el.style.setProperty('--d',(i%4*.1)+'s');io.observe(el)})});
$('.fd strong').forEach(function(s){var v=+s.textContent,o=new IntersectionObserver(function(e){if(e[0].isIntersecting){o.disconnect();var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/1300);s.textContent=Math.round(v*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}});s.textContent=0;o.observe(s)});
var gt=document.getElementById('giant'),ls=[];if(gt){gt.innerHTML=gt.textContent.split('').map(function(c){return '<span style="display:inline-block">'+c+'</span>'}).join('');ls=[].slice.call(gt.children)}
var big=document.getElementById('big'),pb=document.getElementById('pb'),pic=document.querySelector('.open picture'),ow=document.querySelector('.open .wrap'),tk=0;
function up(){tk=0;var y=scrollY,m=document.documentElement.scrollHeight-innerHeight;if(pb)pb.style.transform='scaleX('+(m>0?y/m:0)+')';
if(pic&&y<innerHeight*1.2){pic.style.transform='translateY('+y*.28+'px) scale('+(1+y*.0003)+')';ow.style.opacity=Math.max(0,1-y/(innerHeight*.55));ow.style.transform='translateY('+y*-.2+'px)'}
if(big&&ls.length){var r=big.getBoundingClientRect();if(r.bottom>-120&&r.top<innerHeight+120){var p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));ls.forEach(function(s,i){var q=Math.min(1,Math.max(0,p*2.6-i*.16));s.style.transform='translateY('+((1-q)*70)+'%) translateZ('+(q*60)+'px) rotateY('+((1-q)*16)+'deg) rotate('+((1-q)*-10)+'deg)';s.style.opacity=.1+.9*q})}}}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(up)}},{passive:true});up();
if(matchMedia('(hover:hover)').matches){
var c=document.createElement('div');c.id='cur';document.body.appendChild(c);var cx=0,cy=0,tx=0,ty=0,raf=0;
function cur(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;c.style.transform='translate('+cx+'px,'+cy+'px)';raf=(Math.abs(tx-cx)>.1||Math.abs(ty-cy)>.1)?requestAnimationFrame(cur):0}
addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;c.style.opacity=1;if(!raf)raf=requestAnimationFrame(cur)});
document.addEventListener('pointerover',function(e){c.classList.toggle('big',!!e.target.closest('a,button,.pf,.pc,.fd,input,textarea'))});
$('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
$('.pc').forEach(function(card){card.addEventListener('pointermove',function(e){var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1000px) rotateY('+(x*9)+'deg) rotateX('+(-y*7)+'deg) translateY(-4px)';card.style.setProperty('--gx',((x+.5)*100)+'%');card.style.setProperty('--gy',((y+.5)*100)+'%')});card.addEventListener('pointerleave',function(){card.style.transform=''})});
var pf=document.getElementById('pf');if(pf){pf.addEventListener('pointermove',function(e){var r=pf.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;pf.style.transition='transform .15s ease-out';pf.style.transform='perspective(900px) rotateY('+x*14+'deg) rotateX('+-y*10+'deg) scale(1.02)'});pf.addEventListener('pointerleave',function(){pf.style.transition='transform .6s';pf.style.transform=''})}}
})();

(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var D=document,$=function(s){return [].slice.call(D.querySelectorAll(s))},cl=function(v,a,b){return Math.min(b,Math.max(a,v))};
var ld=D.createElement('div');ld.id='ld';
function R(x,y,w,h,r){return 'M'+(x+r)+' '+y+'H'+(x+w-r)+'A'+r+' '+r+' 0 0 1 '+(x+w)+' '+(y+r)+'V'+(y+h-r)+'A'+r+' '+r+' 0 0 1 '+(x+w-r)+' '+(y+h)+'H'+(x+r)+'A'+r+' '+r+' 0 0 1 '+x+' '+(y+h-r)+'V'+(y+r)+'A'+r+' '+r+' 0 0 1 '+(x+r)+' '+y+'Z'}
function C(x,y,r){return 'M'+(x-r)+' '+y+'A'+r+' '+r+' 0 1 1 '+(x+r)+' '+y+'A'+r+' '+r+' 0 1 1 '+(x-r)+' '+y}
var NAV=R(54,640,252,52,26),PH='translate(180 36) scale(.9)';
var PHONE=[[R(40,10,280,700,40),'y',560],[R(150,26,60,10,5),'',160]];
var WEB=[[R(40,156,640,408,18),'y',560],['M40 206H680','',140],[C(68,181,6),'',90],[C(90,181,6),'',90],[C(112,181,6),'',90],[R(136,171,300,20,10),'',160],[R(590,171,70,20,10),'',110]];
var APP_A=[[C(84,84,18),'y',150],[R(112,72,100,12,6),'',100],[R(112,92,64,8,4),'',80],[R(60,128,240,38,19),'',180],[R(60,186,240,176,24),'y k',300],['M72 346L124 280L162 318L214 244L290 346','',200],[C(254,228,15),'',120],[R(60,384,60,60,16),'',130],[R(134,396,130,11,5),'',100],[R(134,418,90,9,4),'',80],[NAV,'',240]];
var APP_B=[[R(60,70,130,18,9),'',120],[R(60,108,240,36,18),'',160],[R(64,112,78,28,14),'y k',120],[R(60,164,114,150,20),'y k',220],[R(186,164,114,150,20),'',220],[R(60,330,114,150,20),'',220],[R(186,330,114,150,20),'y k',220],[R(72,280,60,9,4),'',80],[R(198,280,60,9,4),'',80],[NAV,'',240]];
var WEB_A=[[R(64,230,600,150,14),'y k',300],[R(88,260,250,18,9),'',130],[R(88,290,180,10,5),'',90],[R(88,318,120,34,17),'y',150],[R(64,400,188,140,12),'',200],[R(80,426,120,10,5),'',80],[R(80,446,90,8,4),'',70],[R(268,400,188,140,12),'',200],[R(284,426,120,10,5),'',80],[R(284,446,90,8,4),'',70],[R(472,400,192,140,12),'',200],[R(488,426,120,10,5),'',80],[R(488,446,90,8,4),'',70]];
var WEB_B=[[R(64,230,150,310,12),'',220],[R(80,252,110,12,6),'',90],[R(80,278,80,8,4),'',70],[R(80,302,100,8,4),'',70],[R(80,326,70,8,4),'',70],[R(240,230,424,180,14),'y k',320],['M258 380L300 340L340 356L384 296L424 320L468 272L512 290L556 252L608 276L646 240','y',280],[R(240,428,130,112,12),'',180],[R(386,428,130,112,12),'',180],[R(532,428,132,112,12),'',180]];
var SC=[['Home','m',APP_A],['Explore','m',APP_B],['Landing page','w',WEB_A],['Dashboard','w',WEB_B]];

ld.innerHTML='<svg viewBox="0 0 720 720" aria-hidden="true"><g id="sc"></g></svg><div id="ldl"></div><div id="ldc"><svg width="22" height="22" viewBox="0 0 22 22"><path d="M2 2L19 9L11 11L9 19Z" fill="#ffc800" stroke="#06080f" stroke-width="1.5" stroke-linejoin="round"/></svg><span>Ademola</span></div>';
D.body.appendChild(ld);D.documentElement.style.overflow='hidden';
var sv=ld.querySelector('svg'),sg=D.getElementById('sc'),cur=D.getElementById('ldc'),lb=D.getElementById('ldl'),fn=0,G=.5;
sg.style.transition='opacity .25s';
function mk(l,g,t){if(t)g.setAttribute('transform',t);else g.removeAttribute('transform');g.innerHTML=l.map(function(s){return '<path d="'+s[0]+'" class="'+s[1]+'"/>'}).join('');return [].slice.call(g.children).map(function(p,i){var L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;p.style.opacity=0;return {p:p,L:L,k:l[i][1].indexOf('k')>-1,d:l[i][2]*G}})}
function run(q,done){var i=0;(function nx(){if(fn)return;if(i>=q.length){done();return}var o=q[i++],st=performance.now();o.p.style.opacity=1;cur.style.opacity=1;(function f(t){if(fn)return;var u=cl((t-st)/o.d,0,1),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,a=o.p.getPointAtLength(o.L*e),pt=sv.createSVGPoint();pt.x=a.x;pt.y=a.y;var m=o.p.getScreenCTM();if(m){var z=pt.matrixTransform(m);cur.style.transform='translate('+z.x+'px,'+z.y+'px)'}o.p.style.strokeDashoffset=o.L*(1-e);if(u<1)requestAnimationFrame(f);else{if(o.k)o.p.classList.add('f');nx()}})(st)})()}
function fin(){if(fn)return;fn=1;cur.style.opacity=0;lb.style.opacity=0;setTimeout(function(){ld.classList.add('done');D.querySelector('.open').classList.add('go');setTimeout(function(){ld.remove();D.documentElement.style.overflow='';meas()},1100)},250)}
function scr(n){if(fn)return;if(n>=SC.length){fin();return}var s=SC[n],m=s[1]=='m';lb.textContent=(n+1)+' / '+SC.length+'   '+s[0];run(mk((m?PHONE:WEB).concat(s[2]),sg,m?PH:null),function(){setTimeout(function(){if(fn)return;sg.style.opacity=0;setTimeout(function(){if(fn)return;sg.style.opacity=1;sg.innerHTML='';scr(n+1)},280)},380)})}
ld.onclick=fin;scr(0);
['a','b'].forEach(function(k){var b=D.createElement('div');b.className='blob '+k;D.body.appendChild(b)});

var sec=D.getElementById('portfolio'),car=D.getElementById('car'),pin=D.createElement('div'),tot=0,travel=0;pin.className='pin';while(sec.firstChild)pin.appendChild(sec.firstChild);sec.appendChild(pin);sec.style.padding='0';car.style.scrollSnapType='none';
var pr=D.createElement('div');pr.className='cprog';pr.innerHTML='<span></span>';pin.appendChild(pr);var prs=pr.firstChild;
function meas(){tot=Math.max(0,car.scrollWidth-innerWidth+innerWidth*.05);travel=tot*.6;sec.style.height=(innerHeight+travel)+'px'}
addEventListener('resize',meas);addEventListener('load',meas);meas();
var gn=D.querySelector('.gn'),tk=0;
function up(){tk=0;var y=scrollY;if(gn&&y<innerHeight*1.3)gn.style.transform='translateX('+(-y*.4)+'px)';var r=sec.getBoundingClientRect(),p=travel?cl(-r.top/travel,0,1):0;car.style.transform='translate3d('+(-p*tot)+'px,0,0)';prs.style.transform='scaleX('+p+')'}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(up)}},{passive:true});up();
var mq=D.querySelector('.mq-t'),last=scrollY,vel=0;
(function f(){var y=scrollY;vel+=(Math.abs(y-last)-vel)*.08;last=y;var a=mq&&mq.getAnimations()[0];if(a)a.playbackRate=1+Math.min(vel,45)*.35;requestAnimationFrame(f)})();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.2});
$('h2.t').forEach(function(h){var n=0;h.innerHTML=h.textContent.split(' ').map(function(x){return '<span class="wd"><i style="transition-delay:'+(n++*.08)+'s">'+x+'</i></span>'}).join(' ');io.observe(h)});
})();
