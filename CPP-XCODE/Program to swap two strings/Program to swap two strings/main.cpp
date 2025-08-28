//
//  main.cpp
//  Program to swap two strings
//
//  Created by Priyansh  on 15/07/25.
//

#include <iostream>
#include <string>

using namespace std;

int main(){
    string var = "", var2 = "", temp="";
    
    cout<<endl<<"Enter a String"<<endl;
    getline(cin, var);
    
    cout<<endl<<"Enter a String"<<endl;
    getline(cin, var2);
    
//    temp = var;
//    var=var2;
//    var2=temp;
    
    var.swap(var2);
    
    cout<<endl<<"Var 1:"<<var<<endl;
    cout<<endl<<"Var 2:"<<var2<<endl;
}
