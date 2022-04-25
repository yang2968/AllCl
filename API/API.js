
const mainURL = "http://13.209.75.70:8080";

export default {
    // 게시물 리스트 조회
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
            // 에러 발생
            console.log("게시물 리스트 조회 에러", error);
            return 0;
        }
    },
}