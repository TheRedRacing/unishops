import Stripe from "stripe";
import { type Shop } from "@prisma/client";

import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardTitle, EmptyCard } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomLink } from "@/components/ui/link";
import TimeTable from "@/components/timeTable";

import getDecimals from "@/lib/getDecimals";
import { OrdersStatus } from "@/lib/statusBadge";

async function ThemesTabsSection({ shop }: { shop: Shop }) {
    return (
        <>
            
        </>
    );
}

export default ThemesTabsSection;