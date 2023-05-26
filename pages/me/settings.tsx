import Layout from "@components/layout";
import SubmitButton from "@components/submit-button";
import TextInput from "@components/text-input";
import Textarea from "@components/textarea";
import useAlertDialog from "@libs/useAlertDialog";
import useUser, { User } from "@libs/useUser";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface SettingsForm {
  name: string;
  password: string;
  about_me: string;
}

const Settings: NextPage = () => {
  const { register, handleSubmit } = useForm<SettingsForm>();
  const user = useUser();
  const onValid = (formData: SettingsForm) => {
    console.log(formData);
  };
  if (!user) return null;
  return (
    <>
      <Layout title="내 정보" canGoBack>
        <form
          onSubmit={handleSubmit(onValid)}
          className="p-4 pt-8 flex flex-col gap-3"
        >
          <TextInput
            register={register("name", { required: true })}
            placeholder="이름"
            defaultValue={user?.name}
          />
          <TextInput
            type="password"
            register={register("password", { required: true })}
            placeholder="변경할 비밀번호"
          />
          <Textarea
            register={register("about_me", { required: true })}
            placeholder="자기소개"
            defaultValue={user?.about_me}
          />
          <SubmitButton text="변경하기" />
        </form>
      </Layout>
    </>
  );
};

export default Settings;
