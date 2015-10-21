"use strict"

function route(pathname, handle, response, request) {
    if (typeof handle[pathname] === "function") {
        handle[pathname](response, request);
    } else {
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("404 NOT FOUND");
        response.end();
    }

}

exports.route = route;
