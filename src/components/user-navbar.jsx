import { Disclosure, Menu } from '@headlessui/react';
import { Bars4Icon, BellIcon, XMarkIcon, UserIcon, ClipboardDocumentListIcon, PlusCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from "react-router-dom";
import React from 'react';
import { useUser } from "./userContext";
import user_img from "./assets/user.png";
import { motion } from 'framer-motion';

const navigation = [
  
  { name: 'CreateRequest', to: '/createorder', icon: PlusCircleIcon },
  
  { name: 'RequestHistory', to: '/requesthistory', icon: ClipboardDocumentListIcon },
];

const userNavigation = [
  { name: 'Your Profile', to: "/dashboard" },
  { name: 'Sign out', to: '/signout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function User() {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="min-h-full w-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img
                        alt="Halden"
                        src={require("./assets/procurement.png")}
                        className="h-8 w-8"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            to={item.to}
                            key={item.name}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                              isActive(item.to)
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out'
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user_img} alt="" />
                          </Menu.Button>
                        </div>
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.to}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        isActive(item.to)
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Bottom navigation bar for mobile */}
        <motion.div
          className="fixed bottom-0 left-0 w-full bg-gray-800 pt-2 pb-3 flex justify-around md:hidden z-50 border-t border-gray-700"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {navigation.map((item) => (
            <Link
              to={item.to}
              key={item.name}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ease-in-out text-xs font-medium ${
                isActive(item.to) ? 'text-blue-400' : 'text-white hover:text-blue-300'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </motion.div>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </main>
      </div>
    </>
  );
}
