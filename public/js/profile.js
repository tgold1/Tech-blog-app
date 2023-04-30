const newFormHandler = async (event) => {
  event.preventDefault();

  const posttitle = document.querySelector('#Blogpost-posttitle').value.trim();
  const contents = document.querySelector('#Blogpost-contents').value.trim();
  const username = document.querySelector('#Blogpost-username').value.trim();
  const date = document.querySelector('#Blogpost-date').value.trim();

  if ( posttitle && contents && username && date) {
    const response = await fetch(`/api/Blogpost`, {
      method: 'POST',
      body: JSON.stringify({posttitle, contents, username, date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/Blogpost');
    } else {
      alert('Failed to create Blogpost');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/Blogpost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/Blogpost');
    } else {
      alert('Failed to delete Blogpost');
    }
  }
};

document
  .querySelector('.new-Blogpost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.Blogpost-list')
  .addEventListener('click', delButtonHandler);
