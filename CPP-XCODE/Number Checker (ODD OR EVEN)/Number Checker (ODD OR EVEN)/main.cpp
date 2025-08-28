//
//  main.cpp
//  Number Checker (ODD OR EVEN)
//
//  Created by Priyansh  on 10/07/25.
//

#include <iostream>
using namespace std;
 
int main(){
    int num = 0;
    
    //input
    cout<<"Enter a number :"<<endl;
    cin>>num;
    
    //calculation
    if(num%2 == 0){
        cout<<endl<<"Even Number";
    }
    else if (num < 0){
        cout<<endl<<"Invalid Input";
    }
    else{
        cout<<endl<<"Odd Number";
    }
}
