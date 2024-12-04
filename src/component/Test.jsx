import { useState } from "react";
import React from "react";
import Button from "@mui/material/Button";


export default function Test() {
    const [age, setAge] = useState(0);
    const [name, setName] = useState("John Doe");

    return (
      <>  
        <input value={name} onChange={(e) => setName(e.target.value)} />
    
        <Button onClick={() => setAge(age + 1)}>
            Increment Age
        </Button>
        
        <p>Hello, {name}, You are {age} </p>

      </>
    );
}