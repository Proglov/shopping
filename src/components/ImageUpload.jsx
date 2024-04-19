import { Button, Grid } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoIosReturnRight } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const ImageUpload = () => {

    const [selectedImages, setSelectedImages] = useState([]);
    const inputRef = useRef();

    const handleImage = (event) => {
        const { files } = event.target
        if (files.length === 0) IoIosReturnRight
        for (let i = 0; i < files.length; i++) {
            if (!selectedImages.some(obj => obj.name === files[i].name))
                setSelectedImages((prev) => [
                    ...prev,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }
                ])
        }
    }

    const deleteImage = (name) => {
        setSelectedImages(prev => {
            let newImages = prev.filter(obj => obj.name != name)
            return newImages
        })
    }

    return (
        <div>
            {selectedImages.length !== 0 &&
                <Grid container className="" gap={0}>
                    {
                        selectedImages.map((obj, index) => {
                            return <Grid item key={index} xs={12} sm={6} md={4} lg={3} className="flex justify-center my-7 mx-1">
                                <div className="relative">
                                    <Button color="error" className="absolute text-lg" style={{ marginTop: '-25px' }} onClick={() => deleteImage(obj.name)}>
                                        <MdCancel />
                                    </Button>
                                </div>

                                <div>
                                    <Image
                                        alt="not found"
                                        width={250}
                                        height={250}
                                        src={obj.url}
                                    />
                                </div>

                            </Grid>
                        })

                    }
                    <br />
                    <br />
                </Grid>
            }


            <Button size="large" variant="outlined" onClick={() => inputRef.current.click()}>
                انتخاب
                {
                    selectedImages.length === 0 ?
                        <> تصویر </>
                        :
                        <> تصاویر بیشتر </>
                }
            </Button>


            <input
                multiple
                accept="image"
                ref={inputRef}
                className="hidden"
                type="file"
                name="myImage"
                onChange={handleImage}
            />
        </div>
    );
};

export default ImageUpload;

