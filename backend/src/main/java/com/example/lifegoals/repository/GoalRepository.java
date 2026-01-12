package com.example.lifegoals.repository;

import com.example.lifegoals.model.Goal;
import com.example.lifegoals.model.GoalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByStatus(GoalStatus status);
}
