//
//  main.cpp
//  Program to print a string entered by a user
//
//  Created by Priyansh  on 17/07/25.
//

#include <iostream>
#include <string>

using namespace std;

int main(){
    string var1 = "";
    
    cout<<"Enter a string:"<<endl;
    getline(cin, var1);
    
    cout<<endl<<var1<<endl;
   
    return 0;
}
