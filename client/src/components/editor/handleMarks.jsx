import { Editor, Transforms, Element as SlateElement } from 'slate';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

export const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format,
    });
    return !!match;
};

export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    // Nếu đang ở trong list và người dùng bấm lại thì unwrap list
    Transforms.unwrapNodes(editor, {
        match: (n) =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    });

    const newType = isActive ? 'paragraph' : isList ? 'list-item' : format;

    // Đổi kiểu block hiện tại (vd: thành list-item)
    Transforms.setNodes(editor, { type: newType });

    // Nếu là list (ul/ol), thì bọc lại trong bulleted/numbered-list
    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

export const insertImage = (editor, url, file) => {
    const imageNode = {
        type: 'image',
        url,
        file,
        children: [{ text: '' }],
    };

    // Chèn node ảnh
    Transforms.insertNodes(editor, imageNode);

    // Thêm đoạn văn trống dưới ảnh
    const paragraph = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, paragraph);

    // Di chuyển con trỏ xuống đoạn văn trống đó
    const { selection } = editor;
    if (selection) {
        const [lastNodeEntry] = Editor.nodes(editor, {
            match: (n) => SlateElement.isElement(n) && n.type === 'paragraph',
            reverse: true,
        });

        if (lastNodeEntry) {
            const [, lastPath] = lastNodeEntry;
            Transforms.select(editor, Editor.end(editor, lastPath));
        }
    }
};

export const insertLink = (editor, url) => {
    const link = {
        type: 'link',
        url,
        children: [{ text: url }],
    };
    Transforms.insertNodes(editor, link);
};

export const toggleFontSize = (editor, size) => {
    Editor.addMark(editor, 'fontSize', size);
};

export const toggleColor = (editor, color) => {
    Editor.addMark(editor, 'color', color);
};
