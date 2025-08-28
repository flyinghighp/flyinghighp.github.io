//
//  main.cpp
//  Star Pattern(Loops)
//
//  Created by Priyansh  on 11/07/25.
//

#include <iostream>
using namespace std;

int main(){
    int x=0, y=0;
    
    for(x=0;x<5;x++){
        for(y=0;y <x+1;y++){
                cout<<"*";
       }
       cout<<endl;
    }
    for(x=0;x<5;x++){
        for(y=5;y>x;y--){
            cout<<"*";
        }
        cout<<endl;
    }
    return 0;
}
