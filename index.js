import inquirer from "inquirer";
class Students {
    static counter = 21121;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Students.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enrollCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for $${this.name} : $${this.balance}`);
    }
    payFee(amount) {
        if (amount < this.balance) {
            this.balance -= amount;
            console.log(`$${amount} Fee paid successfully for ${this.name} current balance : ${this.balance} `);
        }
        else {
            console.log(`Not enough balance $${this.balance}`);
        }
    }
    //for show status
    showStatus() {
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    //add students
    addStudents(name) {
        let student = new Students(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID : ${student.id}`);
    }
    // for enroll
    enrollStudent(id, course) {
        let student = this.students.find((std) => std.id === id);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} is enrolled in ${course} successfully`);
        }
    }
    // to view balance
    viewStudentBalance(stdId) {
        let student = this.students.find((std) => std.id === stdId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student not found.Please enter valid ID");
        }
    }
    payStdFee(stdId, amount) {
        let student = this.students.find((std) => std.id === stdId);
        if (student) {
            student.payFee(amount);
        }
        else {
            console.log(`Student not fount.`);
        }
    }
    // show student data
    showStudentStatus(stdId) {
        let student = this.students.find((std) => std.id === stdId);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(`Student not fount.`);
        }
    }
}
async function main() {
    console.log(`Welcome to Student Management System`);
    console.log(`=======================================`);
    let student_manager = new StudentManager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    { name: "Add Student", value: "addStudent" },
                    { name: "Enroll Student", value: "enroll" },
                    { name: "View Student Balance Cash", value: "view balance" },
                    { name: "Pay Fee", value: "payfee" },
                    { name: "View Status", value: "viewstatus" },
                    { name: "Exit", value: "exit" },
                ],
            },
        ]);
        switch (choice.choice) {
            case "addStudent":
                let stdName = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter Student Name",
                    },
                ]);
                student_manager.addStudents(stdName.name);
                break;
            case "enroll":
                let courseName = await inquirer.prompt([
                    {
                        name: "stdId",
                        type: "number",
                        message: "Enter Student ID",
                    },
                    {
                        name: "courseName",
                        type: "input",
                        message: "Enter Course Name",
                    },
                ]);
                student_manager.enrollStudent(courseName.stdId, courseName.courseName);
                break;
            case "view balance":
                let stdBalance = await inquirer.prompt([
                    {
                        name: "stdId",
                        type: "number",
                        message: "Enter Student Id",
                    },
                ]);
                student_manager.viewStudentBalance(stdBalance.stdId);
                break;
            case "payfee":
                let Payfee = await inquirer.prompt([
                    {
                        name: "stdId",
                        type: "number",
                        message: "Enter Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter Amount",
                    },
                ]);
                student_manager.payStdFee(Payfee.stdId, Payfee.amount);
                break;
            case "viewstatus":
                let showStatus = await inquirer.prompt([
                    {
                        name: "stdId",
                        type: "number",
                        message: "Enter Student Id",
                    },
                ]);
                student_manager.showStudentStatus(showStatus.stdId);
                break;
            case "exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main();
