const submitBtn = document.getElementById('sub_btn');
const input = document.getElementById('search_input');
let isPrinted = document.getElementById('is_printed');
let generateExamPassBtn = document.getElementById('generate');

async function getStudent() {
  let val = input.value;

  // Validate matriculation number
  if (val === '' || !val || val.length !== 10 || !val.startsWith('S1')) {
    return alert('Input a Valid Matric No');
  }

  try {
    // Fetch data from the server
    await fetch('/exam-pass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricNo: val }),
    });

    // Redirect to a new page
    location.href = `/exam-pass/${val}`;
  } catch (error) {
    console.error('Error during fetch:', error);
    // Handle error, show a message to the user, etc.
    alert('An error occurred during the fetch operation');
  }
}

if (isPrinted !== null && !isPrinted.checked) {
  generateExamPassBtn.disabled = true;
  isPrinted.disabled = false;
}

const promise = async (id, newUpdate) => {
  await fetch(`/exam-pass/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isPrinted: newUpdate }),
  });
};

const updateIsPrinted = async (e) => {
  let generateExamPassBtn = document.getElementById('generate');
  let isPrinted = document.getElementById('is_printed');
  let isPrintedId = e.target.dataset.printed_id;

  try {
    if (isPrinted.checked) {
      await promise(isPrintedId, true);
      generateExamPassBtn.disabled = false;
    } else {
      await promise(isPrintedId, false);
      generateExamPassBtn.disabled = true;
    }
  } catch (error) {
    console.error('Error updating record:', error);
  }
};

const generateExamPass = () => {
  const path = window.location.pathname;

  // Split the path into segments using '/'
  const pathSegments = path.split('/');

  // Extract the last segment
  const matricNo = pathSegments[pathSegments.length - 1];

  location.href = `/exampass/${matricNo}`;
};

submitBtn.addEventListener('click', getStudent);
isPrinted?.addEventListener('change', updateIsPrinted);
generateExamPassBtn?.addEventListener('click', generateExamPass);
