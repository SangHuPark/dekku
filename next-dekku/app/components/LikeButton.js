"use client";

const { useEffect } = require("react");
const { useLogin } = require("./AuthContext");

const LikeButton = (toPostId) => {
  const { isLoggedIn } = useLogin();
  const [postId, setPostId] = useState(null);
  const [isLikedPost, setIsLikedPost] = useState(null);

  useEffect(() => {
    const GetLiked = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");
        if (!accessToken) {
          console.log("No access token found");
          return;
        }
        const response = await fetch(
          `https://dekku.co.kr/api/like검사/${toPostId}`,
          {
            method: "GET",
            headers: {
              access: accessToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Liked or not");
        }
        const data = await response.json();
        setIsLikedPost(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetLiked();
  }, [toPostId]);

  if (!isLoggedIn) {
    alert("로그인되어 있지 않습니다.");
    return null;
  }
  return (
    <div>
      {isLikedPost && <div>좋아요한 게시글</div>}
      {!isLikedPost && <div>좋아요하지 않은 게시글</div>}
    </div>
  );
};

export default LikeButton;
