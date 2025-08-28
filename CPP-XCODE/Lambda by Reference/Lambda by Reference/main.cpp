//
//  main.cpp
//  Lambda by Reference
//
//  Created by Priyansh  on 14/08/25.
//

#include <iostream>
#include <string>
using namespace std;

//lambda by reference
int main()
{
    int arr[5] = {1,2,3,4,5};
    
    //[a, &b] : capture a by value and b by reference
    // [] arg -> return_type { definition };
    auto sum = [&arr]() -> int
    {
        int total = 0;
        for (int i = 0; i < 5; i++)
       {
        total += arr[i];
       }
        return total;
    };

    //[=] : will save all the variables needed
    //      in the body of the lambda by value.

    cout << sum() << endl;

    return 0;
}
