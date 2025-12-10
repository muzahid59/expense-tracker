import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ExpenseProvider } from '@/context/ExpenseContext';
import Header from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Expense Tracker - Manage Your Finances',
  description:
    'Track your expenses, analyze spending patterns, and manage your budget effectively',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ExpenseProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
        </ExpenseProvider>
      </body>
    </html>
  );
}
