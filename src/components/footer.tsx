import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-8 w-auto">
                <Image
                  src="/logo.svg"
                  alt="YOLET Logo"
                  width={120}
                  height={26}
                  className="h-8 w-auto"
                />
              </div>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Create.Design.Innovate.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-8">
            {["Services", "About"].map((item) => (
              <Link
                key={item}
                href={item === "About" ? "/about" : `/#${item.toLowerCase()}`}
                className="group relative text-sm text-gray-400 transition-colors hover:text-white"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-gray-500 md:text-left">
            © {new Date().getFullYear()} YOLET Software Labs. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/company/yolet-software-labs",
              },
              {
                name: "Instagram",
                url: "https://www.instagram.com/yolet.io",
              },
            ].map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-sm text-gray-500 transition-colors hover:text-white"
              >
                {social.name}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
