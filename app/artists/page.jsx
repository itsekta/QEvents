"use client";
import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";

function ArtistsPage() {
  const [artistsData, setArtistsData] = useState([]);

  async function fetchData() {
    const artistsReq = await fetch(
      "https://qevent-backend.labs.crio.do/artists"
    );

    const responseData = await artistsReq.json();
    console.log(responseData);
    setArtistsData(responseData);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "32px" }}>
      {artistsData &&
        artistsData.map((artist) => (
          <div key={artist.id} style={{ flex: "1 1 350px" }}>
            <ArtistCard artistData={artist} />
          </div>
        ))}
    </div>
  );
}

export default ArtistsPage;
