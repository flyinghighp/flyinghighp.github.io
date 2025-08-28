//
//  main.cpp
//  Program to find the sum and multiplication of numbers in an array
//
//  Created by Priyansh  on 15/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int arr[] = {100, 200, 300, 400, 500};
    int arraysize = 0;
    int sum = 0, multiplication = 1 ;
    arraysize = sizeof(arr) / sizeof(arr[0]);
    
    cout<<"Length of Array is :"<<arraysize<<endl;
    
    for(int i = 0; i <arraysize; i++){
        sum = sum+arr[i];
        multiplication = multiplication*arr[i];
 
    }
    cout<<"Multiplication of the no's in array :"<<multiplication<<endl;
    cout<<"Sum of the no's in array :"<<sum<<endl;
    return 0;
}
