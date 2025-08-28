//
//  main.cpp
//  Program to remove vowels from a string
//
//  Created by Priyansh  on 17/07/25.
//

#include <iostream>
#include <string>
using namespace std;

int main(){
    string var1 = "";
    cout<<endl<<"Enter a string";
    getline(cin, var1);
    
    for(int i = 0; i<= var1.size(); i++){
        if(var1[i] == 'a' ||var1[i] == 'e' ||var1[i] == 'i' ||var1[i] == 'o' ||var1[i] == 'u'  ){
            var1[i] = ' ';
        }
    }
    cout<<endl<<var1<<endl;
    return 0;
}
