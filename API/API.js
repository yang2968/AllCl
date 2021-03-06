
const mainURL = "http://13.209.75.70:8080";
//const testURL = "http://116.90.217.224:8080";

export default {
    //
    // home
    //
       // 완등한 루트 조회 API
       async getUserClearRoute(location_index, user_index) {
        const url = mainURL + "/outdoor/route/clear?location_index=" + location_index + "&user_index=" + user_index;
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
            console.log("완등한 루트 조회 API 에러", error);
            return 0;
        }
    },
    // 완등한 문제가 있는 암장 리스트 조회 API
    async getUserClearClimbing(user_index) {
        const url = mainURL + "/outdoor/location-list/clear?user_index=" + user_index;
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
            console.log("완등한 문제가 있는 암장 리스트 조회 에러", error);
            return 0;
        }
    },
    // 유저가 완등한 전체 루트 조회 API
    async getUserClearAllRoute(user_index) {
        const url = mainURL + "/outdoor/route/clear-all?user_index=" + user_index;
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
            console.log("유저가 완등한 전체 루트 조회 에러", error);
            return 0;
        }
    },
    // 해당 유저가 완등한 루트 개수 API
    async getUserClearRouteCount(user_index) {
        const url = mainURL + "/outdoor/route/count?user_index=" + user_index;
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
            console.log("해당 유저가 완등한 루트 개수 에러", error);
            return 0;
        }
    },
    // 해당 유저가 완등한 암벽장 별 루트 개수 API
    async getUserClearRouteInClimbing(user_index) {
        const url = mainURL + "/outdoor/route/countGroupByLocation?user_index=" + user_index;
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
            console.log("해당 유저가 완등한 암벽장 별 루트 개수 에러", error);
            return 0;
        }
    },
    // 완등한 루트 난이도 평균 API
    async getUserClearRouteInAvg(user_index) {
        const url = mainURL + "/outdoor/route/diffAVG?user_index=" + user_index;
        try {
            const requsetAuth = await fetch(url, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await requsetAuth.text();
            return responseData;
        } catch (error) {
            console.log("완등한 루트 난이도 평균 에러", error);
            return 0;
        }
    },

    //
    // community-controller
    //
    // 게시물 리스트 조회 API
    async getPostingList(nickname) {
        const url = mainURL + "/community/post-list?nickname=" + nickname;
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
    // 댓글 많은순 게시글 리스트 조회 API
    async getCommentsPostingList(nickname) {
        const url = mainURL + "/community/post-list/populer/comments?nickname=" + nickname;
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
    // 인기순 게시글 리스트 조회 API
    async getPopularPostingList(nickname) {
        const url = mainURL + "/community/post-list/populer/like?nickname=" + nickname;
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
    // 공지사항 리스트 조회 API
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
    // 공지사항 조회 API
    async watchNotice(notice_index) {
        const url = mainURL + "/community/post?post_index=" + notice_index;
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
            console.log("공지사항 조회 에러", error);
            return 0;
        }
    },
    // 게시글 조회 API
    async watchPost(post_index, nickname) {
        const url = mainURL + "/community/post?post_index=" + post_index + "&nickname=" + nickname;
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
    // 댓글 작성 API
    async writeComment(nickname, comment, post_index) {
        const url = mainURL + "/community/comments";
        try {
            const requestAuth = await fetch(url, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nickname": nickname,
                    "comment": comment,
                    "post_index": post_index
                })
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("댓글 수정 에러", error);
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
    async deleteComment(post_index, comment_index) {
        const url = mainURL + "/community/comments";
        try {
            const requestAuth = await fetch(url, {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "post_index": post_index,
                    "comment_index": comment_index,
                })
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("댓글 삭제 에러", error);
            return 0;
        }
    },
    // 답글 조회 API
    async watchReply(post_index) {
        const url = mainURL + "/community/reply?post_index=" + post_index;
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
            console.log("답글 조회 에러", error);
            return 0;
        }
    },
    // 답글 삭제 API
    async deleteCommentReply(post_index, idx) {
        const url = mainURL + "/community/reply";
        try {
            const requestAuth = await fetch(url, {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "post_index": post_index,
                    "idx": idx,
                })
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("답글 삭제 에러", error);
            return 0;
        }
    },
    // 댓글에 대한 답글 작성 API
    async writeReply(nickname, post_index, comment_index, reply) {
        const url = mainURL + "/community/reply";
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
                    "comment_index": comment_index,
                    "reply": reply
                })
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("댓글에 대한 답글 작성 에러", error);
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
    // 게시글 이미지 조회 API
    async getPostImage(post_index) {
        const url = mainURL + "/community/postImage?post_index=" + post_index;
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
            console.log("게시글 이미지 조회 에러", error);
            return 0;
        }
    },
    // 게시글 이미지 업로드 API
    async uploadImage(files) {
        const url = mainURL + "/community/postImage";
        const formData = new FormData();
        if (files.length != 0) {
            for(var key in files) {
                formData.append("files", {
                    uri: files[key].uri,
                    name: files[key].fileName,
                    type: files[key].type
                });
            }
            console.log(formData._parts);
            console.log(formData);
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const responseJson = await res.json();
                console.log(responseJson);

                return [responseJson];
            } catch (error) {
                console.log("게시글 이미지 업로드 에러", error);
                return 0;
            }
        } else {
            console.log("이미지 확인 필요");
        }
    },

    // 게시글 작성 API
    async posting(nickname, header, body, isImage) {
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
                    "isImage": isImage,
                    // "image_path": image_path,
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
    async modifyPost(post_index, header, body) {
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
    // 게시글 삭제 API
    async deletePost(post_index) {
        const url = mainURL + "/community/post?post_index=" + post_index;
        try {
            const requestAuth = await fetch(url, {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("게시글 삭제 에러", error);
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
    async getLocationInfo(location_index, user_index) {
        const url = mainURL + "/outdoor/location?location_index=" + location_index + "&user_index=" + user_index;
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
    async getRouteInfo(location_index, user_index) {
        const url = mainURL + "/outdoor/route?location_index=" + location_index + "&user_index=" + user_index;
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
    // 난이도순 루트 조회 API
    async getDifficultyRouteInfo(location_index, user_index) {
        const url = mainURL + "/outdoor/route/difficulty?location_index=" + location_index + "&user_index=" + user_index;
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
            console.log("난이도순 루트 조회 API 에러", error);
            return 0;
        }
    },
    // 인기순 루트 조회 API
    async getPopularRouteInfo(location_index, user_index) {
        const url = mainURL + "/outdoor/route/populer?location_index=" + location_index + "&user_index=" + user_index;
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
            console.log("인기순 루트 조회 API 에러", error);
            return 0;
        }
    },
    // 루트에 대한 댓글 조회 API
    async getRouteComments(route_index) {
        const url = mainURL + "/outdoor/route/comments?route_index=" + route_index;
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
            console.log("루트에 대한 댓글 조회 API 에러", error);
            return 0;
        }
    },
    // 루트 완등 체크 API
    async routeClear(route_index, user_index) {
        const url = mainURL + "/outdoor/clear";
        try {
            const requestAuth = await fetch(url, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "route_index": route_index,
                    "user_index": user_index,
                })
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("루트 완등 체크 에러", error);
            return 0;
        }
    },
    // 루트 좋아요 API
    async routeLike(nickname, route_index) {
        const url = mainURL + "/outdoor/like";
        try {
            const requestAuth = await fetch(url, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nickname": nickname,
                    "route_index": route_index,
                })
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("루트 좋아요 에러", error);
            return 0;
        }
    },
    // 루트에 대한 댓글 작성 API
    async writeRouteComment(route_index, nickname, comment) {
        const url = mainURL + "/outdoor/comments";
        try {
            const requestAuth = await fetch(url, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "route_index": route_index,
                    "nickname": nickname,
                    "comment": comment,
                })
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("루트에 대한 댓글 작성 에러", error);
            return 0;
        }
    },
    // 루트에 대한 댓글 삭제 API
    async deleteRouteComment(idx) {
        const url = mainURL + "/outdoor/comments?idx=" + idx;
        try {
            const requestAuth = await fetch(url, {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("루트에 대한 댓글 삭제 에러", error);
            return 0;
        }
    },
    // 암장에 대한 평점 작성 API
    async createScore(user_index, location_index, score) {
        const url = mainURL + "/outdoor/score";
        try {
            const requestAuth = await fetch(url, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_index": user_index,
                    "location_index": location_index,
                    "score": score,
                })
            })

            const responseData = await requestAuth.json();

            return [responseData];
        } catch (error) {
            console.log("암장에 대한 평점 작성 에러", error);
            return 0;
        }
    },
    // 암장에 대한 평점 수정 API
    async modifyScore(user_index, location_index, score) {
        const url = mainURL + "/outdoor/score";
        try {
            const requestAuth = await fetch(url, {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_index": user_index,
                    "location_index": location_index,
                    "score": score,
                })
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("암장에 대한 평점 수정 에러", error);
            return 0;
        }
    },
    // 암장에 대한 평점 삭제 API
    async deleteScore(user_index, location_index) {
        const url = mainURL + "/outdoor/score";
        try {
            const requestAuth = await fetch(url, {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_index": user_index,
                    "location_index": location_index,
                })
            })
            const responseData = await requestAuth.json();
            return [responseData];
        } catch (error) {
            console.log("암장에 대한 평점 삭제 에러", error);
            return 0;
        }
    },
}