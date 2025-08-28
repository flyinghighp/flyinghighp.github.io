//
//  main.cpp
//  ATM MINI PROJECT_CPP
//
//  Created by Priyansh  on 06/08/25.
//

#include <iostream>
#include <string>
using namespace std;

/* Mini Project - ATM
 -> Check Bank Balance
 -> Cash Withdraw
 -> User Details
 -> Update mobile no.
 */

// Global placeholder for pausing with getline
string dummy;

class atm {
private:
    long int account_no;
    string name;
    int PIN;
    double balance;
    string mobile_no;

public:
    void setData(long int account_no_a, string name_a, int PIN_a, double balance_a, string mobile_no_a) {
        account_no = account_no_a;
        name = name_a;
        PIN = PIN_a;
        balance = balance_a;
        mobile_no = mobile_no_a;
    }

    long int getAccountNo() {
        return account_no;
    }
    string getName() {
        return name;
    }
    int getPIN() {
        return PIN;
    }
    double getBalance() {
        return balance;
    }
    string getMobileNo() {
        return mobile_no;
    }

    void setMobile(const string& mob_prev, const string& mob_new) {
        if (mob_prev == mobile_no) {
            mobile_no = mob_new;
            cout << endl << "Successfully Updated the Mobile Number." << endl;
        } else {
            cout << endl << "Incorrect Old Mobile Number !" << endl;
        }
        cout << "Press Enter to continue...";
        getline(cin, dummy);
    }

    void cashWithDraw(int amount_a) {
        if (amount_a > 0 && amount_a <= static_cast<int>(balance)) {
            balance -= amount_a;
            cout << endl << "Please Collect Your Cash." << endl;
            cout << "Available Balance: " << balance << endl;
        } else {
            cout << endl << "Invalid Input or Insufficient Balance" << endl;
        }
        cout << "Press Enter to continue...";
        getline(cin, dummy);
    }
};

int main() {
    int choice = 0, enterPIN;
    long enterAccountNo;

    // If you're on macOS/Linux, change "cls" to "clear" or remove.
    // system("cls");

    atm user1;
    // example default data
    user1.setData(123456789, "Hansh", 6779, 1000000.0, "0123456789");

    while (true) { // LOGIN loop
        system("cls");
        cout << "**** Welcome to ATM ****" << endl;
        cout << endl << "Enter Your Account Number: ";
        if (!(cin >> enterAccountNo)) { // handle non-numeric input
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid account number input. Try again." << endl;
            continue;
        }

        cout << endl << "Enter PIN: ";
        if (!(cin >> enterPIN)) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid PIN input. Try again." << endl;
            continue;
        }

        // clear newline left by cin before any getline usage
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        if ((enterAccountNo == user1.getAccountNo()) && (enterPIN == user1.getPIN())) {
            // AUTHORIZED -> show menu
            while (true) {
                int amount = 0;
                string oldMobileNo, newMobileNo;

                system("cls");
                cout << "**** Welcome to ATM ****" << endl;
                cout << endl << "Select Options " << endl;
                cout << "1. Check Balance" << endl;
                cout << "2. Withdraw Cash" << endl;
                cout << "3. Show User Details" << endl;
                cout << "4. Update Mobile Number" << endl;
                cout << "5. Logout" << endl;
                cout << "Enter choice: ";
                if (!(cin >> choice)) {
                    cin.clear();
                    cin.ignore(numeric_limits<streamsize>::max(), '\n');
                    cout << "Invalid input. Press Enter to continue...";
                    getline(cin, dummy);
                    continue;
                }

                // clear newline for later getline
                cin.ignore(numeric_limits<streamsize>::max(), '\n');

                switch (choice) {
                    case 1:
                        cout << endl << "Your Bank Balance is: " << user1.getBalance() << endl;
                        cout << "Press Enter to continue...";
                        getline(cin, dummy);
                        break;
                    case 2:
                        cout << endl << "Enter the Amount: ";
                        if (!(cin >> amount)) {
                            cin.clear();
                            cin.ignore(numeric_limits<streamsize>::max(), '\n');
                            cout << "Invalid amount. Press Enter to continue...";
                            getline(cin, dummy);
                        } else {
                            cin.ignore(numeric_limits<streamsize>::max(), '\n'); // clear newline
                            user1.cashWithDraw(amount);
                        }
                        break;
                    case 3:
                        cout << endl << "**** User Bank Account Details Are: " << endl;
                        cout << "1. Account No: " << user1.getAccountNo() << endl;
                        cout << "2. Name: " << user1.getName() << endl;
                        cout << "3. Balance: " << user1.getBalance() << endl;
                        cout << "4. Mobile No: " << user1.getMobileNo() << endl;
                        cout << "Press Enter to continue...";
                        getline(cin, dummy);
                        break;
                    case 4:
                        cout << endl << "Enter Old Mobile No.: ";
                        getline(cin, oldMobileNo);
                        cout << endl << "Enter New Mobile No.: ";
                        getline(cin, newMobileNo);
                        user1.setMobile(oldMobileNo, newMobileNo);
                        break;
                    case 5:
                        cout << endl << "Logging out..." << endl;
                        cout << "Press Enter to continue...";
                        getline(cin, dummy);
                        goto LOGIN_LOOP; // break out to the login loop
                    default:
                        cout << endl << "Enter Valid Data !!!" << endl;
                        cout << "Press Enter to continue...";
                        getline(cin, dummy);
                }
            }
        } else {
            cout << endl << "User Details are Invalid !!! " << endl;
            cout << "Press Enter to try again...";
            getline(cin, dummy);
        }
    }

LOGIN_LOOP:
    return 0;
}
