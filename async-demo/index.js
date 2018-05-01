
console.log('Before');

const p = getUser(1);

p
.then(user => getRepositories(user.gitHubUsername))
.then(repos => getCommits(repos[0]))
.then(commits => console.log(commits))
.catch(err => console.log('Error', err.message));

console.log('After');


function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off Async Work
        setTimeout(() => {
            console.log('Reading a user from a database');
            resolve({ id: id, gitHubUsername: 'mosh' });
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