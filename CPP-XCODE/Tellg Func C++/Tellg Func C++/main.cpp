//
//  main.cpp
//  Tellg Func C++
//
//  Created by Priyansh  on 11/08/25.
//

#include <iostream>
#include <fstream> // <-- This is required for ifstream
using namespace std;

int main() {
    ifstream fin;
    char ch;

    fin.open("my.txt");

    long long pos;
    pos = fin.tellg();
    cout << pos << endl;

    fin >> ch;
    pos = fin.tellg();
    cout << pos << endl;

    fin.close();
}


