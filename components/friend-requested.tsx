import useAlert from "hooks/useAlert";
import FriendRequestBtn from "./friend-request-btn";
import { gql, useMutation } from "@apollo/client";
import { useCallback, useEffect } from "react";

const ACCEPT_FR = gql`
  mutation AcceptFriendRequest($friendRequestId: String!) {
    acceptFriendRequest(
      acceptFriendRequestData: { friendRequestId: $friendRequestId }
    ) {
      success
    }
  }
`;

const DELETE_FR = gql`
  mutation DeleteFriendRequest($friendRequestId: String!) {
    deleteFriendRequest(
      deleteFriendRequestData: { friendRequestId: $friendRequestId }
    ) {
      success
    }
  }
`;

interface FriendRequestVariables {
  friendRequestId: string;
}

interface AcceptResponse {
  acceptFriendRequest: {
    success: boolean;
  };
}
interface DeleteResponse {
  deleteFriendRequest: {
    success: boolean;
  };
}

interface FriendRequestedProps {
  friendRequestId: string;
  refetchList: () => void;
  name: string;
  accountId: string;
  message: string;
  showConfirm?: boolean;
  showRefuse?: boolean;
  showCancel?: boolean;
}

const FriendRequested: React.FC<FriendRequestedProps> = ({
  friendRequestId,
  refetchList,
  name,
  accountId,
  message,
  showConfirm,
  showRefuse,
  showCancel,
}) => {
  const alert = useAlert();
  const [acceptFr, { data: acceptData, loading: acceptLoading }] = useMutation<
    AcceptResponse,
    FriendRequestVariables
  >(ACCEPT_FR);
  const [deleteFr, { data: deleteData, loading: deleteLoading }] = useMutation<
    DeleteResponse,
    FriendRequestVariables
  >(DELETE_FR);

  const onAcceptClick = async () => {
    try {
      const result = await acceptFr({ variables: { friendRequestId } });
      console.log("accept result", result);
    } catch (error) {
      console.error(error);
      const msg = "친구 수락에 실패했습니다.";
      alertError(msg);
    }
  };
  const onDeleteClick = async () => {
    try {
      const result = await deleteFr({ variables: { friendRequestId } });
      console.log("delete result", result);
    } catch (error) {
      console.error(error);
      const msg = "친구 신청 삭제에 실패했습니다.";
      alertError(msg);
    }
  };
  const alertError = (msg: string) => {
    alert({
      visible: true,
      title: "오류 발생",
      description: msg,
      closeBtnAction: refetchList,
    });
  };
  const alertAccept = () => {
    alert({
      visible: true,
      title: `친구 신청 수락`,
      description: `${name} 님의 친구 신청을 수락합니다.`,
      extraBtnText: "신청 수락하기",
      extraBtnColor: "green",
      extraBtnAction: onAcceptClick,
      extraBtnLoading: acceptLoading,
    });
  };
  const alertRefuse = () => {
    alert({
      visible: true,
      title: "친구 신청 거절",
      description: `${name} 님의 친구 신청을 거절하고 받은 친구 신청 목록에서 ${name} 님을 삭제합니다. 계속할까요?`,
      extraBtnText: "신청 거절하기",
      extraBtnColor: "red",
      extraBtnAction: onDeleteClick,
      extraBtnLoading: deleteLoading,
    });
  };
  const alertCancel = () => {
    alert({
      visible: true,
      title: "친구 신청 취소",
      description: `${name} 님에게 보냈던 친구 신청을 철회합니다. 계속할까요?`,
      extraBtnText: "신청 취소하기",
      extraBtnColor: "red",
      extraBtnAction: onDeleteClick,
      extraBtnLoading: deleteLoading,
    });
  };
  const alertAcceptSuccess = useCallback(() => {
    alert({
      visible: true,
      title: "친구 수락 완료",
      description: `${name} 님과 친구가 되었습니다.`,
      closeBtnAction: refetchList,
    });
  }, [alert, name, refetchList]);
  const alertDeleteSuccess = useCallback(() => {
    alert({
      visible: true,
      title: "친구 요청 삭제 완료",
      description: `${name} 님과의 친구 신청 관계를 삭제했습니다.`,
      closeBtnAction: refetchList,
    });
  }, [alert, name, refetchList]);

  // 친구 신청 수락 데이터의 success 값이 바뀌면 성공했다는 알림을 표시합니다.
  useEffect(() => {
    console.log("acceptData changed", acceptData);
    if (acceptData?.acceptFriendRequest?.success) {
      alertAcceptSuccess();
    }
  }, [acceptData, name, alert, refetchList, alertAcceptSuccess]);

  // 친구 신청 삭제 데이터의 success 값이 바뀌면 성공했다는 알림을 표시합니다.
  useEffect(() => {
    console.log("deleteData changed", deleteData);
    if (deleteData?.deleteFriendRequest?.success) {
      alertDeleteSuccess();
    }
  }, [deleteData, name, alert, refetchList, alertDeleteSuccess]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0" />
          <div className="flex flex-col justify-center">
            <h4 className="font-medium">
              {name.length > 15 ? name.slice(0, 15) + "..." : name}
            </h4>
            <h5 className="text-sm text-gray-500">
              @{accountId.length > 15 ? name.slice(0, 15) + "..." : name}
            </h5>
          </div>
        </div>
        <div className="flex gap-3">
          {showConfirm ? (
            <FriendRequestBtn
              color="violet"
              text="수락"
              onClick={alertAccept}
            />
          ) : null}
          {showRefuse ? (
            <FriendRequestBtn color="gray" text="거절" onClick={alertRefuse} />
          ) : null}
          {showCancel ? (
            <FriendRequestBtn color="red" text="회수" onClick={alertCancel} />
          ) : null}
        </div>
      </div>
      <div className="text-sm mt-4 p-4 bg-gray-100 rounded-md">{message}</div>
    </div>
  );
};

export default FriendRequested;
