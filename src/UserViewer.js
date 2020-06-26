import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from "react-apollo-hooks";
import { Table } from 'react-bootstrap';

export const GET_USERS = gql`
  query GetUser {
    users {
      id
      firstname
      lastname
      middlemame
      prefix
      nickname
      addressline1
      addressline2
      zipCode
      city
      state
      country
      friends
      hobbies

    }
  }
`;



class Checkbox extends React.Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
  }

  render() {
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
              type="checkbox"
              checked={isChecked}
              onChange={this.toggleCheckboxChange}
          />
        </label>
      </div>
    );
  }
}
export default function UserViewer() {
  const { data, loading } = useQuery(GET_USERS);
  console.log(data);
  return (
    <div>
      {loading?<h1>Loading</h1>:
              <Table>
                  <thead>
                  
                  <tr>
                  <td rowSpan="2"></td>
                  <th colSpan="5" scope="colgroup">Name</th>
                  <th colSpan="6" scope="colgroup">Address</th>
                  <th colSpan="1" scope="colgroup">Friends</th>
                  <th colSpan="1" scope="colgroup">Hobbies</th>
                  </tr>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Middle Name</th>
                    <th scope="col">Prefix</th>
                    <th scope="col">Nick Name</th>
                    <th scope="col">Line1</th>
                    <th scope="col">Line2</th>
                    <th scope="col">Zip</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Country</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.users.map(user => (
                      <tr key={user.id}>
                      <td><Checkbox/></td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.middlemame}</td>
                      <td>{user.prefix}</td>
                      <td>{user.nickname}</td>
                      <td>{user.addressline1}</td>
                      <td>{user.addressline2}</td>
                      <td>{user.zipCode}</td>
                      <td>{user.city}</td>
                      <td>{user.state}</td>
                      <td>{user.country}</td>
                      <td>{user.friends.map((friend) => {
                        //console.log(parseInt(friend));
                        return <span>{data.users[parseInt(friend)].firstname+" "}</span>})}</td>
                      <td>{user.hobbies.map(hobby => (<span>{hobby+"  "}</span>))}</td>
  
                      </tr>
                  ))}
                  </tbody>
              </Table>
              }
  
    </div>

  );
} 
/*
class UserViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], selected: {}};
      }

    
    render (){
        return (
            <Query query={GET_USERS}>
                {({ loading, data, client }) => {
                if (loading) return null;
                console.log(data);
                this._queryMe = client;
                return(
                    <div>
                        <Table>
                            <thead>
                            
                            <tr>
                            <td rowSpan="2"></td>
                            <th colSpan="5" scope="colgroup">Name</th>
                            <th colSpan="6" scope="colgroup">Address</th>
                            <th colSpan="1" scope="colgroup">Friends</th>
                            <th colSpan="1" scope="colgroup">Hobbies</th>
                            </tr>
                            <tr>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">Middle Name</th>
                              <th scope="col">Prefix</th>
                              <th scope="col">Nick Name</th>
                              <th scope="col">Line1</th>
                              <th scope="col">Line2</th>
                              <th scope="col">Zip</th>
                              <th scope="col">City</th>
                              <th scope="col">State</th>
                              <th scope="col">Country</th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.users.map(user => (
                                <tr key={user.id}>
                                <td><Checkbox/></td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.middlemame}</td>
                                <td>{user.prefix}</td>
                                <td>{user.nickname}</td>
                                <td>{user.addressline1}</td>
                                <td>{user.addressline2}</td>
                                <td>{user.zipCode}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                                <td>{user.friends.map((friend) => {
                                  console.log(parseInt(friend));
                                  return <span>{}</span>})}</td>
                                <td>{user.hobbies.map(hobby => (<span>{hobby+"  "}</span>))}</td>
            
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                );
                
                }}
                
            </Query>
        );
    }
    
  
}

export default UserViewer;*/

/*






                        <table class="table">
                          <colgroup span="2"></colgroup>
                          <colgroup span="2"></colgroup>
                          <tr>
                            <td rowSpan="2"></td>
                            <th colSpan="5" scope="colgroup">Name</th>
                            <th colSpan="6" scope="colgroup">Address</th>
                            <th colSpan="1" scope="colgroup">Friends</th>
                            <th colSpan="1" scope="colgroup">Hobbies</th>
                          </tr>
                          <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Middle Name</th>
                            <th scope="col">Prefix</th>
                            <th scope="col">Nick Name</th>
                            <th scope="col">Line1</th>
                            <th scope="col">Line2</th>
                            <th scope="col">Zip</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Country</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                          </tr>
                          {data.users.map(user => (
                                <tr key={user.id}>
                                <td><Checkbox/></td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.middlemame}</td>
                                <td>{user.prefix}</td>
                                <td>{user.nickname}</td>
                                <td>{user.addressline1}</td>
                                <td>{user.addressline2}</td>
                                <td>{user.zipCode}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                          <td>{user.friends.map(friend => {
                                  console.log(friend);
                                  return <span>{data[parseInt(friend)]}</span>})}</td>
                                <td>{user.hobbies.map(hobby => (<span>{hobby+"  "}</span>))}</td>
            
                                </tr>
                            ))}
                        </table>
*/
/*
const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Name",
        // First group columns
        columns: [
          {
            Header: "First Name",
            accessor: "show.name"
          },
          {
            Header: "Last Name",
            accessor: "show.type"
          },
          {
            Header: "Middle Name",
            accessor: "show.type"
          },
          {
            Header: "Prefix",
            accessor: "show.type"
          },
          {
            Header: "Nick Name",
            accessor: "show.type"
          }
        ]
      },
      {
        // Second group - Details
        Header: "Address",
        // Second group columns
        columns: [
          {
            Header: "Line1",
            accessor: "show.language"
          },
          {
            Header: "Line2",
            accessor: "show.genres"
          },
          {
            Header: "ZipCode",
            accessor: "show.runtime"
          },
          {
            Header: "City",
            accessor: "show.status"
          },
          {
            Header: "State",
            accessor: "show.status"
          },
          {
            Header: "Country",
            accessor: "show.status"
          }
        ]
      },
      {
        // first group - TV Show
        Header: "Friends",
        // First group columns
        columns: [
          {
            Header: "Friends List",
            accessor: "show.name"
          }
        ]
      },
      {
        // first group - TV Show
        Header: "Hobbies",
        // First group columns
        columns: [
          {
            Header: "Hobbies List",
            accessor: "show.name"
          }
        ]
      }
    ],
    []
  );
*/
