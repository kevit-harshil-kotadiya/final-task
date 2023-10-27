const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
import Administration from '../../src/components/administration/administration.model';
import Student from '../../src/components/student/student.model';


const adminId = new mongoose.Types.ObjectId()
export const adminObject = {
    _id: adminId,
    administratorName: "Harshil",
    profile: "admin",
    administratorId: "1a",
    password: "admin@log01",
    tokens: [{
        token: jwt.sign({
            _id: adminId.toString(),
            administratorId: "1a",
        },
            "TEMPKEY")
    }]
};
const staffId = new mongoose.Types.ObjectId()
export const staffObject = {
    _id: staffId,
    administratorName: "Darshil",
    profile: "staff",
    administratorId: "1s",
    password: "staff@log01",
    tokens: [{
        token: jwt.sign({
            _id: staffId.toString(),
            administratorId: "1s",
        },
            "TEMPKEY")
    }]
};
const studentId = new mongoose.Types.ObjectId()
export const studentObject = {
    _id: studentId,
    name: "harshil5",
    studentId: "20",
    phoneNumber: 8866224902,
    password: "student@log01",
    currentSem: 7,
    department: "ME",
    batch: 2023,
    tokens: [{
        token: jwt.sign({ _id: studentId.toString(), studentId: "20" },
        "TEMPKEY")
    }]
};

export const setupDatabase = async () => {
    await Administration.create(adminObject)
    await Administration.create(staffObject)
    await Student.create(studentObject)
}

module.exports = {
    adminId,
    staffId,
    studentObject,
    adminObject,
    staffObject,
    setupDatabase
}
