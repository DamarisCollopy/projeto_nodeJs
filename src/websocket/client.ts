import{io} from "../http";
import{ConnectionService} from "../services/ConnectionService";
import{UsersService} from "../services/UsersService";
import{MessagesService} from "../services/MessagesService";
import { Message } from "../entities/Message";

interface IParams {
  text:string;
  email:string;
}

io.on("connect", (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UsersService();
  const messageService = new MessagesService();


  socket.on("client_first_access", async (params) => {
    const socked_id = socket.id;
    const {text,email} = params as IParams;
    let user_id = null;

    const userExist = await userService.findByEmail(email);

    if(!userExist){
      const user = await userService.create(email);
      await connectionService.create({
        socked_id,
        user_id : user.id
    });
    user_id = user.id;
  } else{
    user_id = userExist.id;
    const connection = await connectionService.findById(userExist.id)

    if(!connection){
    await connectionService.create({
      socked_id,
      user_id:userExist.id
    });
  }else{
    connection.socked_id = socked_id;
    await connectionService.create(connection);
    }
  }
  await messageService.create({
    text,
    user_id,
  });
  
  const allMenssages = await messageService.listByUser(user_id);

  socket.emit("client_list_all_messages", allMenssages);

  const allUsers = await connectionService.findAllWithoutAdmin();
  io.emit("admin_list_all_users", allUsers);
       
  });

  socket.on("client_send_to_admin", async (params) => {
    const {text,socket_admin_id} = params;

    const socket_id = socket.id;
    const {user_id} = await connectionService.findBySockerId(socket.id);
    
    
    const message = await messageService.create({
      text,
      user_id,
    });
    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    })
  });

  socket.on("admin_user_in_support", async (params)=> {
    const {user_id} = params;
    await connectionService.updateAdminId(user_id, socket.id);
  })
});         