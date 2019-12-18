CREATE TABLE calendar(
  calendar_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
  institution_id uuid NOT NULL,
  date DATE NOT NULL,
  description CHARACTER VARYING(20),
  created_date Timestamp ,
  created_by_user CHARACTER VARYING(40) NOT NULL,
  created_by_program CHARACTER VARYING(40) NOT NULL,
  updated_date Timestamp,
  updated_by_user CHARACTER VARYING(40) NOT NULL,
  updated_by_program CHARACTER VARYING(40) NOT NULL,
  FOREIGN KEY (institution_id) REFERENCES institution(institution_id)
);

DROP TABLE calendar;