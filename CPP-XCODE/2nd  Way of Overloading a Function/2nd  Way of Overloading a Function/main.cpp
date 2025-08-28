//
//  main.cpp
//  2nd  Way of Overloading a Function
//
//  Created by Priyansh  on 28/07/25.
//

#include <iostream>
#include <string>
using namespace std;
void add(int, int);
void add(int, int,int);

int main(){
    
    add(7,8);
    add(1,2,3);
    return 0;
}

void add(int x, int y){
    cout << endl << "Sum of 2 no's is: " << x+y << endl;
}
void add(int x, int y, int z){
    cout << endl << "Sum of 3 no's is: " << x+y+z << endl;
}
