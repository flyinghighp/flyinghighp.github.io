function notString(str) {
  let firstThree  = str.substring (0,3);
  
 
  if (firstThree === "not"){
      return str;
  }
    return "not "+str;
}
.