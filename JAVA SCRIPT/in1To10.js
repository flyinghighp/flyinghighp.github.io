function in1To10(n, outsideMode) {
  let nTrue = ( (n <= 10 && n >= 01) && outsideMode === false);
  let nnTrue = ( (n >=10 || n <= 1) && outsideMode === true);
  
  if (nTrue) return true;

  if (nnTrue) return true;
  return false;
  
  
}