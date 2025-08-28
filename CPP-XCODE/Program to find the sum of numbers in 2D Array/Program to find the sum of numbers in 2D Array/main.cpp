//
//  main.cpp
//  Program to find the sum of numbers in 2D Array
//
//  Created by Priyansh  on 15/07/25.
//

#include <iostream>
using namespace std;

int main() {
    int arr[5][5];
    int sum = 0;

    // Input values
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            cout << "Row: " << i << ", Column: " << j << " - Enter a value: ";
            cin >> arr[i][j];
        }
    }

    // Sum all elements
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            sum += arr[i][j];
        }
    }

    cout << "Total sum of all elements is: " << sum << endl;

    return 0;
}
