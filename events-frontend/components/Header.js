import Link from 'next/link';
import Search from '@/components/Search';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import styles from '@/style/Header.module.css'
import AuthContext from '@/context/AuthContext'
import {useContext} from "react";

/**
 *
 * Header for Custom Events Project
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({}) {

  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Events</a>
        </Link>
      </div>
      <Search/>
      <nav>
        <ul>
          <li>
            <Link href="/events"><a>Events</a></Link>
          </li>
          {user?(
            <>
              <li>
                <Link href="/account/dashboard"><a>Dashboard</a></Link>
              </li>
              <li>
                <Link href="/events/add"><a>Add Event</a></Link>
              </li>
              <li>
                <button className='btn-secondary' onClick={()=>logout()}>
                  <FaSignOutAlt/> Logout
                </button>
              </li>
            </>
          ): (
            <li>
              <Link href="/account/login"><a className='btn-secondary btn-icon'>
                <FaSignInAlt/> Login
              </a></Link>
            </li>
          )}

        </ul>
      </nav>
    </header>
  );
}