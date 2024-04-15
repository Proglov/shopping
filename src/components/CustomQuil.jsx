import dynamic from "next/dynamic";
import { useMemo } from "react";

export function CustomQuill({ onChange, value }) {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        [],
    );

    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons

            [{ list: "ordered" }, { list: "bullet" }],
            [{ direction: "rtl" }], // text direction

            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["link"],

        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "color",
        "align",
    ];

    return (
        <div>
            <ReactQuill
                className="mt-4 text-slate-700 bg-white shadow-lg"
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={onChange}
                value={value}
                style={{ minHeight: '400px' }}
            />
        </div>
    );
}

export default CustomQuill;