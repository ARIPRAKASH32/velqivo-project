package com.velqivo.service;

import com.velqivo.model.Decision;
import com.velqivo.repository.DecisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DecisionService {

    @Autowired
    private DecisionRepository decisionRepository;

    public Decision createDecision(Decision decision) {
        return decisionRepository.save(decision);
    }

    public List<Decision> getAllDecisions() {
        return decisionRepository.findAll();
    }

    public Optional<Decision> getDecisionById(Long id) {
        return decisionRepository.findById(id);
    }

    public List<Decision> searchDecisions(String query) {
        return decisionRepository.search(query);
    }

    public List<Decision> getByStatus(String status) {
        return decisionRepository.findByStatus(status);
    }

    public List<Decision> getByOwner(String owner) {
        return decisionRepository.findByOwner(owner);
    }

    public Decision updateStatus(Long id, String status) {
        Decision decision = decisionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Decision not found: " + id));
        decision.setStatus(status);
        return decisionRepository.save(decision);
    }

    public void deleteDecision(Long id) {
        decisionRepository.deleteById(id);
    }
}
