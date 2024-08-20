'use client';

import { type MotionValue, motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { CustomLink } from "@/components/ui/link";
import { GridPattern } from "@/components/GridPattern";
import { ShoppingBagIcon, GlobeAltIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface Resource {
    href: string
    name: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    pattern: Omit<
        React.ComponentPropsWithoutRef<typeof GridPattern>,
        'width' | 'height' | 'x'
    >
}

const resources: Array<Resource> = [
    {
        href: '/stripe',
        name: 'Stripe',
        description:
            'Learn how to set up your store with Stripe to start accepting payments seamlessly.',
        icon: ShoppingBagIcon,
        pattern: {
            y: 16,
            squares: [
                [0, 1],
                [1, 3],
            ],
        },
    },    
    {
        href: '/domains',
        name: 'Add a domain',
        description:
            'Enhance your store\'s professionalism by adding a custom domain using the DNS settings.',
        icon: GlobeAltIcon,
        pattern: {
            y: 32,
            squares: [
                [0, 2],
                [1, 4],
            ],
        },
    },
    {
        href: '/profile',
        name: 'Enable MFA',
        description:
            'Secure your account by setting up multi-factor authentication for added protection.',
        icon: LockClosedIcon,
        pattern: {
            y: -6,
            squares: [
                [-1, 2],
                [1, 3],
            ],
        },
    },
    {
        href: '/resources',
        name: 'More resources',
        description:
            'Discover additional resources to help you get started and improve your store.',
        icon: DocumentTextIcon,
        pattern: {
            y: -6,
            squares: [
                [-1, 2],
                [1, 3],
            ],
        },
    },    
]

function ResourceIcon({ icon: Icon }: { icon: Resource['icon'] }) {
    return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
            <Icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
        </div>
    )
}

function ResourcePattern({
    mouseX,
    mouseY,
    ...gridProps
}: Resource['pattern'] & {
    mouseX: MotionValue<number>
    mouseY: MotionValue<number>
}) {
    const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
    const style = { maskImage, WebkitMaskImage: maskImage }

    return (
        <div className="pointer-events-none">
            <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
                <GridPattern
                    width={72}
                    height={56}
                    x="50%"
                    className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
                    {...gridProps}
                />
            </div>
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
                style={style}
            />
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={style}
            >
                <GridPattern
                    width={72}
                    height={56}
                    x="50%"
                    className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
                    {...gridProps}
                />
            </motion.div>
        </div>
    )
}

function Resource({ resource }: { resource: Resource }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function onMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            key={resource.href}
            onMouseMove={onMouseMove}
            className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
        >
            <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
            <div className="relative rounded-2xl px-4 pb-4 pt-16">
                <ResourceIcon icon={resource.icon} />
                <h3 className="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
                    <CustomLink href={resource.href} className='px-0'>
                        <span className="absolute inset-0 rounded-2xl" />
                        {resource.name}
                    </CustomLink>
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {resource.description}
                </p>
            </div>
        </div>
    )
}

export function Resources() {
    return (
        <div>
            <h1 className="text-lg font-semibold text-black dark:text-white">Explore more</h1>
            <p className="text-gray-600 dark:text-zinc-400 mb-2.5">
                Learn more about the resources available to you.
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {resources.map((resource) => (
                    <Resource key={resource.href} resource={resource} />
                ))}
            </div>
        </div>
    )
}