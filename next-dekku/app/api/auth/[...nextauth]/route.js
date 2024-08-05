import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    // 다른 제공자 추가 가능
  ],
  // 옵션 설정 (필요에 따라)
  // database: process.env.DATABASE_URL,
});

export { handler as GET, handler as POST };
