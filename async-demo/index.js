console.log('Before');
const user = getUser(1, (user) => {
    console.log('User', user);

    getRepositories(user,(repos) => console.log(repos));
});
console.log('After');



function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database');
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(id, callback) {
    setTimeout( () => {
        console.log('Calling Github API...');
        callback(['repo1', 'repo2', 'repo3']);
    },2000);
}