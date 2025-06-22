import { Card } from "./ui/card";

type Props = {
  icon: React.ReactElement;
  title: string;
  value: string;
  color: string;
};

export default function StatusCard({ icon, title, value, color }: Props) {
  return (
    <Card className="border">
      <div className="p-4 flex flex-col items-center">
        <div className={`p-2 rounded-full ${color} mb-2`}>{icon}</div>
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-gray-500 text-sm">{value}</p>
      </div>
    </Card>
  );
}
