//
//  main.cpp
//  Program to find the sum of first 10 natural numbers
//
//  Created by Priyansh  on 11/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int x = 1;
    int y = 0;

    do{
        y += x;
        x++;
    }
    while(x < 11);

    cout << "Sum = " << y << endl;
    return 0;
}
