//
//  main.cpp
//  Total and Average Finder
//
//  Write a program in cpp to compute the total and the average of 4 no's
//

#include <iostream>
using namespace std;

int main(){
    int a = 0, b = 0, c = 0, d = 0;
    int total = 0, average = 0;
    
    //input
    cout<<"Enter 1st no:"<<endl;
    cin>>a;
    cout<<"Enter 2nd no:"<<endl;
    cin>>b;
    cout<<"Enter 3rd no:"<<endl;
    cin>>c;
    cout<<"Enter 4th no:"<<endl;
    cin>>d;
    
    //calculation
    total = a+b+c+d;
    average = (a+b+c+d)/4;
    
    //output
    cout<<"Total of the 4 no's:"<<total<<endl;
    cout<<"Average of the no's:"<<average<<endl;
    return 0;
}
