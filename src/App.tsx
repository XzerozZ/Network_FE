import React, { useState, useEffect } from "react";
import { NetworkMain } from "./interface";

function App() {
  // State variables for network data
  const [networkData, setNetworkData] = useState<NetworkMain>();
  const [networkData1, setNetworkData1] = useState<NetworkMain>();
  const [networkData2, setNetworkData2] = useState<NetworkMain>();
  const [networkData3, setNetworkData3] = useState<NetworkMain>();

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [input1, setInput1] = useState<string>(""); 
  const [input2, setInput2] = useState<string>(""); 
  const [input3, setInput3] = useState<number>(0);

  // Fetch data for each port
  const fetchDataFromPort = async (port: number, setData: React.Dispatch<React.SetStateAction<NetworkMain | undefined>>) => {
    try {
      const response = await fetch(`http://localhost:${port}/distances`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error fetching data from port ${port}:`, error);
    }
  };

  // Fetch all ports and manage loading state
  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchDataFromPort(8080, setNetworkData),
      fetchDataFromPort(8081, setNetworkData1),
      fetchDataFromPort(8082, setNetworkData2),
      fetchDataFromPort(8083, setNetworkData3),
    ]);
    setIsLoading(false);
  };

  // Handle POST request
  const handleClick = async () => {
    try {
      const payload = {
        source: "node" + input1,
        dest: "node" + input2,
        weight: input3,
      };

      const response = await fetch("http://localhost:8080/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Response from API:", await response.json());

      // Fetch updated data after 5 seconds
      setTimeout(fetchData, 5);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  // Handle select change
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case "option1":
        setInput1("1");
        setInput2("2");
        break;
      case "option2":
        setInput1("2");
        setInput2("3");
        break;
      case "option3":
        setInput1("1");
        setInput2("3");
        break;
      default:
        setInput1("");
        setInput2("");
    }
  };
  const handleClear = async () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow" as RequestRedirect
    };
    
    fetch("http://localhost:8080/restart", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.reload(); // Reload the page
      })
      .catch((error) => console.error(error));
  }

  // Fetch data on component mount and set up polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
  
    <div className="big-container">
      <div>
        <h1>Network</h1>
       

      <div>
        <h1>Add node distance</h1>
       
      </div>
      <div className="flex-input">
      <select onChange={handleSelectChange} className="select">
          <option value="">Select Node</option>
          <option value="option1">Node 1-2</option>
          <option value="option2">Node 2-3</option>
          <option value="option3">Node 1-3</option>
        </select>
      <input
        type="text"
        placeholder="Input 1"
        value={input1}
        onChange={(e) => setInput1(e.target.value)} 
        disabled
        className="input"
      />
      <input
        type="text"
        placeholder="Input 2"
        value={input2}
        onChange={(e) => setInput2(e.target.value)} 
        disabled
        className="input"
      />
      <input
        type="number"
        placeholder="Input 3"
        value={input3}
        onChange={(e) => setInput3(Number(e.target.value))} 
        className="input"
      />
      <button onClick={handleClick} className="button">SUBMIT</button>
      <button onClick={handleClear} className="button">CLEAR</button>


      </div>
      </div>
      <div>
        <div className="container-1">
          <h1>Main Computer</h1>
          <h2>Port : 8080</h2>
          <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div>
                  node 1 : {networkData?.node1}
                </div>
                <div>
                  node 2: {networkData?.node2}
                </div>
                <div>
                  node 3 : {networkData?.node3}
                </div>
              </div>
            )}
              </div>
            </div>
        </div>
        <div className="connector">
            <div>
              <div className="line-1"></div>
            </div>
         
          <div className="line"></div>
        </div>
        <div className="line-con">
           
          <div>
              <div className="line-2"></div>
          </div>  
        </div>
        <div className="threeline">
           
           <div>
               <div className="line-1"></div>
           </div> 
           <div>
               <div className="line-1"></div>
           </div> 
           <div>
               <div className="line-1"></div>
           </div> 
         </div>
        <div className="container-2">
            <div>
            <h1 className="text-1">Computer 1</h1>
            <h2 className="text-1">Port : 8081</h2>
            <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              <div className="text-com">
              node 1 : {networkData1?.node1} 
              </div>
              <div className="text-com">
              node 2: {networkData1?.node2} 
              </div>
              <div className="text-com">
              node 3 : {networkData1?.node3}           
              </div>
              </div>
            </div>
            </div>
          <div>
          <h1 className="text-2">Computer 2</h1>
          <h2 className="text-2">Port : 8082</h2>
          <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              <div className="text-com">
              node 1 : {networkData2?.node1} 
              </div>
              <div className="text-com">
              node 2: {networkData2?.node2} 
              </div>
              <div className="text-com">
              node 3 : {networkData2?.node3}           
              </div>

              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3">Computer 3</h1>
            <h2 className="text-3">Port : 8083</h2>
            <div style={{ position: "relative" }}>
              <img src="src/assets/computer.png" alt="pic" className="pic" />
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              <div className="text-com">
              node 1 : {networkData3?.node1} 
              </div>
              <div className="text-com">
              node 2: {networkData3?.node2} 
              </div>
              <div className="text-com">
              node 3 : {networkData3?.node3}           
              </div>
              <div>
              
             
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default App;
