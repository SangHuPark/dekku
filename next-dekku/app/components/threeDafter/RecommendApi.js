export const fetchRecommendedPosts = async (productIds) => {
    try {
      const response = await fetch(`https://dekku.co.kr/api/products/deskterior-posts-by-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch recommended posts');
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching recommended posts:", error);
      return [];
    }
  };
  