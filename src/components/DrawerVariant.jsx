 import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Plus, X, MoreHorizontal } from "lucide-react"
import { Label } from "@/components/ui/label.jsx"
import { Input } from "@/components/ui/input.jsx"
import { NumericFormat } from "react-number-format"
import { Controller, useFieldArray, useForm } from "react-hook-form"

import * as React from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Badge } from "@/components/ui/badge.jsx"

export function Variant() {
    const [open, setOpen] = useState(false)
    const [theArray, setTheArray] = useState([])

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        control,
    } = useForm({
        defaultValues: [
            {
                variantName: "",
                option: [{ val: "", prc: "" }],
            },
        ],
    })

    const columns = [
        {
            accessorKey: "variantName",
            header: "Nama Varian",
            cell: ({ row }) => <div>{row.getValue("variantName")}</div>,
        },
        {
            accessorKey: "option",
            header: "Opsi",
            cell: ({ row }) => (
                <div className={"flex flex-wrap gap-1"}>
                    {row.getValue("option").map((option, index) => (
                        <Badge key={index}>{option.val}</Badge>
                    ))}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const data = row.original
                return (
                    <div className={"flex justify-center"}>
                        <Drawer>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => {}}
                                        asChild
                                        variant={"ghost"}
                                        className={
                                            "flex h-fit w-full cursor-default select-none justify-start rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                        }>
                                        <DrawerTrigger>Edit</DrawerTrigger>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className={"text-rose-600 hover:!bg-destructive hover:!text-white"} onClick={() => handleRemoveItem(row.getValue("variantName"))}>
                                        Hapus Varian
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Draw state={1} register={register} control={control} handleSubmit={handleSubmit} errors={errors} setTheArray={setTheArray} origin={data.variantName} />
                        </Drawer>
                    </div>
                )
            },
        },
    ]

    function handleRemoveItem(variantName) {
        setTheArray((l) => l.filter((item) => item.variantName !== variantName))
    }

    return (
        <div className="grid gap-3">
            <div className={"flex items-center justify-between"}>
                <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                    Varian Produk
                </Label>
                <DrawerVariant state={0} register={register} control={control} handleSubmit={handleSubmit} errors={errors} setTheArray={setTheArray} reset={reset} />
            </div>
            <TableVariant data={theArray} columns={columns} />
        </div>
    )
}

function TableVariant({ data, columns }) {
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
    })

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function DrawerVariant({ register, handleSubmit, control, errors, setTheArray, reset }) {
    return (
        <Drawer>
            <DrawerTrigger onClick={reset} asChild>
                <Button variant={"ghost"} className={"w-fit font-semibold text-blue-500 hover:bg-blue-100/60 hover:text-blue-500"}>
                    <Plus size={18} strokeWidth={3} className={"me-2"} /> Tambah Varian
                </Button>
            </DrawerTrigger>

            <Draw state={0} register={register} control={control} handleSubmit={handleSubmit} errors={errors} setTheArray={setTheArray} />
        </Drawer>
    )
}

function Draw({ state, register, handleSubmit, control, errors, setTheArray, origin }) {
    const addVariant = (data) => {
        setTheArray((oldArray) => [...oldArray, data])
    }

    const { fields, append, remove } = useFieldArray({
        name: "option",
        control,
    })

    return (
        <DrawerContent>
            <div className="mx-auto w-full">
                <form
                    onSubmit={handleSubmit((data) => {
                        if (state === 0) addVariant(data)
                    })}>
                    <div className="mx-auto h-fit max-h-[28rem] min-h-0 w-full overflow-y-scroll border-b-2">
                        <div className={"mx-auto w-full max-w-lg"}>
                            <DrawerHeader>
                                <DrawerTitle>Tambah Varian Produk</DrawerTitle>
                            </DrawerHeader>

                            <div className=" flex w-full gap-4 p-4 pb-0">
                                <div className={"grid w-full gap-3"}>
                                    <Label className={"font-semibold text-gray-600"}>Nama Varian</Label>

                                    {state === 0 ? (
                                        <Input {...register(`variantName`, { required: true })} placeholder="Tulis nama produk disini..." className={"font-normal placeholder:text-gray-400"} />
                                    ) : (
                                        <Input
                                            {...register(`variantName`, { required: true })}
                                            defaultValue={origin}
                                            placeholder="Tulis nama produk disini..."
                                            className={"font-normal placeholder:text-gray-400"}
                                        />
                                    )}
                                </div>
                                <Button
                                    type={"button"}
                                    className={"w-fit place-self-end font-semibold"}
                                    onClick={() => {
                                        append({
                                            val: "",
                                            prc: 0,
                                        })
                                    }}>
                                    <Plus size={18} strokeWidth={3} className={"me-2"} /> Tambah Opsi
                                </Button>
                            </div>
                            <div className={"] grid gap-1 p-4"}>
                                {fields.map((field, index) => (
                                    <div key={field.id} className={"group flex gap-2 rounded-md p-4 hover:bg-accent"}>
                                        <Label className={"grid w-full shrink gap-3 font-semibold text-gray-600"}>
                                            {fields.length > 1 ? `Opsi ${index + 1}` : `Opsi`}
                                            <div>
                                                <Input
                                                    {...register(`option.${index}.val`, { required: true })}
                                                    placeholder="Tulis opsi disini..."
                                                    className={"font-normal placeholder:text-gray-400"}
                                                />
                                            </div>
                                        </Label>
                                        <Label className={"grid w-full shrink gap-3 font-semibold text-gray-600"}>
                                            Harga
                                            <div
                                                className={
                                                    "flex h-10 w-full gap-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none"
                                                }>
                                                <div className={"h-full place-content-center rounded-md bg-gray-100 px-3 font-semibold text-gray-500 ring-1 ring-input"}>Rp</div>
                                                <Controller
                                                    render={({ field: { onChange, name, value } }) => (
                                                        <NumericFormat
                                                            placeholder="0,00"
                                                            name={name}
                                                            value={value}
                                                            onValueChange={(v) => onChange(Number(v.value))}
                                                            decimalSeparator={","}
                                                            thousandSeparator={"."}
                                                            className={"w-full rounded-md border-none pe-3 font-semibold outline-none placeholder:text-gray-400"}
                                                        />
                                                    )}
                                                    rules={{ required: true }}
                                                    name={`option.${index}.prc`}
                                                    control={control}
                                                />
                                            </div>
                                        </Label>
                                        <Button
                                            size={"icon"}
                                            onClick={() => remove(index)}
                                            type={"button"}
                                            className={`shrink-0 place-self-end border border-rose-500 bg-white text-rose-500 ring-rose-300 transition-all hover:bg-rose-600 hover:text-white hover:ring-4`}>
                                            <X />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DrawerFooter className={"mx-auto w-full max-w-lg"}>
                        <DrawerClose asChild>
                            <Button type={"submit"} className={"font-semibold"}>
                                Simpan
                            </Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                        <p>{errors.option?.root?.message}</p>
                    </DrawerFooter>
                </form>
            </div>
        </DrawerContent>
    )
}
