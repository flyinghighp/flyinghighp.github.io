//
//  main.cpp
//  Pointer And Array Demo -CPP
//
//  Created by Priyansh  on 09/08/25.
//

#include <iostream>
using namespace std;

int main(){
    int arr[5] = {10,20,30,40,50};
    
    int *ptr = &arr[0];
    
    for (int i = 0; i<5; i++){
        cout<<"Value at: "<<i<<" is = "<<*(ptr+i)<<endl;
    }
}
