const input = document.getElementById('search_input');
const btn = document.getElementById('search_btn');
let showStudentData = document.getElementById('student_info');
let deptLevel = document.getElementById('dept_lvl');
let courseList = document.getElementById('course_list');
let studentInfo;

// function generateStdInfo(ele, item) {
//   ele.innerHTML = '';
//   ele.innerHTML += `
//           <div>
//             <table>
//             <caption style="margin-bottom: 0.5rem">
//               STUDENT INFO
//             </caption>
//             <tr>
//               <th>MATRIC NO:</th>
//               <td>${item.MatriculationNo}</td>
//               <th>FULL NAME:</th>
//               <td>
//                 ${item.Surname + ' ' + item.Middlename + ' ' + item.Firstname}
//               </td>
//             </tr>
//             <tr>
//               <th>COLLEGE:</th>
//               <td>${item.College}</td>
//               <th>DEPARTMENT:</th>
//               <td>${item.Department}</td>
//             </tr>
//             <tr>
//               <th>PROGRAMME:</th>
//               <td>${item.Programme}</td>
//               <th>LEVEL:</th>
//               <td>${item.Level}</td>
//             </tr>
//             <tr>
//               <th>SESSION:</th>
//               <td>2023/2024</td>
//               <th>SEMESTER:</th>
//               <td>FIRST</td>
//             </tr>
//           </table>
//           <div>
//           <div style="margin: 1rem 0">
//             <button class="danger">Cancel</button>
//             <button onclick="filterByDeptLevel()">Next</button>
//           </div>
//           </div>
//   `;
// }

function reg(checkBoxValue, courseReg, element) {
  let checkValues = checkBoxValue;
  let courseData = courseReg;
  let clientRegData = JSON.parse(localStorage.getItem('registration'));
  let { id } = JSON.parse(localStorage.getItem('studentInfo'));

  for (let index = 0; index < courseData.length; index++) {
    const result = courseData[index];
    const isRegistered = clientRegData?.some(
      (data) => parseFloat(data.courseId) === parseFloat(result.id),
    );
    generateRow(element, result, isRegistered);
  }

  //
  //   courseList.innerHTML = `<div class="container">
  //   <div class="displayCourse">

  //   </div>
  //   <button id="submit"><a href="/courseform/${id}">Submit</a></button>
  // </div>`;
  //   document.querySelector('.displayCourse').innerHTML = '';
  //   for (let index = 0; index < clientRegData.length; index++) {
  //     const element = clientRegData[index].code;
  //     document.querySelector(
  //       '.displayCourse',
  //     ).innerHTML += `<span>${element}<span`;
  //   }
}

window.addEventListener('load', () => {
  let clientStdData = JSON.parse(localStorage.getItem('studentInfo'));
  let clientRegData = JSON.parse(localStorage.getItem('registration'));
  let clientCourseData = JSON.parse(localStorage.getItem('courseData'));

  if (clientRegData) {
    regCourses = clientRegData;
  }
  // if (clientStdData) {
  //   generateStdInfo(showStudentData, clientStdData);
  // }

  if (clientCourseData) {
    deptLevel.innerHTML = '';
    deptLevel.innerHTML += `
    <section>
      <div style='display: flex'>
        <div>
        <select id='dept'>
        <option value='Nursing'>Nursing</option>
        <option value='Accounting'>Accounting</option>
        <option value='Architecture'>Architecture</option>
        <option value='Islamic Studies'>Islamic Studies</option>
        <option value='Law'>Law</option>
        <option value='Business Administration'>Business Administration</option>
        <option value='Biochemistry'>Biochemistry</option>
        <option value='Computer Science'>Computer Science</option>
        <option value='Mass Communication'>Mass Communication</option>
        <option value='Economics with Operations Research'>Economics with Operations Research</option>
        <option value='Microbiology'>Microbiology</option>
        <option value='Political Science and International Studies'>Political Science and International Studies</option>
        <option value='Human Anatomy'>Human Anatomy</option>
        <option value='Physiology'>Physiology</option>
      </select>
        </div>
        <div>
          <select id='level'>
            <option value='100L'>100L</option>
            <option value='200L'>200L</option>
            <option value='300L'>300L</option>
            <option value='400L'>400L</option>
            <option value='500L'>500L</option>
            <option value='FNG1'>FNG1</option>
            <option value='FNG2'>FNG2</option>
            <option value='FNG3'>FNG3</option>
          </select>
        </div>
      </div>
      <table>
      <thead>
        <tr>
          <th class="serial-no"></th>
          <th class="matric-no">Course Code</th>
          <th>Course Title</th>
          <th>Unit</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="show_data">
        
      </tbody>
    </table>
    </section>
  `;

    const tableData = document.getElementById('show_data');
    const { dept, level } = JSON.parse(localStorage.getItem('filterParameter'));
    if (JSON.parse(localStorage.getItem('filterParameter'))) {
      document.querySelector('#dept').value = dept;
      document.querySelector('#level').value = level;
    } else {
      document.querySelector('#dept').value = clientStdData.Department;
      document.querySelector('#level').value = clientStdData.Level;
    }

    document.querySelector('#dept')?.addEventListener('change', changed);
    document.querySelector('#level')?.addEventListener('change', changed);
    reg(clientRegData, clientCourseData, tableData);
  }
  // deptLevel.addEventListener('click', addAndRemove);
});

