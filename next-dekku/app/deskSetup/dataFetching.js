// 전체 게시글 조회
// 데이터를 가져오는 역할
// 함수를 제공하는 파일은 소문자로 시작

export const fetchPosts = async () => {
    try {
      const response = await fetch("https://dekku.co.kr/api/deskterior-post", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  