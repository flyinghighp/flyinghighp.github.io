//
//  main.cpp
//  Structures Assignment 1
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
        cin.ignore();
        
        cout<<"Enter Name: "<<endl;
        getline(cin, stud[i].name);
        
        cout<<"Enter Percentage: "<<endl;
        cin>>stud[i].percentage;
        cin.ignore();
    }
    
    for(int i = 0; i < 3; i++) {
        cout << "\nStudent " << i + 1 << " Details:" << endl;
        cout << "Full Name: " << stud[i].name << endl;
        cout << "Roll No: " << stud[i].roll_no << endl;
        cout << "Percentage: " << stud[i].percentage << "%" << endl;
    }

    return 0;
}


