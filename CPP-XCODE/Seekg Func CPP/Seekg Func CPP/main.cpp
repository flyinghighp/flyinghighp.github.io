//
//  main.cpp
//  Seekg Func CPP
//
//  Created by Priyansh  on 11/08/25.
//

#include<iostream>
#include<fstream>
using namespace std;

int main()
{
    ifstream fin;
    char A[15];

    fin.open("my.txt");
    
    
    for (int i = 0; i < 15; i++)
    {
        A[i] = 0;
        
    }
    
    fin.seekg(10, ios_base::beg);


    fin.read(A, 10);

    for (int i = 0; A[i]!=0; i++)
    {
        cout << A[i];
    }

    fin.close();
    return 0;
}
