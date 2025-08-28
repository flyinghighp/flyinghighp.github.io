//
//  main.cpp
//  Container in a Container
//
//  Created by Priyansh  on 12/08/25.
//

#include<iostream>
#include<vector>
#include<list>
#include<map>
using namespace std;

int main()
{
    vector<int> myvec { 40,50,20 };

    vector<vector<int>> vec1 = { {1,2,3},   //vector inside vector
                                 {4,5,6},
                                 {7,8,9} };
    //                          {40,50,20}
    //push_back()
    vec1.push_back(myvec);                 // push elements at end of vector

    //print
    for (int i = 0; i < vec1.size(); i++)
    {
        for (int j = 0; j < vec1[i].size(); j++)
        {
            cout << vec1[i][j] << " ";
        }
        cout << endl;
    }


    //pop_back  : remove last element from row
    vec1[0].pop_back();
    vec1[1].pop_back();
    vec1[2].pop_back();
    vec1[3].pop_back();


    //check
    //print
    cout << endl;
    for (int i = 0; i < vec1.size(); i++)
    {
        for (int j = 0; j < vec1[i].size(); j++)
        {
            cout << vec1[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl << "List Example" << endl;




    //list

    list<int> l = { 5,6,7 };
    list<list<int>> ll = { {1,2,3},{4,5,6} };

    //push_back : push 'l' list at the end of 'll' list.
    ll.push_back(l);


    //check

    //outer iterator       { {1,2,3},{4,5,6},{ 5,6,7 }}
    list<list<int>>::iterator i = ll.begin();
    for (i; i != ll.end(); i++)
    {
        list<int> pi = *i;

        //inner iterator
        list<int>::iterator itr = pi.begin();
        //looping over inner list
        for (itr; itr != pi.end(); itr++)
        {
            cout << *itr << " ";
        }
        cout << endl;
    }
    cout << endl << "Map Example" << endl;


    //Map inside map
    map<int, map<int, int> > m;

    
    //inserting values
    map<int, int> temp;
    //                    k  v
    temp.insert(make_pair(1, 2));
    //                 k   v
    m.insert(make_pair(0, temp));
    // k   k v
    //{0, {1,2}}


    //check
    //outer loop
    map<int, map<int, int> >::iterator oi;
    //inner loop
    map<int, int>::iterator ii;

    for (oi = m.begin(); oi != m.end(); oi++)
    {
        for (ii = oi->second.begin(); ii != oi->second.end(); ii++)
        {
            cout << "Key 1: " << oi->first << endl;
            cout << "Key 2: "<< ii->first << endl;
            cout << "Value: " << ii->second << endl;
        }
    }

    return 0;
}
