import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TimeTableProps {
    time: Date;
}
export default function TimeTable({ time }: TimeTableProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <p>{timeDifference(Date.now(), time.getTime())}</p>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{displayTime(time.getTime())}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

const timeDifference = (current: number, previous: number) => {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;
    const milliSecondsPerMonth = milliSecondsPerDay * 30;
    const milliSecondsPerYear = milliSecondsPerDay * 365;
    const elapsed = current - previous;
    if (elapsed < milliSecondsPerMinute / 3) {
        return "just now";
    }
    if (elapsed < milliSecondsPerMinute) {
        return "less than 1 minute ago";
    } else if (elapsed < milliSecondsPerHour) {
        return Math.round(elapsed / milliSecondsPerMinute) + (Math.round(elapsed / milliSecondsPerMinute) > 1 ? " minutes ago" : " minute ago");
    } else if (elapsed < milliSecondsPerDay) {
        return Math.round(elapsed / milliSecondsPerHour) + (Math.round(elapsed / milliSecondsPerHour) > 1 ? " hours ago" : " hour ago");
    } else if (elapsed < milliSecondsPerMonth) {
        return Math.round(elapsed / milliSecondsPerDay) + (Math.round(elapsed / milliSecondsPerDay) > 1 ? " days ago" : " day ago");
    } else if (elapsed < milliSecondsPerYear) {
        return Math.round(elapsed / milliSecondsPerMonth) + (Math.round(elapsed / milliSecondsPerMonth) > 1 ? " months ago" : " month ago");
    } else {
        return Math.round(elapsed / milliSecondsPerYear) + (Math.round(elapsed / milliSecondsPerYear) > 1 ? " years ago" : " year ago");
    }
};

const displayTime = (time: number) => {
    const date = new Date(time);
    // i want to display the time in this format : 25 August 2024 - 13:33:00
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}