#include <iostream>
#include <thread>
using namespace std;

class test {
public:

	void threadFunc1(int start, int end)
	{
		for (int i = start; i <= end; i++)
		{
			cout << "Hi" << endl;
		}
	}
	void threadFunc2(int start, int end)
	{
		for (int i = start; i <= end; i++)
		{
			cout << "Hello"<<endl;
		}
	}
};

int main()
{
	test obj;
	thread th1(&test::threadFunc1, &obj, 1, 50);

	thread th2(&test::threadFunc2, &obj, 50, 100);
	th1.join();
	th2.join();

	return 0;
}
