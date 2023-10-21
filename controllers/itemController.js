import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import { redirectTo, responseDetails } from "../utils/requestUtils.js";
import * as itemService from "../services/itemService.js";
import * as listService from "../services/listService.js";

// const addList = async (request) => {
//     const formData = await request.formData();
//     const name = formData.get("name");
//     await listService.addList(name);
//     return redirectTo("/lists");
// }

// const deactivateList = async (request) => {
//     const url = new URL(request.url);
//     const urlParts = url.pathname.split("/");
//     await listService.deactivateList(urlParts[2]);
//     return redirectTo("/lists");
// }

const addItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
    console.log(urlParts)
    await itemService.addItem(urlParts[2], name);
    return redirectTo(`/lists/${urlParts[2]}`);
}

const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await itemService.collectItem(urlParts[4]);
    return redirectTo(`/lists/${urlParts[2]}`);
}

const viewItems = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
        list: await listService.findListById(urlParts[2]),
        items: await itemService.findItemsByListId(urlParts[2])
    };

    return new Response(await renderFile("items.eta", data), responseDetails);
};

export { addItem, collectItem, viewItems };