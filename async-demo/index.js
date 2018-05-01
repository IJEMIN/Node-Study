console.log('Before');
getUser(1, (user) => {
    console.log('User', user);
    getRepositories(user, (repos) => console.log(repos));
});

console.log('After');



function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off Async Work
        setTimeout(() => {
            console.log('Reading a user from a database');
            reslove({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}


function getRepositories(usename) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);

    })
}

function getCommits(repo) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(['Commit']);
        }, 2000);

    })
}