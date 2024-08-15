// 모든 상품 조회 컴포넌트

import { useState, useEffect } from "react";

// API를 호출하여 모든 제품을 가져오는 커스텀 훅
export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 함수
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dekku.co.kr/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data); // 가져온 제품 목록을 상태에 저장
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
};
