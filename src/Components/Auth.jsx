import { auth, provider } from "/firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import  Cookies from 'universal-cookie';
const cookies = new Cookies();
const Auth = ( props) => {
    const {setIsAuth} = props;
    const signWthGoogle = async () => {
        try {
        const result = await signInWithPopup(auth, provider
        );
        console.log(result);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
    }
    catch (err) {
        console.error(err);
    }
};
    return (
        <div className="auth">
            <h1>Login</h1>
            <button onClick={signWthGoogle}>Login</button>
        </div>
    )
}
export default Auth;