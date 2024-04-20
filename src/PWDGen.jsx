import { useCallback, useEffect, useMemo, useState,useRef } from "react";

function PasswordGen(){

    //Since we want length,NumAllowed.CharAllowed and password to be dynamic as they will change based on our choice. We can UseState hook

    let [length,setLength]=useState(7)
    let [NumAllowed,setNumAllowed]=useState(false)
    let [CharAllowed,setCharAllowed]=useState(false)
    let [password,setPassword]=useState("d")
    const passwordRef=useRef(null) //useRef Hook is used here for selecting purpose and range purpose if required

    //Using Callback hook to memoize ranPwd fx to optimize code and run this function only if below mentioned dependencies are affected
    const ranPwd=useCallback(function RandomPassword(){
        console.log('a')
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        let pwd=""
        if(NumAllowed) str += "1234567890"
        if(CharAllowed) str += "!@#$%^&*<>|"
        for(let i=0;i<length;i++){
            let randomPwd=Math.floor((Math.random()*str.length)+1)
            pwd += str.charAt(randomPwd)
        }
        setPassword(pwd)
    },[length,NumAllowed,CharAllowed,setPassword])

    //UseEffect is used here to perform side effects in our component
    useEffect(()=>{
        ranPwd()
    },[length,NumAllowed,CharAllowed,ranPwd])
 
    //We created below function to use Window navigator clipboard property to copy password
    const copyPwdtoCB=()=>{
        passwordRef.current?.select()
        //passwordRef.current?.setSelectionRange(0,5)
        window.navigator.clipboard.writeText(password)
    }

    return (
        <div 
        className="w-full max-w-md mx-auto shadow-md mt-30 h-screen my-8"
        style={{backgroundColor:'#212121'}}
        >
            <div className="flex mb-4 overflow-hidden">
                <input 
                type="text"
                placeholder="password"
                value={password}
                className="outline-none w-full p-2 mt-20 align-middle text-center"
                readOnly
                ref={passwordRef}
                >
                </input>
                <button 
                className="mt-20"
                onClick={copyPwdtoCB}>Copy</button>
            </div>
            <div className="mt-20">
                <button onClick={ranPwd}>Generate Password</button>
            </div>
            <div className="mt-12 flex justify-evenly">
                <input 
                type="range"
                min={7}
                max={15}
                value={length}
                onChange={(e)=>{
                    setLength(e.target.value)
                }}
                 />
                <label>Length:{length}</label>
                <input 
                type="checkbox" 
                name="incNum" 
                id="numAllowed"
                defaultChecked={NumAllowed}
                onChange={()=>{
                    setNumAllowed((prev)=>!prev)
                }} />
                <label>Numbers</label>
                <input 
                type="checkbox" 
                name="incChar" 
                id="charAllowed"
                defaultChecked={CharAllowed}
                onChange={()=>{
                    setCharAllowed((prev)=>!prev)
                }}/>
                <label>Characters</label>
            </div>
        </div>
    )
}

export default PasswordGen;