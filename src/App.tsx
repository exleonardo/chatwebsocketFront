import React , {useEffect , useState} from 'react';
import './App.css';
import {io} from "socket.io-client";

const socket = io('wss://test-back-socket-six.vercel.app');
function App() {
  const [messages , setMessages]=useState<Array<any>>([])
  const [message,setMessage]= useState('')
  useEffect ( () => {
socket.on("init-messages-published",(messages)=>{
  setMessages(messages)
})
    socket.on("new-message-sent",(message)=>{
      setMessages((prevState)=>[...prevState,message])
    })
  } , [] );
  return (
    <>
      <div style={{ display: 'flex' , justifyContent: 'center',marginTop:'50px' }}>
        <div style={{
          border: '1px solid black' ,
          height: '300px' ,
          padding: '10px' ,
          overflowY: 'scroll' ,
          width: '300px'
        }}>{messages.map ( (m) => {
          return <div key={m.id}>
            <b>{m.user.name}:</b>{m.message}
            <hr/>
          </div>

        } )}

        </div>

      </div>
      <div style={{ display: 'flex' , justifyContent: 'center', }} >
        <textarea style={{width: '260px'}} value={message} onChange={(e)=>setMessage(e.currentTarget.value)} />
        <button style={{width:'55px'}} onClick={()=>{socket.emit('client-message-sent',message);
          setMessage('')
        }}>send</button>
      </div>
    </>

  );
}

export default App;
