//
//  main.cpp
//  1st Way of Overloading a Function
//
//  Created by Priyansh  on 28/07/25.
//

#include <iostream>
#include <string>
using namespace std;

void add(int, int);
void add(float, float);
void add(string, string);
int main(){
    
    add(3,4);
    add(6.7f, 6.9f);
    add("Priyansh", "Jhanji");
    return 0;
}

void add(int x, int y){
    cout << endl << "Sum is" << x+y;
}

void add(float x, float y){
    cout << endl << "Sum is" << x+y;
}

void add(string x, string y){
    cout << endl << "Sum is" << x+y;
}

