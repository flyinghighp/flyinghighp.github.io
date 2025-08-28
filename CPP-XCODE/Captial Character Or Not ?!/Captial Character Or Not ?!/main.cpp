//
//  main.cpp
//  Captial Character Or Not ?!
//
//  Created by Priyansh  on 11/07/25.
//

#include <iostream>
using namespace std;

int main(){
    char mychar;
    
    cout<<"Enter a Character :"<<endl;
    cin>>mychar;
    
    if(isupper(mychar)){
        cout<<endl<<"Uppercase Character";
    }
    else{
        cout<<endl<<"Lowercase Character";
    }
    return 0;
}
