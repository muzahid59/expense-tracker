import Link from 'next/link';
import Navigation from './Navigation';
import { Wallet } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 text-primary-600"
          >
            <Wallet size={28} />
            <span className="text-xl md:text-2xl font-bold">
              ExpenseTracker
            </span>
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
