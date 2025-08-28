//
//  main.cpp
//  program to compare if the two strings entered by user are equal or not ( length ).
//
//  Created by Priyansh  on 17/07/25.
//

#include <iostream>
#include <string>

using namespace std;

int main(){
    
    string var1 = "", var2 = "";
    
    cout<<"Enter a String :"<<endl;
    getline(cin, var1);
    
    cout<<endl<<"Enter Another String :"<<endl;
    getline(cin, var2);
    
    if(var1.length() == var2.length()){
        cout<<endl<<"The Lengths of The 2 Strings Entered are Equal"<<endl;
    }
    else{
        cout<<endl<<"The Lengths of The 2 Strings Entered are Not Equal"<<endl;
    }
}
