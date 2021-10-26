import {API_URL} from "@/config/index";

import {useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";

import { FaImage } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify';

import moment from "moment";
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/style/Form.module.css";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({evt}) {

  const router = useRouter();
  const [ showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description
  });

  const [ imagePreview, setImagePreview ] = useState(evt.image? evt.image.formats.thumbnail.url: null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(areValuesEmpty()){
      toast.error('Please fill all fields')
    }else{
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'Application/json'},
        body: JSON.stringify(values)
      })
      if(!res.ok){
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

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
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
              value={moment(values.date).format('yyyy-MM-DD')}
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

          <input type='submit' value='Update Event' className='btn'/>
        </div>
      </form>
      <h2>Event Image</h2>
      {imagePreview? (
        <Image
          src={imagePreview}
          height={100}
          width={170}
        />
      ): (
        <div>
          <p>
            No Image Uploaded
          </p>
        </div>
      )}
      <div >
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
        />
      </Modal>

    </Layout>
  );
}

export async function getServerSideProps({query: {id}, req}){
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt: evt
    }
  }
}