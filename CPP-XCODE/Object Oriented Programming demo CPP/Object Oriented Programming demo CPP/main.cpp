//
//  main.cpp
//  Object Oriented Programming demo CPP
//
//  Created by Priyansh  on 05/08/25.
//

#include <iostream>
#include <string>
using namespace std;

//class
class house{
private:
    //member variable
    int length = 0, breadth = 0;
public:
    //member functions
    void setData(int x, int y){
        length = x;
        breadth = y;
    }
    void area(){
        cout<<"Area of the house "<<length*breadth;
    }
};

int main(){
    
    house gini;
    
    gini.setData(300,500);
    gini.area();
    
    return 0;
}
