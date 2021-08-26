import React,{useState, useEffect} from 'react';
import Layout from "../components/Layout";
import axios from "axios"

const Privacy = () => {
  const [privacies,setPrivacies] = useState("")
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacies`)
    .then(response => response.data)
    .then(data => setPrivacies(data))
  },[])
  return (
    <Layout>{privacies.text}</Layout>
  )
}
export default Privacy;
