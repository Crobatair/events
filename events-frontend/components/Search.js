import styles from '@/style/Seach.module.css';
import { useRouter } from "next/router";
import { useState } from "react";

export default function Search({}) {

  const router = useRouter();
  const [ term, setTerm ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder='Search Events'
        />

      </form>
      
    </div>
  );
}