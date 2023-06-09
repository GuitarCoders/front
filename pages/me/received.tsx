import { gql, useQuery } from "@apollo/client";
import EmptyState from "@components/empty-state";
import FriendRequested from "@components/friend-requested";
import Layout from "@components/layout";
import SkFriendRequested from "@components/skeletons/sk-friend-requested";

const GET_RECEIVE_FRIEND_REQUESTS = gql`
  query getReceiveFriendRequests {
    getReceiveFriendRequests {
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

interface GRFResponse {
  getReceiveFriendRequests: {
    friendRequests: {
      _id: string;
      requestUserId: string;
      requestMessage: string;
      createdAt: string;
    }[];
  };
}

const Received = () => {
  const { data, loading, refetch } = useQuery<GRFResponse>(
    GET_RECEIVE_FRIEND_REQUESTS
  );
  const friendRequests = data?.getReceiveFriendRequests.friendRequests;
  return (
    <Layout canGoBack title="받은 친구 신청">
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
              name={request.requestUserId}
              accountId={request.requestUserId}
              message={request.requestMessage}
              showConfirm
              showRefuse
            />
          ))}
        </section>
      ) : (
        <EmptyState text="받은 친구 신청 목록이 비었어요!" />
      )}
    </Layout>
  );
};

export default Received;
