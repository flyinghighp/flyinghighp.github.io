//
//  main.cpp
//  Program to find the second highest element in array
//
//  Created by Priyansh  on 15/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int arr[] = {12,9,23,14,56,78,34,89};
    int arraysize = 0;
    
    arraysize = sizeof(arr) / sizeof(arr[0]);
    
    cout<<"Length of Array is :"<<arraysize<<endl;
    
    for(int j = 0; j<arraysize; j++){
        
        for(int i = 0; i<arraysize; i++){
            if(arr[i]<arr[i+1]){
                int temp = 0;
                temp = arr[i];
                arr[i]=arr[i+1];
                arr[i+1]=temp;
            }
        }
    }
    cout<<"The Second Largest Number In The Array :"<<arr[1];
    return 0;
}
