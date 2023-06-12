import { gql, useQuery } from "@apollo/client";
import EmptyState from "@components/empty-state";
import FriendRequested from "@components/friend-requested";
import Layout from "@components/layout";
import SkFriendRequested from "@components/skeletons/sk-friend-requested";

const GET_SENT_FRIEND_REQUESTS = gql`
  query getSentFriendRequests {
    getSentFriendRequests {
      friendRequests {
        _id
        requestUserId
        receiveUserId
        requestMessage
        createdAt
      }
    }
  }
`;

interface GSFResponse {
  getSentFriendRequests: {
    friendRequests: {
      _id: string;
      receiveUserId: string;
      requestMessage: string;
      createdAt: string;
    }[];
  };
}

const Sent = () => {
  const { data, loading, refetch } = useQuery<GSFResponse>(
    GET_SENT_FRIEND_REQUESTS
  );
  const friendRequests = data?.getSentFriendRequests.friendRequests;
  return (
    <Layout canGoBack title="보낸 친구 신청">
      {loading
        ? Array.from({ length: 3 }, (_, i) => i).map((i) => (
            <SkFriendRequested key={i} />
          ))
        : null}
      {friendRequests && friendRequests.length > 0 ? (
        <section className="flex flex-col divide-y">
          {friendRequests.map((request) => (
            <FriendRequested
              key={request._id}
              refetchList={refetch}
              friendRequestId={request._id}
              name={request.receiveUserId}
              accountId={request.receiveUserId}
              message={request.requestMessage}
              showCancel
            />
          ))}
        </section>
      ) : (
        <EmptyState text="보낸 친구 신청 목록이 비었어요!" />
      )}
    </Layout>
  );
};

export default Sent;