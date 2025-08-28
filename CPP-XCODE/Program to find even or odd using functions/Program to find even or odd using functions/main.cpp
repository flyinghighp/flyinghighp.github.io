//
//  main.cpp
//  Program to find even or odd using functions
//
//  Created by Priyansh  on 28/07/25.
//

#include <iostream>
#include <string>
using namespace std;
void add(int,int);
int x = 0;

inline void add(int num){
    if(num%2==0){
        cout<<endl<<"Number is Even"<<endl;
    }
    else{
        cout<<endl<<"Given no is Odd"<<endl;
    }
}

int main(){
    cout<<"Enter a number:"<<endl;
    cin>>x;
    add(x);
    return 0;
}

