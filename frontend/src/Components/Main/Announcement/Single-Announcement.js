import React from "react"

const AnnouncementList = props =>{

    return(
        <ul className="announcement-list">
            {props.AnList.map((item)=>{
                return <li key={item.scrapeId}>
                    <div>
                        <h4>{item.scrapeTitle}</h4>
                        <h3>{item.scrapeDate}</h3>
                        <a href={item.scrapeURL} target="_blank" rel="noreferrer">title</a>
                    </div>
                </li>;
            })}
        </ul>
    )
}

export default AnnouncementList;