"use client";

import { useState, useEffect } from "react";
import ThreeJSRenderer from "../../components/threeD/ThreeJSRenderer";
import DeskSetupCard from "../../components/deskSetup/DeskSetupCard";
import { useRouter } from "next/navigation";
import LikeButton from "../../components/LikeButton";
import FollowButton from "../../components/FollowButton";
import Link from "next/link";

export default function Details({ params }) {
  const postId = parseInt(params.id, 10); // 문자열을 정수로 변환
  const [data, setData] = useState(null); // 게시글 데이터를 저장할 상태
  const [jsonUrl, setJsonUrl] = useState(null); // 모델 JSON URL 상태
  const [prevPostData, setPrevPostData] = useState(null); // 이전 게시물 데이터 상태
  const [nextPostData, setNextPostData] = useState(null); // 다음 게시물 데이터 상태
  const [isAuthor, setIsAuthor] = useState(false); // 현재 사용자가 작성자인지 여부
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
  const [editedData, setEditedData] = useState({}); // 수정된 데이터 상태
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [likeChangeTrigger, setLikeChangeTrigger] = useState(false);
  const [likeStatus, setLikeStatus] = useState([]);
  const [commentChangeTrigger, setCommentChangeTrigger] = useState(false);
  const [commentStatus, setCommentStatus] = useState({
    comments: [],
    commentCount: 0,
  });

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const validateUser = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");
        console.log("acess Token", accessToken)
        console.log("Validating user with postId:", postId); // 디버깅 로그
        const response = await fetch(
          `https://dekku.co.kr/api/deskterior-post/validate/${postId}`,
          {
            method: "GET",
            headers: {
              access: accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Validation response:", response); // 디버깅 로그

        if (!response.ok) {
          throw new Error("Failed to validate user");
        }

        const { isAuthor } = await response.json();
        console.log("isAuthor value:", isAuthor); // 디버깅 로그
        setIsAuthor(isAuthor);
      } catch (error) {
        console.error("Error validating user:", error);
      }
    };

    validateUser();
  }, [postId]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(
          `https://dekku.co.kr/api/deskterior-post/${params.id}?isRender=false`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const responseData = await response.json();
        console.log("Comment data response:", responseData); // 디버깅 로그

        const postData = responseData.data;
        console.log("Fetched Post Data for Comments:", postData);

        if (postData && postData.comments) {
          setCommentStatus(postData);
        } else {
          console.error("No comments found in postData");
        }
      } catch (error) {
        console.log("Error fetching comments: ", error);
      }
    };

    fetchComment();
  }, [commentChangeTrigger]);

  const handleCommentSubmit = async () => {
    try {
      if (comment.length === 0 || comment.length > 50) {
        alert("댓글은 1자 이상 50자 이하로 작성해 주세요.");
        return;
      }

      const accessToken = window.localStorage.getItem("access");
      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const response = await fetch(
        `https://dekku.co.kr/api/comments/${postId}`,
        {
          method: "POST",
          headers: {
            access: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const newComment = await response.json();
      console.log("Comment created successfully:", newComment);

      // 댓글 상태를 즉시 업데이트
      setCommentStatus((prevState) => ({
        ...prevState,
        comments: [...prevState.comments, newComment],
        commentCount: prevState.commentCount + 1,
      }));

      // 댓글 입력 창을 초기화
      setComment("");

    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const response = await fetch(
          `https://dekku.co.kr/api/deskterior-post/${params.id}?isRender=false`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const responseData = await response.json();
        console.log("Like data response:", responseData); // 디버깅 로그
        const postData = responseData.data;
        console.log("Fetched Post Data for Likes:", postData); // 디버깅 로그
        setLikeStatus(postData);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchLike();
  }, [likeChangeTrigger]);

  useEffect(() => {
    console.log("Fetching post details with postId:", postId); // 디버깅 로그
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://dekku.co.kr/api/deskterior-post/${params.id}?isRender=true`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const responseData = await response.json();
        const postData = responseData.data;

        console.log("Fetched Post Data:", postData); // 디버깅 로그

        setData(postData);
        setEditedData(postData);
        console.log("deskteriorPostImages:", postData.deskteriorPostImages);  // 배열 전체를 로그로 출력

        const foundJsonUrl = postData.deskteriorPostImages.find((url) =>
          url.includes(".json")
        );
        if (foundJsonUrl) {
          console.log("Found JSON URL:", foundJsonUrl); // 디버깅 로그
          setJsonUrl(foundJsonUrl);
        } else {
          console.log("No JSON URL found in deskteriorPostImages"); // 디버깅 로그
          setJsonUrl(null); // jsonUrl을 찾지 못하면 null로 설정
        }

        setIsAuthor(postData.isAuthor);
        console.log("Is Author:", postData.isAuthor); // 디버깅 로그

        if (postId > 1) {
          const prevResponse = await fetch(
            `https://dekku.co.kr/api/deskterior-post/${
              postId - 1
            }?isRender=false`
          );
          if (prevResponse.ok) {
            const prevData = await prevResponse.json();
            console.log("Previous Post Data:", prevData); // 디버깅 로그
            setPrevPostData(prevData);
          }
        }

        const nextResponse = await fetch(
          `https://dekku.co.kr/api/deskterior-post/${postId + 1}?isRender=false`
        );
        if (nextResponse.ok) {
          const nextResponseData = await nextResponse.json();
          console.log("Next Post Data:", nextResponseData); // 디버깅 로그
          setNextPostData(nextResponseData);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleLoadModelClick = () => {
    console.log("JSON URL:", jsonUrl); // 디버깅 로그

    if (jsonUrl) {
      router.push(`/threeD?jsonUrl=${encodeURIComponent(jsonUrl)}`);
    } else {
      console.error("No JSON URL found for this post.");
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true); // 수정 모드 활성화
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://dekku.co.kr/api/deskterior-post/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access: localStorage.getItem("access"),
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setData(updatedData);
        setIsEditMode(false); // 수정 모드 비활성화
      } else {
        console.error("Failed to save post.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteComment = async (commentId, memberId) => {
    try {
      const accessToken = window.localStorage.getItem("access");
      if (!accessToken) {
        console.log("No access token");
        return;
      }

      const getId = await fetch(`https://dekku.co.kr/api/users/info`, {
        method: "GET",
        headers: {
          access: accessToken,
        },
      });
      const getIdData = await getId.json();
      const nowId = getIdData.id;

      if (nowId !== memberId) {
        alert("자신의 댓글만 지울 수 있습니다.");
        return;
      }

      const response = await fetch(
        `https://dekku.co.kr/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            access: accessToken,
          },
        }
      );

      if (response.ok) {
        setCommentStatus((prevState) => ({
          ...prevState,
          comments: prevState.comments.filter(
            (comment) => comment.id !== commentId
          ),
          commentCount: prevState.commentCount - 1,
        }));
      } else {
        console.error("Failed to delete comment.");
      }
    } catch (error) {
      console.log("Error delete comment: ", error);
    }
  };

  if (!data) {
    return <p>게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          {isEditMode ? (
            <input
              type="text"
              name="title"
              value={editedData.title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            />
          ) : (
            data.title
          )}
        </h1>
        <h3 className="text-gray-500 mb-4">
          {new Date(data.createdAt).toLocaleDateString()}
        </h3>

        <div className="flex justify-center mb-6">
          <img
            src={data.deskteriorPostImages[0]}
            alt={data.title}
            className="w-1/2 h-auto rounded-md object-cover"
          />
        </div>

        <div className="text mb-10">
          {isEditMode ? (
            <textarea
              name="content"
              value={editedData.content}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2 h-32"
            />
          ) : (
            data.content
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">제품 내용</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(data?.deskteriorPostProductInfos ?? []).map((product, index) => (
            <div
              key={index}
              className="rounded-md flex flex-col items-center justify-center"
            >
              <img src={product.imageUrl} className="w-auto" />
              <div>{product.name}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mb-4 text-gray-600 space-x-4">
          <div className="flex items-center space-x-2">
            <img src="/view.svg" alt="views" className="w-5 h-5" />
            <span>{data.viewCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LikeButton
              toPostId={postId}
              setLikeChangeTrigger={setLikeChangeTrigger}
            />
            <span>{likeStatus.likeCount}</span>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 mb-4" />

        <div className="flex items-center justify-between mb-4">
          <Link href={`/users/${data.memberId}`} className="flex ">
            <img
              src={data.memberImage}
              alt={data.memberNickName}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex items-center">
              <div className="font-semibold text-lg">
                {data.memberNickName}
              </div>
            </div>
          </Link>
          <div className="ml-4">
            <FollowButton toMemberId={data.memberId} />
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 mb-4" />

        <div className="mb-4">댓글 : {commentStatus.commentCount}개</div>

        <div className="bg-gray-100 p-4 rounded-md mb-4 space-y-2">
          {commentStatus.comments.map((comment) => (
            <div key={comment.id} className="flex">
              <button
                onClick={() =>
                  handleDeleteComment(comment.id, comment.memberId)
                }
                className="mr-2"
              >
                &#x2715;
              </button>
              <img
                src={comment.memberImageUrl}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="w-12 truncate mr-2">
                {comment.memberNickname}
              </span>
              <span className="w-[48rem]">{comment.content}</span>
            </div>
          ))}
          <div className="comment-section">
            <textarea
              className="border rounded p-2 w-full my-2"
              placeholder="댓글을 작성하세요"
              rows={1}
              value={comment}
              onChange={handleCommentChange}
            ></textarea>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                handleCommentSubmit();
                setComment("");
                setCommentChangeTrigger((prev) => !prev);
              }}
            >
              댓글 작성
            </button>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 mb-4" />

        {isAuthor ? (
          <div className="flex justify-end space-x-4 mb-6">
            {isEditMode ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleSaveClick}
              >
                저장하기
              </button>
            ) : (
              <>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleEditClick}
                >
                  수정하기
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  onClick={handleLoadModelClick}
                >
                  3D 모델 수정
                </button>
              </>
            )}
          </div>
        ) : (
          jsonUrl && (
            <div className="text-center mb-6">
              <button
                onClick={handleLoadModelClick}
                className="bg-green-500 text-white px-6 py-2 rounded-md"
              >
                불러오기
              </button>
            </div>
          )
        )}

        <h2 className="text-xl font-bold mb-4">다른 게시물</h2>
        <div className="flex justify-evenly">
          {prevPostData && (
            <div className="">
              <DeskSetupCard
                key={postId - 1}
                postId={postId - 1}
                data={prevPostData.data}
              />
              <p className="text-center mt-2 font-bold text-gray-600">
                이전 게시물
              </p>
            </div>
          )}
          {nextPostData && (
            <div className="">
              <DeskSetupCard
                key={postId + 1}
                postId={postId + 1}
                data={nextPostData.data}
              />
              <p className="text-center mt-2 font-bold text-gray-600">
                다음 게시물
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
