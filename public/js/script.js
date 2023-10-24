const input = document.getElementById('search-input');
const btn = document.getElementById('search_btn');
let showData = document.getElementById('show_data');

async function getStudent() {
  const res = await fetch(`/student-manager/${input.value}`);
  const data = await res.json();
  showData.innerHTML = '';
  showData.innerHTML += `
  <tr>
  <td> 1 </td>
  <td> ${data.results[0].MatriculationNo}</td>
  <td>
     ${data.results[0].Surname} ${data.results[0].Middlename} ${data.results[0].Firstname}</td>
  <td> ${data.results[0].Programme}</td>
  <td> ${data.results[0].Level}</td>
</tr>
  `;
}

btn.addEventListener('click', getStudent);

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    getStudent();
  }
});
