// import { Search, UserCircle2 } from "lucide-react";
// import Link from "next/link";
// import LogoutButton from "./LogoutButton";
// import AuthContextProvider from "@/contexts/AuthContext";
// import HeaderClientButtons from "./HeaderClientButtons";

// export default function Header() {
//   const menuList = [
//     {
//       name: "Home",
//       link: "/",
//     },
//     {
//       name: "About",
//       link: "/about-us",
//     },
//     {
//       name: "Contact",
//       link: "/contact-us",
//     },
//   ];
//   return (
//     <nav className="sticky top-0 z-50 bg-red-300 bg-opacity-65 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between">
//       <Link href={"/"}>
//         <img className="h-4 md:h-5" src="https://firebasestorage.googleapis.com/v0/b/sundergarments-a564f.firebasestorage.app/o/SG_logo.png?alt=media&token=c7a9b97b-4f5d-4be4-bb5f-c0f1def10c21" alt="Logo" />
//       </Link>
//       <div className="flex gap-2 items-center font-semibold">
//         {menuList?.map((item,index) => {
//           return (
//             <Link href={item?.link} key={index}>
//               <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-50">
//                 {item?.name}
//               </button>
//             </Link>
//           );
//         })}
//       </div>
//       <div className="flex items-center gap-1">
//         <AuthContextProvider>
//           <HeaderClientButtons />
//         </AuthContextProvider>
//         <Link href={`/account`}>
//           <button
//             title="My Account"
//             className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
//           >
//             <UserCircle2 size={14} />
//           </button>
//         </Link>
//         <AuthContextProvider>
//           <LogoutButton />
//         </AuthContextProvider>
//       </div>
//     </nav>
//   );
// }

"use client";

import { Menu, X, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";
import HeaderClientButtons from "./HeaderClientButtons";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
    { name: "Cart", link: "/cart" },
    { name: "Orders", link: "/account" },
  ];
  

  return (
    <nav className="sticky top-0 z-50 bg-red-300 bg-opacity-65 backdrop-blur-xl py-3 px-4 md:py-4 md:px-16 border-b shadow-sm">
      <div className="flex items-center justify-between">
        <Link href="/">
          <img
            className="h-4 md:h-5"
            src="https://firebasestorage.googleapis.com/v0/b/sundergarments-a564f.firebasestorage.app/o/SG_logo.png?alt=media&token=c7a9b97b-4f5d-4be4-bb5f-c0f1def10c21"
            alt="Logo"
          />
        </Link>

        <div className="hidden md:flex gap-2 items-center font-semibold ">
          {menuList.map((item, index) => (
            <Link href={item.link} key={index}>
              <button className="text-sm px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-200">
                {item.name}
              </button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <AuthContextProvider>
            <HeaderClientButtons />
          </AuthContextProvider>

          <Link href="/account">
            <button
              title="My Account"
              className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-white hover:text-black transition"
            >
              <UserCircle2 size={18} />
            </button>
          </Link>

          <AuthContextProvider>
            <LogoutButton />
          </AuthContextProvider>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3 bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-lg px-4 py-3 space-y-2"
          >
            {menuList.map((item, index) => (
              <Link href={item.link} key={index} onClick={() => setMenuOpen(false)}>
                <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-red-100 text-black font-medium transition">
                  {item.name}
                </button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

