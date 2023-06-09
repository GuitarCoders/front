interface FriendRequestBtnProps {
  onClick: () => void;
  text: string;
  color: "violet" | "gray" | "red";
}

const FriendRequestBtn: React.FC<FriendRequestBtnProps> = ({
  onClick,
  text,
  color,
}) => {
  const buttonColor = (color: "violet" | "gray" | "red") => {
    switch (color) {
      case "gray":
        return "bg-gray-200 text-black hover:bg-gray-300";
      case "red":
        return "bg-rose-600 text-white hover:bg-rose-700";
      case "violet":
        return "bg-violet-400 text-white hover:bg-violet-600";
    }
  };
  return (
    <button
      onClick={onClick}
      className={`text-sm px-4 py-2 rounded-md ${buttonColor(color)}`}
    >
      {text}
    </button>
  );
};

export default FriendRequestBtn;
