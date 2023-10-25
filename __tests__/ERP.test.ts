const supertest = require("supertest");
import { app } from "./index-test";

import { setupDatabase,adminObject,staffObject,studentObject } from './fixtures/db';


beforeAll(setupDatabase);

test("testing login of admin with correct credentials", async () => {
  await supertest(app)
    .post("/administration/login")
    .send({
      administratorId: "1a",
      password: "admin@log01",
    })
    .expect(200);
});

test("testing login of admin with incorrect credentials", async () => {
  await supertest(app)
    .post("/administration/login")
    .send({
      administratorId: "1a",
      password: "staff@log01",
    })
    .expect(401);
});

test("testing add admin by admin", async () => {
  await supertest(app)
    .post("/administration/addadmin")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      "administratorName":"Harshil",
      "profile":"admin",
      "administratorId":"1a",
      "password":"admin@log01"
    })
    .expect(409);
});



test("testing create student by admin", async () => {
  await supertest(app)
    .post("/administration/addstudent")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      name: "harshil",
      studentId: "6", 
      phoneNumber: 8866224902,
      currentSem: 7,
      password: "student@log01",
      department: "ME",
      batch: 2019,
    })
    .expect(200);
});

test("testing create same student by admin", async () => {
  await supertest(app)
    .post("/administration/addstudent")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      name: "harshil",
      studentId: "6", //new input everytime
      phoneNumber: 8866224902,
      currentSem: 7,
      password: "student@log01",
      department: "ME",
      batch: 2019,
    })
    .expect(409);
});

test("testing create staff by admin", async () => {
  await supertest(app)
    .post("/administration/addstaff")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      administratorName: "ayyush",
      profile: "staff",
      administratorId: "2s",
      password: "staff@log01",
    })
    .expect(200);
});

test("testing create same staff by admin", async () => {
  await supertest(app)
    .post("/administration/addstaff")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      administratorName: "ayyush",
      profile: "staff",
      administratorId: "2s",
      password: "staff@log01",
    })
    .expect(409);
});

test("testing login of staff with correct credentials", async () => {
  await supertest(app)
    .post("/administration/login")
    .send({
      administratorId: "1s",
      password: "staff@log01",
    })
    .expect(200);
});

test("testing login of staff with incorrect credentials", async () => {
  await supertest(app)
    .post("/administration/login")
    .send({
      administratorId: "1s",
      password: "admin@log01",
    })
    .expect(401);
});

test("testing create staff by staff", async () => {
  // const admin = await findUserById('0')
  // console.log('geigiegfiuwqkbfkjbweuofqkjwb')
  await supertest(app)
    .post("/administration/addstaff")
    .set(
      "Authorization",
      `Bearer ${staffObject.tokens[0].token}`
    )
    .send({
      administratorName: "ayyush",
      profile: "staff",
      administratorId: "4s",
      password: "staff@log01",
    })
    .expect(401);
});

test("testing add deparment data by admin", async () => {
  await supertest(app)
    .put("/administration/adddepartmentdata")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      "year":"2023",
      "branches":[{
          "name":"IT",
          "totalStudentsIntake":240
      },{
          "name":"CE",
          "totalStudentsIntake":240
      },{
          "name":"ME",
          "totalStudentsIntake":120
      }]
  })
    .expect(200);
});

test("testing add deparment data by staff", async () => {
  await supertest(app)
    .put("/administration/adddepartmentdata")
    .set(
      "Authorization",
      `Bearer ${staffObject.tokens[0].token}`
    )
    .send({
      "year":"2023",
      "branches":[{
          "name":"IT",
          "totalStudentsIntake":240
      },{
          "name":"CE",
          "totalStudentsIntake":240
      },{
          "name":"ME",
          "totalStudentsIntake":120
      }]
  })
    .expect(401);
});


test("testing list students by admin", async () => {
  await supertest(app)
    .get("/administration/liststudents")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send()
    .expect(200);
});


test("testing list student by staff", async () => {
  await supertest(app)
    .get("/administration/liststudents")
    .set(
      "Authorization",
      `Bearer ${staffObject.tokens[0].token}`
    )
    .send()
    .expect(200);
});

test("testing update student by admin", async () => {
  await supertest(app)
    .put("/administration/updatestudent")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      "studentId":"6",
      "phoneNumber":2323232323,
      "name":"HARSHIL"
  })
    .expect(200);
});

test("testing update student by staff", async () => {
  await supertest(app)
    .put("/administration/updatestudent")
    .set(
      "Authorization",
      `Bearer ${staffObject.tokens[0].token}`
    )
    .send({
      "studentId":"6",
      "phoneNumber":2323232323,
      "name":"HARSHIL"
  })
    .expect(200);
});

test("testing get departments by admin", async () => {
  await supertest(app)
    .get("/administration/departments")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      "year":2023
  })
    .expect(200);
});

test("testing get departments by admin where no department of the year", async () => {
  await supertest(app)
    .get("/administration/departments")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      "year":2021
  })
    .expect(404);
});

test("testing get students with less attendance", async () => {
  await supertest(app)
    .get("/administration/lessattendance")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      "sem":"7"
  })
    .expect(200);
});

test("testing listing absent students on a particular day", async () => {
  await supertest(app)
    .get("/administration/absentStudents")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send({
      "date":"2023-10-22"
  })
    .expect(200);
});

test("testing admin logout", async () => {
  await supertest(app)
    .post("/administration/logout")
    .set(
      "Authorization",
      `Bearer ${adminObject.tokens[0].token}`
    )
    .send()
    .expect(200);
});

test("testing staff logout", async () => {
  await supertest(app)
    .post("/administration/logout")
    .set(
      "Authorization",
      `Bearer ${staffObject.tokens[0].token}`
    )
    .send()
    .expect(200);
});

test("testing student login with correct credentials", async () => {
  await supertest(app)
    .post("/student/login")
    .send({
      "studentId":"6",
      "password":"student@log01"
  })
    .expect(200);
});

test("testing student login with incorrect credentials", async () => {
  await supertest(app)
    .post("/student/login")
    .send({
      "studentId":"19",
      "password":"student@log01"
  })
    .expect(404);
});

test("testing student attdence", async () => {
  await supertest(app)
    .post("/student/attendence")
    .set(
      "Authorization",
      `Bearer ${studentObject.tokens[0].token}`
    )
    .send()
    .expect(200);
});

test("testing student attdence", async () => {
  await supertest(app)
    .post("/student/logout")
    .set(
      "Authorization",
      `Bearer ${studentObject.tokens[0].token}`
    )
    .send()
    .expect(200);
});
