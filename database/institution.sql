CREATE TABLE institution(
    institution_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    institution_code CHARACTER VARYING(10) NOT NULL,
    institution_name CHARACTER VARYING(40) NOT NULL,
    logo CHARACTER VARYING(100) NOT NULL,
    installation_code CHARACTER VARYING(100) NOT NULL,
    username CHARACTER VARYING(40) NOT NULL,
    password CHARACTER VARYING(100) NOT NULL,
    email CHARACTER VARYING(100) NOT NULL,
    preference_language CHARACTER(1) NOT NULL,
    created_date Timestamp,
    created_by_user CHARACTER VARYING(40) NOT NULL,
    created_by_program CHARACTER VARYING(40) NOT NULL,
    updated_date Timestamp,
    updated_by_user CHARACTER VARYING(40) NOT NULL,
    updated_by_program CHARACTER VARYING(40) NOT NULL
);

DROP TABLE institution;