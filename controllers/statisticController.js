import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import { responseDetails } from "../utils/requestUtils.js";
import * as itemService from "../services/itemService.js";
import * as listService from "../services/listService.js";


const viewStatistics = async (request) => {
    const data = {
        numLists: await listService.countLists(),
        numItems: await itemService.countItems()
    };
    console.log(data)
    return new Response(await renderFile("index.eta", data), responseDetails);
};

export { viewStatistics };