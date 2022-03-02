// NOTE: methods here should be async and actually call whatever database is being used

const users = [
	{
		id: 1,
		username: 'test1',
		password: 'root'
	},
	{
		id: 2,
		username: 'test2',
		password: 'root'
	}
];

function usernameInUse(usr) {
	return users.find(({ username }) => username === usr) != null;
}

async function list() {
	return users;
}

async function get(id) {
	return users.find((user) => user.id === id);
}

async function getByUsername(username) {
	return users.find((user) => user.username === username);
}

async function add({ username, password }) {
	if (username == null || password == null)
		throw new Error('Invalid parameters');

	if (usernameInUse(username)) throw new Error('Username already in use');

	const id = users.length == 0 ? 1 : users[users.length - 1].id + 1;
	const user = { id, username, password };

	users.push(user);
	return user;
}

async function edit(id, username, password) {
	if (username == null || password == null)
		throw new Error('Invalid parameters');

	let user = get(id);
	if (user == null) return null;

	if (user.username !== username && usernameInUse(username))
		throw new Error('Username already in use');

	user.username = username;
	user.password = password;
	return user;
}

async function remove(id) {
	let idx = users.findIndex((user) => user.id === id);
	if (idx === -1) return false;

	users.splice(idx, 1);
	return true;
}

export default { list, get, add, edit, remove, getByUsername };
