import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Col,Form,Button} from "react-bootstrap"


const MatchNew = () => {
  const [teams,setTeams] = useState([])
  const [stadia,setStadia] = useState([])
  const [titles,setTitle] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches/new")
      .then( response => {
        console.log(response.data.data)
        setTitle(response.data.data["titles"])
        setTeams(response.data.data["teams"])
        setStadia(response.data.data["stadia"])
      })
      .catch(error => console.log(error))
  },[])
  return (
    <Layout>
      <Form>
        {/* <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group> */}
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>大会名を入力</Form.Label>
          <Form.Control as="select">
            <option>{titles[0]}</option>
            <option>{titles[1]}</option>
            <option>{titles[2]}</option>
            <option>{titles[3]}</option>
          </Form.Control>
          <Form.Label>試合日程を入力</Form.Label>
          <Form.Control type = "date" />
          <Form.Label>ホームチームを入力</Form.Label>
          <Form.Control as="select">
            <option>{teams[0]}</option>
            <option>{teams[1]}</option>
            <option>{teams[2]}</option>
            <option>{teams[3]}</option>
          </Form.Control>
          <Form.Label>アウェイチームを入力</Form.Label>
          <Form.Control as="select">
            <option>{teams[0]}</option>
            <option>{teams[1]}</option>
            <option>{teams[2]}</option>
            <option>{teams[3]}</option>
          </Form.Control>
          <Form.Label>スタジアムを入力</Form.Label>
          <Form.Control as="select">
            <option>{stadia[0]}</option>
            <option>{stadia[1]}</option>
            <option>{stadia[2]}</option>
            <option>{stadia[3]}</option>
          </Form.Control>
          <div key={`custom-checkbox`} className="mb-3">
            <Form.Check 
              custom
              type={"checkbox"}
              id={`custom-checkbox`}
              label={`中立地開催？`}
            />
          </div>
        </Form.Group>
        {/* <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Example multiple select</Form.Label>
          <Form.Control as="select" multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group> */}
        <Button>試合情報作成</Button>
      </Form>
    </Layout>
  )
}
export default MatchNew;
