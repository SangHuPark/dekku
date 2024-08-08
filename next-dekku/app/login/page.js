export default function login(){
    return(
        <div className="flex flex-col">
            <a href="http://localhost:8080/oauth2/authorization/kakao">카카오 로그인</a>
            <a href="http://localhost:8080/oauth2/authorization/naver">네이버 로그인</a>
        </div>
        
    )
}