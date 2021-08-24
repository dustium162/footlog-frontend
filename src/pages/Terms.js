import React,{useState, useEffect} from 'react';
import Layout from "../components/Layout";
import axios from "axios"

const Terms = () => {
  const [terms,setTerms] = useState("")
  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacies`)
    .then(response => response.data)
    .then(data => setTerms(data))
  },[])
  return (
    <Layout>{terms.text}</Layout>
  )
}
export default Terms;
