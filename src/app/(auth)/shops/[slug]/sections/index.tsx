import OverviewTabsSection from "./overview";
import ProductsTabsSection from "./products";
import SatisticsTabsSection from "./satistics";
import ThemesTabsSection from "./themes";
import SettingsTabsSection from "./settings";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface AwaitTabsSectionProps {
    element?: number;
}

function AwaitTabsSection({ element = 4 }: AwaitTabsSectionProps) {

    // make array of elements
    const elements = Array.from({ length: element });

    return (
        <div className="mt-4 space-y-4">
            <div className="flex w-full gap-4">
                {elements.map((_, index) => (
                    <Card key={index} className="animate-pulse w-full h-20 p-4">
                        <CardDescription className="w-1/3 h-4 bg-zinc-800 rounded-full" />
                        <CardTitle className="mt-4 w-3/4 h-4 bg-zinc-800 rounded-full" />
                    </Card>
                ))}                
            </div>
            <Card className="animate-pulse h-40 p-4">
                <CardDescription className="w-1/3 h-4 bg-zinc-800 rounded-full" />
                <CardTitle className="mt-4 w-3/4 h-4 bg-zinc-800 rounded-full" />
            </Card>
        </div>
    )
}


export { AwaitTabsSection, OverviewTabsSection, ProductsTabsSection, SatisticsTabsSection, ThemesTabsSection, SettingsTabsSection };
