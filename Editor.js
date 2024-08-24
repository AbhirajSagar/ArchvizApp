import { app } from './InitialiseFirebase.js';
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";


const storage = getStorage(app);
const modelsRef = ref(storage, '3DElements/');
const hdriRef = ref(storage,'HDRIs/')
const errorThumbnailCard = `<span class = "material-symbols-outlined" style = "margin-bottom:10px;color:white;">error</span>
    <h2 class = "subheadingTxt" style = "font-weight:200;color:white;font-size:0.8rem;text-align:center;">Error Loading Preview</h2>`;


listRef(modelsRef,'3DElements','ModelsList','png','modelcard',loadAsset);
listRef(hdriRef,'HDRIs','HDRIList','jpg','hdricard',applyHDRI);

async function fetchDownloadURL(fileRef)
{
    try 
    {
        return await getDownloadURL(fileRef);
    }
    catch (error) 
    {
        console.error("Error fetching download URL:", error);
        throw error;
    }
}

async function fetchThumbnailURL(modelName,basePath,thumbnailExtension)
{
    const thumbnailRef = ref(storage, `${basePath}/Thumbnails/${modelName}.${thumbnailExtension}`);
    return await fetchDownloadURL(thumbnailRef);
}

async function processRef(itemRef,basePath,parentElementID,thumbnailExtension,cssCardClass,callBackApplication) 
{
    const modelName = itemRef.name.split('.')[0];
    try 
    {
        const [thumbnailURL, itemURL] = await Promise.all([fetchThumbnailURL(modelName,basePath,thumbnailExtension),fetchDownloadURL(itemRef)]);
        createCard(itemURL,thumbnailURL,parentElementID,cssCardClass,callBackApplication);
    } 
    catch (error) 
    {
        console.error("Error processing model:", error);
        createErrorCard(parentElementID,cssCardClass);
    }
}


async function listRef(modelsRef,basePath,parentElementID,thumbnailExtension,cssCardClass,callBackApplication)
{
    try 
    {
        const result = await listAll(modelsRef);
        result.items.forEach(itemRef => processRef(itemRef, basePath, parentElementID,thumbnailExtension,cssCardClass,callBackApplication));
    }
    catch(error)
    {
        console.error("Error listing files:", error);
    }
}

function createCard(itemURL, thumbnailURL,parentElementID,cssCardClass,callBackApplication)
{
    const modelCard = document.createElement("div");
    modelCard.className = cssCardClass;
    modelCard.style.backgroundImage = `url(${thumbnailURL})`;
    modelCard.onclick = () => callBackApplication(itemURL);
    
    const List = document.getElementById(parentElementID);
    List.appendChild(modelCard);
}

function createErrorCard(parentElementID,cssCardClass)
{
    const modelCard = document.createElement("div");
    modelCard.className = cssCardClass;
    modelCard.innerHTML = errorThumbnailCard;
    const List = document.getElementById(parentElementID);
    List.appendChild(modelCard);
}

