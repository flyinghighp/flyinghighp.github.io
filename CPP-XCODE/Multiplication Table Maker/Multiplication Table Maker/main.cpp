//
//  main.cpp
//  Multiplication Table Maker
//
//  Create a program that makes a multiplication table using cpp
//

#include <iostream>
using namespace std;

int main(){
    int a = 0;
    //input
    cout<<"Enter a number of which you want to create a table for:"<<endl;
    cin>>a;
    //calculation&output
    cout<<a<<"*"<<"1"<<"="<<a*1<<endl;
    cout<<a<<"*"<<"2"<<"="<<a*2<<endl;
    cout<<a<<"*"<<"3"<<"="<<a*3<<endl;
    cout<<a<<"*"<<"4"<<"="<<a*4<<endl;
    cout<<a<<"*"<<"5"<<"="<<a*5<<endl;
    cout<<a<<"*"<<"6"<<"="<<a*6<<endl;
    cout<<a<<"*"<<"7"<<"="<<a*7<<endl;
    cout<<a<<"*"<<"8"<<"="<<a*8<<endl;
    cout<<a<<"*"<<"9"<<"="<<a*9<<endl;
    cout<<a<<"*"<<"10"<<"="<<a*10;
    
    return 0;
}
