export interface User {
    name: string;
    email: string;
    password?: string; // stored for simulation, obviously not secure for production
}

const USERS_KEY = 'seyone_users';
const CURRENT_USER_KEY = 'seyone_current_user';

export const authService = {
    register: (user: User): { success: boolean; message: string } => {
        const usersStr = localStorage.getItem(USERS_KEY);
        const users: User[] = usersStr ? JSON.parse(usersStr) : [];

        if (users.some((u) => u.email === user.email)) {
            return { success: false, message: 'Email already exists' };
        }

        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name: user.name, email: user.email }));
        window.dispatchEvent(new Event('auth-change'));
        return { success: true, message: 'Registration successful' };
    },

    login: (email: string, password: string): { success: boolean; message: string } => {
        const usersStr = localStorage.getItem(USERS_KEY);
        const users: User[] = usersStr ? JSON.parse(usersStr) : [];

        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name: user.name, email: user.email }));
            window.dispatchEvent(new Event('auth-change'));
            return { success: true, message: 'Login successful' };
        }

        return { success: false, message: 'Invalid email or password' };
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        window.dispatchEvent(new Event('auth-change'));
    },

    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }
};
