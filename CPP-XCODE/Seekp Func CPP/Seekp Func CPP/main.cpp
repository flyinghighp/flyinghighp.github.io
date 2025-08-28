//
//  main.cpp
//  Seekp Func CPP
//
//  Created by Priyansh  on 11/08/25.
//

#include<iostream>
#include<fstream>
using namespace std;

int main()
{
    ofstream fout;
    char A[8] = "Academy";

    fout.open("my.txt",ios::in);

    
    
    fout.seekp(8, ios_base::beg);


    fout.write(A,8);


    fout.close();
    return 0;
}
