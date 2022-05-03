import Sidebar from "../UI/Sidebar";
import Card from "../UI/Containers/Card";
import RequestList from "../UI/RequestList";
import TopNav from "../UI/TopNav";
import Body from "../UI/Containers/Body";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <div className="cards">
          <Card class={"fa fa-users"}>
            <div className="number">100</div>
            <div className="card-name">Active Registered Students</div>
          </Card>
          <Card class={"fa fa-users"}>
            <div className="number">99</div>
            <div className="card-name">Active Registered faculty</div>
          </Card>
          <Card class={"fa fa-envelope-open"}>
            <div className="number">98</div>
            <div className="card-name">Active Pending Requests</div>
          </Card>
          <Card class={"fa fa-spinner"}>
            <div className="number">97</div>
            <div className="card-name">Pending Request</div>
          </Card>
          <Card class={"fa fa-user-circle"}>
            <div className="number">96</div>
            <div className="card-name">Instructors to be Verified</div>
          </Card>
        </div>
        <RequestList />
      </Body>
    </>
  );
};

export default Dashboard;
