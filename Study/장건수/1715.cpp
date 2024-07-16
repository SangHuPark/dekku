#include<iostream>
#include<queue>
#define MAX 100001

using namespace std;
int N;
priority_queue<int, vector<int>, greater<int>> minHeap;

void solution(){
    int mixCount = 0;

    while(minHeap.size() > 1){
        int cardA = minHeap.top();
        minHeap.pop();
        int cardB = minHeap.top();
        minHeap.pop();
        mixCount += cardA + cardB;
        minHeap.push(cardA + cardB);
    }

    cout << mixCount << "\n";
    
}

void getUserInput(){
    cin >> N;
    for(int i = 0; i<N; ++i){
        int k;
        cin >> k;
        minHeap.push(k);
    }
}

int main(){
    getUserInput();
    solution();
    return 0;
}