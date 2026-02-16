import Image from "next/image";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 z-10 relative">
      <div className="flex">
        <Image
          src={logo}
          alt="Supervisor Copilot Logo"
          width={32}
          height={32}
          className="inline-block mr-2"
        />
        <div className="text-lg font-semibold text-[var(--brand--neutrals--navy-blue)]">
          Supervisor Copilot
        </div>
      </div>

      <a
        href="/login"
        className="rounded-lg bg-[var(--brand--neutrals--navy-blue)] opacity-100 px-8 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Login
      </a>
    </nav>
  );
}
