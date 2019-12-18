CREATE TABLE samestersubject(
    semester_subject_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    institution_id uuid NOT NULL,
    semester_id uuid NOT NULL,
    subject_id uuid NOT NULL,
    late_check BOOLEAN,
    allow_late_minute INTEGER,
    created_date Timestamp ,
    created_by_user CHARACTER VARYING(40) NOT NULL,
    created_by_program CHARACTER VARYING(40) NOT NULL,
    updated_date Timestamp,
    updated_by_user CHARACTER VARYING(40) NOT NULL,
    updated_by_program CHARACTER VARYING(40) NOT NULL,
    FOREIGN KEY (institution_id) REFERENCES institution(institution_id),
    FOREIGN KEY (semester_id) REFERENCES yearsemester(semester_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

DROP TABLE samestersubject;