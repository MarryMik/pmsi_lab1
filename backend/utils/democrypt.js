function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
const symbols = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9"
  ];
  //функція генерування ключа
  export function generateKey(n){
    let newkey=[];
    for(let j=0; j<n; j++){
      newkey.push(symbols.at(getRandomInt(symbols.length-1)))
    }
    return newkey.join("")
  }
//функція шифрування ключа
  export function democrypt(key, n){
    console.log("key="+key);
    const newarr=[];
    const arr = key.split("");
    arr.forEach((el,index, arr)=>{
      let numb = symbols.findIndex((elem)=>elem===el)+n;
      if (numb>=symbols.length){
        numb = numb-symbols.length;      
      }
      newarr.push(symbols.at(numb))
    })
    return newarr.join("");
  }