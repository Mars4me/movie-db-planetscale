'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserAuth } from '../Providers/AuthContentProvider';

const Navbar = () => {
    const { user, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
        <nav className="flex items-center justify-between w-full h-20 p-2 border-b-2">
            <ul className="flex items-center">
                <li className="p-2 cursor-pointer">
                    <Link prefetch href="/" className="text-2xl font-semibold">
                        Movie <span className="text-teal-500">DB</span>
                    </Link>
                </li>

                <li className="p-2 cursor-pointer">
                    <Link href="/">Home</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/about">About</Link>
                </li>

                {!user ? null : (
                    <li className="p-2 cursor-pointer">
                        <Link href="/profile">Profile</Link>
                    </li>
                )}
            </ul>

            {loading ? null : !user ? (
                <ul className="flex items-center">
                    <button
                        onClick={handleSignIn}
                        className="px-4 py-2 mx-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
                    >
                        Login
                    </button>
                    <button
                        onClick={handleSignIn}
                        className="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
                    >
                        Sign up
                    </button>
                </ul>
            ) : (
                <div>
                    <p>Welcome, {user.displayName}</p>
                    <button
                        className="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
