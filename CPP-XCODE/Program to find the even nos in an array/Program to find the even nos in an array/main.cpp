//
//  main.cpp
//  Program to find the even nos in an array
//
//  Created by Priyansh  on 14/07/25.
//

#include <iostream>
using namespace std;
int main(){
    int arr[] = {9,3,2,6,7,8,10,15,20};
    int arraysize = 0;
    
    arraysize = sizeof(arr) / sizeof(arr[0]);
    
    cout<<"Length of Array is :"<<arraysize<<endl;
    
    
    for(int i = 0; i <arraysize; i++){
        if(arr[i]%2==0){
            cout<<endl<<arr[i]<<endl;
        }
    }
    return 0;
}

