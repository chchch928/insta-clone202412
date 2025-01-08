package com.example.instagramclone.repository;

import com.example.instagramclone.domain.hashtag.entity.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberRepository {

    // 회원정보생성
    void insert(Member member);
}
