import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

import { toast } from 'react-toastify';
import OAuth from '../Components/OAuth';

const SignUp = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(true);

    const navigate = useNavigate();
    console.log(formData);
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const { email, password, name } = formData;
    console.log(showPassword);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name,

            })

            const formDataCopy = { ...formData }
            // delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, 'users', user.uid), formDataCopy); 

            navigate('/')
        }
        catch (error) {
            // console.log(error);
            toast.error('whoopsieee, something Went wrong'); 
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
                        type='text'
                        className='nameInput'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={onChange}
                    />
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
                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='white' width='34px' height='34px' />
                        </button>
                    </div>

                </form>


                {/* Google Oauth */}
                <OAuth />
                <Link to='/sign-in' className='registerLink'>
                    Already have an account? Sign In!
                </Link>
            </div>
        </>
    );
}

export default SignUp;