import React, { useState, useRef } from "react";
import {Row, Carousel, Container, Button} from "react-bootstrap"
import Opponent from "./Opponent"

function ClubMatchResults() {
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  return (
    <Row>
  <Carousel
    activeIndex={index}
    onSelect={handleSelect}
    controls={true}
    slide={false}
    prevIcon={<span aria-hidden="false" className="carousel-control-prev-icon" />}
    nextIcon={<span aria-hidden="false" className="carousel-control-next-icon" />}
    >
      <Carousel.Item>
        <Opponent />
      </Carousel.Item>
    </Carousel>
    </Row>
    );
    }

export default ClubMatchResults;