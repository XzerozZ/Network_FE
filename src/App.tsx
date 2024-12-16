import React, { useState, useEffect } from "react";
import { NetworkMain,ApiRequest} from "./interface";



// สร้าง interface สำหรับข้อมูลที่ได้รับจากแต่ละพอร์ต
interface PortData {
  message: string;
}


function App() {
  // ใช้ useState พร้อมกับ type annotations


  const [networkData, setNetworkData] = useState<NetworkMain[]>([]);
  const [networkData2, setNetworkData2] = useState<NetworkMain[]>([]);
  const [networkData3, setNetworkData3] = useState<NetworkMain[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiRequest[]>([]);
  

  // ฟังก์ชัน fetch สำหรับพอร์ต 3001
  const fetchDataFromPort = async () => {
    try {
      const response = await fetch("http://localhost:8080");
      setNetworkData(await response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
    } catch (err) {
    
    }
  };
  const fetchDataFromPort1 = async () => {
    try {
      const response = await fetch("http://localhost:8081");
      setNetworkData2(await response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
    } catch (err) {
      
    }
  };
  const fetchDataFromPort2 = async () => {
    try {
      const response = await fetch("http://localhost:8082");
      setNetworkData3(await response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
    } catch (err) {
    
    }
  };
  const fetchDataFromPort3 = async () => {
    try {
      const response = await fetch("http://localhost:8082");
      setNetworkData3(await response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
    } catch (err) {
     
    }
  };

  const sendDataToPort = async (data: ApiRequest) => {
    try {
      const response = await fetch("http://localhost:8080", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setApiResponse(await response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
    } catch (err) {
    }
  }
 


 

  // ใช้ useEffect เพื่อดึงข้อมูลจากทั้ง 4 พอร์ต
  // useEffect(() => {
  //   const fetchData = async (): Promise<void> => {
  //     await Promise.all([
  //       fetchDataFromPort(),
  //       fetchDataFromPort1(),
  //       fetchDataFromPort2(),
  //       fetchDataFromPort3(),
  //       console.log(networkData),
  //       console.log(networkData2),
  //       console.log(networkData3),

        
       
  //     ]);
     
  //   };

  //   fetchData();
  // }, []);

  // แสดงผลลัพธ์
 

  return (
   <body>
    <div className="big-container">
      <div>
        <h1>Network</h1>
       

      <div>
        <h1>Add node distance</h1>
        <select>
          <option value="option1">1-2</option>
          <option value="option2">2-3</option>
          <option value="option3">1-3</option>
        </select>
       
      </div>
      <div className="flex-input">
      <input type="text" placeholder="Input 1" />
      <input type="text" placeholder="Input 2" />
      <button onClick={sendDataToPort} >submit</button>
      </div>
      </div>
      <div>
        <div className="container-1">
          <h1>Main Computer</h1>
          <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              Text on Image
              </div>
            </div>
        </div>
        <div className="container-2">
            <div>
            <h1>Computer 1</h1>
            <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              Text on Image
              </div>
            </div>
            </div>
          <div>
          <h1>Computer 2</h1>
          <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              Text on Image
              </div>
            </div>
          </div>
          <div>
            <h1>Computer 3</h1>
            <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              Text on Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </body>
  );
}

export default App;
