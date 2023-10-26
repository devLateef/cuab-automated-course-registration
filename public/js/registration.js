const input = document.getElementById('search_input');
const btn = document.getElementById('search_btn');
let showStudentData = document.getElementById('student_info');
let deptLevel = document.getElementById('dept_lvl');
let courseList = document.getElementById('course_list');
let studentInfo;

function generateStdInfo(ele, item) {
  ele.innerHTML = '';
  ele.innerHTML += `
          <div>
            <table>
            <caption style="margin-bottom: 0.5rem">
              STUDENT INFO
            </caption>
            <tr>
              <th>MATRIC NO:</th>
              <td>${item.MatriculationNo}</td>
              <th>FULL NAME:</th>
              <td>
                ${item.Surname + ' ' + item.Middlename + ' ' + item.Firstname}
              </td>
            </tr>
            <tr>
              <th>COLLEGE:</th>
              <td>${item.College}</td>
              <th>DEPARTMENT:</th>
              <td>${item.Department}</td>
            </tr>
            <tr>
              <th>PROGRAMME:</th>
              <td>${item.Programme}</td>
              <th>LEVEL:</th>
              <td>${item.Level}</td>
            </tr>
            <tr>
              <th>SESSION:</th>
              <td>2023/2024</td>
              <th>SEMESTER:</th>
              <td>FIRST</td>
            </tr>
          </table>
          <div>
          <div >
            <button>Cancel</button>
            <button onclick="filterByDeptLevel()">Next</button>
          </div>
          </div> 
  `;
}

function reg(checkBoxValue, courseReg, element) {
  let checkValues = checkBoxValue;
  let courseData = courseReg;

  for (let index = 0; index < courseData.length; index++) {
    const result = courseData[index];

    generateRow(element, result);
  }
}

window.addEventListener('load', () => {
  let clientStdData = JSON.parse(localStorage.getItem('studentInfo'));
  let clientRegData = JSON.parse(localStorage.getItem('registration'));
  let clientCourseData = JSON.parse(localStorage.getItem('courseData'));

  if (clientStdData) {
    generateStdInfo(showStudentData, clientStdData);
  }

  if (clientCourseData) {
    deptLevel.innerHTML = '';
    deptLevel.innerHTML += `
    <section>
      <div style='display: flex'>
        <div>
          <select id='dept'>
            <option value='Accouting'>Accounting</option>
            <option value='Economics'>Economics</option>
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
          <th class="serial-no">
            <div id="check_all"><button class="plus">+</button><button class="minus">-</button></div>
          </th>
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

    const checkAllBox = document.getElementById('check_all');
    const tableData = document.getElementById('show_data');
    // tableData.inn;
    reg(clientRegData, clientCourseData, tableData);
    checkAllBox.checked = clientRegData ? clientRegData['check_all'] : false;
    const checkboxValues = {};
    function checkAll(e) {
      console.log(e.target);
      // localStorage.setItem('registration', JSON.stringify(checkboxValues));
    }

    checkAllBox.addEventListener('click', checkAll);
  }
});
let regCourses = [];
function addAndRemove(e) {
  let { MatriculationNo, id } = JSON.parse(localStorage.getItem('studentInfo'));
  const index = regCourses.findIndex((obj) => obj.id === e.target.dataset.cid);

  if (e.target.classList.contains('minus')) {
    e.target.classList.add('hide');
    e.target.previousElementSibling.classList.remove('hide');
    if (index !== -1) {
      regCourses.splice(index, 1);
    }
    regCourses.splice(index, 1);
  } else if (e.target.classList.contains('plus')) {
    e.target.classList.add('hide');
    e.target.nextElementSibling.classList.remove('hide');
    if (index === -1) {
      regCourses.push({
        stdId: id,
        courseId: e.target.dataset.cid,
        matricNo: MatriculationNo,
      });
    }
  }
  console.log(regCourses);
}
deptLevel.addEventListener('click', addAndRemove);
function generateRow(ele, item) {
  let clientRegData = JSON.parse(localStorage.getItem('registration'));

  if (clientRegData) {
    ele.innerHTML += `<tr id="${item.id}">
      <td id="${item.CourseCode}">
        <div>
          <button data-ccode="${item.CourseCode}" data-cid="${item.id}" class="plus "">+</button>
          <button data-ccode="${item.CourseCode}" data-cid="${item.id}" class="minus hide">-</button>
        </div>
      </td>
      <td>${item.CourseCode}</td>
      <td>${item.CourseTitle}</td>
      <td>${item.CourseUnit}</td>
      <td>${item.CourseStatus}</td>
    </tr>`;
  } else {
    ele.innerHTML += `<tr id="${item.id}">
      <td>
        <div>
          <button data-ccode="${item.CourseCode}" data-cid="${item.id}" id="${item.CourseCode}" class="plus">+</button>
          <button data-ccode="${item.CourseCode}" data-cid="${item.id}" class="minus hide">-</button>
        </div>
      </td>
      <td>${item.CourseCode}</td>
      <td>${item.CourseTitle}</td>
      <td>${item.CourseUnit}</td>
      <td>${item.CourseStatus}</td>
    </tr>`;
  }
}

async function getStudent() {
  const res = await fetch(`/course-registration/${input.value}`);
  const data = await res.json();

  if (data.results[0]) {
    generateStdInfo(showStudentData, data.results[0]);
  }
  localStorage.setItem('studentInfo', JSON.stringify(data.results[0]));
}

async function filterByDeptLevel() {
  // showStudentData.style.display = 'none';
  let clientData = JSON.parse(localStorage.getItem('studentInfo'));
  const res = await fetch(
    `/filter?department=${clientData.Department}&level=${clientData.Level}`,
  );
  const data = await res.json();
  localStorage.setItem('courseData', JSON.stringify(data));
  JSON.parse(localStorage.getItem('registration'));

  console.log(data);
  deptLevel.innerHTML = '';
  deptLevel.innerHTML += `
    <section>
    <div style='display: flex'>
        <div>
          <select id='dept'>
            <option value='Accouting'>Accounting</option>
            <option value='Economics'>Economics</option>
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

  const checkAllBox = document.getElementById('check_all');

  const tableData = document.getElementById('show_data');
  // function checkAll() {
  //   const checkboxValues = {};
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //   checkboxes.forEach(function (checkbox) {
  //     checkbox.checked = true;
  //     checkboxValues[checkbox.id] = checkbox.checked;
  //   });

  //   localStorage.setItem('registration', JSON.stringify(checkboxValues));
  // }

  reg({}, data, tableData);
  checkAllBox.addEventListener('click', checkAll);
}

btn.addEventListener('click', getStudent);

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    getStudent();
  }
});

// function toggleAll(check){
//   if(check.checked === true){
//     checkboxes = check.checked
//   }
// }
