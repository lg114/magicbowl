import { HobbyCard } from "./HobbyCard";
import type { Hobby } from "../../types/hobby";

type HobbyListProps = {
  hobbies: Hobby[];
};

export function HobbyList({ hobbies }: HobbyListProps) {
  return (
    <div className="hobbies-grid">
      {hobbies.map((hobby, i) => (
        <HobbyCard key={`${hobby.title}-${i}`} hobby={hobby} />
      ))}
    </div>
  );
}
