

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Color} from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import {ListItem} from "@tiptap/extension-list-item";
import {Placeholder} from "@tiptap/extension-placeholder";
import {Link as EditorLink} from "@tiptap/extension-link";
import {Toolbar} from "@/Toolbar.jsx";


export default function TipTap() {
    const editor = useEditor({
        extensions: [
            Color.configure({types: [TextStyle.name, ListItem.name]}),
            TextStyle.configure({types: [ListItem.name]}),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
            Placeholder.configure({
                placeholder: 'Tulis deskripsi produk disini...',
            }),
            EditorLink.configure({
                openOnClick: true,
                defaultProtocol: 'https',
                autolink: false,
            }),
        ],
        editorProps: {
            attributes: {
                class: "max-w-[29rem] prose prose-xl prose-blue min-h-[100px] w-full bg-background px-3 py-2 text-sm rounded-md placeholder:text-muted-foreground outline-none "
            }
        },
    })


    return (
        <div className={"w-full border border-input rounded-md flex flex-col ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"}>
            <EditorContent editor={editor}/>
            <Toolbar editor={editor}/>
        </div>
    )
}

