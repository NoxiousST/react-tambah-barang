import {Editor} from "@tiptap/react"
import {Toggle} from "@/components/ui/toggle.jsx";
import {Bold, Italic, Link, Strikethrough, Unlink, List, ListOrdered, ClipboardPaste} from "lucide-react";
import {useCallback, useState} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";

Toolbar.propTypes = {
    editor: Editor
};

export function Toolbar({editor}) {
    const [url, setUrl] = useState('');

    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    const setLink = useCallback(() => {

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()
            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({href: url}).run()
    }, [url, editor])

    if (!editor) return null


    return (
        <div className={"flex flex-wrap justify-end z-10 gap-1"}>
            <Toggle size={"sm"} pressed={editor.isActive("bold")}
                    onPressedChange={() => editor.chain().focus().focus().toggleBold().run()}>
                <Bold className={"w-4 h-4"} strokeWidth={3}/>
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("italic")}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
                <Italic className={"w-4 h-4"} strokeWidth={3}/>
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("strike")}
                    onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
                <Strikethrough className={"w-4 h-4"} strokeWidth={3}/>
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("bulletList")}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
                <List className={"w-4 h-4"} strokeWidth={3}/>
            </Toggle>
            <Toggle size={"sm"} pressed={editor.isActive("orderedList")}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
                <ListOrdered className={"w-4 h-4"} strokeWidth={3}/>
            </Toggle>

            <Dialog>
                <DialogTrigger asChild>
                    <Toggle size={"sm"}>
                        <Link className={"w-4 h-4"} strokeWidth={3}/>
                    </Toggle>
                </DialogTrigger>
                <DialogContent className="flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Link ke URL</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input id="link" type="text"
                                   onChange={handleInputChange}
                                   value={editor.getAttributes('link').href}
                                   placeholder={"https://www.example.com"}/>
                        </div>
                        <Button type="submit" size="sm" className="px-3">
                            <span className="sr-only">Paste</span>
                            <ClipboardPaste className="h-4 w-4"/>
                        </Button>
                    </div>
                    <DialogFooter className="w-fit">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <Button type="button" onClick={() => setLink()}>
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>

            </Dialog>

            <Toggle size={"sm"} pressed={editor.isActive("link")}
                    onPressedChange={() => editor.chain().focus().unsetLink().run()}>
                <Unlink className={"w-4 h-4"} strokeWidth={3}/>
            </Toggle>

        </div>
    )
}
