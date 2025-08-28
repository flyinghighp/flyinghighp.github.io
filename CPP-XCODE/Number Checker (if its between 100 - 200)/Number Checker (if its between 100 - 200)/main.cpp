//
//  main.cpp
//  Number Checker (if its between 100 - 200)
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
    if(num>=100 && num<=200){
        cout<<endl<<"In range";
    }
    else{
        cout<<endl<<"Num not in range";
    }
}
