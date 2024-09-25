"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
function EventsPage() {
  const [eventsData, setEventData] = useState([]);

  async function fetchData() {
    const eventReq = await fetch("https://qevent-backend.labs.crio.do/events");

    const responseData = await eventReq.json();
    console.log(responseData);
    setEventData(responseData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "32px" }}>
      {eventsData &&
        eventsData.map((event) => (
          <div style={{ flex: "1 1 350px" }}>
            <EventCard key={event.id} eventData={event} />
          </div>
        ))}
    </div>
  );
}

export default EventsPage;
