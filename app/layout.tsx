import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { AuthContextProvider } from './Providers/AuthContentProvider';

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
                    <nav className="px-10 pt-5">
                        <Link prefetch href="/" className="text-2xl font-semibold">
                            Movie <span className="text-teal-500">DB</span>
                        </Link>
                    </nav>
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    );
}
