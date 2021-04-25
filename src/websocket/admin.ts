import{io} from "../http";
import{ConnectionService} from "../services/ConnectionService";
import{MessagesService} from "../services/MessagesService";

io.on("connect", async(socket) => {
  const connectionService = new ConnectionService();
  const messagesService = new MessagesService();

  const allConnectionWithoutAdmin = await connectionService.findAllWithoutAdmin();
  // emitir para todos admin
  io.emit("admin_list_all_users", allConnectionWithoutAdmin);

  socket.on("admin_list_messages_by_user",async (params,callback) => {
      const {user_id} = params;

      const allMenssages = await messagesService.listByUser(user_id);
      callback(allMenssages);
  })

  socket.on("admin_send_massage", async (params) => {
    const {user_id,text} = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id
    });

    const {socked_id} = await connectionService.findById(user_id);
    io.to(socked_id).emit("admin_send_to_client", {
      text,
      socked_id:socket.id,
    });
  });
});