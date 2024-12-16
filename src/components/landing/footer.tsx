import Image from 'next/image'

const navigation = {
    connect: [

        {
            name: 'Twitter',
            href: 'https://x.com/Veerendra_198',
        },
        {
            name: 'Github',
            href: 'https://github.com/veerendra19codes',
        },
        {
            name: 'LinkedIn',
            href: 'https://in.linkedin.com/in/veerendragumate',
        },
    ],
    company: [
        { name: 'Pricing', href: '/' },
        { name: 'Affiliate Partner', href: '/' },
        { name: 'AI For Enterprise', href: '/' },
    ],
}

export const Footer = () => {
    return (
        <footer
            aria-labelledby="footer-heading"
            className="font-inter w-full max-w-7xl p-4 md:px-24 md:pt-24"
        >
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-2">
                <div className="flex flex-col justify-between lg:flex-row">
                    <div className="space-y-8">
                        {/* <Image
                            priority={true}
                            unoptimized={true}
                            width={100}
                            height={40}
                            src="/images/syntaxUI.svg"
                            alt="logo"
                            className="h-7 w-auto"
                        /> */}
                        <p className="text-md max-w-xs leading-6 text-gray-700 dark:text-gray-300">
                            Read, Write and Share stories on any topic
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-700  dark:text-gray-300">
                            <div>Made with ❤️ by Veerendra.</div>
                        </div>
                    </div>
                    {/* Navigations */}
                    <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
                        <div className="md:mt-0">
                            <h3 className="text-sm font-semibold leading-6 text-gray-900  dark:text-gray-200">
                                Connect
                            </h3>
                            <div className="mt-6 space-y-4">
                                {navigation.connect.map((item) => (
                                    <div key={item.name}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                                        >
                                            {item.name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div>
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                                    Company
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <div key={item.name}>
                                            <a
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                                            >
                                                {item.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-100/10">
                    <p className="text-xs leading-5 text-gray-700 dark:text-gray-300">
                        &copy; 2024 Mideum. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

