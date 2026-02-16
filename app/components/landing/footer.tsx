export default function Footer() {
  return (
    <footer className="px-8 py-8 mb-2 text-center text-sm text-[var(--text--default--black-light)] cursor-default z-10 relative">
      <a
        href="https://www.isabelmgendi.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black font-bolder hover:text-[var(--text--default--black-medium)]"
      >
        Lebasi {" "}
      </a>
      © {new Date().getFullYear()} Supervisor Copilot · Built for Shamiri
    </footer>
  );
}
