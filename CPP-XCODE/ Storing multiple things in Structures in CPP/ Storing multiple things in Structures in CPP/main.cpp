//
//  main.cpp
//   Storing multiple things in Structures in CPP
//
//  Created by Priyansh  on 02/08/25.
//

#include <iostream>
#include <string>
using namespace std;

struct student{
    int roll_no;
    string name;
    int percentage;
};

int main(){
    struct student stud[3]; //data for 3 students
    int i;
    // 0 to 2                                       //taking values
    for(i = 0; i < 3; i++){
        cout<<"Student: "<< i + 1<<endl;
        cout<<"Enter Roll No: "<<endl;
        cin>>stud[i].roll_no; //stud[0].roll_no
        cout<<"Enter Name: "<<endl;
        cin>>stud[i].name;
        cout<<"Enter Percentage: "<<endl;
        cin>>stud[i].percentage;
    }
}
