package com.velqivo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "decisions")
public class Decision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String decisionText;

    @Column(length = 2000)
    private String reason;

    private String approvedBy;

    private String owner;

    private String relatedTask;

    @Column(nullable = false)
    private String status = "OPEN"; // OPEN, IN_PROGRESS, DONE, REVERSED

    private String sourceChannel;

    @Column(length = 1000)
    private String sourceMessageLink;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Decision() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDecisionText() { return decisionText; }
    public void setDecisionText(String decisionText) { this.decisionText = decisionText; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }

    public String getRelatedTask() { return relatedTask; }
    public void setRelatedTask(String relatedTask) { this.relatedTask = relatedTask; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSourceChannel() { return sourceChannel; }
    public void setSourceChannel(String sourceChannel) { this.sourceChannel = sourceChannel; }

    public String getSourceMessageLink() { return sourceMessageLink; }
    public void setSourceMessageLink(String sourceMessageLink) { this.sourceMessageLink = sourceMessageLink; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
