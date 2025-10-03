const ImageKit = require("imagekit");

const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


async function uploadFile(file, filename) {
    
    const response = await imagekit.upload({
        file: file,
        fileName: filename,
        folder: "cohort-ai-social",
    })

    return response

}

async function deleteFile(fileId) {
    const response = await imagekit.deleteFile(fileId);
    return response;
}

module.exports = uploadFile;
module.exports.deleteFile = deleteFile;