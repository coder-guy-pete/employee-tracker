import pool from './db';

export const getEmployees = async (): Promise<{ id: number, first_name: string, last_name: string, title: string, department: string, salary: number, manager: string | null }[]> => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                department.name AS department, 
                role.salary, 
                CASE 
                    WHEN manager.id IS NOT NULL THEN CONCAT(manager.first_name, ' ', manager.last_name)
                    ELSE NULL
                END AS manager
            FROM employee 
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        `);
        return rows;
    } catch (error) {
        console.error("Error getting employees:", error);
        throw error;
    }
};

export const getManagers = async (): Promise<{ id: number, first_name: string, last_name: string }[]> => {
    try {
        const { rows } = await pool.query(`
            SELECT id, first_name, last_name
            FROM employee
            WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)
        `);
        return rows;
    } catch (error) {
        console.error("Error getting managers:", error);
        throw error;
    }
};

export const getEmployeesByManager = async (managerId: number): Promise<{ id: number, first_name: string, last_name: string, title: string, department: string, salary: number, manager: string | null }[]> => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                r.title, 
                d.name AS department, 
                r.salary, 
                CASE 
                    WHEN m.id IS NOT NULL THEN CONCAT(m.first_name, ' ', m.last_name)
                    ELSE NULL
                END AS manager
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            WHERE e.manager_id = $1
        `, [managerId]);
        return rows;
    } catch (error) {
        console.error("Error getting employees by manager:", error);
        throw error;
    }
};

export const getEmployeesByDepartment = async (departmentId: number): Promise<{ id: number, first_name: string, last_name: string, title: string, department: string, salary: number, manager: string | null }[]> => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                r.title, 
                d.name AS department, 
                r.salary, 
                CASE 
                    WHEN m.id IS NOT NULL THEN CONCAT(m.first_name, ' ', m.last_name)
                    ELSE NULL
                END AS manager
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            WHERE d.id = $1
        `, [departmentId]);
        return rows;
    } catch (error) {
        console.error("Error getting employees by department:", error);
        throw error;
    }
}

export const getRoles = async (): Promise<{ id: number, title: string, department: string, salary: number }[]> => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                role.id, 
                role.title, 
                department.name AS department, 
                role.salary
            FROM role
            JOIN department ON role.department = department.id
        `);
        return rows;
    } catch (error) {
        console.error("Error getting roles:", error);
        throw error;
    }
};

export const getDepartments = async (): Promise<{ id: number; name: string; budget: number | null}[]> => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                d.id, 
                d.name, 
                COALESCE(SUM(r.salary), 0) AS total_salary
            FROM department d
            LEFT JOIN role r ON d.id = r.department
            LEFT JOIN employee e ON r.id = e.role_id
            GROUP BY d.id, d.name
            ORDER BY d.id;
        `);
        return rows.map(row => ({
            id: row.id,
            name: row.name,
            budget: row.total_salary === 0 ? null : row.total_salary // Convert 0 to null
        }));
    } catch (error) {
        console.error("Error getting departments with total salaries:", error);
        throw error;
    }
};

export const addEmployee = async (firstName: string, lastName: string, roleId: number | null, managerId: number | null): Promise<void> => {
    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
};

export const addRole = async (title: string, salary: number, departmentId: number): Promise<void> => {
    try {
        await pool.query('INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    } catch (error) {
        console.error("Error adding role:", error);
        throw error;
    }
};

export const addDepartment = async (name: string): Promise<void> => {
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    } catch (error) {
        console.error("Error adding department:", error);
        throw error;
    }
};

export const updateEmployeeRole = async (employeeId: number, roleId: number): Promise<void> => {
    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    } catch (error) {
        console.error("Error updating employee role:", error);
        throw error;
    }
};

export const updateEmployeeManager = async (employeeId: number, managerId: number | null): Promise<void> => {
    try {
        await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId]);
    } catch (error) {
        console.error("Error updating employee manager:", error);
        throw error;
    }
}

export const deleteEmployee = async (employeeId: number | undefined): Promise<void> => {
    if (employeeId === undefined) {
        return;
    }
    try {
        await pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};

export const deleteRole = async (roleId: number | undefined): Promise<void> => {
    if (roleId === undefined) {
        return;
    }
    try {
        await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
    } catch (error) {
        console.error("Error deleting role:", error);
        throw error;
    }
}

export const deleteDepartment = async (departmentId: number | undefined): Promise<void> => {
    if (departmentId === undefined) {
        return;
    }
    try {
        await pool.query('DELETE FROM department WHERE id = $1', [departmentId]);
    } catch (error) {
        console.error("Error deleting department:", error);
        throw error;
    }
}