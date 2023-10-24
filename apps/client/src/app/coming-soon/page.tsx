import Link from "next/link";

export default function ComingSoon() {
  return (
    <main className="flex items-center justify-center text-4xl font-semibold bg-violet-50 h-screen">
      <Link href={"/"} className="hover:cursor-pointer">
        Coming Soon
      </Link>
    </main>
  );
}
