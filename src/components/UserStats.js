import MatchResults from './MatchResults';
import ClubMatchResults from './ClubMatchResults';
import Heatmap from './Heatmap';

const UserStats = ({userId}) => {
  return (
    <>
      <div className="my-4"><MatchResults userId={userId} /></div>
      <div className="my-4"><hr /></div>
      <div className="my-4"><ClubMatchResults userId={userId} /><hr /></div>
      <div className="my-4"><Heatmap /></div>
    </>
  )
}
export default UserStats;