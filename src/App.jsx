import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Converter from './pages/pageConverter';
import ExchangeRates from './pages/pageExchangeRate';

const navigation = [
  { name: 'Converter', href: '/' },
  { name: 'Exchange Rates', href: '/exchange-rates' },
  { name: 'About', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-[#3f2a02] to-[#7e3606] text-white">
        <Disclosure as="nav" className="bg-transparent">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-center items-center">
                  <div className="hidden md:flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames('px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white')}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="md:hidden">
                    <DisclosureButton className="text-gray-400 hover:text-white">
                      {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </DisclosureButton>
                  </div>
                </div>
              </div>
              <DisclosurePanel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className="block text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>

        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
        </Routes>
      </div>
    </Router>
  );
}