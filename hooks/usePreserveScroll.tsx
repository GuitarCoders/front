import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

/*
  다음 글을 읽고 한국어 주석을 추가하여 정리하였습니다
  https://jak-ch-ll.medium.com/next-js-preserve-scroll-history-334cf699802a
*/

export default function usePreserveScroll() {
  const router = useRouter();

  // 방문한 URL을 key로, 스크롤 포지션을 value로 갖는 객체를 ref로 선언
  const scrollPositions = useRef<{ [url: string]: number }>({});

  // 브라우저의 뒤로가기 버튼 클릭으로 발생한 이벤트를 감지하기 위한 boolean 값
  const isBack = useRef(false);

  useEffect(() => {
    // popstate 이벤트가 발생하면 실행
    router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    // 다른 페이지로 url이 변경될 때 실행할 커스텀 함수. 현재 url과 스크롤 포지션 값을 ref에 저장한다.
    const onRouteChangeStart = () => {
      const url = router.pathname;
      scrollPositions.current[url] = window.scrollY;
    };

    /*
      다른 페이지로 url 변경이 완료되었을 때 실행할 커스텀 함수.
      과거에 스크롤 포지션을 저장한 적 있는 url에 다시 한 번 도달했다면, 저장했던 값으로 스크롤 위치를 즉시 이동한다.
    */
    const onRouteChangeComplete = (url: any) => {
      if (isBack.current && scrollPositions.current[url]) {
        window.scroll({
          top: scrollPositions.current[url],
          behavior: "auto",
        });
      }
      isBack.current = false;
    };

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router]);
}
