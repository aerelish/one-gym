import bcrypt from 'bcrypt';

// hashes a password using bcrypt with a specified number of salt rounds.
export const hashPassword = async (password: string) => {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
};

// compares a plaintext password with a hashed password and returns true if they match, false otherwise.
export const comparePassword = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash);
};
