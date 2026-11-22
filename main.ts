import{readFileSync as A,readdirSync as B,mkdirSync as C,writeFileSync as D}from'node:fs'
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env
for(const d of B(I)){
const P=I+'/'+d,Q=O+'/'+d,[s,e]=run(A(P+'/program.bin'),A(P+'/input.bin'))
C(Q,{recursive:!0})
D(Q+'/stdout.bin',s,'latin1')
D(Q+'/exit.txt',''+e)
}
function run(p,q){
let S=new Int32Array(576),sp=0,cp=0,ip=0,pc=0,st=0,O='',u=(x,y)=>{if(sp<x|sp>255&y)throw 2+(sp>255&y)},F=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>b?a/b:NaN,(a,b)=>b?a%b:NaN,(a,b)=>(a>>>0)/(b>>>0||NaN),(a,b)=>(a>>>0)%(b>>>0||NaN),,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b,,(a,b)=>a==b,(a,b)=>a<b,(a,b)=>a>>>0<b>>>0]
try{
for(;st++<1e6;){
const op=p[pc],im=op<3?op*op:op>47&op<52?2:0
if(pc+im>>>0>=p.length)throw 9
pc+=1+im;const A=p[pc-2]|p[pc-1]<<8
if(F[op-16]){u(2);const r=F[op-16](S[sp-2],S[sp-1]);if(r!=r)throw 4;S[--sp-1]=r;continue}
switch(op){
case 0:throw 0
case 1:case 2:u(0,1);S[sp++]=op<2?A<<16>>24:p[pc-4]|p[pc-3]<<8|A<<16;break
case 3:u(1);sp--;break
case 4:case 6:u(op/2-1,1);S[sp++]=S[sp-op/2];break
case 5:u(2);[S[sp-1],S[sp-2]]=[S[sp-2],S[sp-1]];break;break
case 7:u(3);[S[sp-3],S[sp-2],S[sp-1]]=[S[sp-2],S[sp-1],S[sp-3]];break
case 23:case 27:u(1);S[sp-1]=-S[sp-1]-(op>23);break
case 48:case 49:case 50:
if(op>48){u(1);if(op<50^!S[--sp])break}
pc+=A<<16>>16;break
case 51:if(cp>63)throw 7;S[512+cp++]=pc;pc=A;break
case 52:if(!cp)throw 8;pc=S[512+--cp];break
case 64:u(1);if(S[sp-1]&~255)throw 6;S[sp-1]=S[256+S[sp-1]];break
case 65:u(2);if(S[sp-1]&~255)throw 6;S[256+S[sp-1]]=S[sp-2];sp-=2;break
case 80:u(1);if(O[65536-(''+S[sp-1]).length])throw 11;O+=S[--sp];break
case 81:u(1);if(O[65535])throw 11;O+=String.fromCharCode(S[--sp]);break
case 82:u(0,1);S[sp++]=q[ip++]??-1;break
case 83:u(1);throw S[--sp]&255
default:throw 5
}
}
throw 10
}catch(e){return[O,e]}
}
