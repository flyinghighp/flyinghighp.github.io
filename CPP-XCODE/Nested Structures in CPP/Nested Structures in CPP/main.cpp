//
//  main.cpp
//  Nested Structures in CPP
//
//  Created by Priyansh  on 02/08/25.
//

#include <iostream>
#include<string>
using namespace std;

struct camera{
    int front;
    int rear;
};
struct phone{
    string Name;
    int RAM;
    int ROM;
    string Processor;
    camera Camera;
    double Price;
};

int main(){
    phone moto;
    moto.Name = "moto123";
    moto.Processor = "Snapdragon";
    moto.Price = 4500;
    moto.Camera.front = 13;
    moto.Camera.rear = 16;
    moto.RAM = 4;
    moto.ROM = 32;
    
    cout<<"Name:"<<moto.Name;
    cout<<endl<<"Processor:"<<moto.Processor;
    cout<<endl<<"Price:"<<moto.Price;
    cout<<endl<<"Camera Front:"<<moto.Camera.front;
    cout<<endl<<"Camera Rear:"<<moto.Camera.rear;
    cout<<endl<<"RAM:"<<moto.RAM;
    cout<<endl<<"ROM:"<<moto.ROM;
    return 0;
}
