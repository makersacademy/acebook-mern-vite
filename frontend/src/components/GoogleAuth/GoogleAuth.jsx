import { useGoogleLogin } from '@react-oauth/google';
import "./GoogleAuth.css"

const GoogleAuth = () => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            localStorage.setItem("google-token", tokenResponse.access_token)
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("user", data)
                });
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
    <div>
        <button className='login-with-google-btn' onClick={login}>Sign in with Google 🚀 </button>
    </div>)
}

export default GoogleAuth