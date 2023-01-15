import { ReactNode } from "react";

interface FIBProps {
  icon: ReactNode;
}

const FIB = ({ icon }: FIBProps) => {
  return (
    <button className="flex justify-center items-center fixed w-16 h-16 bg-violet-300 rounded-full bottom-24 right-4 text-white shadow-lg">
      {icon}
    </button>
  );
};

export default FIB;
