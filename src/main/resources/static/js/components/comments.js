
import {fetchWithAuth} from "../util/api.js";

// 댓글 등록 요청 처리 (피드 목록 - 여러개의 입력, 상세보기 모달 - 하나의 입력)
export function createComment($form){

    // 렌더링 핼퍼 함수
    function renderAfterCreated({comment, commentCount}) {

        // 댓글이 작성되는 공간이 크게 피드 목록과 모달 내부가 있음.
        // 그런데 피드 목록에서 작성될 때는
        // 첫 댓글일 경우 '댓글 1개 보기'라는 버튼을 생성해야 함
        // 그리고 두번째 댓글부터는 '댓글 n개 보기'러 텍스트만 갱신함

        // 일단 현재 여기가 피드 목록인지 확인
        const $feed = $form.closest('.post');

        if($feed){
            if (commentCount === 1) {
                const $commentPreview = document.createElement('div');
                $commentPreview.classList.add('comments-preview');
                $commentPreview.innerHTML = `
            <button class="view-comments-button">
              댓글 1개 모두 보기
            </button>
        `;
                $form.before($commentPreview);
            } else {
                const $viewCommentsBtn = $feed.querySelector('.view-comments-button');
                $viewCommentsBtn.textContent = `댓글 ${commentCount}개 모두 보기`;
            }
        }
    }


    //===============================================//

    //피드 아이디 가져오기
    const postId = $form.closest('[data-post-id]')?.dataset.postId;

    // 댓글 입력창 가져오기
    const $commentInput = $form.querySelector('.comment-input');

    // 댓글 입력 버튼 가져오기
    const $commentSubmitBtn = $form.querySelector('.comment-submit-btn');

    //입력값 변경 시 활성화 여부 처리
    $commentInput.oninput = () => {
        // 0일 때 false, 0보다 크면 true

        const isValid = $commentInput.value.trim().length > 0;
        $commentSubmitBtn.disabled = !isValid;
    };

    // 댓글 생성 서버에 요청
    $form.onsubmit = async (e) => {
        e.preventDefault();

        // 입력한 댓글 읽어오기
        const content = $commentInput.value.trim();
        if(!content) return;

        const response = await fetchWithAuth(`api/posts/${postId}/comments`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content})
        });

        if(!response.ok){
            alert('댓글 생성에 실패했습니다');
            return;
        }

        const commentResponse = await response.json();

        // console.log(commentResponse);

        // 댓글 입력창을 비우고, 게시버튼 잠그기
        $commentInput.value = '';
        $commentSubmitBtn.disabled = true;

        // 후속 렌더링 처리
        renderAfterCreated(commentResponse);


    };



}