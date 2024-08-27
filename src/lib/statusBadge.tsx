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
        case "Warning":
            return <Badge variant={"warning"}>{status}</Badge>;
        case "Success":
            return <Badge variant={"success"}>{status}</Badge>;
        case "Error":
            return <Badge variant={"destructive"}>{status}</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

const OrdersStatus = (status: string) => {
    switch (status) {
        case "pending":
            return <Badge variant={"warning"}>{status}</Badge>;
        case "succeeded":
            return <Badge variant={"success"}>{status}</Badge>;
        case "failed":
            return <Badge variant={"destructive"}>{status}</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

export { Logsstatus, Shopsstatus, OrdersStatus };
