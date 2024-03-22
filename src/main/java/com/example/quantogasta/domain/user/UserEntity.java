package com.example.quantogasta.domain.user;


import com.example.quantogasta.domain.month.YearMonthEntity;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.*;

@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String email;
    private String password;
    private String username;
    private Instant createTime;

    @OneToMany(mappedBy = "user")
    private Set<YearMonthEntity> yearMonthList = new HashSet<>();

    public UserEntity(){
    }

    public UserEntity(UUID id, String email, String password, String username) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.createTime = Instant.now();
    }

    public UUID getId() {
        return id;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public Set<YearMonthEntity> getYearMonthList() {
        return yearMonthList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEntity that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
