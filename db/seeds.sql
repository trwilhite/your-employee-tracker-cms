INSERT INTO departments (name)
VALUES
('Management'),
('Reception'),
('Scare Floor'),
('Maintenance');

INSERT INTO roles (title, salary, department_id)
VALUES
('CEO', 150000, 1),
('Manager', 90000, 1),
('Receptionist', 45000, 2),
('Bookkeeper', 50000, 2),
('Scarer', 75000, 3),
('Assistant', 45000, 3),
('Janitor', 40000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Henry', 'Waternoose', 1, NULL),
('Jerry', 'Slugworth', 2, NULL),
('Ms.', 'Flint', 2, NULL),
('Celia', 'Mae', 3, 1),
('Roz', 'Slugton', 4, 1),
('James', 'Sullivan', 5, 2),
('Mike', 'Wazowski', 5, 2),
('Randall', 'Boggs', 5, 2),
('George', 'Sanderson', 5, 2),
('Pete', 'Ward', 5, 2),
('Fungus', 'Shroom', 6, 8),
('Charlie', 'Proctor', 6, 9),
('Betty', 'White', 6, 10),
('Waxford', 'Jones', 6, 7),
('Needleman', 'Sewn', 7, 3),
('Smitty', 'Conway', 7, 3);