
import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/style/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage({}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { register, error } = useContext(AuthContext);
  useEffect(() => {
    error && toast.error(error)
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm){
      toast.error('Password does not match');
    }else{
      register({username, email, password})
    }
  }

  return (
    <Layout
      title="Register Account"
    >
      <div className={styles.auth}>
        <h1>
          <FaUser/> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e)=>setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value='Register' className='btn'/>
          <p>
            Already have an account? <Link href='/account/login'>Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}