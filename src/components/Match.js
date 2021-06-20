import React from "react";

import {Container,Button} from "react-bootstrap"
import MatchInfo from "./MatchInfo"
const Match = () => {
  return (
    <Container>
      <div>
        <MatchInfo />
        <Button>
          見ていない
        </Button>
        <Button>
          オンラインで見た
        </Button>
        <Button>
          スタジアムで見た
        </Button>
      </div>
    </Container>
  )
}

export default Match;
