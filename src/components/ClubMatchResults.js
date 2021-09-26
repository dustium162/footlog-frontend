import React, { useState } from "react";
import { Carousel, Container } from "react-bootstrap"
import Opponent from "./Opponent"

const ClubMatchResults = ({clubMatchResults}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <>
      <h3 className="h5">クラブ別対戦成績</h3>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        slide={true}
        interval={null}
        indicators={false}
      >
        {/* {clubMatchResults.map(club_match_result => ( */}
        {clubMatchResults.map(clubMatchResult => (
          <Carousel.Item key={clubMatchResult.team.club_id}>
            <Opponent clubMatchResult={clubMatchResult} />
          </Carousel.Item>)
        )}
      </Carousel>
    </>
  );
}

export default ClubMatchResults;