//
//  main.cpp
//  Program to find the most occuring element in the array
//
//  Created by Priyansh  on 15/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int arr[] = {12,8,9,8,0,3,8,2,3,46,8,1,12,134,123};
    int arraysize = 0, maxOcc = 0, count = 0, maxcount = 0;
    
    arraysize = sizeof(arr) / sizeof(arr[0]);
    
    cout<<"Length of Array is :"<< arraysize <<endl;
    for(int i = 0; i < arraysize; i++){
        for(int j = i+1; j < arraysize; j++){
            if(arr[i] == arr[j]){
                count++;
            }
        }
        if(count > maxcount){
            maxcount = count;
            maxOcc = arr[i];
        }
        count = 1;
    }
    cout<<"Maximum Occuring Element is :"<<maxOcc<<endl;
    cout<<"Max time it's occuring is:"<<maxcount<<endl;
    return 0;
}
