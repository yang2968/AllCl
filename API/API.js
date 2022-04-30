
const mainURL = "http://13.209.75.70:8080";

export default {
    //
    // community-controller
    //
    // 게시물 리스트 조회 API
    async getPostingList() {
        const url = mainURL + "/community/post-list";
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("게시물 리스트 조회 에러", error);
            return 0;
        }
    },
    // 인기순 게시글 리스트 조회 API
    async getPopularPostingList() {
        const url = mainURL + "/community/post-list/populer/like";
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("인기 게시물 리스트 조회 에러", error);
            return 0;
        }
    },
    // 공자시항 리스트 조회 API
    async getNoticeList() {
        const url = mainURL + "/community/notice-list";
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("공지사항 리스트 조회 에러", error);
            return 0;
        }
    },
    // 게시글 조회 API
    async watchPost(post_index) {
        const url = mainURL + "/community/post?post_index=" + post_index;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("게시글 조회 에러", error);
            return 0;
        }
    },
    // 댓글 조회 API
    async watchComment(post_index) {
        const url = mainURL + "/community/comments?post_index=" + post_index;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("댓글 조회 에러", error);
            return 0;
        }
    },
    // 댓글 수정 API
    async modifyComment(comment, comment_index) {
        const url = mainURL + "/community/comments";
        try {
            const requestAuth = await fetch(url, {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "comment": comment,
                    "comment_index": comment_index
                })
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("댓글 수정 에러", error);
            return 0;
        }
    },
    // 댓글 삭제 API
    async deleteComment(comment_index) {
        const url = mainURL + "/community/comments?comment_index=" + comment_index;
        try {
            const requsetAuth = await fetch(url, {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("댓글 삭제 에러", error);
            return 0;
        }
    },
    // 게시글 좋아요 API
    async tabLike(nickname, post_index) {
        const url = mainURL + "/community/like";
        try {
            const requestAuth = await fetch(url, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nickname": nickname,
                    "post_index": post_index,
                })
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("게시글 좋아요 에러", error);
            return 0;
        }
    },
    // 게시글 작성 API
    async posting(nickname, header, body, image_path) {
        const url = mainURL + "/community/post";
        try {
            const requestAuth = await fetch(url, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nickname": nickname,
                    "header": header,
                    "body": body,
                    "image_path": image_path,
                })
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("게시글 작성 에러", error);
            return 0;
        }
    },
     // 게시글 수정 API
     async modifyPost(header, body, post_index) {
        const url = mainURL + "/community/post";
        try {
            const requestAuth = await fetch(url, {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "post_index": post_index,
                    "header": header,
                    "body": body,
                })
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("게시글 수정 에러", error);
            return 0;
        }
    },
     // 댓글 삭제 API
     async deleteComment(post_index) {
        const url = mainURL + "/community/post?post_index=" + post_index;
        try {
            const requsetAuth = await fetch(url, {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("댓글 삭제 에러", error);
            return 0;
        }
    },
    // 내가 작성한 게시글 리스트 조회 API
    async myPostList(nickname) {
        const url = mainURL + "/community/post-list/author?nickname=" + nickname;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("내가 작성한 게시글 리스트 조회 에러", error);
            return 0;
        }
    },
    // 내가 댓글단 게시글 리스트 조회 API
    async myCommentList(nickname) {
        const url = mainURL + "/community/post-list/commentByMyself?nickname=" + nickname;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("내가 작성한 게시글 리스트 조회 에러", error);
            return 0;
        }
    },





     // 게시글 제목+내용 검색 API
     async searchContent(content) {
        const url = mainURL + "/community/searchPostByContents?contents=" + content;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("게시글 제목+내용 검색 에러", error);
            return 0;
        }
    },
     // 게시글 작성자 검색 API
     async searchNickname(nickname) {
        const url = mainURL + "/community/searchPostByNickname?nickname=" + nickname;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("게시글 작성자 검색 에러", error);
            return 0;
        }
    },
    //
    // outdoor-controller
    //
    // 지도에 표시할 암장 리스트 조회 API
    async getLocations() {
        const url = mainURL + "/outdoor/location-list";
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("지도에 표시할 암장 리스트 조회 에러", error);
            return 0;
        }
    },
       // 암장 정보 조회 API
       async getLocationInfo(location_index) {
        const url = mainURL + "/outdoor/location?location_index=" + location_index;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("암장 정보 조회 API 에러", error);
            return 0;
        }
    },
    // check Image status
    async checkImageURL(URL) {
        try {
            const imageStatus = await fetch(URL, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                },
            });
            console.log("image Status : ", imageStatus.ok);
            return imageStatus.ok;
        } catch (error) {
            return error;
        }
    },
    // 루트 조회 API
    async getRouteInfo(location_index) {
        const url = mainURL + "/outdoor/route?location_index=" + location_index;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.json();
            return responseData;
        } catch (error) {
            console.log("루트 정보 조회 API 에러", error);
            return 0;
        }
    },
}