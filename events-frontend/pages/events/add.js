import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/style/Form.module.css";
import {parseCookies} from "@/helpers/index";

export default function AddEventPage({ token }) {

  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(areValuesEmpty()){
      toast.error('Please fill all fields')
    }else{
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
      })
      if(!res.ok){
        if(res.status === 401 || res.status === 403){
          toast.error('No token included')
          return
        }
        toast.error('Something went wrong')
      } else {
        const evt =  await res.json();
        router.push(`/events/${evt.slug}`);
      }
    }
  }

  const areValuesEmpty = () => {
    return Object.values(values).some((element) => element === '')
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  return (
    <Layout title="Add New Event">
      <h1>Add Events</h1>
      <ToastContainer/>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          />

          <input type='submit' value='Add Event' className='btn'/>
        </div>
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req}){
  const { token } = parseCookies(req);

  return {
    props: {
      token
    }
  }

}