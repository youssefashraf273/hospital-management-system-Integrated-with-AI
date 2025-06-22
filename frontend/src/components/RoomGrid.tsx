import { Bed } from "lucide-react";

const rooms = [
  { id: "A-101", status: "available" },
  { id: "B-102", status: "occupied" },
  { id: "C-103", status: "occupied" },
  { id: "D-104", status: "available" },
  { id: "E-105", status: "occupied" },
  { id: "F-106", status: "occupied" },
  { id: "G-107", status: "occupied" },
  { id: "H-108", status: "available" },
  { id: "I-109", status: "occupied" },
  { id: "J-110", status: "available" },
  { id: "K-111", status: "occupied" },
  { id: "L-112", status: "available" },
  { id: "M-113", status: "occupied" },
  { id: "N-114", status: "occupied" },
  { id: "O-115", status: "occupied" },
  { id: "P-116", status: "available" },
  { id: "Q-117", status: "occupied" },
];

export default function RoomGrid() {
  return (
    <div className="grid grid-cols-3 flex-1 sm:grid-cols-6 gap-4">
      {rooms.map((room) => (
        <div key={room.id} className="flex flex-col items-center">
          <div
            className={`p-2 ${
              room.status === "available" ? "text-green-500" : "text-red-500"
            }`}
          >
            <Bed className="size-12" />
          </div>
          <span className="text-xs text-gray-600">Room {room.id}</span>
        </div>
      ))}
    </div>
  );
}
