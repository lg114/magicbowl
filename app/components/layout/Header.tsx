import { FloatingNav } from "./FloatingNav";

type HeaderProps = {
  activeItem?: string;
};

export function Header({ activeItem = "Home" }: HeaderProps) {
  return (
    <header className="site-header" aria-label="Primary">
      <FloatingNav activeItem={activeItem} />
    </header>
  );
}
