import inquirer from "inquirer";

class Students {
  static counter: number = 21121;
  id: number;
  name: string;
  courses: string[];
  balance: number;
  constructor(name: string) {
    this.id = Students.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 1000;
  }
  enrollCourse(course: string) {
    this.courses.push(course);
  }
  viewBalance() {
    console.log(`Balance for $${this.name} : $${this.balance}`);
  }
  payFee(amount: number) {
    if (amount < this.balance) {
      this.balance -= amount;
      console.log(`$${amount} Fee paid successfully for ${this.name}`);
    } else {
      console.log(`Not enough balance $${this.balance}`);
    }
  }

  //for show status
  showStatus() {
    console.log(`ID : ${this.id}`);
    console.log(`Name : ${this.name}`);
    console.log(`Courses : ${this.courses}`);
    console.log(`Balance : ${this.id}`);
  }
}

class StudentManager {
  students: Students[];
  constructor() {
    this.students = [];
  }

  //add students
  addStudents(name: string) {
    let student = new Students(name);
    this.students.push(student);
    console.log(
      `Student: ${name} added successfully. Student ID : ${student.id}`
    );
  }

  // for enroll
  enrollStudent(id: number, course: string) {
    let student = this.students.find((std) => std.id === id);
    if (student) {
      student.enrollCourse(course);
      console.log(`${student.name} is enrolled in ${course} successfully`);
    }
  }
  // to view balance
  viewStudentBalance(stdId: number) {
    let student = this.students.find((std) => std.id === stdId);
    if (student) {
      student.viewBalance();
    } else {
      console.log("Student not found.Please enter valid ID");
    }
  }
  payStdFee(stdId: number, amount: number) {
    let student = this.students.find((std) => std.id === stdId);
    if (student) {
      student.payFee(amount);
    } else {
      console.log(`Student not fount.`);
    }
  }
  // show student data
  showStudentStatus(stdId: number) {
    let student = this.students.find((std) => std.id === stdId);
    if (student) {
      student.showStatus();
    } else {
      console.log(`Student not fount.`);
    }
  }
}
