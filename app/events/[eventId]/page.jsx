import Tag from "@/components/Tag";

export default async function EventDetailPage({ params }) {
  const apiResponse = await fetch(
    `https://qevent-backend.labs.crio.do/events/${params.eventId}`
  );
  const event = await apiResponse.json();
  return (
    <div className="flex flex-row justify-center py-4">
      <div className="flex flex-col h-[auto] w-[80%] gap-y-20">
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-center">
            <img
              className="h-[290px] w-[490px] object-cover"
              src={event.image}
              alt={event.name}
            />
          </div>
          <div className="font-extrabold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
            <h3 className="text-3xl">{event.name}</h3>
            <p clasName="text-1xl">{event.location}</p>
            <p className="text-1xl">{event.artist}</p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex flex-row gap-x-4">
            {event.tags.map((tag) => (
              <Tag text={tag} />
            ))}
          </div>
          <p className="font-serif font-medium">{event.description}</p>
          <div className="flex flex-row justify-between w-full">
            <p className="text-3xl font-extrabold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
              {`$${event.price}`}
            </p>
            <button className="h-[30px] w-[100px] text-center bg-red-500 text-white border-none text-sm rounded">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
