package boj.solving;

import java.io.*;
import java.util.*;

public class N28417 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int ans = 0;
        for (int i = 0; i < n; i++) {
            String[] sa = br.readLine().split(" ");
            int n1 = Math.max(Integer.parseInt(sa[0]), Integer.parseInt(sa[1]));
            int[] arr = {Integer.parseInt(sa[2]), Integer.parseInt(sa[3]), Integer.parseInt(sa[4]), Integer.parseInt(sa[5]), Integer.parseInt(sa[6])};
            Arrays.sort(arr);
            int now = n1 + arr[4] + arr[3];
            ans = Math.max(ans, now);
        }
        System.out.println(ans);
    }
}
