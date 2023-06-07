import useAlert from "hooks/useAlert";

interface FriendRequestedProps {
  name: string;
  accountId: string;
  message: string;
}

const FriendRequested: React.FC<FriendRequestedProps> = ({
  name,
  accountId,
  message,
}) => {
  const alert = useAlert();
  const onConfirmClick = () => {
    alert({
      visible: true,
      title: `친구 신청 수락`,
      description: `${name} 님의 친구 신청을 수락합니다.`,
      extraBtnText: "신청 수락하기",
      extraBtnColor: "green",
    });
  };
  const onRefuseClick = () => {
    alert({
      visible: true,
      title: "친구 신청 거절",
      description: `${name} 님의 친구 신청을 거절하고 받은 친구 신청 목록에서 ${name} 님을 삭제합니다. 계속할까요?`,
      extraBtnText: "신청 거절하기",
      extraBtnColor: "red",
    });
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0" />
          <div className="flex flex-col justify-center">
            <h4 className="font-medium">{name}</h4>
            <h5 className="text-sm text-gray-500">@{accountId}</h5>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onConfirmClick}
            className="text-sm bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-700"
          >
            수락
          </button>
          <button
            onClick={onRefuseClick}
            className="text-sm bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            거절
          </button>
        </div>
      </div>
      <div className="text-sm mt-4 p-4 bg-gray-100 rounded-md">{message}</div>
    </div>
  );
};

export default FriendRequested;
