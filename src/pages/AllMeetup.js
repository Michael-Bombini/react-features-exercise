import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const AllMeetup = () => {
  const [loading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_FB_K}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };

          meetups.push(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  return (
    <>
    {!loading && <section>
      <h1>All meetups</h1>
      <ul>
        <MeetupList meetups={loadedMeetups} />;
      </ul>
    </section>}
    {
      loading && <h1>loading...</h1>
    }
    </>
  );
};

export default AllMeetup;
