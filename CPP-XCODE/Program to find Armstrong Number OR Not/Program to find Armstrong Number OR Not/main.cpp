//
//  main.cpp
//  Program to find Armstrong Number OR Not
//
//  Created by Priyansh  on 28/07/25.
//

#include <iostream>
#include <cmath>  // For pow function
using namespace std;

bool isArmstrong(int number){
    int originalNumber = number;
    int sum = 0;
    int digits = 0;
    
    int temp = number;
    while(temp!=0){
        digits++;
        temp /=10;
    }
    temp = number;
    while(temp!=0){
        int digits = temp%10;
        sum += pow (digits, digits);
        temp /=10;
    }
    return sum == originalNumber;
}
int main(){
    int num;
    cout<<"Enter Number: ";
    cin>>num;
    
    if (isArmstrong(num)) {
        cout << num << " is an Armstrong number." << endl;
    } else {
        cout << num << " is not an Armstrong number." << endl;
    }
    
    return 0;
}
