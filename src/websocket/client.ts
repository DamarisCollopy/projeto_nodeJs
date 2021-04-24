import{io} from "../http";
import{ConnectionService} from "../services/ConnectionService";
import{UsersService} from "../services/UsersService";
import{MessagesService} from "../services/MessagesService";

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

  
    
  });
});         