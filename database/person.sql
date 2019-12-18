CREATE TABLE person(
    person_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    institution_id uuid NOT NULL,
    person_code CHARACTER VARYING(20) NOT NULL,
    prefix_of_name CHARACTER VARYING(20),
    first_name CHARACTER VARYING(40),
    last_name CHARACTER VARYING(40),
    type CHARACTER VARYING(1) NOT NULL,
    mobile_phone_no CHARACTER VARYING(20),
    email CHARACTER VARYING(100),
    line_token CHARACTER VARYING(100),
    created_date Timestamp,
    created_by_user CHARACTER VARYING(40) NOT NULL,
    created_by_program CHARACTER VARYING(40) NOT NULL,
    updated_date Timestamp,
    updated_by_user CHARACTER VARYING(40) NOT NULL,
    updated_by_program CHARACTER VARYING(40) NOT NULL,  
    FOREIGN KEY (institution_id) REFERENCES institution(institution_id) 
);       -- create database

DROP TABLE person;