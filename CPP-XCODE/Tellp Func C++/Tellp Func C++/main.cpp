//
//  main.cpp
//  Tellp Func C++
//
//  Created by Priyansh  on 11/08/25.
//

#include <iostream>
#include <fstream>
using namespace std;

int main(){
    ofstream fout;
    ;
    fout.open("my.txt", ios::app);
    
    long long pos;
    pos = fout.tellp();
    
    cout<<"Your pointer is at: "<<pos;
    
    fout<<"Priyansh";
    
    pos = fout.tellp();
    cout<<"Put pointer after writing"<<pos;
    fout.close();
    return 0;
}
