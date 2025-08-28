//
//  main.cpp
//  Program to reverse a string
//
//  Created by Priyansh  on 15/07/25.
//

#include <iostream>
#include <string>

using namespace std;

int main(){
    string var = "";
    
    cout<<endl<<"Enter a String"<<endl;
    getline(cin, var);
    
    cout<<endl;
    
    for (int i = var.size(); i>=0; i--) {
        cout<<var[i];
    }
    return 0;
}

