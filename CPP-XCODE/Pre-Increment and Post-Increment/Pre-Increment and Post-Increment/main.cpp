//
//  main.cpp
//  Pre-Increment and Post-Increment
//
//  Created by Priyansh  on 07/08/25.
//

#include <iostream>
#include <string>
using namespace std;

class RollNumber{
private:
    int roll = 0;
public:
    RollNumber(int r = 0){
        roll = r;
    }
    void PrintRollNo(){
        cout<<endl<<"Your Roll No. is: "<<roll<<endl;
    }
    void operator++(){
        ++roll;
    }
    void operator++(int){
        roll++;
    }
};

int main(){
    
    RollNumber Tom(20);
    
    ++Tom;
    Tom++;
    
    Tom.PrintRollNo();
    
    return 0;
}
