import { useState, useEffect } from "react";
import products from "./threeD/ProductList"; // 경로를 실제 파일 위치에 맞게 조정하세요

// 최근 일주일을 계산하는 함수
const getOneWeekAgoDate = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  return oneWeekAgo.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 반환
};

export const useRecentProducts = () => {
  const [recentProducts, setRecentProducts] = useState({});

  useEffect(() => {
    const oneWeekAgo = getOneWeekAgoDate();

    // 모든 카테고리를 순회하면서 최근 일주일 내에 업데이트된 상품들만 필터링
    const filteredProducts = Object.keys(products).reduce((acc, category) => {
      const updatedProducts = products[category].filter(product => {
        const productUpdateDate = new Date(product.update);
        return productUpdateDate >= new Date(oneWeekAgo);
      });
      if (updatedProducts.length > 0) {
        acc[category] = updatedProducts;
      }
      return acc;
    }, {});

    setRecentProducts(filteredProducts);
  }, []);

  return recentProducts;
};