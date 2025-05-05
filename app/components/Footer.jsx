import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-3 w-full bg-red-300 border-t p-5 md:p-10">
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex">
          <img className="h-8" src="https://firebasestorage.googleapis.com/v0/b/sundergarments-a564f.firebasestorage.app/o/SG_logo.png?alt=media&token=c7a9b97b-4f5d-4be4-bb5f-c0f1def10c21" alt="Logo" />
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-end gap-4">
          <div className="flex gap-2 items-center">
            <Phone size={12} className="text-red-700" />
            <h2 className="text-sm font-semibold text-black">+91 9830464031</h2>
          </div>
          <div className="flex gap-2 items-center">
            <Mail size={12} className="text-red-700" />
            <h2 className="text-sm font-semibold text-black">k_1980daga@yahoo.com</h2>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={12} className="text-red-700" />
            <h2 className="text-sm font-semibold text-black">Howrah</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <h3 className="text-sm font-semibold text-black">
          © 2025 . All rights reserved by SUNDER GARMENTS
        </h3>
      </div>
    </footer>
  );
}
