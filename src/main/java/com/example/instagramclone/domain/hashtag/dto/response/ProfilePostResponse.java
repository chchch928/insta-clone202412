package com.example.instagramclone.domain.hashtag.dto.response;

import lombok.*;

// 프로필 페이지에 3열 피드 레이아웃 렌더링을 위한 데이터
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfilePostResponse {

    private Long id; // 피드 상세보기를 위한 id값
    // Long은 기본값이 null long은 기본값이 0
    private String mainThumbnail; // 피드 대표 이미지
    private long likeCount; // 좋아요수
    private long commentCount; // 댓글 수
}
