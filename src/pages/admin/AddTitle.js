import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Form,Button,Row,Col} from "react-bootstrap"


const AddTitle = () => {
  const [titles,setTitles] = useState({})
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/titles/`)
      .then( response => {
        setTitles(response.data)
      })
      .catch(error => console.log(error))
  },[])
  
  const [name,setName] = useState("")
  const [titleTypeId, setTitleTypeId] = useState(0)
  const [isNewTitleType,setIsNewTitleType] = useState(false)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleTitleTypeIdChange = (e) => {
    setTitleTypeId(e.target.value)
  }

  const handleIsNewTitleTypeChange = (e) => {
    setIsNewTitleType(e.target.value)
  }

  const createTitle = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/titles`,
    {
      title_type_id: titleTypeId,
      name: name,
      is_new_title_type: isNewTitleType
    },
    {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    },
    )
    .catch(error => console.log(error))

  }

  return (
    <Layout>
      <Form className="my-3">
        <Form.Group className="mb-3" controlId="formSerialCode">
          <Form.Label>titleTypeID</Form.Label>
          <Form.Control value={titleTypeId} placeholder="titleTypeIdを入力してください" onChange={handleTitleTypeIdChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTeamName">
          <Form.Label>タイトル名</Form.Label>
          <Form.Control value={name} placeholder="タイトル名を入力してください" onChange={handleNameChange}/>
        </Form.Group>
        <div key={`custom-checkbox`} className="mb-3">
              <Form.Check
                custom
                type={"checkbox"}
                value={isNewTitleType}
                id={`custom-checkbox`}
                label={`新しいTitleType？`}
                onChange={handleIsNewTitleTypeChange}
                />
            </div>
        <Form.Group className="text-end">
          {/* <Button variant="dark" type="submit" onClick={createTeam} disabled={isSubmitDisable}> */}
          <Button variant="dark" type="submit" onClick={createTitle} >
            作成
          </Button>
        </Form.Group>
      </Form>
      <Row>
        <Col>title_type_id</Col>
        <Col>title_id</Col>
        <Col>title_name</Col>
      </Row>
      {/* {titles.map((title_type) => ( */}
      {Object.keys(titles).map(id => (
        <Row>
          <Col>
            {Object.keys(titles[id]).map((title_type_id) => (
              Object.keys(titles[id][title_type_id]).map((title_id) => (
                <Row>
                  <Col>{title_type_id}</Col>
                  <Col>{titles[id][title_type_id][title_id].value}</Col>
                  <Col>{titles[id][title_type_id][title_id].label}</Col>
                </Row>
              ))
            ))}
          </Col>
        </Row>
        ))}
    </Layout>
  )
}
export default AddTitle;