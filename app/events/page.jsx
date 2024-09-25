"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import { Suspense } from "react";

async function fetchEvents() {
  const response = await fetch("https://qevent-backend.labs.crio.do/events");
  return response.json();
}

function EventsComponent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const artistFilter = searchParams.get("artist");
  const tagFilter = searchParams.get("tag");

  useEffect(() => {
    async function fetchData() {
      const allEvents = await fetchEvents();

      let filtered = allEvents;

      if (artistFilter) {
        filtered = filtered.filter((event) => event.artist === artistFilter);
      }

      if (tagFilter) {
        filtered = filtered.filter((event) => event?.tags?.includes(tagFilter));
      }

      setFilteredEvents(filtered);
    }

    fetchData();
  }, [artistFilter, tagFilter]);

  return (
    <div className="flex flex-row gap-x-2 gap-y-2 px-3 py-3 flex-wrap justify-evenly">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id}>
            <EventCard eventData={event} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsComponent />
    </Suspense>
  );
}
