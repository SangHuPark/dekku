package BOJ;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

/**
 * [ init ]
 * 1. 컴퓨터의 개수를 입력받는다.
 * 2. 인접 행렬의 정보를 입력받는다.
 *  2-1. 인접 리스트에 본인을 제외하고 소문자이면 96, 대문자이면 37을 뺀 값으로 저장한다.
 *
 * [ make() ]
 * 3. parents 배열 초기화
 *  3-1. 부모로 자기 자신
 */
public class s1414_불우이웃돕기_SangHu {
    static class Node implements Comparable<Node> {
        int from;
        int to;
        int cost;
        
        public Node(int from, int to, int cost) {
            this.from = from;
            this.to = to;
            this.cost = cost;
        }

        @Override
        public int compareTo(Node o) {
            return Integer.compare(cost, o.cost);
        }
    }
    
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    
    static int roomCount;
    static char[][] matrix;
    static List<Node>[] adjList;
    static PriorityQueue<Node> pq;
    static int totalLeng;

    static int[] parents;

    static int result;

    public static boolean union(int from, int to) {
        int parentFrom = find(from);
        int parentTo = find(to);

        if (parentFrom == parentTo)
            return false;

        if (parentFrom > parentTo)
            parents[parentFrom] = parentTo;
        else
            parents[parentTo] = parentFrom;

        return true;
    }

    public static int find(int node) {
        if (parents[node] == node)
            return node;

        return parents[node] = find(parents[node]);
    }

    public static void make() {
        parents = new int[roomCount+1];

        for (int idx = 0; idx <= roomCount; idx++) {
            parents[idx] = idx;
        }
    }
    
    public static void main(String[] args) throws IOException {
        init();

        int pqSize = pq.size();
        result = 0;
        int connectCount = 1;
        for(int idx = 0; idx < pqSize; idx++) {
            Node node = pq.poll();

            if(union(node.from, node.to)) {
                connectCount++;
                result += node.cost;
                union(node.to, node.from);
            }
        }

        if (connectCount != roomCount)
            System.out.println(-1);
        else
            System.out.println(totalLeng - result);
    }
    
    public static void init() throws IOException {
        roomCount = Integer.parseInt(br.readLine().trim());

        matrix = new char[roomCount][roomCount];
        for (int from = 0; from < roomCount; from++) {
            String line = br.readLine().trim();
            for (int to = 0; to < roomCount; to++) {
                matrix[from][to] = line.charAt(to);
            }
        }

        totalLeng = 0;
        pq = new PriorityQueue<>();
        for (int idx = 0; idx < roomCount; idx++) {

            for (int col = 0; col < roomCount; col++) {
                if (matrix[idx][col] >= 'a' && matrix[idx][col] <= 'z') {
                    totalLeng += matrix[idx][col] - 96;
                    pq.add(new Node(idx+1, col+1, matrix[idx][col] - 96));
                } else if (matrix[idx][col] >= 'A' && matrix[idx][col] <= 'Z') {
                    totalLeng += matrix[idx][col] - 38;
                    pq.add(new Node(idx+1, col+1, matrix[idx][col] - 38));
                }
            }
        }

        make();
    }

}
