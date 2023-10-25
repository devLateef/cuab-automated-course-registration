const input = document.getElementById('search_input');
const btn = document.getElementById('search_btn');
let showData = document.getElementById('student_info');
let deptLevel = document.getElementById('dept_lvl');
let courseList = document.getElementById('course_list');
let studentInfo;

async function getStudent() {
  const res = await fetch(`/course-registration/${input.value}`);
  const data = await res.json();
  studentInfo = data.results[0];
  showData.innerHTML = '';
  showData.innerHTML += `
          <div>
            <table>
            <caption style="margin-bottom: 0.5rem">
              STUDENT INFO
            </caption>
            <tr>
              <th>MATRIC NO:</th>
              <td>${data.results[0].MatriculationNo}</td>
              <th>FULL NAME:</th>
              <td>
                ${
                  data.results[0].Surname +
                  ' ' +
                  data.results[0].Middlename +
                  ' ' +
                  data.results[0].Firstname
                }
              </td>
            </tr>
            <tr>
              <th>COLLEGE:</th>
              <td>${data.results[0].College}</td>
              <th>DEPARTMENT:</th>
              <td>${data.results[0].Department}</td>
            </tr>
            <tr>
              <th>PROGRAMME:</th>
              <td>${data.results[0].Programme}</td>
              <th>LEVEL:</th>
              <td>${data.results[0].Level}</td>
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

async function filterByDeptLevel() {
  // showData.style.display = 'none';
  const res = await fetch(
    `/filter?department=${studentInfo.Department}&level=${studentInfo.Level}`,
  );
  const data = await res.json();
  deptLevel.innerHTML = '';
  deptLevel.innerHTML += `
    <section>
    <div>
      <input type="text" />
      <select>
      </select>
    </div>
    <table>
    <thead>
      <tr>
        <th class="serial-no">S/NO</th>
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
  for (let index = 0; index < data.length; index++) {
    const result = data[index];
    tableData.innerHTML += `<tr>
    <td><input type="checkbox"/></td>
    <td>${result.CourseCode}</td>
    <td>
      ${result.CourseTitle}
    </td>
    <td>${result.CourseUnit}</td>
    <td>${result.CourseStatus}</td>
  </tr>`;
  }
}

btn.addEventListener('click', getStudent);

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    getStudent();
  }
});
