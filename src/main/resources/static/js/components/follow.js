
import { getPageUsername, isUserMatched } from "./profile-page.js";
import {fetchWithAuth} from "../util/api.js";

// 서버에 팔로우 토글 요청을 보내기
async function toggleFollow(){
    const followerName = getPageUsername();
    const response = await fetchWithAuth(`/api/follows/${followerName}`)

}
async function initFollowButton(){
    // 내 페이지에서는 팔로우를 처리를 진행하지 않음
    if(await isUserMatched()) return;
    // 팔로우 토글 기능
    // 팔로우 버튼에 이벤트 처리
    const $followButton = document.querySelector('.follow-button');

    $followButton.addEventListener('click',e =>{
        console.log('follow button clicked!')
    })
}

// 팔로우 관련 종합 처리 (팔로우 버튼 토글, 팔로우 모달 등)
function initFollow(){
    // console.log('init follow!')

    // 내 페이지에서는 팔로우 처리를 진행하지 않음

    // 팔로우 토글 기능
    toggleFollow();


}
export default initFollow;