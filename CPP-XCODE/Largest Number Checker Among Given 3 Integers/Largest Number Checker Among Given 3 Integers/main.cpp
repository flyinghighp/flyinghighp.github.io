//
//  main.cpp
//  Largest Number Checker Among Given 3 Integers
//
//  Created by Priyansh  on 11/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int a = 0, b = 0, c = 0;
    
    //Input
    cout<<"Enter 1st Number"<<endl;
    cin>>a;
    
    cout<<"Enter 2nd Number"<<endl;
    cin>>b;
    
    cout<<"Enter 3rd Number"<<endl;
    cin>>c;
    
    //conditions
    if(a>b && a>c){
        cout<<endl<<"1st Number is the largest!";
    }
    else if(b>a && b>c){
        cout<<endl<<"2st Number is the largest!";
    }
    else if(c>a && c>b){
        cout<<endl<<"3rd Number is the largest!";
    }
    else if(a==b && a==c){
        cout<<endl<<"All numbers are equal";
    }
    else{
        cout<<endl<<"Invalid Input";
    }
    return 0;
}
