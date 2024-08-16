// API 호출 함수
export async function fetchRecommendedPosts(productIds) {
  try {
    const requestBody = { productIds };
    console.log("Sending request with body:", JSON.stringify(requestBody)); // Log the request body

    const response = await fetch('http:dekku.co.kr:8080/api/products/related-posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommended posts:', error);
    return [];
  }
}
