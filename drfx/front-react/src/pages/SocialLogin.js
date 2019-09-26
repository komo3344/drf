import React, { Component } from 'react';

class SocialLogin extends Component {

  componentDidMount(){
     window.Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: function(authObj) {
      // 로그인 성공시, 상대방 정보요청 API를 호출합니다.
         window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(res) {
              alert(JSON.stringify(res));
              var resData = JSON.stringify(res)
              var kakaoToken = JSON.stringify(authObj)
              console.log('사용자정보', resData)
              console.log('토큰', kakaoToken)
            },
        fail: function(error) {
          alert(JSON.stringify(error));
        }
      });
      // window.Kakao.API.request({
      //   url: '/oauth/token',
      //   success: function(res) {
      //     var userToken = JSON.stringify(res)
      //     console.log('사용자토큰', userToken)
      //   }
      // })
    },
    fail: function(err) {
      alert(JSON.stringify(err));
    }
  })
  
    }
  
   render() {
      window.Kakao.init('beb75fde754395b36f4da5bafb79237a');
  
  return (
    <div>
    <a id="kakao-login-btn"></a>
    </div>
  );
    }
  }
  
  export default SocialLogin;
  