import Link from "next/link";

export default function CategoryNav() {
  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center px-4">
          <div className="flex space-x-10 py-3 text-lg font-medium">
            <Link href="/" className="hover:text-orange-500 text-lg">
              All Categories
            </Link>
            <Link href="/accessories" className="hover:text-orange-500 text-lg">
              Accessories
            </Link>
            <Link href="/smartphones" className="hover:text-orange-500 text-lg">
              Smart Phones
            </Link>
            <Link href="/computers" className="hover:text-orange-500 text-lg">
              Computer
            </Link>
            <Link href="/gaming-equipment" className="hover:text-orange-500 text-lg">
              Gaming Equipment
            </Link>
            <Link href="/tv-and-monitors" className="hover:text-orange-500 text-lg">
              TV & Monitors
            </Link>
            <Link href="/headphones" className="hover:text-orange-500 text-lg">
              Headphones
            </Link>
            <Link href="/speakers" className="hover:text-orange-500 text-lg">
              Speakers
            </Link>
            <Link
              href="#"
              className="flex items-center text-white bg-orange-500 px-3 py-1 rounded text-lg"
            >
              <span className="mr-1">🔥</span> Hot Deals
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
