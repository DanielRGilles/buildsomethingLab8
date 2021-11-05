DROP TABLE IF EXISTS favorite_quotes;

CREATE TABLE favorite_quotes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote VARCHAR(512),
  character_name VARCHAR(512),
  favorite BOOLEAN
)