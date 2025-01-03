package com.example.instagramclone.domain.post.dto.response;

/*
    {
        "feed_id" : 27,
        "content" : "ddddfdsa",
        "writer" : "fdsafd",
        "images" : [
            {
                "image_id":32,
                "image_url" : "/uploads/fdsafdsafdfdsa.jpg
                "imageOrder":2

            }
                   ]
    }
* */

import com.example.instagramclone.domain.post.entity.PostImage;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {

    @JsonProperty("feed_id")
    private Long id;
    private String content;
    private String writer;
    private List<PostImage> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
