const courseCode = document.getElementById('search');
const button = document.querySelector('.code-btn');
const displayData = document.getElementById('display_data');

async function getCourse(){
    const response = await fetch(`/course/${courseCode.value}`);
    const result = await response.json();
    console.log(result);
    displayData.innerHTML = '';
    displayData.innerHTML += `
    <tr>
    <td> 1 </td>
    <td> ${result.result[0].CourseCode}</td>
    <td> ${result.result[0].CourseTitle}</td>
    <td> ${result.result[0].CourseUnit}</td>
    <td> ${result.result[0].CourseStatus}</td>
    <td> ${result.result[0].Department}</td>
    <td> ${result.result[0].Level}</td>
  </tr>  `
  };

  button.addEventListener('click', getCourse);

  courseCode.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      getCourse();
    };
  });
