// app/deskSetup/DeskSetupController.js
// 데이터 필터링, 정렬, 페이징 처리 등 로직을 담당

export const filterAndSortPosts = (posts, filters, sortOrder, searchTerm) => {
    let filteredData = [...posts];
  
    // 필터링
    if (filters.style !== "all") {
      filteredData = filteredData.filter((post) => post.deskteriorAttributes.style === filters.style);
    }
    if (filters.color !== "all") {
      filteredData = filteredData.filter((post) => post.deskteriorAttributes.color === filters.color);
    }
    if (filters.job !== "all") {
      filteredData = filteredData.filter((post) => post.deskteriorAttributes.job === filters.job);
    }
  
    // 검색어 필터링
    if (searchTerm) {
      filteredData = filteredData.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // 정렬
    if (sortOrder === "latest") {
      // filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      filteredData.sort((a, b) => parseInt(b.postId) - parseInt(a.postId));
    } else if (sortOrder === "likes") {
      filteredData.sort((a, b) => parseInt(b.likeCount) - parseInt(a.likeCount));
    } else if (sortOrder === "views") {
      filteredData.sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount));
    }
  
    return filteredData;
  };
  