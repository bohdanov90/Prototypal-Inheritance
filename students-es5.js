"use strict";


// ------------------------------------------------------------ Задание 1 ------------------------------------------------------------ //

function Student(firstName, lastName, yearOfBirth, grades) { 

  this.firstName = firstName;
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.grades = grades;
  this.attendanceArray = new Array(25); // у каждого студента есть массив посещаемости (изначально пустой) из 25 ячеек
  this.avgGrade = 0; // результат метода averageGrade()
  this.avgAttendance = 0; // результат метода averageAttendance()
  
  this.age = function() { // рассчитываем возраст
    return new Date().getFullYear() - yearOfBirth;
  }

  this.averageGrade = function() { // рассчитываем средний балл
    let totalGrades = 0;
    for (let i = 0; i < this.grades.length; i++) {
      totalGrades += this.grades[i];
    }
    return this.avgGrade = totalGrades / this.grades.length;
    // return `${this.firstName} ${this.lastName}: Average Grade is ${this.avgGrade}`;
  }

  this.averageAttendance = function() { // рассчитываем среднее посещение
    let numberOfClasses = 0, numberOfAttendedClasses = 0;
    for (let i = 0; i < this.attendanceArray.length; i++) {
      if (this.attendanceArray[i] === true || this.attendanceArray[i] === false) numberOfClasses++;
      if (this.attendanceArray[i] === true) numberOfAttendedClasses++;
    }
    return this.avgAttendance = numberOfAttendedClasses / numberOfClasses;
    // return `${this.firstName} ${this.lastName}: Average Attendance is ${this.avgAttendance}`;
  }

  this.present = function() { // добавляем в массив посещаемости "true" если студент присутствовал
    for (let i = 0; i < this.attendanceArray.length; i++) {
      if (this.attendanceArray[i] === undefined) return this.attendanceArray[i] = true;
    }
  }

  this.absent = function() { // добавляем в массив посещаемости "false" если студент отсутствовал
    for (let i = 0; i < this.attendanceArray.length; i++) {
      if (this.attendanceArray[i] === undefined) return this.attendanceArray[i] = false;
    }
  }

  this.summary = function() { // проверяет средний балл и среднее посещение
    if (this.avgGrade > 90 && this.avgAttendance > 0.9) return `${this.firstName} ${this.lastName}: Ути какой молодчинка!`;
    else if (this.avgGrade > 90 || this.avgAttendance > 0.9) return `${this.firstName} ${this.lastName}: Норм, но можно лучше`;
    else return `${this.firstName} ${this.lastName}: Редиска!`;
  }

}


let lyosha = new Student("Alexey", "Solomaha", 1990, [79, 100, 88, 87, 98]);
console.log(lyosha.averageGrade());
lyosha.absent(); lyosha.present(); lyosha.present(); lyosha.present(); lyosha.absent(); lyosha.absent(); lyosha.present(); lyosha.absent(); lyosha.absent(); lyosha.present(); lyosha.present(); lyosha.present(); lyosha.present(); lyosha.present(); lyosha.present(); lyosha.present(); 
console.log(lyosha.attendanceArray);
console.log(lyosha.averageAttendance());
console.log(lyosha.summary());
console.log("-------------------------------------------------");

let andrey = new Student("Andrey", "Lazarev", 1972, [82, 90, 96, 78, 71]);
console.log(andrey.averageGrade());
andrey.present(); andrey.present(); andrey.present(); andrey.absent(); andrey.present(); andrey.present(); andrey.present(); andrey.present(); andrey.present(); andrey.absent(); andrey.present(); andrey.present(); andrey.present(); andrey.absent(); andrey.absent(); andrey.present(); 
console.log(andrey.attendanceArray);
console.log(andrey.averageAttendance());
console.log(andrey.summary());
console.log("-------------------------------------------------");

