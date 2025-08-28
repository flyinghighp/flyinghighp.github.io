//
//  main.cpp
//  Destructor-CPP Demo
//
//  Created by Priyansh  on 10/08/25.
//

#include <iostream>
#include <string>
using namespace std;

class Test{
private:
    int *age;
public:
    Test(){
        age= new int;
        *age = 0;
        cout<<"Constructor"<<endl;
    }
    Test(int x){
        age= new int;
        *age = x;
        cout<<"P-Constructor"<<endl;
    }
    ~Test(){
        cout<<"Deconstructor"<<endl;
    }
};
int main(){
    
    Test obj;
    Test obj2(10);
    return 0;
}
