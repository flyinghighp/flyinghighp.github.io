//
//  main.cpp
//  Quotient and Remainder Calculator
//
// Create a program to find Quotient and Divisor using C++
//

#include <iostream>
using namespace std;

int main(){
    int divisor = 0, dividend = 0;
    int remainder = 0, quotient = 0;
    
    //input
    cout<<"Enter Divisor:"<<endl;
    cin>>divisor;
    
    cout<<"Enter Dividend:"<<endl;
    cin>>dividend;
    
    //calculation
    
    quotient = dividend / divisor;
    remainder = dividend % divisor;
    
    //output
    cout<<"Quotient :"<<quotient<<endl;
    cout<<"Remainder :"<<remainder<<endl;
    
    return 0;
}
