

import ListCards from "./components/List";
import activity from "@/app/data/data.json"



export default function Home() {
  return (
    <div>
     

      <ListCards activity={activity} />

    </div>
  );
}
