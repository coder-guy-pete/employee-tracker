
# Employee-Tracker

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  

## Description

  A command-line application that manages a company's employee database, that uses Node.js, Inquirer, and PostgreSQL.
  
## Table of Contents

* [Description](#description)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Questions](#questions)

## Dependencies

  This project relies on the following dependencies:

* **Inquirer**: To prompt the user for input
* **PostgreSQL**: To create the datavase abd store user inputs
* **pg**: To connect to the postgreSQL database
* **Figlet**: To add a custom header to the application
* **cli-table3**: To formate the table data displayed to the user

## Installation

**Prerequisites:**

* Node.js and npm (or yarn) installed.

**Steps:**

1. Clone this repository
2. `cd` into your project folder
3. Install the dependencies by runnning `npm install`
4. Run `psql -U postgres_username` replace postgres_username with your username
5. In postgres, run `\i db/schema.sql;` and `\i db/seed.sql;` to create the database, tables, and populate seed data
6. Start the application by running `npm run start`

  This will open the application in the command-line.

## Usage

Video Walkthrough: <https://drive.google.com/file/d/1rkl9e4fR530mN0-0ddaB-6mKIykTWpi9/view?usp=sharing>

### Core Functionality

* View a table of all Employees, Roles, or Departments
* View Employees by Manager
* Add a new Employee, Role, or Department
* Delete an existing Employee, Role, or Department
* Update an Employee's Role or Manager
* See budget of each Department

## Contributing

**I welcome contributions!**

**Reporting Issues:**

1. Search the existing issues to see if your issue has already been reported.
2. If not, create a new issue on our GitHub issue tracker.
3. Please provide as much detail as possible, including steps to reproduce the issue and expected behavior.

**Contributing Code:**

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main branch.

Thank you for your contributions!

## License

  This project is licensed under MIT. For more information, see (<https://opensource.org/licenses/MIT>)

## Questions

  **GitHub**: [coder-guy-pete](https://github.com/coder-guy-pete)

  For any questions, please contact me at: <hintze.peter@gmail.com>
