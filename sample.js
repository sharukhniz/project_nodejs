function add(a=2, b=3,s){
   const r =  a+b;
   if(r)
    s(r);
}

let s=function success(result){
    console.log(result);
}

add(a,b,s);
