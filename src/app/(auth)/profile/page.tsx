import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { db } from "@/server/db";

type EmailNotification = {
    id: string;
    name: string;
    description: string;
    checked: boolean;
    disabled: boolean;
};

const emailNotifications: EmailNotification[] = [
    {
        id: "security",
        name: "🔒 Security alerts",
        description: "Receive notifications about suspicious activity on your account.",
        checked: true,
        disabled: true,
    },
    {
        id: "new_orders",
        name: "🛍️ New orders",
        description: "Receive notifications when a new order is validated.",
        checked: true,
        disabled: false,
    },
    {
        id: "new_updates",
        name: "🎉 New updates",
        description: "Receive notifications when new features are released.",
        checked: true,
        disabled: false,
    },
];

// server side
export default async function Profile() {
    const getUserWithRelations = async () => {
        const user = await db.user.findFirst({
            include: {
                accounts: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    };

    const user = await getUserWithRelations();

    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Profile</h1>
            </div>
            <Tabs defaultValue="profile" className="mx-auto max-w-5xl px-6">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="payment">Payment methods</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="email">Email notifications</TabsTrigger>
                    <TabsTrigger value="security">Danger Zone</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            Your Email
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <Label>Email address</Label>
                            <Input type="email" placeholder="Email" value={user.email ?? ""} className="mt-1 bg-zinc-100 dark:bg-zinc-900" />
                        </CardContent>
                        <CardFooter variant={"bordered"}>This account is associated with your {user.accounts[0]?.provider} account.</CardFooter>
                    </Card>

                    <Card>
                        <CardHeader variant={"bordered"}>Multi-Factor Authentication (MFA)</CardHeader>
                        <CardContent variant={"bordered"}>
                            <div>Protect your account by adding an extra layer of security.</div>
                            <Button className="mt-4">Enable MFA</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            Payment methods
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <Badge className="text-sm">You do not currently have any payment methods.</Badge>
                        </CardContent>
                        <CardFooter variant={"bordered"}>
                            <Button variant={"outline"} size={"sm"}>
                                Add payment method
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="preferences">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            Language preferences
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <Select>
                                <SelectTrigger className="mt-1 bg-zinc-100 dark:bg-zinc-900">
                                    <SelectValue placeholder="English"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="english" defaultChecked>
                                        English
                                    </SelectItem>
                                    <SelectItem value="french">French</SelectItem>
                                    <SelectItem value="german">German</SelectItem>
                                    <SelectItem value="italian">Italian</SelectItem>
                                    <SelectItem value="spanish">Spanish</SelectItem>
                                    <SelectItem value="portuguese">Portuguese</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            Currency preferences
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <Select>
                                <SelectTrigger className="mt-1 bg-zinc-100 dark:bg-zinc-900">
                                    <SelectValue placeholder="Swiss Franc CHF" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="chf" defaultChecked>
                                        Swiss Franc CHF
                                    </SelectItem>
                                    <SelectItem value="eur">Euro €</SelectItem>
                                    <SelectItem value="usd">US Dollar $</SelectItem>
                                    <SelectItem value="cad">Canadian Dollar $</SelectItem>
                                    <SelectItem value="gbp">British Pound £</SelectItem>
                                    <SelectItem value="aud">Australian Dollar $</SelectItem>
                                    <SelectItem value="jpy">Japanese Yen ¥</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="email">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            General
                        </CardHeader>
                        <CardContent variant={"bordered"} className="flex flex-col p-0">
                            {emailNotifications.map((notification, notificationIDX) => (
                                <>
                                    <div key={notification.id} className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                        <div className="flex flex-col gap-1">
                                            <Label className="text-base">{notification.name}</Label>
                                            <div className="text-sm text-zinc-600 dark:text-zinc-400">{notification.description}</div>
                                        </div>
                                        <Switch checked={notification.checked} disabled={notification.disabled} />
                                    </div>
                                    {notificationIDX === emailNotifications.length - 1 ? null : <hr className="border-zinc-200 dark:border-zinc-800" />}
                                </>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            Account
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <div>Permanently remove your account and all of its contents from Resend.</div>
                            <div>This action is not reversible, so please continue with caution.</div>
                            <Button className="mt-4" variant={"destructive"}>
                                Request Account Deletion
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    );
}
