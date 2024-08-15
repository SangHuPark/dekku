// API 호출 함수
export const fetchRecommendedPosts = async (productIds) => {
  try {
    // productIds를 쿼리 파라미터로 변환
    const query = productIds.map(id => `productIds=${id}`).join('&');
    
    // API 호출
    const response = await fetch(`https://dekku.co.kr/api/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 응답이 성공적이지 않으면 에러 던지기
    if (!response.ok) {
      throw new Error('Failed to fetch recommended posts');
    }

    // JSON 데이터 파싱
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching recommended posts:", error);
    return [];
  }
};
