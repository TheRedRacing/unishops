'use client';

import { useState } from "react";

import { ResponsiveDialog } from "@/components/responsiveDialog";
import EditForm from "@/components/forms/editForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DocumentDuplicateIcon, EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DeleteForm } from "@/components/forms/deleteForm";

interface DropdownTablesMenuProps {
    shopId: string;
    shopName: string;
}

export const DropdownTablesMenu: React.FC<DropdownTablesMenuProps> = ({ shopId, shopName }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] z-50">
                    <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
                        <PencilSquareIcon className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
                        Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onSelect={() => setIsDeleteOpen(true)}>
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ResponsiveDialog
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                title="Edit shop"
                description="Edit the name of the shop."
            >
                <EditForm shopId={shopId} shopName={shopName} setIsOpen={setIsEditOpen} />
            </ResponsiveDialog>
            <ResponsiveDialog
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                title="Delete shop"
                description={`Are you sure you want to delete the ${shopName} shop ?`}
            >
                <DeleteForm shopId={shopId} setIsOpen={setIsDeleteOpen} />
            </ResponsiveDialog>
        </>
    )
};