import React,{useState, useEffect} from "react"
import Layout from "../../components/Layout";
import axios from "axios"

import {InputGroup,FormControl,Button} from "react-bootstrap"

const AddPrivacy = () => {
  const [privacies,setPrivacies] = useState("")
  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacies`)
    .then(response => response.data)
    .then(data => setPrivacies(data))
  },[])
  const updatePrivacies = () => {
  }
  return (
    <Layout>
      <InputGroup>
        <InputGroup.Text>プライバシーポリシー</InputGroup.Text>
        <FormControl as="textarea" placeholder={privacies.text ? privacies.text :""} aria-label="With textarea" />
        <Button variant="outline-secondary" id="button-addon2" onClick={updatePrivacies}>更新</Button>
      </InputGroup>
    </Layout>
  )
}
export default AddPrivacy;