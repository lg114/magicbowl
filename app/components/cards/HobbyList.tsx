import { HobbyCard } from "./HobbyCard";
import type { Hobby } from "../../types/hobby";

type HobbyListProps = {
  hobbies: Hobby[];
};

export function HobbyList({ hobbies }: HobbyListProps) {
  return (
    <div className="hobbies-grid">
      {hobbies.map((hobby) => (
        <HobbyCard key={hobby.title} hobby={hobby} />
      ))}
    </div>
  );
}
