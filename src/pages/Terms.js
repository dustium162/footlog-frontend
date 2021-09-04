import React,{useState, useEffect} from 'react';
import Layout from "../components/Layout";
import axios from "axios"

const Terms = () => {
  const [term,setTerm] = useState("")
  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/terms`)
    .then(response => response.data)
    .then(data => setTerm(data.text))
  },[])
  return (
    <Layout>
      {
        term.split('\n').map((str, index) => (
          <React.Fragment key={index}>{str}<br /></React.Fragment>
        ))
      }
    </Layout>
  )
}
export default Terms;
