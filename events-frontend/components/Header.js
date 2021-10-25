import Link from 'next/link';
import styles from '@/style/Header.module.css'
import Search from '@/components/Search';

/**
 *
 * Header for Custom Events Project
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({}) {
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
          <Link href="/events"><a>Events</a></Link>
        </ul>
      </nav>
    </header>
  );
}