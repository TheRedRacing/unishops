"use client";

import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisHorizontalIcon, DocumentDuplicateIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

import { EditDialogForm } from "./edit";
import { DeleteDialogForm } from "./delete";

interface DropdownProps {
    shopId: string;
    shopName: string;
}
export const DropdownTable: React.FC<DropdownProps> = ({ shopId, shopName }) => {
    const [DropDownOpen, setDropDownOpen] = useState(false);
    const [getDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [getEditDialogOpen, setEditDialogOpen] = useState(false);

    return (
        <DropdownMenu
            open={DropDownOpen}
            onOpenChange={(open) => {
                setDropDownOpen(open);
            }}
        >
            <DropdownMenuTrigger>
                <EllipsisHorizontalIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <EditDialogForm shopId={shopId} shopName={shopName} setDropDownOpen={setDropDownOpen} getEditDialogOpen={getEditDialogOpen} setDialogOpen={setEditDialogOpen} />                    
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                    <DeleteDialogForm shopId={shopId} shopName={shopName} setDropDownOpen={setDropDownOpen} deleteDialogOpen={getDeleteDialogOpen} setDialogOpen={setDeleteDialogOpen} /> 
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const DropdownDetail: React.FC<DropdownProps> = ({ shopId, shopName }) => {
    const [DropDownOpen, setDropDownOpen] = useState(false);
    const [getDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <DropdownMenu
            open={DropDownOpen}
            onOpenChange={(open) => {
                setDropDownOpen(open);
            }}
        >
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <ArrowTopRightOnSquareIcon className="mr-2 h-5 w-5" />
                    Stripe details
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DocumentTextIcon className="mr-2 h-5 w-5" />
                    Stripe docs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                    <DeleteDialogForm shopId={shopId} shopName={shopName} setDropDownOpen={setDropDownOpen} deleteDialogOpen={getDeleteDialogOpen} setDialogOpen={setDeleteDialogOpen} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
