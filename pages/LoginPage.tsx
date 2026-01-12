import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay for realism
        setTimeout(() => {
            const result = authService.login(email, password);
            setIsLoading(false);

            if (result.success) {
                navigate('/dashboard');
            } else {
                alert(result.message);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#76BC21]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1A1A1B]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-slate-100 animate-in fade-in zoom-in duration-500">
                <div className="p-10 md:p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-[#1A1A1B] mb-2">Welcome Back</h1>
                        <p className="text-slate-500 font-medium">Log in to continue your journey</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#76BC21] transition-colors">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#76BC21] focus:bg-white outline-none transition-all font-medium text-slate-800"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                <a href="#" className="text-xs font-bold text-[#76BC21] hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#76BC21] transition-colors">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#76BC21] focus:bg-white outline-none transition-all font-medium text-slate-800"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1A1A1B] text-white font-black py-4 rounded-xl shadow-lg shadow-[#1A1A1B]/20 hover:bg-[#76BC21] hover:shadow-[#76BC21]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <i className="fas fa-circle-notch fa-spin mr-2"></i> Logging in...
                                </>
                            ) : (
                                <>
                                    Log In <i className="fas fa-arrow-right ml-2 text-xs"></i>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 font-medium text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#76BC21] font-black hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Simple Footer in Login Card */}
                <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Seyone Medical Coding Academy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
