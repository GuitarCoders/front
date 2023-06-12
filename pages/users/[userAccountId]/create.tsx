import { gql, useMutation } from "@apollo/client";
import Layout from "@components/layout";
import SubmitButton from "@components/submit-button";
import Textarea from "@components/textarea";
import { addApolloState, initializeApollo } from "@libs/apollo-client";
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
    }
  }
`;

interface RequestForm {
  requestMessage: string;
}

interface CreateRequestResponse {
  createFriendRequest: {
    success: boolean;
  };
}

interface NewFriendProps {
  receiveUserId: string;
  receiveUserName: string;
}

const NewFriend = ({ receiveUserId, receiveUserName }: NewFriendProps) => {
  console.log(receiveUserId);
  const router = useRouter();
  const alert = useAlert();
  const [createRequest, { loading }] = useMutation<CreateRequestResponse>(
    CREATE_FRIEND_REQUEST
  );
  const { register, handleSubmit } = useForm<RequestForm>();

  const onValid = async ({ requestMessage }: RequestForm) => {
    if (loading) return;
    const variables = { requestMessage, receiveUserId };
    try {
      const result = await createRequest({ variables });
      if (result.data?.createFriendRequest.success) {
        alertSentRequest();
      }
    } catch (error) {
      console.error(error);
      alertError();
    }
  };

  const alertSentRequest = () => {
    alert({
      visible: true,
      title: "친구 신청 완료",
      description: `${receiveUserName} 님에게 친구 신청을 보냈습니다.`,
      // TODO: 백엔드에서 userByAccountId에 친구와의 관계값 넣어주면, router.back() 뿐만 아니라 대상자의 프로필 데이터도 refetch 하거나 cache를 update 해 줄 필요가 있음
      closeBtnAction: () => router.back(),
    });
  };
  const alertError = () => {
    alert({
      visible: true,
      title: "친구 신청 실패",
      description: "친구 신청 과정에서 오류가 발생했습니다.",
      // TODO: 백엔드에서 userByAccountId에 친구와의 관계값 넣어주면, router.back() 뿐만 아니라 대상자의 프로필 데이터도 refetch 하거나 cache를 update 해 줄 필요가 있음
      closeBtnAction: () => router.back(),
    });
  };

  return (
    <Layout title="친구 신청" canGoBack>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col p-4 gap-4"
      >
        <Textarea
          register={register("requestMessage", { required: true })}
          placeholder={`${receiveUserName} 님께 친구신청 메시지를 보냅니다.`}
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
        userByAccountId: { _id, name },
      },
    } = await apolloClient.query<UserByAccountIdResponse>({
      query: USER_BY_ACCOUNT_ID,
      variables: { account_id: accountId },
    });

    return addApolloState(apolloClient, {
      props: { receiveUserId: _id, receiveUserName: name },
    });
  } catch {
    return {
      props: {},
    };
  }
}

export default NewFriend;
