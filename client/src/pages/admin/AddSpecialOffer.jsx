import Button from '@/components/common/Button/Button';
import ToastMsg from '@/components/common/ToastMsg';
import TextEditor from '@/components/editor/TextEditor';
import { addPost, getPostSlug, updatePost, uploadImg } from '@/redux/postSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputCommon from '@/components/common/InputCommon';
import { useParams } from 'react-router';

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

function AddSpecialOffer() {
    const dispatch = useDispatch();

    const { slug } = useParams();

    const userStore = useSelector((state) => state.user.user);
    const postStore = useSelector((state) => state.post);

    const [editorValue, setEditorValue] = useState(initialValue);
    const [editorKey, setEditorKey] = useState(0);
    console.log('🚀 ~ AddSpecialOffer ~ editorValue:', editorValue);

    useEffect(() => {
        dispatch(getPostSlug(slug)).then((data) => {
            if (data.payload.success) {
                const result = JSON.parse(data.payload.data.content);
                setEditorValue(result);
                setEditorKey((prev) => prev + 1);
            }
        });
    }, [dispatch, slug]);

    const formik = useFormik({
        initialValues: {
            ...postStore.valueFormInput,
            // valueHeadingPost,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required(
                'Tiêu đề bài viết không được để trống'
            ),
        }),
        onSubmit: async (values) => {
            const updatedNodes = await Promise.all(
                editorValue.map(async (node) => {
                    try {
                        if (node.type === 'image' && node.file) {
                            const formData = new FormData();
                            formData.append('image', node.file);

                            const response = await dispatch(
                                uploadImg(formData)
                            );

                            return {
                                ...node,
                                url: response.payload.data.url,
                                file: undefined,
                            };
                        }
                    } catch (err) {
                        console.error('Error uploading image:', err);
                    }

                    return node;
                })
            );

            const formData = new FormData();

            formData.append('userId', userStore._id);
            formData.append('title', values.title);
            formData.append('type', 'specialOffer');
            formData.append('content', JSON.stringify(updatedNodes));

            dispatch(
                slug
                    ? updatePost({ id: postStore.post?._id, formData })
                    : addPost(formData)
            ).then((data) => {
                if (data.payload?.success) {
                    ToastMsg({
                        msg: `${
                            slug ? 'Đã cập nhật bài biết' : 'Đã đăng bài viết'
                        }`,
                    });
                }
            });
        },
    });

    return (
        <div className="font-cabin relative">
            <div className="text-xl font-medium mb-5">
                {slug ? 'chỉnh sửa' : 'Thêm'} các bài viết ưu đãi
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                    <InputCommon
                        id="title"
                        label="Tiêu đề bài viết"
                        type="text"
                        placeholder="Tiêu đề bài viết"
                        formik={formik}
                    />
                </div>
                <div
                    className="hover:shadow-header-shadow rounded-lg overflow-hidden
                            transition-shadow ease-linear duration-300"
                >
                    <TextEditor
                        editorValue={editorValue}
                        setEditorValue={setEditorValue}
                        editorKey={editorKey}
                    />
                </div>
                <div className=" mt-10 flex justify-end">
                    <div className="w-40">
                        <Button
                            bg="save"
                            title={slug ? 'Cập nhật' : 'Đăng bài'}
                            // handleClick={handleSubmit}
                            type="submit"
                            olor_ring={postStore.isLoading}
                        />
                    </div>
                </div>
            </form>

            {postStore.isLoading && (
                <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
}

export default AddSpecialOffer;
