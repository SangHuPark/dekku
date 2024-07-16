import java.util.*;

class Solution {
    public int solution(int k, int n, int[][] reqs) {
        int answer = 0;
        List<List<int[]>> lst = new ArrayList<>();

        for(int i = 0; i <= n; i++) {
            lst.add(new ArrayList<>());
        }
        
        for(int[] i : reqs) {
            lst.get(i[2]).add(new int[]{i[0],i[1]});
        }
        
        int[][] waitTime = new int[k+1][n-k+2];
        for(int i = 1; i <= k; i++) {     
            for(int j = 1; j <= n-k+1; j++) {
                PriorityQueue<Integer> pq = new PriorityQueue<>();
                for(int[] arr : lst.get(i)) {
                    if(pq.size() < j) {
                        pq.add(arr[0] + arr[1]);
                    }
                    else {
                        int minNum = pq.poll();
                        int wait = minNum - arr[0];
                        if(wait > 0) {
                            waitTime[i][j] += wait;
                            pq.add(minNum + arr[1]);
                        }
                        else {
                            pq.add(arr[0] + arr[1]);
                        }
                    }
                }
            }
        }
        answer = dfs(n - k + 1, waitTime, 1, k);
        return answer;
    }
    
    static int dfs(int r, int[][] wait, int depth, int k) {
        if(depth > k) return 0;
        int sum = 100000000;
        for(int i = 1; i <= r; i++) {
            sum = Math.min(dfs(r - i + 1, wait, depth + 1, k) + wait[depth][i], sum);
        }
        return sum;
    }
}