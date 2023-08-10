import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { AuthContextProvider } from './Providers/AuthContentProvider';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'hello title from home page',
    description: 'hello description from home page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContextProvider>
                    <Navbar />
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    );
}
