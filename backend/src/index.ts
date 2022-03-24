import app from "./utils/app";

const server = app();

server.listen(4000, () => {
  console.log("Server started on port 4000");
});
