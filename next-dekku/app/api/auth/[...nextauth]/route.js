import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import axios from 'axios';

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      authorizationUrl: 'https://kauth.kakao.com/oauth/authorize?response_type=code',
      tokenUrl: 'https://kauth.kakao.com/oauth/token',
      userinfoUrl: 'https://kapi.kakao.com/v2/user/me',
      profile: async (profile) => {
        // profile contains the user's Kakao profile information
        return {
          id: profile.id,
          name: profile.properties.nickname,
          email: profile.kakao_account.email,
          image: profile.properties.profile_image
        };
      }
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn(user, account, profile) {
      try {
        const response = await axios.post('https://localhost:8080/api/auth/kakao', {
          accessToken: account.accessToken
        });
        // response에서 필요한 데이터를 가져와 user에 추가
        user.backendData = response.data;
        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    }
  }
});
