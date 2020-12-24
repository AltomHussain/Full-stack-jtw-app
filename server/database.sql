CREATE DATABASE jwttutorial;
--I will need to intall the uuid in the db later
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--inset fake users

INSERT INTO users(user_name, user_email, user_password) VALUES('Altom', 'altom@gmail.com', '123');