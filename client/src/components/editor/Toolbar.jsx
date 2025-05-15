import { useSlate } from 'slate-react';
import {
    insertImage,
    insertLink,
    toggleBlock,
    toggleColor,
    toggleFontSize,
    toggleMark,
} from './handleMarks';
import { useState } from 'react';
import bold_black from '@/assets/icon/icon_word/bold_black.svg';
import italic_black from '@/assets/icon/icon_word/italic_black.svg';
import justify_black from '@/assets/icon/icon_word/justify_black.svg';
import list_ul_black from '@/assets/icon/icon_word/list_ul_black.svg';
import picture_black from '@/assets/icon/icon_word/picture_black.svg';
import underline_black from '@/assets/icon/icon_word/underline_black.svg';
import strike_through from '@/assets/icon/icon_word/strike_through.svg';

const Toolbar = () => {
    const editor = useSlate();
    // const [urlImg, setUrlImg] = useState();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        insertImage(editor, URL.createObjectURL(event.target.files[0]), file); // base64 hoặc blob
    };

    return (
        <div
            className="flex gap-5 bg-border-primary rounded-t-lg 
                        px-5 items-center"
        >
            <button
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleMark(editor, 'bold');
                }}
                className="p-3 cursor-pointer"
                type="button"
            >
                <img src={bold_black} alt="" />
            </button>

            {/*  */}
            <button
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleMark(editor, 'italic');
                }}
                className="p-3 cursor-pointer"
                type="button"
            >
                <img src={italic_black} alt="" />
            </button>

            {/*  */}
            {/* <button
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleMark(editor, 'italic');
                }}
                className="p-3 cursor-pointer relative"
            >
                <div className="font-medium ">A</div>
                <div className="font-medium w-5 h-1 bg-blue-500 absolute bottom-3 right-1/2 translate-x-1/2"></div>
            </button> */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                {/* Các nút khác... */}
                <input
                    type="color"
                    onChange={(e) => toggleColor(editor, e.target.value)}
                    onMouseDown={(e) => e.preventDefault()}
                    title="Đổi màu chữ"
                />
            </div>

            {/*  */}
            <button
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleBlock(editor, 'bulleted-list');
                }}
                type="button"
                className="p-3 cursor-pointer"
            >
                <img src={list_ul_black} alt="" />
            </button>

            {/*  */}
            <label htmlFor="image" className="cursor-pointer">
                <img src={picture_black} alt="" />
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    style={{ display: 'none', marginLeft: 8 }}
                    onChange={(event) => handleImageUpload(event)}
                />
            </label>

            {/*  */}
            <button
                onMouseDown={(event) => {
                    event.preventDefault();
                    const url = window.prompt('Nhập URL liên kết:');
                    if (!url) return;
                    insertLink(editor, url);
                }}
                type="button"
                className="p-3 cursor-pointer"
            >
                🔗
            </button>
            <select
                onChange={(event) => {
                    const size = event.target.value;
                    toggleFontSize(editor, size);
                }}
                className="p-3 bg-border-primary border border-gray-300 
                            outline-none cursor-pointer rounded-lg"
            >
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="20px">20</option>
                <option value="24px">24</option>
                <option value="32px">32</option>
            </select>
        </div>
    );
};

export default Toolbar;
