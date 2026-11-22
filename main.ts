import{readFileSync as A,readdirSync as B,mkdirSync as C,writeFileSync as D}from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
for(const d of B(I).sort()){
const r=run(A(I+'/'+d+'/program.bin'),A(I+'/'+d+'/input.bin'));
C(O+'/'+d,{recursive:true});
D(O+'/'+d+'/stdout.bin',r[0],'latin1');
D(O+'/'+d+'/exit.txt',r[1]+'\n');
}
function run(p,q){
const n=p.length,S=new Int32Array(576),C=S.subarray(256,320),M=S.subarray(320);
let sp=0,cp=0,ip=0,pc=0,st=0,O='';
const u=(x,y)=>{if(sp<x)throw 2;if(sp>255&y)throw 3};
const F=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>b?a/b|0:undefined,(a,b)=>b?a%b:undefined,(a,b)=>b?(a>>>0)/(b>>>0)|0:undefined,(a,b)=>b?(a>>>0)%(b>>>0):undefined,,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31),,(a,b)=>+(a===b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))];
try{
for(;;){
if(st===1e6)throw 10;
if(pc>>>0>=n)throw 9;
const op=p[pc],im=op<3?op*op:op>47&&op<52?2:0;
if(pc+im>=n)throw 9;
st++;const nx=pc+1+im;pc=nx;const A=p[nx-2]|p[nx-1]<<8;
if(F[op-16]){u(2);const r=F[op-16](S[sp-2],S[sp-1]);if(r===undefined)throw 4;sp-=2;S[sp++]=r;continue;}
switch(op){
case 0:throw 0;
case 1:case 2:u(0,1);S[sp++]=op==1?p[nx-1]<<24>>24:p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:u(1);sp--;break;
case 4:case 6:u(op/2-1,1);S[sp++]=S[sp-op/2];break;
case 5:u(2);[S[sp-1],S[sp-2]]=[S[sp-2],S[sp-1]];break;
case 7:u(3);[S[sp-3],S[sp-2],S[sp-1]]=[S[sp-2],S[sp-1],S[sp-3]];break;
case 23:case 27:u(1);S[sp-1]=~S[sp-1]+(op==23);break;
case 48:case 49:case 50:
if(op>48){u(1);const v=S[--sp];if(op===49?v!==0:v===0)break;}
pc=nx+(A<<16>>16);break;
case 51:if(cp===64)throw 7;C[cp++]=nx;pc=A;break;
case 52:if(!cp)throw 8;pc=C[--cp];break;
case 64:u(1);{const a=S[sp-1];if(a&~255)throw 6;S[sp-1]=M[a];break;}
case 65:u(2);{const a=S[sp-1],v=S[sp-2];if(a&~255)throw 6;sp-=2;M[a]=v;break;}
case 80:u(1);{const s=''+S[sp-1];if(O.length+s.length>65536)throw 11;sp--;O+=s;break;}
case 81:u(1);if(O.length>65535)throw 11;O+=String.fromCharCode(S[--sp]);break;
case 82:u(0,1);S[sp++]=q[ip++]??-1;break;
case 83:u(1);throw S[--sp]&255;
default:throw 5;
}
}
}catch(e){if(e!=+e)throw e;return[O,e];}
}
