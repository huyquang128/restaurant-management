/* eslint-disable react/prop-types */
const serialize = (nodes) => {
    if (nodes)
        return nodes
            .map((node) => {
                if (node.text !== undefined) {
                    let text = node.text || '';

                    if (node.bold) text = `<strong>${text}</strong>`;
                    if (node.italic) text = `<em>${text}</em>`;
                    if (node.fontSize)
                        text = `<span style="font-size:${node.fontSize}">${text}</span>`;

                    return text || '<br />';
                }

                const children = serialize(node.children || []);

                switch (node.type) {
                    case 'paragraph':
                        // Nếu không có nội dung con hoặc chỉ có <br />, vẫn tạo dòng trống
                        return `<p>${
                            children.trim() === '' ? '<br />' : children
                        }</p>`;
                    case 'bulleted-list':
                        return `<ul>${children}</ul>`;
                    case 'list-item':
                        return `<li>${children}</li>`;
                    case 'link':
                        return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${children}</a>`;
                    case 'image':
                        return `<img src="${node.url}" alt="image" style="max-width: 100%; display: block; margin: 1em 0;" />`;
                    default:
                        return children;
                }
            })
            .join('');
};

const SlateViewer = ({ content }) => {
    const html = serialize(content);

    return <div className="mt-5" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default SlateViewer;
