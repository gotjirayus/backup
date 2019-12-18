CREATE TABLE yearsemester(
    semester_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    institution_id uuid NOT NULL,
    year_semester CHARACTER VARYING(20),
    start_date DATE,
    end_date DATE,
    created_date Timestamp,
    created_by_user CHARACTER VARYING(40) NOT NULL,
    created_by_program CHARACTER VARYING(40) NOT NULL,
    updated_date Timestamp,
    updated_by_user CHARACTER VARYING(40) NOT NULL,
    updated_by_program CHARACTER VARYING(40) NOT NULL,
    FOREIGN KEY (institution_id) REFERENCES institution(institution_id)

);

DROP TABLE yearsemester ;