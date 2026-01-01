"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Image as ImageIcon, Link as LinkIcon, Undo, Redo, Heading1, Heading2 } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
    content: string;
    onChange: (content: string) => void;
    editable?: boolean;
}

export default function TipTapEditor({ content, onChange, editable = true }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true, // For now, maybe we should upload to S3 first in real app
            }),
            Link.configure({
                openOnClick: false,
            }),
        ],
        content,
        editable,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[150px] p-4',
            },
        },
    });

    // Sync content if it changes externally (e.g. initial load or reset)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            // Only update if content is really different to avoid cursor jumps on typing
            // This check is a bit simplistic, usually you check if content changed drasticly or only set once.
            // For simple reset after submit, `editor.commands.setContent(content)` works.
             if (content === "") {
                 editor.commands.setContent("");
             }
        }
    }, [content, editor]);


    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };


    return (
        <div className="border border-base-300 rounded-lg overflow-hidden bg-white">
            {editable && (
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-base-300 bg-base-50">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`btn btn-ghost btn-sm btn-square ${editor.isActive('bold') ? 'bg-base-200' : ''}`}
                    type="button"
                >
                    <Bold size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`btn btn-ghost btn-sm btn-square ${editor.isActive('italic') ? 'bg-base-200' : ''}`}
                    type="button"
                >
                    <Italic size={16} />
                </button>
                <div className="w-px h-4 bg-base-300 mx-1"></div>
                 <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`btn btn-ghost btn-sm btn-square ${editor.isActive('heading', { level: 1 }) ? 'bg-base-200' : ''}`}
                    type="button"
                >
                    <Heading1 size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`btn btn-ghost btn-sm btn-square ${editor.isActive('heading', { level: 2 }) ? 'bg-base-200' : ''}`}
                    type="button"
                >
                    <Heading2 size={16} />
                </button>
                <div className="w-px h-4 bg-base-300 mx-1"></div>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`btn btn-ghost btn-sm btn-square ${editor.isActive('bulletList') ? 'bg-base-200' : ''}`}
                    type="button"
                >
                    <List size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`btn btn-ghost btn-sm btn-square ${editor.isActive('orderedList') ? 'bg-base-200' : ''}`}
                    type="button"
                >
                    <ListOrdered size={16} />
                </button>
                <div className="w-px h-4 bg-base-300 mx-1"></div>
                <button
                    onClick={setLink}
                    className={`btn btn-ghost btn-sm btn-square ${editor.isActive('link') ? 'bg-base-200' : ''}`}
                    type="button"
                >
                    <LinkIcon size={16} />
                </button>
                <button
                    onClick={addImage}
                    className="btn btn-ghost btn-sm btn-square"
                    type="button"
                >
                    <ImageIcon size={16} />
                </button>
                 <div className="w-px h-4 bg-base-300 mx-1"></div>
                 <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="btn btn-ghost btn-sm btn-square"
                    type="button"
                >
                    <Undo size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="btn btn-ghost btn-sm btn-square"
                    type="button"
                >
                    <Redo size={16} />
                </button>
            </div>
            )}
            <EditorContent editor={editor} className="min-h-[200px]" />
        </div>
    );
}
