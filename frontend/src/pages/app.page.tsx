import React, { useState } from "react";
import Image from "next/image";
import "@/styles/globals.css";
import useFetchPrices from "@/hooks/use-fetchPrices";

const App = (props: any) => {
  const [selectedOffchainWorkerType, setSelectedOffchainWorkerType] =
    useState("local");
  const { btcPrice, ethPrice, minaPrice, lastUpdate } = useFetchPrices();
  const dateFormatted = `${lastUpdate.toLocaleDateString("en-US", {
    weekday: "long",
  })} at ${lastUpdate.toLocaleTimeString()}`;

  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center gap-3">
                    <Image
                      className="h-8 w-8"
                      src="assets/acurast-logo.png"
                      alt="logo"
                      width={512}
                      height={512}
                    />
                    <h1 className="text-md font-bold text-white uppercase">
                      Acurast
                    </h1>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              zkOracles Dashboard
            </h1>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <div>
              <div className="flex justify-between items-center pb-8">
                <h3 className="text-md font-bold leading-6">
                  Active zkOracle Feeds
                </h3>
                <select
                  id="protocol"
                  name="protocol"
                  className="block rounded-md border-0 py-1.5 pl-3 pr-10 bg-white-700 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
                >
                  <option>Mina Berkley Testnet</option>
                </select>
              </div>
              <ul
                role="list"
                className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
              >
                <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                  <div className="flex min-w-0 gap-x-10 items-center">
                    <Image
                      className="h-8 w-8 flex-none rounded-full bg-gray-50"
                      src="assets/mina.png"
                      alt=""
                      width={64}
                      height={64}
                    />
                    <div className="grid grid-cols-8 gap-1">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <span className="absolute inset-x-0 -top-px bottom-0"></span>
                        MINA / USD
                      </p>
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <a
                          target="_blank"
                          href="https://berkeley.minaexplorer.com/wallet/B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC"
                        >
                          <span className="absolute inset-x-0 -top-px bottom-0"></span>
                          ${minaPrice}
                        </a>
                      </p>
                      <p className="text-xs leading-5 text-gray-500">
                        B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-xs leading-5 text-gray-500">
                        Last update: <time>{dateFormatted}</time>
                      </p>
                    </div>
                    <svg
                      className="h-5 w-5 flex-none text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>

                <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                  <div className="flex min-w-0 gap-x-10 items-center">
                    <Image
                      className="h-8 w-8 flex-none rounded-full bg-gray-50"
                      src="assets/bitcoin.png"
                      alt=""
                      width={64}
                      height={64}
                    />
                    <div className="grid grid-cols-8 gap-1">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <span className="absolute inset-x-0 -top-px bottom-0"></span>
                        BTC / USD
                      </p>

                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <a
                          target="_blank"
                          href="https://berkeley.minaexplorer.com/wallet/B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC"
                        >
                          <span className="absolute inset-x-0 -top-px bottom-0"></span>
                          ${btcPrice}
                        </a>
                      </p>

                      <p className="text-xs leading-5 text-gray-500">
                        B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-xs leading-5 text-gray-500">
                        Last update: <time>{dateFormatted}</time>
                      </p>
                    </div>
                    <svg
                      className="h-5 w-5 flex-none text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>

                <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                  <div className="flex min-w-0 gap-x-10 items-center">
                    <Image
                      className="h-8 w-8 flex-none rounded-full bg-gray-50"
                      src="assets/ethereum.png"
                      alt=""
                      width={64}
                      height={64}
                    />
                    <div className="grid grid-cols-8 gap-1">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <span className="absolute inset-x-0 -top-px bottom-0"></span>
                        ETH / USD
                      </p>

                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <a
                          target="_blank"
                          href="https://berkeley.minaexplorer.com/wallet/B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC"
                        >
                          <span className="absolute inset-x-0 -top-px bottom-0"></span>
                          ${ethPrice}
                        </a>
                      </p>
                      <p className="text-xs leading-5 text-gray-500">
                        B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-xs leading-5 text-gray-500">
                        Last update: <time>{dateFormatted}</time>
                      </p>
                    </div>
                    <svg
                      className="h-5 w-5 flex-none text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 mt-4">
            <h3 className="text-md font-bold leading-6 pb-5">
              Create zkOracle Feed
            </h3>
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-5">
              <div>
                <h5 className="text-md font-semibold leading-6">
                  Select Off-chain Worker
                </h5>
                <fieldset className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <label
                    className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                      selectedOffchainWorkerType === "local"
                        ? "border-indigo-600 border-2"
                        : ""
                    }`}
                    onClick={() => setSelectedOffchainWorkerType("local")}
                  >
                    <input
                      type="radio"
                      name="network-type"
                      value="Network Selection"
                      className="sr-only"
                    />
                    <span className="flex flex-1">
                      <span>
                        <span className="block text-sm font-semibold text-gray-900">
                          Local
                        </span>
                        <span className="mt-3 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-700/10">
                          Testing
                        </span>
                      </span>
                      <span
                        className="pointer-events-none absolute -inset-px rounded-lg border-2"
                        aria-hidden="true"
                      ></span>
                      {selectedOffchainWorkerType === "local" && (
                        <svg
                          className="h-5 w-5 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </label>
                  <label
                    className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                      selectedOffchainWorkerType === "acurast"
                        ? "border-indigo-600 border-2"
                        : ""
                    }`}
                    onClick={() => setSelectedOffchainWorkerType("acurast")}
                  >
                    <input
                      type="radio"
                      name="network-type"
                      value="Network Selection"
                      className="sr-only"
                    />
                    <span className="flex flex-1">
                      <span>
                        <span className="block text-sm font-semibold text-gray-900">
                          Acurast
                        </span>
                        <span className="mt-3 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-700/10">
                          Testing
                        </span>
                      </span>
                      <span
                        className="pointer-events-none absolute -inset-px rounded-lg border-2"
                        aria-hidden="true"
                      ></span>
                      {selectedOffchainWorkerType === "acurast" && (
                        <svg
                          className="h-5 w-5 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </label>
                </fieldset>
                {selectedOffchainWorkerType === "acurast" && (
                  <>
                    <div className="grid grid-cols-6 gap-6 pt-5">
                      <div className="col-span-4">
                        <div className="rounded-md bg-indigo-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-indigo-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3 flex-1 md:flex md:justify-between">
                              <div>
                                <h5 className="text-md font-semibold leading-6 text-indigo-700">
                                  Acurast Support Coming Soon
                                </h5>
                                <p className="text-sm text-indigo-700">
                                  Acurast Processors and their Trusted Execution
                                  Environments are not yet supported as
                                  off-chain workers. Mina support for Acurast
                                  will be added soon.
                                </p>
                              </div>
                            </div>
                            <p className="flex items-center mt-3 text-sm md:ml-6 md:mt-0">
                              <a
                                href="https://github.com/Acurast/mina-zkoracles#readme"
                                target="_blank"
                                className="whitespace-nowrap font-medium text-blue-700 hover:indigo-blue-600"
                              >
                                Details
                                <span aria-hidden="true"> &rarr;</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <h5 className="text-md font-semibold leading-6 pt-8 pb-3">
                  Specify Parameters
                </h5>
                <div className="grid grid-cols-6 gap-6 pb-3">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Trusted Oracle Source
                    </label>
                    <div className="w-full inline-flex">
                      <div className="w-full relative mt-2 rounded-md shadow-sm">
                        <input
                          placeholder="Public Key"
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          disabled={selectedOffchainWorkerType === "acurast"}
                        />
                      </div>
                    </div>
                    <span className="pt-3 block text-sm text-gray-500">
                      The public key of the trusted data provider.
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6 pb-3">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      API
                    </label>
                    <div className="w-full inline-flex">
                      <div className="w-full relative mt-2 rounded-md shadow-sm">
                        <input
                          placeholder="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=MINA&tsyms=USD"
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          disabled={selectedOffchainWorkerType === "acurast"}
                        />
                      </div>
                    </div>
                    <span className="pt-3 block text-sm text-gray-500">
                      The API to fetch the price data.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Interval
                    </label>
                    <div className="w-full inline-flex">
                      <div className="w-full relative mt-2 rounded-md shadow-sm">
                        <input
                          placeholder="5"
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          disabled={selectedOffchainWorkerType === "acurast"}
                        />
                      </div>
                    </div>
                    <span className="pt-3 block text-sm text-gray-500">
                      The interval for updating in minutes.
                    </span>
                  </div>
                </div>
                <div className="pt-5">
                  {selectedOffchainWorkerType === "local" && (
                    <small className="block pt-1">In Development</small>
                  )}
                  <button
                    disabled
                    className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                  >
                    Create zkOracle Feed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
