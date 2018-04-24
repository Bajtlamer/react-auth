import React, {Component} from 'react';
import { FaToggleOn } from 'react-icons/lib/fa';
import { FaToggleOff } from 'react-icons/lib/fa';
import { db } from '../../../../firebase';
import ReactTooltip from 'react-tooltip';


const SortableItem = (props) => {
    const { user, changeStatus } = props;
    var size, color, tooltip;

    if(user.isAdmin === true){
        size = 28;
        color = '#73d700';
        tooltip = 'Odebrat práva administrátora';
    }else{
        size = 28;
        tooltip = 'Nastavit práva administrátora';
        color = 'gray';
    }
    const style= {color: color, cursor: 'pointer'};

    return (
    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
        <span className="float-left">{user.email}</span><span className="badge">
        {user.isAdmin ?
        <FaToggleOn  size={size} style={style} onClick={()=>changeStatus(user.isAdmin, user.key)} data-tip={tooltip} data-for='isadmin' />:
        <FaToggleOff size={size} style={style} onClick={()=>changeStatus(user.isAdmin, user.key)} data-tip={tooltip} data-for='isadmin' />}
        <ReactTooltip place="left" id='isadmin' effect='solid' delayShow={1000}/>
        </span>
    </li>
    )
}

const SortableList = (props) => {
    const { users, onChangeStatus } = props;
    // console.log(users);
    return (
        <ul className="list-group">
            {users.map((user, index) => (
                <SortableItem key={index} user={user} changeStatus={onChangeStatus}/>
            ))}
    </ul>
  );
};

class UserList extends Component {


    setAdmin(status, id){
        db.updateUserIsAdmin(status, id).then(error =>{
            if(error){
                console.log(error);
                return false;
            }else{
                return true;
            }
        });
    }

    componentDidMount(){
        db.getUsers().on('value', snap => {
            let users = [];

            snap.forEach((user) => {
                let _user = user.val();
                let _isAdmin = _user.isAdmin;
                    _user.key = user.key;
                    _user.isAdmin = (()=>{return _isAdmin === true})(_isAdmin);
                    
                    users.push(_user);
            });
            this.setState({ users });
        })
    }
    
    state = {
    users: [],
  };

  render() {
    // console.log(this.state.users);
  return <SortableList users={this.state.users} onChangeStatus={this.setAdmin} />
  }
}

export default UserList;