package com.lc.zeebe.web.rest;

import com.lc.zeebe.ZeebeApp;
import com.lc.zeebe.domain.Sick;
import com.lc.zeebe.repository.SickRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SickResource} REST controller.
 */
@SpringBootTest(classes = ZeebeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SickResourceIT {

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    private static final Integer DEFAULT_DAYS = 1;
    private static final Integer UPDATED_DAYS = 2;

    private static final Long DEFAULT_JOB_KEY = 1L;
    private static final Long UPDATED_JOB_KEY = 2L;

    @Autowired
    private SickRepository sickRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSickMockMvc;

    private Sick sick;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sick createEntity(EntityManager em) {
        Sick sick = new Sick()
            .reason(DEFAULT_REASON)
            .days(DEFAULT_DAYS)
            .jobKey(DEFAULT_JOB_KEY);
        return sick;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sick createUpdatedEntity(EntityManager em) {
        Sick sick = new Sick()
            .reason(UPDATED_REASON)
            .days(UPDATED_DAYS)
            .jobKey(UPDATED_JOB_KEY);
        return sick;
    }

    @BeforeEach
    public void initTest() {
        sick = createEntity(em);
    }

    @Test
    @Transactional
    public void createSick() throws Exception {
        int databaseSizeBeforeCreate = sickRepository.findAll().size();
        // Create the Sick
        restSickMockMvc.perform(post("/api/sicks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sick)))
            .andExpect(status().isCreated());

        // Validate the Sick in the database
        List<Sick> sickList = sickRepository.findAll();
        assertThat(sickList).hasSize(databaseSizeBeforeCreate + 1);
        Sick testSick = sickList.get(sickList.size() - 1);
        assertThat(testSick.getReason()).isEqualTo(DEFAULT_REASON);
        assertThat(testSick.getDays()).isEqualTo(DEFAULT_DAYS);
        assertThat(testSick.getJobKey()).isEqualTo(DEFAULT_JOB_KEY);
    }

    @Test
    @Transactional
    public void createSickWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sickRepository.findAll().size();

        // Create the Sick with an existing ID
        sick.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSickMockMvc.perform(post("/api/sicks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sick)))
            .andExpect(status().isBadRequest());

        // Validate the Sick in the database
        List<Sick> sickList = sickRepository.findAll();
        assertThat(sickList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSicks() throws Exception {
        // Initialize the database
        sickRepository.saveAndFlush(sick);

        // Get all the sickList
        restSickMockMvc.perform(get("/api/sicks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sick.getId().intValue())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON)))
            .andExpect(jsonPath("$.[*].days").value(hasItem(DEFAULT_DAYS)))
            .andExpect(jsonPath("$.[*].jobKey").value(hasItem(DEFAULT_JOB_KEY.intValue())));
    }
    
    @Test
    @Transactional
    public void getSick() throws Exception {
        // Initialize the database
        sickRepository.saveAndFlush(sick);

        // Get the sick
        restSickMockMvc.perform(get("/api/sicks/{id}", sick.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sick.getId().intValue()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON))
            .andExpect(jsonPath("$.days").value(DEFAULT_DAYS))
            .andExpect(jsonPath("$.jobKey").value(DEFAULT_JOB_KEY.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSick() throws Exception {
        // Get the sick
        restSickMockMvc.perform(get("/api/sicks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSick() throws Exception {
        // Initialize the database
        sickRepository.saveAndFlush(sick);

        int databaseSizeBeforeUpdate = sickRepository.findAll().size();

        // Update the sick
        Sick updatedSick = sickRepository.findById(sick.getId()).get();
        // Disconnect from session so that the updates on updatedSick are not directly saved in db
        em.detach(updatedSick);
        updatedSick
            .reason(UPDATED_REASON)
            .days(UPDATED_DAYS)
            .jobKey(UPDATED_JOB_KEY);

        restSickMockMvc.perform(put("/api/sicks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSick)))
            .andExpect(status().isOk());

        // Validate the Sick in the database
        List<Sick> sickList = sickRepository.findAll();
        assertThat(sickList).hasSize(databaseSizeBeforeUpdate);
        Sick testSick = sickList.get(sickList.size() - 1);
        assertThat(testSick.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testSick.getDays()).isEqualTo(UPDATED_DAYS);
        assertThat(testSick.getJobKey()).isEqualTo(UPDATED_JOB_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingSick() throws Exception {
        int databaseSizeBeforeUpdate = sickRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSickMockMvc.perform(put("/api/sicks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sick)))
            .andExpect(status().isBadRequest());

        // Validate the Sick in the database
        List<Sick> sickList = sickRepository.findAll();
        assertThat(sickList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSick() throws Exception {
        // Initialize the database
        sickRepository.saveAndFlush(sick);

        int databaseSizeBeforeDelete = sickRepository.findAll().size();

        // Delete the sick
        restSickMockMvc.perform(delete("/api/sicks/{id}", sick.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sick> sickList = sickRepository.findAll();
        assertThat(sickList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
