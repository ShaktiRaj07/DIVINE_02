import * as React from "react";
import "../index.css";
import Cta from "./Cta";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type props = {
 _site:any,
//  c_mainMenu:Array<string>,
};


const Header = (header: props) => {
  // console.log('header', header)
  return (
    <Disclosure as="nav" className="bg-smokewhite-500 shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-24 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block lg:hidden"
                    src={header?._site?.c_headData?.headerlogo?.url}
                    alt="Your Company"
                  
                  />
                  <img
                    className="hidden lg:block"
                    src={header?._site?.c_headData?.headerlogo?.url}
                    alt="Your Company"
                 
                  />
                </div>
                <div className="hidden ml-[12rem] md:flex md:space-x-6">
               
                  {header._site?.c_headData?.menu?.map((link:any, index: number ) => (
                    
                    <Cta
                      key={link.href}
                      buttonText={link.label}
                      url={link.link}
                      style="inline-flex items-center border-b-4 rounded-none border-transparent hover:bg-white"
                    />
                    
                  ))}
                 
                </div>
                <div className="hidden ml-[14rem] md:flex md:space-x-6">
                <button><a href="#" id="button1" className="inline-flex items-center " data-test="template-nav">{header?._site?.c_headData?.aboutbttn?.label}</a></button>
                <button><a href="#" id="button2"  className="inline-flex items-center " data-test="template-nav">{header?._site?.c_headData?.contbttn?.label}</a></button>
                </div>
              </div>  
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
            {header._site?.c_headData?.menu?.map((link:any ) => (
                <Disclosure.Button
                  key={link.href}
                  as="a"
                  href={link.link}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  {link.label}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
