import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useEffect, useState } from "react";

export function ResearchObjectiveEditor({ content, onChange, hoveredTextUsedFromTask }: { content: string; onChange: (content: string) => void; hoveredTextUsedFromTask: string | null }) {
  const [isEmpty, setIsEmpty] = useState<boolean>(content === "" || content === "<p></p>");
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold capitalize",
          levels: [2],
        },
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-6",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none text-prose",
      },
    },
    onUpdate: ({ editor }) => {
      setIsEmpty(editor.isEmpty);
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      setIsEmpty(editor.isEmpty);
    }
  }, [editor]);

  return (
    <div className="relative max-w-prose">
      <EditorContent editor={editor} />
      {isEmpty && (
        <div className="absolute inset-0 text-gray-400 pointer-events-none">
          <p>Write your research objective here...</p>
        </div>
      )}
    </div>
  );
}
