import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import { redirectTo, responseDetails } from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await listService.addList(name);
    return redirectTo("/lists");
}

const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listService.deactivateList(urlParts[2]);
    return redirectTo("/lists");
}

const viewLists = async (request) => {
    const data = {
        lists: await listService.findActiveLists()
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};

export { addList, deactivateList, viewLists };