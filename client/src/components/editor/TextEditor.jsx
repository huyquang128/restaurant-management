/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import Toolbar from './Toolbar';

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'bulleted-list':
            return (
                <ul className="list-disc ml-6" {...attributes}>
                    {children}
                </ul>
            );
        case 'list-item':
            return <li {...attributes}>{children}</li>;

        // các case khác...
        case 'image':
            return (
                <img
                    {...attributes}
                    src={element.url}
                    alt=""
                    className="h-[400px] w-full object-cover"
                />
            );
        case 'link':
            return (
                <a {...attributes} href={element.url}>
                    {children}
                </a>
            );
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    const styles = {
        fontWeight: leaf.bold ? 'bold' : undefined,
        fontStyle: leaf.italic ? 'italic' : undefined,
        fontSize: leaf.fontSize || undefined,
        color: leaf.color || undefined, // thêm hỗ trợ màu chữ
        textDecoration: [
            leaf.underline ? 'underline' : '',
            leaf.strikethrough ? 'line-through' : '',
        ]
            .join(' ')
            .trim(),
    };

    return (
        <span {...attributes} style={styles}>
            {leaf.superscript ? (
                <sup>{children}</sup>
            ) : leaf.subscript ? (
                <sub>{children}</sub>
            ) : (
                children
            )}
        </span>
    );
};

const TextEditor = ({ editorValue, setEditorValue, editorKey }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate
            editor={editor}
            key={editorKey}
            initialValue={editorValue}
            onChange={(newValue) => {
                setEditorValue(newValue);
                // truyền về component cha để lưu
            }}
        >
            <Toolbar />
            <Editable
                renderElement={(props) => <Element {...props} />}
                renderLeaf={(props) => <Leaf {...props} />}
                autoFocus
                className="outline-none overflow-y-scroll h-[500px] bg-bg-secondary 
                            p-3 pb-20"
            />
        </Slate>
    );
};

export default TextEditor;
