package com.example.instagramclone.domain.hashtag.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostHashtag {

    private Long id;
    private Long postId;
    private Long hashtagId;
    private LocalDateTime createdAt ;
}
