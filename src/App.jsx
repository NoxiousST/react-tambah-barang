"use client"

import { useState } from "react"
import { ArrowLeft, UploadCloud, X, Trash, Plus, EllipsisVertical, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.jsx"
import TipTap from "@/TipTap.jsx"
import { NumericFormat } from "react-number-format"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx"
import { Variant } from "@/components/DrawerVariant.jsx"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.jsx"


function App() {
    const [kategori, setKategori] = useState([1])
    const [variant, setVariant] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const maxFiles = 5

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files)

        if (selectedImages.length + files.length > maxFiles) {
            toast.error(`Jumlah file yang dapat diupload tidak lebih dari ${maxFiles}`)
            return
        }
        setSelectedImages((prevImages) => prevImages.concat(files))
    }

    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
    }

    const addKategori = () => {
        setKategori([...kategori, { id: kategori.length }])
    }
    const deleteKategori = (id) => {
        setKategori(kategori.filter((element) => element.id !== id))
    }

    /*const addVariant = () => {
        setVariant([
            ...variant,
            {
                id: variant.length,
            },
        ])
    }
    const deleteVariant = (id) => {
        setVariant(kategori.variant((element) => element.id !== id))
    }*/

    return (
        <div className={"grid"}>
            <header className={"grid h-16 w-full items-center bg-blue-50 text-center text-xl font-bold text-blue-500"}>Header</header>
            <div className="mx-auto flex w-fit flex-col gap-8 p-12">
                <div className="flex w-full gap-4 py-4">
                    <Button variant={"outline"} size={"icon"} className={"text-gray-600 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:ring-4"}>
                        <ArrowLeft strokeWidth={3} className={"h-5 w-5"} />
                    </Button>
                    <div>
                        <p className="text-sm text-gray-500">Kembali ke beranda</p>
                        <h4 className="text-xl font-bold">Tambah Barang</h4>
                    </div>
                </div>
                <div className={"w-full pb-8"}>
                    <div className="flex w-full gap-20">
                        {/*Left-Hand side*/}
                        <div className="flex w-[32rem] flex-col gap-6">
                            <fieldset className="grid w-full gap-6 rounded-lg border-2 p-4">
                                <legend className="-ml-1 px-1 text-lg font-bold text-blue-500">Deskripsi</legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                                        Nama Produk
                                    </Label>
                                    <Input id="title" type="text" placeholder="Tulis nama produk disini..." className={"placeholder:text-gray-400"} />
                                </div>
                                <div className={"grid gap-3"}>
                                    <Label htmlFor="description" className={"font-semibold text-gray-600"}>
                                        Deskripsi Produk
                                    </Label>
                                    <TipTap />
                                </div>
                            </fieldset>

                            <fieldset className="grid w-full gap-6 rounded-lg border-2 p-4">
                                <legend className="-ml-1 px-1 text-lg font-bold text-blue-500">Kategori</legend>
                                <div className="grid gap-4">
                                    {kategori.map((element, index) => (
                                        <div className="grid gap-3" key={element.id}>
                                            <Label htmlFor="kategori" className={"font-semibold text-gray-600"}>
                                                {kategori.length > 1 ? `Kategori Produk ${index + 1}` : `Kategori Produk`}
                                            </Label>
                                            <div className={"flex gap-4"}>
                                                <div className={"w-full capitalize"}>
                                                    <Select>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Pilih kategori produk..." />
                                                        </SelectTrigger>
                                                        <SelectContent className={"capitalize"}>
                                                            <SelectGroup>
                                                                <SelectLabel>Kategori Produk</SelectLabel>
                                                                <SelectItem value="furniture">Furniture</SelectItem>
                                                                <SelectItem value="perhiasan">Perhiasan</SelectItem>
                                                                <SelectItem value="lukisan">Lukisan</SelectItem>
                                                                <SelectItem value="mainan">Mainan</SelectItem>
                                                                <SelectItem value="senjata">Senjata</SelectItem>
                                                                <SelectItem value="alat musik">Alat Musik</SelectItem>
                                                                <SelectItem value="karya seni">Karya Seni</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <Button
                                                    disabled={kategori.length < 2}
                                                    size={"icon"}
                                                    onClick={() => deleteKategori(element.id)}
                                                    className={`shrink-0 bg-rose-500 hover:bg-rose-600 ${index === 0 ? "hidden" : "visible"}`}>
                                                    <Trash />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={"grid justify-end"}>
                                    <Button onClick={addKategori} className={"w-fit font-semibold"}>
                                        <Plus size={18} strokeWidth={3} className={"me-2"} /> Tambah Kategori
                                    </Button>
                                </div>
                            </fieldset>

                            <fieldset className="grid w-full gap-6 rounded-lg border-2 p-4">
                                <legend className="-ml-1 px-1 text-lg font-bold text-blue-500">Pembelian</legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                                        Tempat Pembelian
                                    </Label>
                                    <Input id="title" type="url" placeholder="https://www.example.com" className={"placeholder:text-gray-400"} />
                                </div>
                            </fieldset>

                            <fieldset className="grid w-full gap-6 rounded-lg border-2 p-4">
                                <legend className="-ml-1 px-1 text-lg font-bold text-blue-500">Varian</legend>
                                <Variant/>
                            </fieldset>
                        </div>

                        {/*Right-Hand side*/}
                        <div className="flex w-[32rem] flex-col gap-6">
                            <fieldset className="grid w-full gap-6 rounded-lg border-2 p-4">
                                <legend className="-ml-1 px-1 text-lg font-bold text-blue-500">Gambar Produk</legend>
                                <div className="grid gap-3">
                                    <Label
                                        htmlFor="files"
                                        className="group flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-500 bg-blue-50 transition-colors hover:bg-blue-100/70">
                                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                            <UploadCloud className={"group-hover:animate-bounce h-10 w-10 stroke-blue-600"} />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG (MAX. 50MB)</p>
                                        </div>
                                        <Input id="files" type="file" className="hidden" onChange={handleImageChange} multiple accept="image/png, image/jpeg" />
                                    </Label>
                                    <div className={"flex gap-2"}>
                                        {selectedImages.map((image, index) => {
                                            const imageUrl = URL.createObjectURL(image)
                                            return (
                                                <div className={"relative"} key={index}>
                                                    <img src={imageUrl} alt="Preview" className={"h-[88px] w-[88px] rounded-md"} />
                                                    <Button onClick={() => handleRemoveImage(index)} className={"absolute right-0 top-0 h-6 w-6 bg-rose-500 px-0 hover:bg-rose-600"}>
                                                        <X className={"absolute h-4 w-4"} strokeWidth={3} />
                                                    </Button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="grid w-full gap-6 rounded-lg border-2 p-4">
                                <legend className="-ml-1 px-1 text-lg font-bold text-blue-500">Berat & Ukuran</legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                                        Berat Produk
                                    </Label>
                                    <div
                                        className={
                                            "flex h-10 w-full gap-2 rounded-md border border-input bg-background ps-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none"
                                        }>
                                        <NumericFormat placeholder="0,00" decimalSeparator={","} thousandSeparator={"."} className={"w-full border-none outline-none placeholder:text-gray-400"} />
                                        <div className={"h-full place-content-center rounded-md bg-gray-100 px-3 text-gray-500 ring-1 ring-input"}>gram</div>
                                    </div>
                                </div>
                                <div className={"flex gap-4"}>
                                    <div className="grid gap-3">
                                        <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                                            Panjang
                                        </Label>
                                        <div
                                            className={
                                                "flex h-10 w-full gap-2 rounded-md border border-input bg-background ps-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none"
                                            }>
                                            <NumericFormat placeholder="0,00" decimalSeparator={","} thousandSeparator={"."} className={"w-full border-none outline-none placeholder:text-gray-400"} />
                                            <div className={"h-full place-content-center rounded-md bg-gray-100 px-3 text-gray-500 ring-1 ring-input"}>cm</div>
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                                            Lebar
                                        </Label>
                                        <div
                                            className={
                                                "flex h-10 w-full gap-2 rounded-md border border-input bg-background ps-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none"
                                            }>
                                            <NumericFormat placeholder="0,00" decimalSeparator={","} thousandSeparator={"."} className={"w-full border-none outline-none placeholder:text-gray-400"} />
                                            <div className={"h-full place-content-center rounded-md bg-gray-100 px-3 text-gray-500 ring-1 ring-input"}>cm</div>
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                                            Tinggi
                                        </Label>
                                        <div
                                            className={
                                                "flex h-10 w-full gap-2 rounded-md border border-input bg-background ps-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none"
                                            }>
                                            <NumericFormat placeholder="0,00" decimalSeparator={","} thousandSeparator={"."} className={"w-full border-none outline-none placeholder:text-gray-400"} />
                                            <div className={"h-full place-content-center rounded-md bg-gray-100 px-3 text-gray-500 ring-1 ring-input"}>cm</div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="grid w-full gap-6 rounded-lg border-2 p-4">
                                <legend className="-ml-1 px-1 text-lg font-bold text-blue-500">Harga</legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="title" className={"font-semibold text-gray-600"}>
                                        Harga Produk
                                    </Label>
                                    <div
                                        className={
                                            "flex h-10 w-full gap-2 rounded-md border border-input bg-background pe-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none"
                                        }>
                                        <div className={"h-full place-content-center rounded-md bg-gray-100 px-3 font-semibold text-gray-500 ring-1 ring-input"}>Rp</div>
                                        <NumericFormat
                                            placeholder="0,00"
                                            decimalSeparator={","}
                                            thousandSeparator={"."}
                                            className={"w-full border-none font-semibold outline-none placeholder:text-gray-400"}
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <div className="my-6 flex justify-end gap-4">
                                <Button variant={"secondary"} className={"bg-blue-50 font-semibold text-blue-500 hover:bg-blue-100/60"}>
                                    Buang Perubahan
                                </Button>
                                <Button className={"duration-400 font-semibold transition-all hover:ring-4"}>Tambah Barang</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={"grid h-24 w-full items-center bg-blue-50 text-center text-xl font-bold text-blue-500"}>Footer</footer>
        </div>
    )
}

const variantList = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
]

export default App
