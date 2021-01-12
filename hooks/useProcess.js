import { useState } from 'react';

const useProcess = () => {
    // confirmed
    // succeed
    // based
    // error
    const [status, setStatus] =useState("based")
    const [address, setAddress] = useState("")
    const [hash, setHash] = useState("")
    return {
        status,
        address,
      setAddress,  
        hash,
        setHash,
        setStatus
    };
};

export default useProcess;