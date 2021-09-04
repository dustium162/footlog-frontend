import React,{useState, useEffect} from 'react';
import Layout from "../components/Layout";
import axios from "axios"

const Privacy = () => {
  const [privacy,setPrivacy] = useState("")
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacies`)
    .then(response => response.data)
    .then(data => setPrivacy(data.text))
  },[])
  return (
    <Layout>
      {
        privacy.split('\n').map((str, index) => (
          <React.Fragment key={index}>{str}<br /></React.Fragment>
        ))
      }
    </Layout>
  )
}
export default Privacy;
