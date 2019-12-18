CREATE TABLE subjectstudent (
    subject_student_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    institution_id uuid NOT NULL,
    semester_subject_id uuid NOT NULL,
    student_id uuid NOT NULL,
    created_date Timestamp,
    created_by_user CHARACTER VARYING(40) NOT NULL,
    created_by_program CHARACTER VARYING(40) NOT NULL,
    updated_date Timestamp,
    updated_by_user CHARACTER VARYING(40) NOT NULL,
    updated_by_program CHARACTER VARYING(40) NOT NULL, 
    FOREIGN KEY (institution_id) REFERENCES institution(institution_id),
    FOREIGN KEY (semester_subject_id) REFERENCES samestersubject(semester_subject_id),
    FOREIGN KEY (student_id) REFERENCES person(person_id)
);

DROP TABLE subjectstudent