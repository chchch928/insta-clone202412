package com.example.instagramclone.repository;
import com.example.instagramclone.domain.follow.entity.Follow;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
@Transactional
class FollowRepositoryTest {
    @Autowired
    FollowRepository followRepository;
    @BeforeEach // 테스트 실행전에 실행할 코드
    void before() {
        Follow f1 = Follow.builder().followingId(15L).followerId(16L).build();
        Follow f2 = Follow.builder().followingId(16L).followerId(17L).build();
        Follow f3 = Follow.builder().followingId(16L).followerId(15L).build();

        followRepository.insert(f1);
        followRepository.insert(f2);
        followRepository.insert(f3);

    }
    @Test
    @DisplayName("팔로우를 여부를 확인한다")
    void doesFollowExistTest() {
        //given
        Long followingId = 15L;
        Long followerId = 16L;
        //when
        boolean flag = followRepository.doesFollowExist(followerId, followingId);
        //then
        assertThat(flag).isTrue();
    }
    @Test
    @DisplayName("팔로워 수, 팔로잉 수를 확인한다.")
    void countTest() {
        //given
        Long targetUserId = 15L;
        //when
        long followerCount = followRepository.countFollowByType(targetUserId, "follower");
        long followingCount = followRepository.countFollowByType(targetUserId, "following");
        //then
        assertThat(followerCount).isEqualTo(2L);
        assertThat(followingCount).isEqualTo(3L);
    }
}