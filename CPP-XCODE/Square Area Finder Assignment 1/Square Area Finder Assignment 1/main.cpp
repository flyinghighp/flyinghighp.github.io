//
//  main.cpp
//  Square Area Finder Assignment 1
//
//  Write a program to find the area of the square using cpp
//

#include <iostream>
using namespace std;

int main(){
    int side = 0, area = 0;
    
    //input
    cout<<"Enter a side of the square :"<<endl;
    cin>> side;
    
    //calculation
    area = side*side;
    
    //output
    cout<<"Area Of The Square :"<<area<<endl;
    
    return 0;
}
