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
public class PostHashTag {

    private Long id;
    private Long postId;
    private Long hashTagId;
    private LocalDateTime createdAt ;
}
