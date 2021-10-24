import Link from 'next/link';
import styles from '@/style/Footer.module.css';

/**
 * Footer for Custom Events Project
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Footer({}) {
  return (
    <footer className={styles.footer}>
      <p>Copyrigth &copy; Custom Events 2021</p>
      <p>
        <Link href="/about">
          <a>
            About This Project.
          </a>
        </Link>
      </p>
    </footer>
  );
}