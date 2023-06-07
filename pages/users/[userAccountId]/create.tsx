import { gql, useMutation } from "@apollo/client";
import Layout from "@components/layout";
import SubmitButton from "@components/submit-button";
import Textarea from "@components/textarea";
import { initializeApollo } from "@libs/apollo-client";
import { USER_BY_ACCOUNT_ID } from "graphql/quries";
import { UserByAccountIdResponse } from "graphql/quries.type";
import useAlert from "hooks/useAlert";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const CREATE_FRIEND_REQUEST = gql`
  mutation createFriendRequest(
    $receiveUserId: String!
    $requestMessage: String!
  ) {
    createFriendRequest(
      createFriendRequestData: {
        receiveUserId: $receiveUserId
        requestMessage: $requestMessage
      }
    ) {
      _id
      success
      requestUserId
      receiveUserId
      requestMessage
      createdAt
    }
  }
`;

interface RequestForm {
  requestMessage: string;
}

const NewFriend = ({ receiveUserId }: { receiveUserId: string }) => {
  const router = useRouter();
  const accountId = router.query.userAccountId;
  const alert = useAlert();
  const [createRequest, { loading }] = useMutation(CREATE_FRIEND_REQUEST);
  const { register, handleSubmit } = useForm<RequestForm>();

  const onValid = async ({ requestMessage }: RequestForm) => {
    if (loading) return;
    const variables = { requestMessage, receiveUserId };
    try {
      const result = await createRequest({ variables });
      console.log(result);
    } catch (error) {
      console.error(error);
      alert({
        visible: true,
        title: "친구 신청 실패",
        description: "친구 신청 과정에서 오류가 발생했습니다.",
      });
    }
  };

  return (
    <Layout title="친구 신청" canGoBack>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col p-4 gap-4"
      >
        <Textarea
          register={register("requestMessage", { required: true })}
          placeholder={`@${accountId}님께 친구신청 메시지를 보냅니다.`}
        />
        <SubmitButton text="친구신청 보내기" />
      </form>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { accessToken } = cookies(ctx);
  const apolloClient = initializeApollo(null, accessToken);
  const accountId = ctx.params?.userAccountId;

  try {
    const {
      data: {
        userByAccountId: { _id },
      },
    } = await apolloClient.query<UserByAccountIdResponse>({
      query: USER_BY_ACCOUNT_ID,
      variables: { account_id: accountId },
    });

    return {
      props: { receiveUserId: _id },
    };
  } catch {
    return {
      props: {},
    };
  }
}

export default NewFriend;
