import { useEffect, useState, useContext } from "react";
import { Table, Dropdown, Icon, Input, Menu, Grid } from "semantic-ui-react";
import { AuthContext } from "../contexts/Auth";
import { setEvent} from '../services/Api'
import ModalEvents from "./ModalEvents";
import ModalRemove from "./ModalRemove"

export function EventList() {
  const [events, setEvents] = useState([]);
  const {getEvents, setUser, user} = useContext(AuthContext)
  
  async function onAdd(values){
    const userData = await setEvent([...events, values])
    setUser(userData)    
  }

  async function onEdit(index, values){
    const eventsEdited = events;
    eventsEdited[index] = values;
    const userData = await setEvent(eventsEdited, user.id)
    setUser(userData)    
  }
  

  async function handleRemoveEvent(index){
    const userData = await setEvent(events.splice(index, 1), user.id);
    setUser(userData)
  }

  useEffect(() => {
    setEvents(getEvents())
  }, [user]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Menu vertical>
            <Menu.Item>
              Home
              <Menu.Menu>
                <Menu.Item>
                  {/* <ModalEvents title="Add Event" onSet={onAdd}/> */}
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>

            {/* <Menu.Item name="browse">
              <Icon name="grid layout" />
              Browse
            </Menu.Item>
            <Menu.Item name="messages">Messages</Menu.Item>

            <Dropdown item text="More">
              <Dropdown.Menu>
                <Dropdown.Item icon="edit" text="Edit Profile" />
                <Dropdown.Item icon="globe" text="Choose Language" />
                <Dropdown.Item icon="settings" text="Account Settings" />
              </Dropdown.Menu>
            </Dropdown> */}
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Start Date</Table.HeaderCell>
                <Table.HeaderCell>End Date</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {events.map((event, index) => (
                <Table.Row event={event} key={index}>
                  <Table.Cell>{event.start_date}</Table.Cell>
                  <Table.Cell>{event.end_date}</Table.Cell>
                  <Table.Cell>{event.description}</Table.Cell>
                  <Table.Cell>{<ModalRemove onYes={()=>handleRemoveEvent(index)}/>}</Table.Cell>
                  <Table.Cell>{<ModalEvents title="Edit Event" onSet={(values)=>onEdit(index, values)}/>}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
