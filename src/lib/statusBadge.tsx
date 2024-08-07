import { Badge } from "@/components/ui/badge";

const status = (status: string) => {
    switch (status) {
        case "Draft":
            return <Badge>{status}</Badge>;
        case "Maintenance":
            return <Badge variant={"warning"}>{status}</Badge>;
        case "Published":
            return <Badge variant={"success"}>{status}</Badge>;
        case "Archived":
            return <Badge variant={"destructive"}>{status}</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

export { status };