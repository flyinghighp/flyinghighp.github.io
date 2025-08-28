function loneTeen(a, b) {
 let aTeen = ( a >=13 && a <=19);
 let bTeen = ( b >=13 && b <=19);
  
 if ( aTeen && !bTeen) return true;
 if ( !aTeen && bTeen) return true;
 return false;
}