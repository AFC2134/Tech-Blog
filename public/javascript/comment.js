const addCommentBtn = document.querySelector('#addCommentBtn');
let post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
async function addCommentHandler() {
    console.log('comment handler works');
    const comment_text = document.querySelector('#addCommentInput').value;
    event.preventDefault();
    console.log(comment_text)
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};



if (addCommentBtn) {
    addCommentBtn.addEventListener('click', addCommentHandler);
}