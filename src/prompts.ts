import inquirer from 'inquirer';
import { getRoles, getEmployees, getDepartments, getManagers } from './queries';

export const mainMenu = async (): Promise<{ action: string }> => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Delete Employee',
                'Update Employee Role',
                'View Employees by Manager',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Delete Role',
                'View All Departments',
                'View Employees by Department',
                'Add Department',
                'Delete Department',
                'Quit'
            ],
        },
    ]);
};

export const promptAddEmployee = async (): Promise<{ firstName: string, lastName: string, roleId: number | null, managerId: number | null }> => {
    // Get the current roles and employees from the database
    const roles = await getRoles();
    const employees = await getEmployees();

    // Format roles for inquirer choices (to show names to the user)
    const roleChoices = roles.map((role: { id: number, title: string }) => ({
        name: role.title, // This is what will be displayed to the user (role names)
        value: role.id   // This is the actual role ID to be used internally
    }));

    // Format employees for manager choices (to show names to the user)
    const employeeChoices = employees.map((employee: { id: number, first_name: string, last_name: string }) => ({
        name: `${employee.first_name} ${employee.last_name}`, // This is what will be displayed to the user (employee names)
        value: employee.id as number | null // This is the actual employee ID, or null for no manager
    }));

    // Add option for no manager
    employeeChoices.push({ name: 'None', value: null });

    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name:',
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select employee role:',
            choices: roleChoices // Here the user sees role names, not IDs
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select employee manager:',
            choices: employeeChoices // Here the user sees employee names or "None"
        }
    ]);
};

export const promptAddRole = async (): Promise<{ title: string, salary: number, departmentId: number }> => {
    // Get the current departments from the database
    const departments = await getDepartments();

    // Format departments for inquirer choices (to show names to the user)
    const departmentChoices = departments.map((department: { id: number, name: string }) => ({
        name: department.name,
        value: department.id
    }));

    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter role salary:',
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select department:',
            choices: departmentChoices
        }
    ]);
}

export const promptAddDepartment = async (): Promise<{ name: string }> => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter department name:',
        }
    ]);
}

export const promptUpdateEmployeeRole = async (): Promise<{ employeeId: number, roleId: number }> => {
    // Get the current roles and employees from the database
    const roles = await getRoles();
    const employees = await getEmployees();

    // Format roles for inquirer choices (to show names to the user)
    const roleChoices = roles.map((role: { id: number, title: string }) => ({
        name: role.title,
        value: role.id
    }));

    // Format employees for inquirer choices (to show names to the user)
    const employeeChoices = employees.map((employee: { id: number, first_name: string, last_name: string }) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: `Which employee's role do you want to update?`,
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Which role do you want to assign to the selected employee?',
            choices: roleChoices
        }
    ]);
}

export const promptUpdateEmployeeManager = async (): Promise<{ employeeId: number, managerId: number | null }> => {
    // Get the current employees from the database
    const employees = await getEmployees();

    // Format employees for inquirer choices (to show names to the user)
    const employeeChoices = employees.map((employee: { id: number, first_name: string, last_name: string }) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id as number | null
    }));

    // Add option for no manager
    employeeChoices.push({ name: 'None', value: null });

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: `Which employee's manager do you want to update?`,
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select the new manager for the selected employee:',
            choices: employeeChoices
        }
    ]);
}

export const promptViewEmployeeByManager = async (): Promise<{ managerId: number }> => {
    // Get the current employees from the database
    const manager = await getManagers();

    // Format Managers for inquirer choices (to show names to the user)
    const managerChoices = manager.map((manager: { id: number, first_name: string, last_name: string }) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
    }));

    return inquirer.prompt([
        {
            type: 'list',
            name: 'managerId',
            message: 'Select a manager to view their direct reports:',
            choices: managerChoices
        }
    ]);
}

export const promptViewEmployeeByDepartment = async (): Promise<{ departmentId: number }> => {
    // Get the current departments from the database
    const departments = await getDepartments();

    // Format departments for inquirer choices (to show names to the user)
    const departmentChoices = departments.map((department: { id: number, name: string }) => ({
        name: department.name,
        value: department.id
    }));

    return inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view employees:',
            choices: departmentChoices
        }
    ]);
}

export const promptDeleteEmployee = async (): Promise<{ employeeId: number } | undefined> => {
    // Get the current employees from the database
    const employees = await getEmployees();

    // Format employees for inquirer choices (to show names to the user)
    const employeeChoices = employees.map((employee: { id: number | undefined, first_name: string, last_name: string }) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    // Add a cancel option
    employeeChoices.unshift({ name: 'Cancel', value: undefined });

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to delete:',
            choices: employeeChoices
        }
    ]);
};

export const promptDeleteRole = async (): Promise<{ roleId: number } | undefined> => {
    // Get the current roles from the database
    const roles = await getRoles();

    // Format roles for inquirer choices (to show names to the user)
    const roleChoices = roles.map((role: { id: number | undefined, title: string }) => ({
        name: role.title,
        value: role.id
    }));

    // Add a cancel option
    roleChoices.unshift({ name: 'Cancel', value: undefined });

    return inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Select a role to delete:',
            choices: roleChoices
        }
    ]);
}

export const promptDeleteDepartment = async (): Promise<{ departmentId: number } | undefined> => {
    // Get the current departments from the database
    const departments = await getDepartments();

    // Format departments for inquirer choices (to show names to the user)
    const departmentChoices = departments.map((department: { id: number | undefined, name: string }) => ({
        name: department.name,
        value: department.id
    }));

    // Add a cancel option
    departmentChoices.unshift({ name: 'Cancel', value: undefined });

    return inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to delete:',
            choices: departmentChoices
        }
    ]);
}