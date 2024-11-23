import Card from './Card';

interface Activity {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ListCardsProps {
  activity: Activity[];
}

function ListCards({ activity }: ListCardsProps) {
  return (
    <section className="p-3">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
      {activity.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
    </section>
  );
}

export default ListCards;
