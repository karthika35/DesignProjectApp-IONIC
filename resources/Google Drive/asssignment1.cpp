//SE/2014/055
//M.Karthika
//Assignment1
//Due date:01/04/2016
#include<iostream,h>
#include<conio.h>
int main (){
int cost,cash_tendered,balance,rem;
cout<<"Enter cost";
cin>>cost;
cout<<"Enter cash tendered";
cin>>cash_tendered;
balance=(cash_tendered-cost);

cout<<(balance/5000)<<"number of 5000 notes\n";
rem=(balance%5000);
cout<<(rem/2000)<<"number of 2000 notes\n";
rem=(rem%2000);
cout<<(rem/1000)<<"number of 1000 notes\n";
rem=(rem%1000);
cout<<(rem/500)<<"number of 500 notes\n";
rem=(rem%500);
cout<<(rem/100)<<"number of 100 notes\n";
rem=(rem%100);
cout<<(rem/50)<<"number of 50 notes\n";
rem=(rem%50);
cout<<(rem/20)<<"number of 20 notes\n";
rem=(rem%20);
cout<<(rem/10)<<"nimer of 10 notes\n";
rem=(rem%10);
cout<<(rem/5)<<"number of 5 coins\n";
rem=(rem%5);
cout<<(rem/2)<<"number of 2 coins\n";
rem=(rem%2);
cout<<(rem/1)<<"number of 1 coins\n";

getch();
return 0;
}



