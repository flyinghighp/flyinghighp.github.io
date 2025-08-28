//
//  main.cpp
//  Memory Management Demo
//
//  Created by Priyansh  on 09/08/25.
//

#include <iostream>
using namespace std;

class test{
private:
    int data;
public:
    void setData(int set){
        data = set;
    }
    int getData(){
        return data;
    }
};
int main(){
    test *ptr = new test;
    ptr->setData(10);
    cout<<"Value is: "<<ptr->getData();
    return 0;
}
