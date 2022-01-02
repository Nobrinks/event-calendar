import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  Menu,
  Grid,
  Modal,
  Button,
  TableCell,
  Form,
} from "semantic-ui-react";
import { AuthContext } from "../contexts/Auth";
import { setEvent } from "../services/Api";
import DatePicker, { DateObject } from "react-multi-date-picker";
const eventContent = { description: "", start_date: "", end_date: "" };

function DatePickerInput({ openCalendar, value, handleValueChange, ...props }) {
  return (
    <Form.Input
      onFocus={openCalendar}
      value={value}
      onChange={handleValueChange}
      {...props}
    />
  );
}

export function EventList() {
  const [events, setEvents] = useState([]);
  const { getEvents, setUser, user } = useContext(AuthContext);
  const [values, setValues] = useState(eventContent);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [startDate, setStartDate] = useState(new DateObject());
  const [endDate, setEndDate] = useState(new DateObject());

  function onChange(event, attribute) {
    const { value, name } = attribute;

    setValues({
      ...values,
      [name]: value,
    });
  }

  async function onAdd(values) {
    const newEvent = {
      ...values,
      start_date: startDate.toUTC(),
      end_date: endDate.toUTC(),
    };
    const userData = await setEvent([...events, newEvent], user.id);
    setUser(userData);
  }

  async function onEdit(index, values) {
    const eventsEdited = events;
    eventsEdited[index] = {
      ...values,
      start_date: startDate.toUTC(),
      end_date: endDate.toUTC(),
    };
    const userData = await setEvent(eventsEdited, user.id);
    setUser(userData);
  }

  async function handleRemoveEvent(index) {
    events.splice(index, 1);
    const userData = await setEvent(events, user.id);
    setUser(userData);
  }

  useEffect(() => {
    setEvents(getEvents());
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
                  <Modal
                    closeIcon
                    open={openAdd}
                    onClose={() => setOpenAdd(false)}
                    onOpen={() => {
                      setOpenAdd(true);
                      setValues(eventContent);
                    }}
                    trigger={<Button>Add an Event</Button>}
                  >
                    <Modal.Header>Add an Event</Modal.Header>
                    <Modal.Content>
                      <Form>
                        <Form.Group widths={"equal"}>
                          <DatePicker
                            render={<DatePickerInput label="Start Date" />}
                            value={startDate}
                            onChange={setStartDate}
                          />
                          <DatePicker
                            render={<DatePickerInput label="End Date" />}
                            value={endDate}
                            onChange={setEndDate}
                          />
                          <Form.Input
                            label="description"
                            name="description"
                            onChange={onChange}
                            value={values.description}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        onClick={() => {
                          onAdd(values);
                          setOpenAdd(false);
                        }}
                        negative
                      >
                        Add
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
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
              {events.map((eventValues, index) => (
                <Table.Row event={eventValues} key={index}>
                  <Table.Cell>
                    {new Date(eventValues.start_date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(eventValues.end_date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{eventValues.description}</Table.Cell>
                  <TableCell>
                    <Grid>
                      <Grid.Column width={12}>
                        <Modal
                          open={openRemove}
                          trigger={<Button>Remove Event</Button>}
                          onClose={() => setOpenRemove(false)}
                          onOpen={() => setOpenRemove(true)}
                        >
                          <Modal.Header>Remove Event</Modal.Header>
                          <Modal.Content>
                            <p>Are you sure you want to delete this event?</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              onClick={() => setOpenRemove(false)}
                              negative
                            >
                              No
                            </Button>
                            <Button
                              onClick={() => {
                                handleRemoveEvent(index);
                                setOpenRemove(false);
                              }}
                              positive
                            >
                              Yes
                            </Button>
                          </Modal.Actions>
                        </Modal>
                      </Grid.Column>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid>
                      <Grid.Column width={12}>
                        <Modal
                          closeIcon
                          open={openEdit}
                          onClose={() => setOpenEdit(false)}
                          onOpen={() => {
                            setOpenEdit(true);
                            setValues(eventValues);
                            setStartDate(new DateObject(eventValues.startDate));
                            setEndDate(new DateObject(eventValues.endDate));
                          }}
                          trigger={<Button>Edit Event</Button>}
                        >
                          <Modal.Header>Edit Event</Modal.Header>
                          <Modal.Content>
                            <Form>
                              <Form.Group widths={"equal"}>
                                <DatePicker
                                  render={
                                    <DatePickerInput label="Start Date" />
                                  }
                                  value={new DateObject(startDate)}
                                  onChange={setStartDate}
                                />
                                <DatePicker
                                  render={<DatePickerInput label="End Date" />}
                                  value={new DateObject(endDate)}
                                  onChange={setEndDate}
                                />
                                <Form.Input
                                  label="description"
                                  name="description"
                                  onChange={onChange}
                                  value={values.description}
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              onClick={() => {
                                onEdit(index, values);
                                setOpenEdit(false);
                              }}
                              negative
                            >
                              Save
                            </Button>
                          </Modal.Actions>
                        </Modal>
                      </Grid.Column>
                    </Grid>
                  </TableCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
