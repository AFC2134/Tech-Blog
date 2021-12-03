let initial;
function logoutTime() {
     // Set a time frame countdown using SetTimeOut()
     initial = setTimeout(function(){ 
        async function logout () {
            const response = await fetch('/api/users/logout', {
                method: 'post',
                headers: {'Content-Type': 'application/json'}
            });
        
            if(response.ok) {
                document.location.replace('/');
                alert("You were logged out due to inactivity, please log in again!")
            } else {
                alert(response.statusText);
            }  
        };
        logout()
        
    }, 120000);
    
     //Set event listener to watch for entire window document for a click or action, which will reset timer if occurs
     // When time runs down we fire logout route to end session.
}

logoutTime();

document.body.onclick = function() {
    clearTimeout(initial);
    logoutTime()
}