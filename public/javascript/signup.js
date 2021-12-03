const signupBtn = document.querySelector('#signupBtn');



async function signupHandler() {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);

        //check the response status
        if(response.ok) {
            console.log('all good');
            alert('Account Created! Go to login Page to sign in.')
        } else {
            alert(response.statusText);
        }
    }
};



signupBtn.addEventListener('click', signupHandler )