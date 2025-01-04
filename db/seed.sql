INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department)
VALUES
    ('Software Engineer', 100000, 1),
    ('Sales Lead', 80000, 2),
    ('Accountant', 75000, 3),
    ('Lawyer', 120000, 4),
    ('HR Manager', 80000, 1),
    ('Salesperson', 60000, 2),
    ('Finance Manager', 85000, 3),
    ('Legal Team Lead', 125000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 2, 1),
    ('Charlie', 'Davis', 3, 1),
    ('David', 'Lee', 4, 3),
    ('Eve', 'Williams', 5, 3),
    ('Frank', 'Miller', 6, 2),
    ('Grace', 'Brown', 7, 3),
    ('Hannah', 'Wilson', 8, 4);