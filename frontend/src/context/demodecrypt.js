const symbols = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9"
  ];  
  export function decrypt(key, n){
    const newarr=[];
    const arr = key.split("");
    arr.forEach((el,index, arr)=>{
      let numb = symbols.findIndex((elem)=>elem===el)-n;
      if (numb<0){
        numb = symbols.length+numb;      
      }
      newarr.push(symbols.at(numb))
    })
    return newarr.join("");
  }