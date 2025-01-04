import { displayHeader, displayTable } from './display';
import { mainMenu, promptAddEmployee, promptUpdateEmployeeRole, promptUpdateEmployeeManager, promptAddRole, promptAddDepartment, promptViewEmployeeByManager, promptViewEmployeeByDepartment, promptDeleteEmployee, promptDeleteRole, promptDeleteDepartment } from './prompts';
import { addEmployee, getEmployees,updateEmployeeRole, updateEmployeeManager, getEmployeesByManager, getEmployeesByDepartment, addRole, getRoles, addDepartment, getDepartments, deleteEmployee, deleteRole, deleteDepartment } from './queries';

const startApp = async (): Promise<void> => {
    displayHeader();

    let exit = false;

    while (!exit) {
        const { action } = await mainMenu();

        switch (action) {
            case 'View All Employees':
                const employees = await getEmployees();
                displayTable(employees);
                break;
            case 'Add Employee':
                const employeeDetails = await promptAddEmployee();
                await addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
                console.log('Employee added successfully.');
                break;
            case 'Delete Employee':
                const employeeDeletionChoice = await promptDeleteEmployee();

                if (employeeDeletionChoice && employeeDeletionChoice.employeeId) {
                    try {
                        await deleteEmployee(employeeDeletionChoice.employeeId);
                        console.log('Employee deleted successfully.');
                    } catch (error) {
                    console.error("Error deleting employee:", error);
                    }
                } else {
                    console.log("Deletion cancelled.");
                }
                break;
            case 'Update Employee Role':
                const updateEmployeeDetails = await promptUpdateEmployeeRole();
                await updateEmployeeRole(updateEmployeeDetails.employeeId, updateEmployeeDetails.roleId);
                console.log('Employee role updated successfully.');
                break;
            case 'Update Employee Manager':
                const updateEmployeeManagerDetails = await promptUpdateEmployeeManager();
                await updateEmployeeManager(updateEmployeeManagerDetails.employeeId, updateEmployeeManagerDetails.managerId);
                console.log('Employee manager updated successfully.');
                break;
            case 'View Employees by Manager':
                const employeesByManagerDetails = await promptViewEmployeeByManager();
                const employeesByManager = await getEmployeesByManager(employeesByManagerDetails.managerId);
                displayTable(employeesByManager);
                break;
            case 'View All Roles':
                const roles = await getRoles();
                displayTable(roles);
                break;
            case 'Add Role':
                const roleDetails = await promptAddRole();
                await addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
                console.log('Role added successfully.');
                break;
            case 'Delete Role':
                const roleDeletionChoice = await promptDeleteRole();
                if (roleDeletionChoice && roleDeletionChoice.roleId) {
                    try {
                        await deleteRole(roleDeletionChoice.roleId);
                        console.log('Role deleted successfully.');
                    } catch (error) {
                        console.error("Error deleting role:", error);
                    }
                } else {
                    console.log("Deletion cancelled.");
                }
                break;
            case 'View All Departments':
                const departments = await getDepartments();
                displayTable(departments);
                break;
            case 'View Employees by Department':
                const employeesByDepartmentDetails = await promptViewEmployeeByDepartment();
                const employeesByDepartment = await getEmployeesByDepartment(employeesByDepartmentDetails.departmentId);
                displayTable(employeesByDepartment);
                break;
            case 'Add Department':
                const departmentDetails = await promptAddDepartment();
                await addDepartment(departmentDetails.name);
                console.log('Department added successfully.');
                break;
            case 'Delete Department':
                const departmentDeletionChoice = await promptDeleteDepartment();
                if (departmentDeletionChoice && departmentDeletionChoice.departmentId) {
                    try {
                        await deleteDepartment(departmentDeletionChoice.departmentId);
                        console.log('Department deleted successfully.');
                    } catch (error) {
                        console.error("Error deleting department:", error);
                    }
                } else {
                    console.log("Deletion cancelled.");
                }
                break;
            case 'Quit':
                exit = true;
                console.log('Goodbye!');
                break;
            default:
                console.log('Feature not implemented yet.');
        }
    }
};

startApp().catch((err) => console.error(err));
