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
        // Success: ce qui a fonctionné
        case "charge":
        case "payment":
        case "payout":
        case "transfer":
        case "topup":
            return <Badge className="capitalize" variant={"success"}>{status}</Badge>;

        // Warning: ce qui requiert l'attention
        case "pending":
        case "advance":
        case "connect_collection_transfer":
        case "obligation_outbound":
        case "payment_network_reserve_hold":
        case "reserved_funds":
            return <Badge className="capitalize" variant={"warning"}>{status}</Badge>;

        // Destructive: ce qui a été remboursé, annulé, ou en erreur
        case "failed":
        case "refund":
        case "refund_failure":
        case "payment_refund":
        case "payment_failure_refund":
        case "payout_cancel":
        case "payout_failure":
        case "transfer_cancel":
        case "transfer_failure":
        case "transfer_refund":
        case "topup_reversal":
        case "advance_funding":
        case "anticipation_repayment":
        case "application_fee_refund":
        case "climate_order_refund":
        case "issuing_dispute":
        case "payment_reversal":
        case "obligation_reversal_inbound":
            return <Badge className="capitalize" variant={"destructive"}>{status}</Badge>;

        // Default: pour les autres transactions
        default:
            return <Badge className="capitalize">{status}</Badge>;
    }
};


export { Logsstatus, Shopsstatus, OrdersStatus };
