//
//  main.cpp
//  Multiple of 3 ??
//
//  Created by Priyansh  on 10/07/25.
//

#include <iostream>
#include <iostream>
using namespace std;
 
int main(){
    int num = 0;
    
    //input
    cout<<"Enter a number :"<<endl;
    cin>>num;
    
    //calculation
    if(num%3 == 0){
        cout<<endl<<"Multiple of 3";
    }
    else if (num < 0){
        cout<<endl<<"Invalid Input";
    }
    else{
        cout<<endl<<"Not a Multiple of 3";
    }
}
