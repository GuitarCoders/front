import { gql, useQuery } from "@apollo/client";
import EmptyState from "@components/empty-state";
import FriendRequested from "@components/friend-requested";
import Layout from "@components/layout";
import PullToRefresh from "@components/pull-to-refresh";
import SkFriendRequested from "@components/skeletons/sk-friend-requested";
import { User } from "hooks/useUser";

const GET_RECEIVE_FRIEND_REQUESTS = gql`
  query getReceiveFriendRequests {
    getReceiveFriendRequests {
      friendRequests {
        _id
        requestUser {
          name
          account_id
        }
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
      requestUser: User;
      receiveUser: User;
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
      <PullToRefresh onRefresh={refetch}>
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
                name={request.requestUser.name}
                accountId={request.requestUser.account_id}
                message={request.requestMessage}
                showConfirm
                showRefuse
              />
            ))}
          </section>
        ) : (
          <EmptyState text="받은 친구 신청 목록이 비었어요!" />
        )}
      </PullToRefresh>
    </Layout>
  );
};

export default Received;
