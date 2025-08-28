//
//  main.cpp
//  Constructor Demo
//
//  Created by Priyansh  on 07/08/25.
//

#include <iostream>
#include <string>
using namespace std;

class mobile{
private:
    string name;
    int RAM;
    string processor;
    int battery;
public:
    mobile(string name_a="NULL", int RAM_a = 0, string processor_a = "NULL", int battery_a = 0){
        name = name_a;
        RAM = RAM_a;
        processor = processor_a;
        battery = battery_a;
    }
    mobile(mobile & mob){
        name = mob.name;
        RAM = mob.RAM;
        processor = mob.processor;
        battery = mob.battery;
    }
    void getMobileData();
};
void mobile::getMobileData(){
    cout<<endl<<"Name: "<<name;
    cout<<endl<<"RAM: "<<RAM;
    cout<<endl<<"Processor: "<<processor;
    cout<<endl<<"Battery: "<<battery;
}

int main(){
    
    mobile Pixel8("Pixel8", 32, "Snapdragon", 4200);
    mobile Pixel8Pro("Pixel8 Pro", 64, "Snapdragon", 4500);
    mobile Pixel8COPY(Pixel8);
    
    Pixel8.getMobileData();
    Pixel8Pro.getMobileData();
    Pixel8COPY.getMobileData();
    
    return 0;
}
