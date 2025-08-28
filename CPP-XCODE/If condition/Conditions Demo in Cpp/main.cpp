//
//  main.cpp
//  If condition
//
//  Conditions Demo in Cpp
//

#include <iostream>
using namespace std;

int main(){
    int marks = 0;
    
    cout<<"Enter Marks :"<<endl;
    cin>>marks;
    
    if(marks >=60 && marks<=100){
        cout<<endl<<"You Passed!!";
    }
    else if(marks >= 0 && marks < 60){
        cout<<endl<<"You are Fail :(";
    }
    else{
        cout<<"Invalid Input";
    }
    
    return  0;
}
