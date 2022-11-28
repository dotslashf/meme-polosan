import { Disclosure } from "@headlessui/react";
import { cn } from "../utils/helpers";

let navigation = [{ name: "Home", href: "/", current: false }];

export default function NavbarLoading() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex space-x-4 animate-pulse">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-slate-600 text-slate-600"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
            </div>
          </div>
        </>
      }
    </Disclosure>
  );
}