async function changed() {
  // const data = await filter(
  //   document.querySelector('#dept').value,
  //   document.querySelector('#level').value,
  // );
  // document.getElementById('show_data').innerHTML = '';
  // reg({}, data, document.getElementById('show_data'));
  // localStorage.setItem(
  //   'filterParameter',
  //   JSON.stringify({
  //     dept: document.querySelector('#dept').value,
  //     level: document.querySelector('#level').value,
  //   }),
  // );
  let dept = document.getElementById('dept');
  let lvl = document.getElementById('level');
  localStorage.setItem(
    'filterParam',
    JSON.stringify({ dept: dept.value, lvl: lvl.value }),
  );
}
async function getCourses() {
  // let dept = document.getElementById('dept');
  // let lvl = document.getElementById('level');
  let { dept, lvl } = JSON.parse(localStorage.getItem('filterParam'));
  let { MatriculationNo, id } = JSON.parse(
    localStorage.getItem('studentInfo'),
  )[0];
  console.log(MatriculationNo);
  location.href = `/course-registration/q?id=${id}&department=${dept}&level=${lvl}&matricNo=${MatriculationNo}`;
}

document.getElementById('get_courses').addEventListener('click', getCourses);

let regCourses = [];
async function addAndRemove(e) {
  // if (localStorage.getItem('registration')) {
  //   regCourses = JSON.parse(localStorage.getItem('registration'));
  // }
  let { MatriculationNo, id } = JSON.parse(localStorage.getItem('studentInfo'))[0];
  const courseId = e.target.dataset.cid;
  const courseCode = e.target.dataset.ccode;

  const index = regCourses.findIndex(
    (obj) => parseFloat(obj.courseId) === parseFloat(courseId),
  );

  console.log(index);
  console.log(e.target.classList.contains('minus'));
  if (e.target.classList.contains('minus')) {
  
      const res = await fetch(`/course-registration/${courseId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      e.target.classList.add('hide');
      e.target.previousElementSibling.classList.remove('hide');
      regCourses.splice(index, 1);
    
  } else if (e.target.classList.contains('plus')) {
    if (index === -1) {
      console.log(index)
      let body = {
        studentId: id,
        courseId,
        matricNo: MatriculationNo,
        code: courseCode,
      };
      regCourses.push(body);
      console.log(regCourses);
      const res = await fetch('/courses/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regCourses),
      });
      // const data = await res.json();
  
      e.target.classList.add('hide');
      e.target.nextElementSibling.classList.remove('hide');
    }
    
  }
  console.log(regCourses)
  // localStorage.setItem('registration', JSON.stringify(regCourses));
}
document.querySelectorAll('.add_remove')?.forEach((ele) => {
  ele.addEventListener('click', addAndRemove);
});
// function generateRow(ele, item, registered = false) {
//   ele.innerHTML += `<tr id="${item.id}">
//       <td id="${item.CourseCode}">
//         <div id="add_remove">
//           <button data-ccode="${item.CourseCode}" data-cid="${
//             item.id
//           }" class="plus ${registered ? 'hide' : ''}">+</button>
//           <button data-ccode="${item.CourseCode}" data-cid="${
//             item.id
//           }" class="minus danger ${registered ? '' : 'hide'}">-</button>
//         </div>
//       </td>
//       <td>${item.CourseCode}</td>
//       <td>${item.CourseTitle}</td>
//       <td>${item.CourseUnit}</td>
//       <td>${item.CourseStatus}</td>
//     </tr>`;
// }

async function getStudent() {
  // const res = await fetch(`/course-registration/${input.value}`);
  // const data = await res.json();
  const res = await fetch(`/course-registrations/${input.value}`);
  const data = await res.json();
  console.log(data);
  localStorage.setItem('studentInfo', JSON.stringify(data));
  location.href = `/course-registration/${input.value}`;

  // if (data.results[0]) {
  //   // generateStdInfo(showStudentData, data.results[0]);
  //   localStorage.setItem(
  //     'filterParameter',
  //     JSON.stringify({
  //       dept: data.results[0].Department,
  //       level: data.results[0].Level,
  //     }),
  //   );
  //   localStorage.setItem('studentInfo', JSON.stringify(data.results[0]));
  // }
  if (isExist) {
    localStorage.setItem(
      'filterParameter',
      JSON.stringify({
        dept: data.results[0].Department,
        level: data.results[0].Level,
      }),
    );
    localStorage.setItem('registration', JSON.stringify(isExist));
  }
}
async function filter(dept, lvl) {
  const res = await fetch(`/filter?department=${dept}&level=${lvl}`);
  const data = await res.json();
  localStorage.setItem('courseData', JSON.stringify(data));
  return data;
}
async function filterByDeptLevel() {
  let clientData = JSON.parse(localStorage.getItem('studentInfo'));
  const data = await filter(clientData.Department, clientData.Level);

  deptLevel.innerHTML = '';
  deptLevel.innerHTML += `
    <section>
    <div style='display: flex'>
        <div>
          <select id='dept'>
            <option value='Nursing'>Nursing</option>
            <option value='Accounting'>Accounting</option>
            <option value='Architecture'>Architecture</option>
            <option value='Islamic Studies'>Islamic Studies</option>
            <option value='Law'>Law</option>
            <option value='Business Administration'>Business Administration</option>
            <option value='Biochemistry'>Biochemistry</option>
            <option value='Computer Science'>Computer Science</option>
            <option value='Mass Communication'>Mass Communication</option>
            <option value='Economics with Operations Research'>Economics with Operations Research</option>
            <option value='Microbiology'>Microbiology</option>
            <option value='Political Science and International Studies'>Political Science and International Studies</option>
            <option value='Human Anatomy'>Human Anatomy</option>
            <option value='Physiology'>Physiology</option>
          </select>
        </div>
        <div>
          <select id='level'>
            <option value='100L'>100L</option>
            <option value='200L'>200L</option>
            <option value='300L'>300L</option>
            <option value='400L'>400L</option>
            <option value='500L'>500L</option>
            <option value='FNG1'>FNG1</option>
            <option value='FNG2'>FNG2</option>
            <option value='FNG3'>FNG3</option>
          </select>
        </div>
      </div>
    <table>
    <thead>
      <tr>
        <th class="serial-no"><div id="check_all"><button class="plus">+</button><button class="minus">-</button></div></th>
        <th class="matric-no">Course Code</th>
        <th>Course Title</th>
        <th>Unit</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id="show_data">
       
    </tbody>
  </table>
    </section>
  `;

  const tableData = document.getElementById('show_data');

  document.querySelector('#dept').value = clientData.Department;
  document.querySelector('#level').value = clientData.Level;

  document.querySelector('#dept')?.addEventListener('change', changed);
  document.querySelector('#level')?.addEventListener('change', changed);
  reg({}, data, tableData);
}
document.querySelector('#dept')?.addEventListener('change', changed);
document.querySelector('#level')?.addEventListener('change', changed);
btn.addEventListener('click', getStudent);

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    getStudent();
  }
});


document.getElementById('generate')?.addEventListener('click', () => {
  let info = JSON.parse(localStorage.getItem('studentInfo'))
  if(regCourses.length === 0){
    let { MatriculationNo } = info[0]
    location.href = `/courseform/${MatriculationNo}`
  }else{
    location.href = '/courses/save'
  }
  
})