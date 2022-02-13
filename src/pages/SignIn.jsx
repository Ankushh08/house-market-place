import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import OAuth from '../Components/OAuth';


const SignIn = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(true);

    const navigate = useNavigate();
    // console.log(formData);
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const { email, password } = formData;
    // console.log(showPassword);

    const onSubmit = async (e) => {
        e.preventDefault();


        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if(userCredential.user) {
                navigate('/'); 
            }
        } catch (error) {
            console.log(error, 'this is the error'); 
            toast.error('there is an error'); 
        }

    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back, Bitch!
                    </p>
                </header>

                <form onSubmit={onSubmit}>
                    <input
                        type='email'
                        className='emailInput'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={onChange}
                    />
                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'}
                            className='passwordInput'
                            placeholder='Password'
                            value={password}
                            onChange={onChange}
                            id="password" />
                        <img src={visibilityIcon} alt="showPassword"
                            onClick={() => setShowPassword((prevState) => !prevState)} />
                    </div>
                    <Link to='/forgot-password'
                        className='forgotPasswordLink'>
                        Forgot Password
                    </Link>
                    <div className="signInBar">
                        <p className="signInText">
                            Sign In
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill='white' width='34px' height='34px' />
                        </button>
                    </div>

                </form>


                {/* Google Oauth */}
                <OAuth />
                <Link to='/sign-up' className='registerLink'>
                    Sign Up, Baby!
                </Link>
            </div>
        </>
    );
}

export default SignIn;