import { configure, serve } from "./deps.js";
import * as shoppingController from "./controllers/statisticController.js";
import * as itemController from "./controllers/itemController.js";
import * as listController from "./controllers/listController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});


const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/lists") {
    if (request.method === "POST") {
      return listController.addList(request);
    }
    return listController.viewLists(request);
  }
  if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return listController.deactivateList(request);
  }
  if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return itemController.collectItem(request);
  }
  if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return itemController.addItem(request);
  }
  if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return itemController.viewItems(request);
  }

  return shoppingController.viewStatistics(request);
};

serve(handleRequest, { port: 7777 });
