function loginWithKakao() {
    Kakao.Auth.authorize({
        redirectUri: 'http://127.0.0.1:5500/main.html',  // 앱에 등록된 카카오 로그인에서 사용할 Redirect URI 입력
    });
}
 