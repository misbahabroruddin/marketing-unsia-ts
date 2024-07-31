import { UnsiaLogoWithText } from "./svgs/unsia-logo-text";

export const Navbar = () => {
  return (
    <header className="fixed z-[11] flex h-16 w-full items-center border-b border-[#F1F1F1] bg-white p-3">
      <div className="flex w-full justify-between">
        <div className="flex w-60 justify-center">
          <UnsiaLogoWithText />
        </div>
      </div>
    </header>
  );
};
