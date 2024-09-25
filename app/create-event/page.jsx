"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { MultiSelect } from "react-multi-select-component";

export default function () {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    tags: [],
    artist: "",
    price: "",
    description: "",
  });
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const getTags = async () => {
    try {
      const apiResponse = await fetch(
        "https://qevent-backend.labs.crio.do/tags"
      );
      const tags = await apiResponse.json();
      setTags(tags.map((tag) => ({ label: tag.name, value: tag.name })));
    } catch {
      console.log("Something went wrong while fetching tags");
    }
  };

  const validateFormData = (data) => {
    for (const key in data) if (!data[key] || !data[key].length) return false;
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    formData.tags = selectedTags.map((tag) => tag.value);
    if (validateFormData(formData)) {
      const imageNumber = Math.floor(Math.random() * 100);
      const payload = {
        ...formData,
        id: uuidv4(),
        image: `https://randomuser.me/api/portraits/men/${imageNumber}.jpg`,
      };
      try {
        const _ = await fetch("https://qevent-backend.labs.crio.do/events", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        router.push("/events");
      } catch {
        alert("Event creation failed");
      }
    }
  };

  useEffect(() => {
    if (!session) router.push("/events");
  }, [session]);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="h-[80vh] w-full flex flex-row justify-center items-center">
      <form
        className="h-[350px] w-[550px] flex flex-row flex-wrap shadow-md p-8 gap-x-4"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Event Name"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2 focus:border-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Location"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="date"
          placeholder="Location"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          className=" h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="time"
          placeholder="Location"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, time: e.target.value }))
          }
          className=" h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <MultiSelect
          options={tags}
          value={selectedTags}
          onChange={setSelectedTags}
          labelledBy="Select"
          className="w-[200px]"
        />
        <input
          type="text"
          placeholder="Artist"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, artist: e.target.value }))
          }
          className=" h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="price"
          placeholder="Price"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: e.target.value }))
          }
          className=" h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="description"
          placeholder="Description"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className=" h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <button
          className="h-[40px] w-[130px] text-center bg-red-500 text-white border-none text-sm rounded"
          type="submit"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
