import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws NumberFormatException, IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        
        int N = Integer.parseInt(br.readLine());
        int[] cost = new int[N+1];
        int[] minTime = new int[N+1]; // 최소 완성 시간 저장
        int[] inOrder = new int[N+1]; // 진입 차수 저장
        
        ArrayList<ArrayList<Integer>> arr = new ArrayList<>(); // 진출 차수
        for (int i = 0; i < N + 1; i++) {
            arr.add(new ArrayList<>());
        }
            
        for (int i = 1; i < N + 1; i++) {
            st = new StringTokenizer(br.readLine());
            cost[i] = Integer.parseInt(st.nextToken());
            while (true) {
                int k = Integer.parseInt(st.nextToken());
                if (k == -1) break;
                else arr.get(k).add(i); // 진출 차수
                inOrder[i] ++;
            }    
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 1; i <= N; i++) {
            if (inOrder[i] == 0) {
                queue.add(i);
                minTime[i] = cost[i];
            }
        }

        while (!queue.isEmpty()) {
        	int tmp = queue.poll();
        	
        	for (int t : arr.get(tmp)) {
                inOrder[t]--;
                minTime[t] = Math.max(minTime[t], minTime[tmp] + cost[t]);
                
                if (inOrder[t] == 0) {
                    queue.add(t);
                }
        	} 
        }
        
        for (int i = 1; i < N+1; i++) {
            System.out.println(minTime[i]);
        }
        
    }
}