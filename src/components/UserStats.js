import MatchResults from "./MatchResults";
import ClubMatchResults from "./ClubMatchResults";

const UserStats = ({userId}) => {
  return (
    <>
      <div className="my-4"><MatchResults userId={userId} /></div>
      <div className="mx-5"><hr /></div>
      <div className="my-4"><ClubMatchResults userId={userId} /></div>
    </>
  )
}
export default UserStats;