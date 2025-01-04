import figlet from 'figlet';
import Table from 'cli-table3';

export const displayHeader = (): void => {
    // Create ASCII art for each line of the title
    const line1 = figlet.textSync('Employee', { font: 'Standard' });
    const line2 = figlet.textSync('Manager', { font: 'Standard' });

    // Combine the lines into an array for easier processing
    const artLines = [...line1.split('\n'), ...line2.split('\n')];

    // Calculate the maximum width of the ASCII art
    const artMaxWidth = Math.max(...artLines.map((line) => line.length));

    // Add a simple border
    const borderLine = '+' + '-'.repeat(artMaxWidth) + '+';

    // Display the header with the border
    console.log('\n' + borderLine);
    artLines.forEach((line) => {
        console.log('|' + line.padEnd(artMaxWidth, ' ') + '|');
    });
    console.log(borderLine + '\n');
};

export const displayTable = (data: any[], headers?: string[]): void => {
    // Check if headers are provided, otherwise extract them from data
    const tableHeaders = headers || Object.keys(data[0]);

    const table = new Table({
        head: tableHeaders,
        wordWrap: true,
        style: { head: ['cyan'] },
    });

    // Add data rows
    data.forEach(row => {
        const rowData = tableHeaders.map(header => {
            const value = row[header];
            return value === null ? 'null' : value; // Display 'null' for null values
        });
        table.push(rowData);
    });

    console.log(table.toString());
};