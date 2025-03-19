import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-white dark:bg-gray-900 mt-4">
        <div className="w-full px-4 ">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#FF4800] mb-4">
                EletronicZone
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Online store specializing in electronics and gadgets.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎧</span>
                <div>
                  <p className="text-sm font-semibold dark:text-gray-200">Have any questions</p>
                  <p className="text-base text-[#FF4800]">+250786885185</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 dark:text-gray-200">QUICK LINKS</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">About us</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Contact us</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Products</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Sign in</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Sign up</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 dark:text-gray-200">CUSTOMER AREA</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">My Account</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Orders</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Tracking List</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Terms</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF4800] dark:hover:text-[#FF4800]">My Carts</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 dark:text-gray-200">FOLLOW US</h4>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Youtube className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Link>
              </div>
              <h4 className="text-base font-semibold mt-6 mb-4 dark:text-gray-200">DOWNLOAD APPS</h4>
              <div className="flex gap-3">
                <Link href="#" className="block">
                  <Image
                    src="/apple.png"
                    alt="App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <Link href="#" className="block">
                  <Image
                    src="/playStore.png"
                    alt="Google Play"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-8 dark:bg-gray-700" />
        </div>
        <div className="flex justify-between items-center bg-[#121010] h-16 w-full px-4 py-3">
          <p className="text-sm text-white">
            ELECTONICZONE - {new Date().getFullYear()} All Right Reserved
          </p>
          <div className="flex gap-4">
            <span className="text-sm text-white">Payments </span>
            <span className="text-sm text-white">Visa</span>
            <span className="text-sm text-white">MasterCar</span>
            <span className="text-sm text-white">PayPal</span>
            <span className="text-sm text-white">Bitcons</span>
          </div>
        </div>
      </footer>
    </>
  );
}