let stas = new Student("Stanislav", "Bialkovskiy", 1997, [84, 99, 81, 97, 99]);
console.log(stas.averageGrade());
stas.absent(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.present(); stas.absent(); stas.present(); 
console.log(stas.attendanceArray);
console.log(stas.averageAttendance());
console.log(stas.summary());
console.log("-------------------------------------------------");

let sasha = new Student("Aleksandr", "Bohdanov", 1990, [81, 82, 87, 98, 99]);
console.log(sasha.averageGrade());
sasha.present(); sasha.present(); sasha.absent(); sasha.absent(); sasha.present(); sasha.present(); sasha.present(); sasha.present(); sasha.absent(); sasha.absent(); sasha.present(); sasha.present(); sasha.present(); sasha.present(); sasha.absent(); sasha.present(); 
console.log(sasha.attendanceArray);
console.log(sasha.averageAttendance());
console.log(sasha.summary());
console.log("-------------------------------------------------");
console.log("-------------------------------------------------");
console.log("-------------------------------------------------");




// ------------------------------------------------------------ Задание 2 ------------------------------------------------------------ //

function Group(...args) {
  return this.args = args;
}

Group.prototype = Array;

Array.prototype.attendance = function() {

  //  если вызывается без аргумента, то возвращает среднюю посещаемость группы за одно занятие
  if (arguments.length === 0) { 

    let totalAttendancePerOneClass = 0, averageAttendancePerOneClass = 0;

    for (let i = 0; i < this.length; i++) {
      totalAttendancePerOneClass += this[i].averageAttendance();
    }

    averageAttendancePerOneClass = totalAttendancePerOneClass / this.length;
    return `Средняя посещаемость группы: ${averageAttendancePerOneClass * 100}%`;

    // если вызывается с аргументом — строкой содержащей фамилию одного из студентов, то возвращает его место в рейтинге посещаемости
  } else if (arguments.length === 1) { 

    let avgAttendanceArray = []; // создаем массив со средней посещаемостью по каждому студенту. Порядок значений - порядковый номер студента при вызове метода функции. 

    for (let i = 0; i < this.length; i++) { 
      avgAttendanceArray.push(this[i].averageAttendance());
    }

    let attendanceRatingArray = avgAttendanceArray.map(el => el); // новый массив, в котором упорядочим данные из массива avgAttendanceArray от большего к меньшему
    attendanceRatingArray.sort();

    for (let i = 0; i < this.length; i++) { // каждому студенту (объект) добавляем свойство ratingAttendance
      for (let j = 0; j < attendanceRatingArray.length; j++) {
        if (this[i].avgAttendance === attendanceRatingArray[j]) this[i].ratingAttendance = this.length - j;
      }
    }

    for (let i = 0; i < this.length; i++) { // возвращаем ratingAttendance студента, фамилия которого указана при вызове метода функции
      if (this[i].lastName === arguments[0]) return `${arguments[0]}. Место в рейтинге посещаемости: ${this[i].ratingAttendance} из ${this.length}`;
    }

  }

}

Array.prototype.performance = function() { 
  
  // если вызывается без аргумента, то возвращает среднюю посещаемость группы за одно занятие + среднюю оценку
  if (arguments.length === 0) { 

    let totalGradePerOneClass = 0, averageGradePerOneClass = 0;
    
    for (let i = 0; i < this.length; i++) {
      totalGradePerOneClass += this[i].averageGrade();
    }

    averageGradePerOneClass = +((totalGradePerOneClass / this.length).toFixed(2));
    return `Средняя оценка группы: ${averageGradePerOneClass}`;
  }

  // если вызывается с аргументом — строкой содержащей фамилию одного из студентов, то возвращает его место в рейтинге посещаемости + оценку
  else if (arguments.length === 1) { 

    let avgGradeArray = []; // создаем массив со средними оценками по каждому студенту. Порядок значений - порядковый номер студента при вызове метода функции. 

    for (let i = 0; i < this.length; i++) { 
      avgGradeArray.push(this[i].averageGrade());
    }
    
    let gradeRatingArray = avgGradeArray.map(el => el); // новый массив, в котором упорядочим данные из массива avgGradeArray от большего к меньшему
    gradeRatingArray.sort();

    for (let i = 0; i < this.length; i++) { // каждому студенту (объект) добавляем свойство ratingGrades
      for (let j = 0; j < gradeRatingArray.length; j++) {
        if (this[i].avgGrade === gradeRatingArray[j]) this[i].ratingGrades = this.length - j;
      }
    }

    for (let i = 0; i < this.length; i++) { // возвращаем ratingGrades студента, фамилия которого указана при вызове метода функции
      if (this[i].lastName === arguments[0]) return `${arguments[0]}. Место в рейтинге оценок: ${this[i].ratingGrades} из ${this.length}`;
    }

  }

}



let angular = new Group(lyosha, andrey, stas, sasha);

console.log(angular.attendance());
console.log(angular.attendance("Solomaha"));

console.log(angular.performance());
console.log(angular.performance("Bialkovskiy"));