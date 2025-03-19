import { Disclosure, Menu } from '@headlessui/react';
import { Bars4Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import React from 'react';
import { useUser } from './userContext';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', current: false },
  { name: 'CreateRequest', to: '/createorder', current: false },
  { name: 'RequestHistory', to: '/requesthistory', current: false },
];

const userNavigation = [
  { name: 'Sign out', href: '/signout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function User() {
  const { user } = useUser();
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <motion.div 
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                          <motion.div
                            key={item.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              to={item.to}
                              className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.div className="hidden md:block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  >
                    <div className="ml-4 flex items-center md:ml-6">
                      <motion.button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none transition duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </motion.button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none transition duration-200">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={require("./assets/user.png")} alt="" />
                          </Menu.Button>
                        </div>
                        <Menu.Items 
                          as={motion.div}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 transition duration-150')}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>
                    </div>
                  </motion.div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? <XMarkIcon className="block h-6 w-6" /> : <Bars4Icon className="block h-6 w-6" />}
                    </Disclosure.Button>
                  </div>
                </div>
              </motion.div>

              <Disclosure.Panel className="md:hidden">
                <motion.div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
                <motion.div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="px-5">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={require("./assets/user.png")} alt="User" />
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">{user?.name || "User"}</div>
                        <div className="text-sm font-medium text-gray-400">{user?.email || "user@example.com"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </Disclosure.Panel>

            </>
          )}
        </Disclosure>

        <main>
          <motion.div 
            className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Your content */}
          </motion.div>
        </main>
      </div>
    </>
  );
}
