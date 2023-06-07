import { NextPage } from "next";
import PostPreview from "./post-preview";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserState } from "hooks/useUser";

interface UserTemplateProps {
  isMe?: boolean;
  isFriend?: boolean;
  profile: UserState;
  loading?: boolean;
}

const UserTemplate: NextPage<UserTemplateProps> = ({
  isMe,
  isFriend,
  profile,
}) => {
  const router = useRouter();

  const goToSettingPage = () => {
    router.push(`/users/edit`);
  };

  const onSettingsClick = () => {
    goToSettingPage();
  };

  return (
    <>
      <section>
        <div className="h-56 bg-slate-100 flex flex-col justify-end p-4 gap-3 relative">
          <div className="flex flex-col gap-3">
            <div className="absolute right-4 top-4 flex gap-2">
              {isMe ? (
                <>
                  <Link
                    href="/me/friends"
                    className="border border-violet-400 bg-white px-2 py-1 text-sm rounded-md text-violet-400 flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                    친구 ({profile?.friends.length})
                  </Link>
                  <button
                    onClick={onSettingsClick}
                    className="border border-violet-400 bg-white px-2 py-1 text-sm rounded-md text-violet-400 flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    설정
                  </button>
                </>
              ) : null}
              {isMe || isFriend ? null : (
                <Link
                  href={`/friends/${profile?.account_id}`}
                  className="border border-violet-400 bg-white px-2 py-1 text-sm rounded-md text-violet-400 flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  친구 신청
                </Link>
              )}
            </div>
            <div className="w-12 h-12 bg-slate-300 rounded-md" />
            <div className="flex flex-col">
              <h5 className="font-semibold">{profile?.name}</h5>
              <p className="text-gray-400 text-sm">@{profile?.account_id}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600">{profile?.about_me}</p>
        </div>
        <div className="grid grid-cols-3 h-12 border-b">
          <button className="text-violet-400 font-bold">이야기</button>
          {["미디어", "미투함"].map((i) => (
            <button key={i}>{i}</button>
          ))}
        </div>
        <div className="divide-y">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <PostPreview key={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default UserTemplate;
