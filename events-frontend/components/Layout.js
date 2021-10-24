import Head from 'next/head';
import styles from '@/style/Layout.module.css';
import Header from '@/components/Header';
import Footer from "@/components/Footer";

/**
 *
 * Layout for Custom Events Project
 *
 * @param title {string} Title of the page
 * @param keywords {string}
 * @param description {string}
 * @param children {[]}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Layout({ title, keywords, description, children }) {



  return (
    <div>
      <Head>
       <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name={'keywords'} content={keywords}/>
      </Head>
      <Header/>
      <div className={styles.container}>

        {children}
      </div>

      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title: "Custom Events by @Crobatair",
  description: "Custom Events by @Crobatair",
  keywords: "Events, Custom, Crobatair",
}