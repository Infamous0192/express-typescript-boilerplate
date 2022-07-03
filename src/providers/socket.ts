import { Server, Socket } from 'socket.io'

function socketIoHandler(io: Server) {
  io.on('connection', async (socket: Socket) => {
    
  })

  // channelModel.watch().on('change', async (change) => {
  //   console.log(change)
  //   const channel = await channelModel.find()
  //   io.emit('refresh-channel', channel)
  // })
}

export default socketIoHandler
