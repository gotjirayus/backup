CREATE TABLE subjectschedule(
    subject_schedule_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY, 
    institution_id uuid NOT NULL,
    semester_subject_id uuid NOT NULL,
    room_no CHARACTER VARYING(10),
    class_day CHARACTER VARYING(20),
    start_time TIME,
    end_time   TIME,
    created_date Timestamp,
    created_by_user CHARACTER VARYING(40) NOT NULL,
    created_by_program CHARACTER VARYING(40) NOT NULL,
    updated_date Timestamp,
    updated_by_user CHARACTER VARYING(40) NOT NULL,
    updated_by_program CHARACTER VARYING(40) NOT NULL,
    FOREIGN KEY (institution_id) REFERENCES institution(institution_id),
    FOREIGN KEY (semester_subject_id) REFERENCES samestersubject(semester_subject_id)
);

DROP TABLE subjectschedule ;