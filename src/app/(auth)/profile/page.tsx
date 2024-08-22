import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import { PageLayout } from "@/components/layout/page";

export const metadata: Metadata = {
    title: "Profile",
};

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
    const session = await getServerAuthSession();
    const getUserWithRelations = async () => {
        const user = await db.user.findFirst({
            where: {
                email: session?.user.email,
            },
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
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Profile</h1>
            </div>
            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="payment">Payment methods</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="email">Email notifications</TabsTrigger>
                    <TabsTrigger value="security">Danger Zone</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Card>
                        <CardHeader className="font-semibold">Your Name</CardHeader>
                        <CardContent>
                            <Label>Full name</Label>
                            <Input type="email" value={user.name ?? ""} className="mt-1 bg-zinc-100 dark:bg-zinc-900" />
                        </CardContent>

                        <CardFooter>
                            <Button>Update name</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="font-semibold">Your Email</CardHeader>
                        <CardContent>
                            <Label>Email address</Label>
                            <Input type="email" value={user.email ?? ""} className="mt-1 bg-zinc-100 dark:bg-zinc-900" />
                            <p className="mt-2 text-xs text-zinc-400">This account is associated with your {user.accounts[0]?.provider ? `${user.accounts[0]?.provider} account.` : "email"}</p>
                        </CardContent>

                        <CardFooter>
                            <Button>Update email</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>Multi-Factor Authentication (MFA)</CardHeader>
                        <CardContent>
                            <div className="text-sm text-zinc-400">Protect your account by adding an extra layer of security.</div>
                        </CardContent>
                        <CardFooter>
                            <Button>Enable MFA</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="payment">
                    <Card>
                        <CardHeader className="font-semibold">Payment methods</CardHeader>
                        <CardContent>
                            <Badge className="text-sm">You do not currently have any payment methods.</Badge>
                        </CardContent>
                        <CardFooter>
                            <Button>Add payment method</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="preferences">
                    <Card>
                        <CardHeader className="font-semibold">Language preferences</CardHeader>
                        <CardContent>
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
                        <CardHeader className="font-semibold">Currency preferences</CardHeader>
                        <CardContent>
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
                        <CardHeader className="font-semibold">General</CardHeader>
                        <CardContent className="flex flex-col p-0">
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
                        <CardHeader className="font-semibold">Account</CardHeader>
                        <CardContent>
                            <div>Permanently remove your account and all of its contents from UniShops.</div>
                            <div>
                                This action <span className="font-bold text-red-500">is not reversible</span>, so please continue with caution.
                            </div>
                            <Button className="mt-4" variant={"destructive"}>
                                Request Account Deletion
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </PageLayout>
    );
}
