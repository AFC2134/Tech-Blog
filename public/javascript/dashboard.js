const newPostBtn = document.querySelector('#newPostBtn');
const myModal = document.querySelector('#myModal');
const xModalBtn = document.querySelector('#xModalBtn');
const closeBtn = document.querySelector('#closeBtn');
const saveBtn = document.querySelector('#saveBtn');


function newPostHandler() {
    console.log('create post fired!');
    myModal.style.display = "contents";
};

function exitModal() {
    myModal.style.display = "none";
};

async function saveBtnHandler() {
    event.preventDefault();

    const title = document.querySelector('#titleInput').value;
    const body = document.querySelector('#bodyInput').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
        console.log('successful post route')
    } else {
        alert(response.statusText);
    }
}

newPostBtn.addEventListener('click', newPostHandler);
closeBtn.addEventListener('click', exitModal);
saveBtn.addEventListener('click', saveBtnHandler);
xModalBtn.addEventListener('click', exitModal);
