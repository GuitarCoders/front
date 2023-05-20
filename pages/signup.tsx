const SignUp = () => {
  return (
    <main className="px-4">
      <div className="mt-12 h-28 flex justify-center items-center text-xl font-bold">
        회원가입
      </div>
      <form className="py-4">
        <div className="p-4 flex flex-col gap-2">
          <label htmlFor="id">ID</label>
          <input
            id="id"
            type="id"
            placeholder="아이디를 입력하세요"
            className="bg-slate-100 px-4 py-2 rounded-md focus:ring-violet-400 focus:outline-violet-400"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <label htmlFor="pw">PW</label>
          <input
            id="pw"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="bg-slate-100 px-4 py-2 rounded-md focus:ring-violet-400 focus:outline-violet-400"
          />
        </div>
        <div className="flex justify-center items-center mt-8">
          <button className="bg-violet-400 px-4 py-2 rounded-md text-white">
            로그인
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
