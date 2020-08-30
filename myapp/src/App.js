import React, { Component, useState, useEffect } from 'react';
import './App.css';
// import ReactTable from "react-table";  
// import "react-table/react-table.css";  

function App() {

  const [data,setdata] = useState([])
  const [originaldata,setoriginaldata] = useState([])
  const [firstnameFilter,setFirstNameFilter] = useState("")
  const [lastnameFilter,setLastNameFilter] = useState("")
  const [phoneFilter,setPhoneFilter] = useState("")

  const inputChanged = (e,inputType) =>{
    if(inputType=='firstname'){
      setFirstNameFilter(e.target.value);
      setdata(originaldata.filter(item=>{
        return item.firstname.includes(e.target.value);
      }))
    }
    else if(inputType=='lastname'){
      setLastNameFilter(e.target.value);
      setdata(originaldata.filter(item=>{
        return item.lastname.includes(e.target.value);
      }))
    }
    else if(inputType=='phone'){
      setPhoneFilter(e.target.value);
      setdata(originaldata.filter(item=>{
        return item.phone.includes(e.target.value);
      }))
    }
  }


  useEffect(() =>{
    fetch('/data',{method:"post"}).then(res=>res.json()).then(result=>{
          setdata(result.result)
          setoriginaldata(result.result)
      })
  },[])

  return (
    <div className="App">
      <h1>Assessment</h1>
     <table className="center">
     <tr>
	    <th><input type="text" placeholder="First name" value={firstnameFilter} onChange={e=>inputChanged(e,"firstname")}/></th>
      <th><input type="text" placeholder="Last name" value={lastnameFilter} onChange={e=>inputChanged(e,"lastname")}/></th>
	    <th><input type="text" placeholder="Phone" value={phoneFilter} onChange={e=>inputChanged(e,"phone")}/></th>
    </tr>
    {data.map(item =>{
      return (
	<tr>
    <td>{item.firstname}</td>
    <td>{item.lastname}</td>
		<td>{item.phone}</td>

	</tr>)
})
}
     </table>
    </div>
  );
}

export default App;
