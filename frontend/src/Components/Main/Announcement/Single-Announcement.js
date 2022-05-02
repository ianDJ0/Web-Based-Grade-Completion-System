import "./Announcement.css";

const AnnouncementList = (props) => {
  return (
    <>
      <h1 className="announcement">Announcements</h1>
      <hr className="hr" />
      <br />
      <div className="announcement-list">
        {props.AnList.map((item) => {
          return (
            <div className="announcement-box" key={item.scrapeId}>
              <a href={item.scrapeURL} target="_blank" rel="noreferrer">
                <h3 className="announcement-title">{item.scrapeTitle}</h3>
                <p className="announcement-date">{item.scrapeDate}</p>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnnouncementList;
