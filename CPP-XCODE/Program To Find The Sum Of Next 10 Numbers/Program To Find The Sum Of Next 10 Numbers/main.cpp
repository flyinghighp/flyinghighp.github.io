//
//  main.cpp
//  Program To Find The Sum Of Next 10 Numbers
//
//  Created by Priyansh  on 11/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int num = 0;
    int sum = 0;
    
    //input
    cout<<"Enter a Number";
    cin>>num;
    
    //Logic
    for(int i = 0; i<=10; i++){
        num++;
        sum = sum+num;
    }
    cout<<"The Sum of Next 10 No's :"<<sum<<endl;
    return 0;
}
