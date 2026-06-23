import { HobbyCard, type Hobby } from "./HobbyCard";

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
