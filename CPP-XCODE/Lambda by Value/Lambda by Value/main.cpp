//
//  main.cpp
//  Lambda by Value
//
//  Created by Priyansh  on 14/08/25.
//

#include <iostream>
#include <string>
using namespace std;

//lambda by value
int main()
{
    string msg = "ByteBoard - ";
    //[a, &b] : capture a by value and b by reference
    // [] arg -> return_type { definition };
    auto sum = [msg](string a, string b) -> string { return msg + a +" " + b; };

    //[=] : will save all the variables needed
    //      in the body of the lambda by value.

    cout << sum("Vedinesh","Academy") << endl;

    return 0;
}
