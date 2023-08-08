import { gql, useQuery } from "@apollo/client";
import EmptyState from "@components/empty-state";
import FriendRequested from "@components/friend-requested";
import Layout from "@components/layout";
import PullToRefresh from "@components/pull-to-refresh";
import SkFriendRequested from "@components/skeletons/sk-friend-requested";
import { User } from "graphql/quries.type";

const GET_SENT_FRIEND_REQUESTS = gql`
  query getSentFriendRequests {
    getSentFriendRequests {
      friendRequests {
        _id
        receiveUser {
          name
          account_id
        }
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
      requestUser: User;
      receiveUser: User;
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
                name={request.receiveUser.name}
                accountId={request.receiveUser.account_id}
                message={request.requestMessage}
                showCancel
              />
            ))}
          </section>
        ) : (
          <EmptyState text="보낸 친구 신청 목록이 비었어요!" />
        )}
      </PullToRefresh>
    </Layout>
  );
};

export default Sent;
