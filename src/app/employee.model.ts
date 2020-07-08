export class Employee {
    public id: number;
    public empName: string;
    public empGender: string;
    public empSalary: number;
    public empAge: number;

    constructor(id: number, empName: string, empGender: string, empSalary: number, empAge: number) {
        this.id = id;
        this.empName = empName;
        this.empGender = empGender;
        this.empSalary = empSalary;
        this.empAge = empAge;
    }
}