import java.io.*;
import java.util.*;

class YuukaSort implements Comparator<String>{
    @Override
    public int compare(String o1, String o2){
        int sl = Math.min(o1.length(), o2.length());
        for (int i = 0; i < sl; i++) {
            if (o1.charAt(i) > o2.charAt(i)) return -1;
            else if (o1.charAt(i) < o2.charAt(i)) return 1;
        }
        if (sl == o1.length()) {
            if (sl == o2.length()) return -1;
            else {
            	String no2 = o2.substring(sl);
            	return compare(o1, no2);
            }
        }
        else {
        	String no1 = o1.substring(sl);
        	return compare(no1, o2);
        }
    }
}

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String ans = "";
        YuukaSort ys = new YuukaSort();
        int n = Integer.parseInt(br.readLine());
        String[] nums = br.readLine().split(" ");
        Arrays.sort(nums, ys);
        boolean isprinted = false;
        for (String s : nums) {
        	ans += s;
        }
        if (ans.charAt(0) == '0') System.out.println(0);
        else System.out.println(ans);
    }
}