import { Sparkles, Code, Palette } from 'lucide-react'

interface Feature {
    id: number
    name: string
    description: string
    icon: JSX.Element
}

const iconSize = 18

const FeaturesData: Feature[] = [
    {
        id: 1,
        name: 'Easy to Use',
        description:
            'Mideum designed to be intuitive and easy to use.',
        icon: <Sparkles size={iconSize} className="bg-transparent" />,
    },
    {
        id: 2,
        name: 'Customizable',
        description:
            'Customize the look and feel of application to match your mood and design.',
        icon: <Palette size={iconSize} />,
    },
    {
        id: 3,
        name: 'Advanced Filters',
        description:
            'Filter posts and authors according to your needs seamlessly',
        icon: <Code size={iconSize} />,
    },

]

const FeaturesGrid = () => {
    return (
        <div>
            <div className="mt-8 grid w-full grid-cols-2 gap-12 md:grid-cols-2 lg:grid-cols-3 p-24">
                {FeaturesData.map((feature) => {
                    return (
                        <div key={feature.id} className="width-fit text-left">
                            <div className="mb-2 w-fit rounded-lg bg-red-500 p-1 text-center text-white ">
                                {feature.icon}
                            </div>
                            <div className="text-md mb-1 font-semibold text-gray-900 dark:text-gray-100">
                                {feature.name}
                            </div>
                            <div className="font-regular max-w-sm text-xs text-gray-600  dark:text-gray-400">
                                {feature.description}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const Features = () => {
    return (
        <div className="my-12 flex w-full flex-col items-center justify-center">
            <h1 className="mb-2 max-w-3xl text-center text-2xl font-semibold tracking-tighter text-gray-900 md:text-3xl dark:text-gray-100">
                Mideum Features
            </h1>
            <p className="max-w-sm text-center text-sm text-gray-600 dark:text-gray-400">
                Experience the new age blog/stories website
            </p>
            <FeaturesGrid />
        </div>
    )
}
