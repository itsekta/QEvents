"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

function EventsPage() {
  const [eventsData, setEventData] = useState([]);
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist");
  async function fetchData() {
    const eventReq = await fetch("https://qevent-backend.labs.crio.do/events");

    const responseData = await eventReq.json();
    console.log(responseData);
    setEventData(responseData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEvents = artistName
    ? eventsData.filter((event) => event.artist === artistName)
    : eventsData;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "32px" }}>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id} style={{ flex: "1 1 350px" }}>
            <EventCard eventData={event} />
          </div>
        ))
      ) : (
        <p>No events found for {artistName}</p>
      )}
    </div>
  );
}

export default EventsPage;
