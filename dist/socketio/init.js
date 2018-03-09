module.exports = (io) => {
    io.sockets.on("connection", (client) => {
        client.on("nextSlide", (token) => {
            io.sockets.emit(token, { action: "NEXT" });
        });
        client.on("previousSlide", (token) => {
            io.sockets.emit(token, { action: "PREVIOUS" });
        });
        client.on("action", (token) => {
            console.log(token);
            io.sockets.emit(token, { action: "OPEN_VIEW" });
        });
    });
};
