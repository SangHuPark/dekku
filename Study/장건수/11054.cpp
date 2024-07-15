/*
가장 긴 바이토닉 수열

*/
#include<iostream>
#define MAX 1001

int N;
int Arr[MAX];
int DP[MAX];
int R_DP[MAX];

void getUserInput(){
    cin >> N;
    for(int i = 1; i<=N; ++i){
        cin >> Arr[i];
    }
}

void solution(){
    for(int i = 1; i<=N; ++i){
        DP[i] = 1;
        for(int j = 1; j<= i; ++j){
            if(Arr[j] < Arr[i] && DP[i] < DP[j] + 1){
                DP[i] = DP[j] + 1;
            }
        }
    }

    for(int i = N; i>=1; --i){
        R_DP[i] = 1;
        for(int j = N; j>=i; --j){
            if(Arr[j] < Arr[i] && R_DP[i] < R_DP[j] + 1){
                R_DP[i] = R_DP[j] + 1;
            }
        }
    }

    int Answer = 0;
    for(int i = 0; i<=N; ++i){
        if(Answer < DP[i] + R_DP[i] - 1) Answer = DP[i] + R_DP[i] - 1;
    }

    cout << Answer << "\n";
}

int main(){
    getUserInput();
    solution();
    return 0;
}