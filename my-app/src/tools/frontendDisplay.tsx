import React, {useState} from 'react'

import '../App.css';
import {collection, addDoc, doc, onSnapshot, query, writeBatch} from "firebase/firestore";
import {db} from "../services/firebase";
import {User} from "../tools/users";
//import {userConverter} from "./tools/converter";
import { handleDelete } from '../tools/handleActions';


    export default function Form(){
      //all of the states that the frontend uses
      const [myName, setName] = useState('');
      const [mySurname, setSurname] = useState('');
      const [myEmail, setEmail] = useState('');

      const [users, setUsers] = useState<User[]>();

      const [editName, setEditName] = useState('');
      const [editSurname, setEditSurname] = useState('');
      const [editEmail, setEditEmail] = useState('');
      const [refId, setRefId] = useState('');


      //when a button is pressed data from a row is being send to the database 
      const handleSubmit = async () => {
          const docRef = await addDoc(collection(db, "users"), {
              name: myName,
              login: myEmail,
              surname: mySurname,
              isDeleted: false
              });
          console.log("Document written with ID: ", docRef.id);
          setName('');
          setSurname('');
          setEmail('');
      }

      //function that edits data in a row
      const handleEdit = async (id: string, name: string, surname: string, login: string) => {
        setEditName(name);
        setEditSurname(surname);
        setEditEmail(login);
        setRefId(id);
      }

      //function that changes user data when given an id 
      const handleConfirm = async (id: string, name: string, surname: string, login: string) => {
        try 
        {
          const batch = writeBatch(db);
          const docRef = doc(db, "users", id);
          await batch.update(docRef, {name: editName});
          await batch.update(docRef, {surname: editSurname});
          await batch.update(docRef, {login: editEmail});
          await batch.commit();
          setEditName('');
          setEditSurname('');
          setEditEmail('');
        } 
        catch (error) 
        {
          console.log(error);
        }
      }
      
      //observer that monitor changes in the database
      const q = query(collection(db, "users"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
          users.push({
            login: doc.data().login,
            name: doc.data().name,
            surname: doc.data().surname,
            id: doc.id,
            isDeleted: doc.data().isDeleted
          });
          setUsers(users);
        })
      });


      //crates table and interface with action buttons
      return (
          <div>
              <input 
                  type="text" 
                  placeholder="name" 
                  value={myName} 
                  onChange={(e) => setName(e.target.value)} 
              />
              <input 
                  type="text" 
                  placeholder="surname" 
                  value={mySurname} 
                  onChange={(e) => setSurname(e.target.value)} 
              />
              <input 
                  type="text" 
                  placeholder="email" 
                  value={myEmail} 
                  onChange={(e) => setEmail(e.target.value)} 
              />
              <button onClick={handleSubmit}>Submit</button> 


              <h1 style={{ color: 'green' }}>List of users</h1>
              <table border={1} width="30%" cellPadding={10}>
                <tbody>
                    <tr>
                        <td>User id</td>
                        <th>Name </th>
                        <th>Surname</th>
                        <th>Login</th>
                        <th>Options</th>
                    </tr>
                    {users !== undefined && users.length < 1 ?
                        <tr>
                            <td colSpan={4}>NO data Enter yet !</td>
                        </tr>:
                        users?.map((info, ind) => 
                        {
                          if(info.isDeleted !== true) {
                            return (
                                <tr key={ind}>
                                    <td>{info.id}</td>
                                    <td>{info.name}</td>
                                    <td>{info.surname}</td>
                                    <td>{info.login}</td>
                                    <td>
                                      <button onClick={async () => handleDelete(info.id)}>Delete</button>
                                      <button onClick={async () => 
                                        handleEdit(info.id, info.name, info.surname, info.login)}>Edit</button>
                                    </td>
                                </tr>
                            )
                          }
                        })
                    } 
                    <div className="tableHeader">Edit data</div>
                    <input 
                      type="text" 
                      placeholder="name" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}/>
                    <input 
                      type="text" 
                      placeholder="surname" 
                      value={editSurname} 
                      onChange={(e) => setEditSurname(e.target.value)}/>
                    <input 
                      type="text" 
                      placeholder="email" 
                      value={editEmail} 
                      onChange={(e) => setEditEmail(e.target.value)}/>
                    <button onClick={() => handleConfirm(refId, editName, editSurname, editEmail)}>Confirm</button> 
                </tbody>
              </table>
            </div>
      )
  }