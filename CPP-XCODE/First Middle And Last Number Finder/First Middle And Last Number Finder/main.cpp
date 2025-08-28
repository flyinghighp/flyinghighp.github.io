//
//  main.cpp
//  First Middle And Last Number Finder
//
//  Create a program using cpp to find the first last and the middle no of a 3 digit no
//

#include <iostream>
using namespace std;

int main(){
    int first = 0, mid = 0, mid2 = 0, last = 0;
    int num = 0;
    //input
    cout<<"Enter a number :"<<endl;
    cin>>num;
    //calculation
    first = num/100;
    mid = (num%100)/10;
    mid2 = (num/10)%10;
    last = num%10;
    //output
    cout<<"First no:"<<first<<endl;
    cout<<"Middle no:"<<mid<<endl;
    cout<<"Last no:"<<last<<endl;
    
    return 0;
}
