-- This is an empty migration.

CREATE OR REPLACE FUNCTION names_notify()
	RETURNS trigger AS
$$
BEGIN
	PERFORM pg_notify('people.' || NEW.channel, '{"name": "' || NEW.name || '"}');
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER names_update
	AFTER INSERT OR UPDATE OF name
	ON "public"."People"
	FOR EACH ROW
EXECUTE PROCEDURE names_notify(); 