import Image from "next/image";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 z-10 relative">
      <div className="flex">
        <Image
          src={logo}
          alt="Supervisor Copilot Logo"
          width={38}
          height={38}
          className="inline-block mr-2"
        />
        <div className="text-2xl font-semibold text-[var(--brand--neutrals--navy-blue)]">
          Supervisor Copilot
        </div>
      </div>

      <a
        href="/login"
        className="rounded-lg bg-[var(--brand--neutrals--navy-blue)] opacity-100 px-10 py-2 text-md font-medium text-white hover:opacity-90"
      >
        Login
      </a>
    </nav>
  );
}
