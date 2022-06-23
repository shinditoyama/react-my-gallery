import { auth, storage } from "../services/firebase";
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const getAllFile = async () => {
    const list = [];

    const imageRef = ref(storage, "images");
    const imageList = await listAll(imageRef);

    for (let i in imageList.items) {
        const imageUrl = await getDownloadURL(imageList.items[i]);

        list.push({ name: imageList.items[i].name, url: imageUrl });
    }

    return list;
}

export const uploadFile = async (file) => {
    const types = ["image/png", "image/jpg", "image/jpeg"];

    if (types.includes(file.type)) {
        const randomName = Date.now();
        const imageRef = ref(storage, `images/${randomName}`);

        const upload = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(upload.ref);

        return { name: upload.ref.name, url: url }
    } else {
        return new Error("Tipo de arquivo inválido");
    }
}

export const deleteFile = async (name) => {
    const imageRef = ref(storage, `images/${name}`);
    await deleteObject(imageRef);
}

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => { 
            console.log(err) 
        });
}

export const googleSignOut = () => {
    signOut(auth);
}