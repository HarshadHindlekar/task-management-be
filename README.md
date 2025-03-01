keep your post gre sql with respected cred

clone from this repo  → https://github.com/HarshadHindlekar/task-management-be

create .env file with this credential


PORT=3001

DB_NAME=task_management

# depends on your db cred
DB_USER=your_name
DB_PASSWORD=your_pass
DB_HOST=localhost
DB_PORT=your_port

run →” npm i” (if not works then “npm install”)

then → npm run dev 

this will create databases table automatically after running dev

- **Bonus Challenge:**

Add a trigger in PostgreSQL to

**automatically update status**

to "Overdue" if a task's due date passes.

for this fire this query  ->

CREATE OR REPLACE FUNCTION update_overdue_status()
RETURNS TRIGGER AS $$
BEGIN
IF NEW.due_date < NOW() AND NEW.status != 'Completed' THEN
NEW.status := 'Overdue';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_overdue
BEFORE INSERT OR UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_overdue_status();