const cloudinary_upload_preset = "adisil-angadi";
const cloudinary_cloud_name = "ogjzkx3t";

const cloudinary_upload_image_api_url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/image/upload`

export const uploadImageToCloudinary = async (file) => {
    console.log("INSIDE uploadImageToCloundinary")
    const data =  new FormData();
    data.append("file",file);
    data.append("upload_preset", cloudinary_upload_preset);
    data.append("cloud_name", cloudinary_cloud_name);

    const response = await fetch(cloudinary_upload_image_api_url, {
        method: "post",
        body: data
        }
    );

    const fileData = await response.json();
    console.log("Cloudinary api call is over ..... fileData :",fileData);
    return fileData.url;
}