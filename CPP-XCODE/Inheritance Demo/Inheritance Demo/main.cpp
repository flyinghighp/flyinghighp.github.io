//
//  main.cpp
//  Inheritance Demo
//
//  Created by Priyansh  on 07/08/25.
//

#include <iostream>
using namespace std;

class rectangle{
public:
    int length;
    int breadth;
    
    void area(){
        cout<<endl<<"The Area of The Rectangle is: "<<length*breadth;
    }
};
class cuboid:public rectangle{
public:
    int height;
    
    void volume(){
        cout<<endl<<"The Volume of The cuboid is: "<<length*height*breadth<<endl;
    }
};
int main(){
    
    cuboid obj;
    
    obj.length = 10; obj.breadth = 20; obj.height  = 40;
    
    obj.area();
    obj.volume();
    return 0;
}
