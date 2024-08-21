import { Badge } from "@/components/ui/badge";

const Shopsstatus = (status: string) => {
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

const Logsstatus = (status: string) => {
    switch (status) {
        case "Info":
            return <Badge>{status}</Badge>;
        case "Update":
            return <Badge variant={"warning"}>{status}</Badge>;
        case "Create":
            return <Badge variant={"success"}>{status}</Badge>;
        case "Delete":
            return <Badge variant={"destructive"}>{status}</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

export { Logsstatus, Shopsstatus };
