//
//  main.cpp
//  Program to replace a word from the string
//
//  Created by Priyansh  on 17/07/25.
//

#include <iostream>
#include <string>

using namespace std;

int main(){
    string var1 = "", var2 = "", var3 = "";
    
    cout<<endl<<"Enter a String:";
    getline(cin, var1);
    
    cout<<endl<<"Enter a String to Find:";
    getline(cin, var2);
    
    cout<<endl<<"Enter a String to Replace:";
    getline(cin, var3);
    
    while(var1.find(var2) !=string::npos)
        var1.replace(var1.find(var2), var2.size(),var3);
    
    cout<<endl<<var1<<endl;
    
    return 0;
}

