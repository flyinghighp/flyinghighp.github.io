//
//  main.cpp
//  Map - Containers In STL
//
//  Created by Priyansh  on 12/08/25.
//

#include<iostream>
#include<string>
#include<map>   // Include the MAP header

using namespace std;

int main()
{
    //declaration
    std::map<int, string> map1;

    //intialization
    std::map<int, string> map2 = { {101,"Vedinesh"},{201,"Kevin"},{301,"Ben"} };

    //methods
    
    //insert
    map2[201] = "Tim";
    //check
    for (map<int,string>::iterator i = map2.begin(); i != map2.end(); i++)
    {
        cout << i->first << " ";   // for printing the map KEY
        
        cout << i->second << endl;   // for printing Value - for string value
                                     //don't forget to include STRING header.
    }
    cout << endl;

    //at()
    cout << "Value at 201:-" << map2.at(201) << endl; // get value by KEY
                                                     //out of bound safe
    //[]
    cout << "Value at 201:-" << map2[201] << endl;

    //change value
    map2.at(201) = "Lima";

    cout << "Value at 201:-" << map2.at(201) << endl;


    //insert:- insert key,value at particular location as MAP is sorted.
    //2 approach
    map2.insert(pair<int, string>(106, "Amit"));

    map2.insert(make_pair(208, "Hina"));

    //check
    for (map<int, string>::iterator i = map2.begin(); i != map2.end(); i++)
    {
        cout << i->first << " ";   // for printing the map KEY

        cout << i->second << endl;   // for printing Value - for string value
                                     //don't forget to include STRING header.
    }
    cout << endl;

    //erase(): remove entry in map pointed by iterator
    map<int, string>::iterator i = map2.begin();
    map2.erase(i);

    //check
    for (map<int, string>::iterator i = map2.begin(); i != map2.end(); i++)
    {
        cout << i->first << " ";   // for printing the map KEY

        cout << i->second << endl;   // for printing Value - for string value
                                     //don't forget to include STRING header.
    }
    cout << endl;

    return 0;
}
