//
//  main.cpp
//  Program To Find The Factorial Of A Number
//
//  Created by Priyansh  on 11/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int factorial = 1;
    int x = 0;
    
    cout<<"Enter a number :"<<endl;
    cin>>x;
    
    for(int i = x; i > 0; i--){
        factorial = factorial*i;
    }
    cout<<"The Factorial Of The Number:"<<factorial;
}
