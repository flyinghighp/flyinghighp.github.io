function countXX(str) {
   let result = 0; //number of "xx" found 
  while(str.indexOf("xx")!== -1){
    let start = str.indexOf("xx")+1;
    result +=1;
    str = str.substring(start);
  }
  return result;
}