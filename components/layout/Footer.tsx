import Logo from '@/public/logo.png'
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080908]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-2 font-black">
         <Image src={Logo} alt='logo ' width={30} height={30}></Image> FITLOG
        </div>
        <p className="text-xs text-white/50">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
