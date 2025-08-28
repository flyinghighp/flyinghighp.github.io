//
//  main.cpp
//  Program to compare two strings
//
//  Created by Priyansh  on 15/07/25.
//

#include <iostream>
#include <string>

using namespace std;

int main(){
    string var = "", var2 = "";
    
    cout<<endl<<"Enter a String"<<endl;
    getline(cin, var);
    
    cout<<endl<<"Enter a String"<<endl;
    getline(cin, var2);
    
    if(var.compare(var2)==0){
        cout<<endl<<"Both the strings are same"<<endl;
    }
    else{
        cout<<endl<<"Both the strings are different"<<endl;
    }
}

