import { local } from "@/lib/types";

const LocalesCard = ({ local }: { local: local }) => {
  return (
    <div className="h-40 w-32 p-5 border-2 border-primary rounded-lg">
      <p>{local.name}</p>
    </div>
  );
};

export default LocalesCard;
