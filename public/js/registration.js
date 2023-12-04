const input = document.getElementById('search_input');
const btn = document.getElementById('search_btn');
let showStudentData = document.getElementById('student_info');
let deptLevel = document.getElementById('dept_lvl');
let courseList = document.getElementById('course_list');
let studentInfo;


async function changed() {
  let dept = document.getElementById('dept');
  let lvl = document.getElementById('level');
  localStorage.setItem(
    'filterParam',
    JSON.stringify({ dept: dept.value, lvl: lvl.value }),
  );
}

async function getCourses() {
  let { dept, lvl } = JSON.parse(localStorage.getItem('filterParam'));
  let { MatriculationNo, id } = JSON.parse(
    localStorage.getItem('studentInfo'),
  )[0];
  location.href = `/course-registration/q?id=${id}&department=${dept}&level=${lvl}&matricNo=${MatriculationNo}`;
}

document.getElementById('get_courses').addEventListener('click', getCourses);

let regCourses = [];
async function addAndRemove(e) {
  if (localStorage.getItem('registration')) {
    regCourses = JSON.parse(localStorage.getItem('registration'));
  }
  let { MatriculationNo, id } = JSON.parse(localStorage.getItem('studentInfo'))[0];
  const courseId = e.target.dataset.cid;
  const registrationId = e.target.dataset.regid;
  const courseCode = e.target.dataset.ccode;

  const index = regCourses.findIndex(
    (obj) => parseFloat(obj.courseId) === parseFloat(courseId),
  );

  if (e.target.classList.contains('minus')) {
  
      const res = await fetch(`/course-registration/${registrationId}`, {
        method: 'DELETE',
      });
      regCourses.splice(index, 1);
      const resp = await fetch('/courses/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regCourses),
      });
      e.target.classList.add('hide');
      e.target.previousElementSibling.classList.remove('hide');

  } else if (e.target.classList.contains('plus')) {
    if (index === -1) {
      let body = {
        studentId: id,
        courseId,
        matricNo: MatriculationNo,
        code: courseCode,
      };
      regCourses.push(body);
      const res = await fetch('/courses/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regCourses),
      });
  
      e.target.classList.add('hide');
      e.target.nextElementSibling.classList.remove('hide');
    }
    
  }
  localStorage.setItem('registration', JSON.stringify(regCourses));
}
document.querySelectorAll('.add_remove')?.forEach((ele) => {
  ele.addEventListener('click', addAndRemove);
});


async function getStudent() {
  const res = await fetch(`/course-registrations/${input.value}`);
  const data = await res.json();
  localStorage.setItem('studentInfo', JSON.stringify(data));
  location.href = `/course-registration/${input.value}`;
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
  if(JSON.parse(localStorage.getItem('registration'))){
    regCourses = JSON.parse(localStorage.getItem('registration'))
  }
  if(regCourses.length === 0){
    let { MatriculationNo } = info[0]
    location.href = `/courseform/${MatriculationNo}`
  }else{
    location.href = '/courses/save'
  }
  localStorage.removeItem('registration')
})