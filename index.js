var http = require("http");
const Employee = require('./Employee.js');

console.log("Lab 03 -  NodeJs");

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end({"error": `${http.STATUS_CODES[405]}`})
        return;
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Welcome to Lab Exercise 03</h1>");
    } 
    else if (req.url === '/employee') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Employee.getEmployees()));
    } 
    else if (req.url === '/employee/names') {
        let employees = Employee.getEmployees();
        let names = employees.map(employee => {
            return employee.firstName + ' ' + employee.lastName;
        });
        names.sort();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(names));
    } 
    else if (req.url === '/employee/totalsalary') {
        let employees = Employee.getEmployees();
        let totalSalary = employees.reduce((total, employee) => {
            return total + employee.salary;
        }, 0);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "total_salary": totalSalary }));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end({"error": `${http.STATUS_CODES[404]}`});
    }
})

server.on('error', (err) => {
    console.log('Error occurred', err);
    if (err.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }, 1000);
    } 
    else {
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
})

