//
//  main.cpp
//  Area And Perimeter Calculator
//
//  Write a program in C++ to calculate the Area and the Perimeter of the Rectangle
//  Area = L*B
// Perimeter = 2(L+B)

#include <iostream>
using namespace std;

int main(){
    int length = 0, breadth = 0;
    int area = 0, perimeter = 0;
    
    //input
    cout<<"Enter Length :" <<endl;
    cin>>length;
    
    cout<<"Enter Breadth :"<< endl;
    cin >> breadth;
    
    //output
    area = length*breadth;
    perimeter = 2*(length+breadth);
    
    cout <<"Area :"<<area<<endl;
    cout<<"Perimeter :"<<perimeter<<endl;
    
    return 0;
}
