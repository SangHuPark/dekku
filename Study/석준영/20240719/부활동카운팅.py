while True:
    n = int(input())
    if n == 0: break
    ans = 0
    l = list(map(int, input().split()))
    for i in range(n-2):
        now = l[i] + l[i+1] + l[i+2]
        ans = max(ans, now)
    print(ans)