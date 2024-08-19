import { useMediaQuery } from "@/lib/useMediaQuery";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ResponsiveDialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    description?: string;
}
export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({ children, isOpen, setIsOpen, title, description }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DialogHeader className="p-4">
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children}
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
