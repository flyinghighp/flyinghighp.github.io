function parrotTrouble(talking, hour) {
 if (!talking){   //(talking===false)
  return false; 
  }
  // if we get here the parrot must be talking...
  if (hour < 7 || hour > 20){
    return true;
  }
  else {
    return false;
  }
}
.