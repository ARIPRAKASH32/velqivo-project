package com.velqivo.controller;

import com.velqivo.model.Decision;
import com.velqivo.service.DecisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// CORS open for now so the React frontend AND Zoho Cliq's invokeurl can both call this.
// Tighten this (allowedOrigins) once you deploy to AWS.
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/decisions")
public class DecisionController {

    @Autowired
    private DecisionService decisionService;

    // Called by: Cliq Message Action + Slash Command, and the React "create" form
    @PostMapping
    public ResponseEntity<Decision> createDecision(@RequestBody Decision decision) {
        Decision saved = decisionService.createDecision(decision);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Called by: React dashboard list view
    @GetMapping
    public ResponseEntity<List<Decision>> getAllDecisions() {
        return ResponseEntity.ok(decisionService.getAllDecisions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Decision> getDecisionById(@PathVariable Long id) {
        return decisionService.getDecisionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Called by: Cliq "@VELQIVO search <keyword>" bot mention handler, and React search bar
    @GetMapping("/search")
    public ResponseEntity<List<Decision>> search(@RequestParam String q) {
        return ResponseEntity.ok(decisionService.searchDecisions(q));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Decision>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(decisionService.getByStatus(status));
    }

    @GetMapping("/owner/{owner}")
    public ResponseEntity<List<Decision>> getByOwner(@PathVariable String owner) {
        return ResponseEntity.ok(decisionService.getByOwner(owner));
    }

    // Called by: React dashboard when a PM updates status (Open -> In Progress -> Done)
    @PatchMapping("/{id}/status")
    public ResponseEntity<Decision> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Decision updated = decisionService.updateStatus(id, body.get("status"));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDecision(@PathVariable Long id) {
        decisionService.deleteDecision(id);
        return ResponseEntity.noContent().build();
    }
}
