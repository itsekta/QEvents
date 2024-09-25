import Tag from "@/components/Tag";

export default async function TagsPage() {
  const apiResponse = await fetch("https://qevent-backend.labs.crio.do/tags");
  const tags = await apiResponse.json();
  return (
    <div className="flex flex-row justify-center items-center h-[50vh] px-4">
      <div className="flex flex-row justify-center items-center flex-wrap gap-x-2 gap-y-2 h-[30px] w-[900px]">
        {tags.map((tag) => (
          <div key={tag.id}>
            <Tag text={tag.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
