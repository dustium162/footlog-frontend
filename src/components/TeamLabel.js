const TeamLabel = ({team}) => {
  const getRgba = (colorCode, transparency) => {
    const aryColorCode = colorCode.replace('#', '').match(/.{2}/g);
    return `rgba(${parseInt(aryColorCode[0], 16)}, ${parseInt(aryColorCode[1], 16)}, ${parseInt(aryColorCode[2], 16)}, ${transparency})`;
  }
  return (
    <div style={{
      border: "solid 1px",
      textAlign:"center",
      borderRadius: "30px",
      width: "85px",
      backgroundColor:`${getRgba(team.color_code, 0.33)}`,
      textShadow: team.is_text_black ? "0.5px 0.5px 0px gray, -0.5px 0.5px 0px gray, 0.5px -0.5px 0px gray, -0.5px -0.5px 0px gray" : "",
      color:`${getRgba(team.color_code, 1)}`
    }}>
    {team.abbreviation}
  </div>
  )
}
export default TeamLabel