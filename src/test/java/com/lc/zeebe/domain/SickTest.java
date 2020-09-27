package com.lc.zeebe.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lc.zeebe.web.rest.TestUtil;

public class SickTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sick.class);
        Sick sick1 = new Sick();
        sick1.setId(1L);
        Sick sick2 = new Sick();
        sick2.setId(sick1.getId());
        assertThat(sick1).isEqualTo(sick2);
        sick2.setId(2L);
        assertThat(sick1).isNotEqualTo(sick2);
        sick1.setId(null);
        assertThat(sick1).isNotEqualTo(sick2);
    }
}
