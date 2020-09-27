package com.lc.zeebe.web.rest;

import com.lc.zeebe.domain.Sick;
import com.lc.zeebe.repository.SickRepository;
import com.lc.zeebe.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lc.zeebe.domain.Sick}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SickResource {

    private final Logger log = LoggerFactory.getLogger(SickResource.class);

    private static final String ENTITY_NAME = "sick";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SickRepository sickRepository;

    public SickResource(SickRepository sickRepository) {
        this.sickRepository = sickRepository;
    }

    /**
     * {@code POST  /sicks} : Create a new sick.
     *
     * @param sick the sick to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sick, or with status {@code 400 (Bad Request)} if the sick has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sicks")
    public ResponseEntity<Sick> createSick(@RequestBody Sick sick) throws URISyntaxException {
        log.debug("REST request to save Sick : {}", sick);
        if (sick.getId() != null) {
            throw new BadRequestAlertException("A new sick cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sick result = sickRepository.save(sick);
        return ResponseEntity.created(new URI("/api/sicks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sicks} : Updates an existing sick.
     *
     * @param sick the sick to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sick,
     * or with status {@code 400 (Bad Request)} if the sick is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sick couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sicks")
    public ResponseEntity<Sick> updateSick(@RequestBody Sick sick) throws URISyntaxException {
        log.debug("REST request to update Sick : {}", sick);
        if (sick.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sick result = sickRepository.save(sick);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sick.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sicks} : get all the sicks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sicks in body.
     */
    @GetMapping("/sicks")
    public List<Sick> getAllSicks() {
        log.debug("REST request to get all Sicks");
        return sickRepository.findAll();
    }

    /**
     * {@code GET  /sicks/:id} : get the "id" sick.
     *
     * @param id the id of the sick to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sick, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sicks/{id}")
    public ResponseEntity<Sick> getSick(@PathVariable Long id) {
        log.debug("REST request to get Sick : {}", id);
        Optional<Sick> sick = sickRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sick);
    }

    /**
     * {@code DELETE  /sicks/:id} : delete the "id" sick.
     *
     * @param id the id of the sick to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sicks/{id}")
    public ResponseEntity<Void> deleteSick(@PathVariable Long id) {
        log.debug("REST request to delete Sick : {}", id);
        sickRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
