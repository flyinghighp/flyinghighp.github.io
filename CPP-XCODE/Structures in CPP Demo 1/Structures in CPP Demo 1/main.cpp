//
//  main.cpp
//  Structures in CPP Demo 1
//
//  Created by Priyansh  on 02/08/25.
//

#include <iostream>
#include<string>
using namespace std;

struct phone{
    string Name;
    int RAM;
    int ROM;
    string Processor;
    int Camera;
    double Price;
};

int main(){
    phone moto;
    moto.Name = "moto123";
    moto.Processor = "Snapdragon";
    moto.Price = 4500;
    moto.Camera = 13;
    moto.RAM = 4;
    moto.ROM = 32;
    
    cout<<"Name:"<<moto.Name;
    cout<<endl<<"Processor:"<<moto.Processor;
    cout<<endl<<"Price:"<<moto.Price;
    cout<<endl<<"Camera:"<<moto.Camera;
    cout<<endl<<"RAM:"<<moto.RAM;
    cout<<endl<<"ROM:"<<moto.ROM;
    return 0;
}
