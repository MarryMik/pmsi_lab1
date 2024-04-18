export function cryptPassw(a, x){
    const arr = [];
    const arr2=[];
    a.split('').forEach((el)=>arr.push(el.charCodeAt()));
    arr.forEach((el,index)=>arr2.push(Math.exp(-el*x)));
    const i = 0;
    return arr2.reduce((a,b)=>a+b,i)
}