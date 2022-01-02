import React from "react";
import { Button, Modal } from "semantic-ui-react";

export default function ModalRemove({onYes}) {
  const [open, setOpen] = React.useState(false)
  return (
  <Modal
    open={open}
    trigger={<Button>Remove Event</Button>}
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
  >
    <Modal.Header>Remove Event</Modal.Header>
    <Modal.Content>
      <p>Are you sure you want to delete this event?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button
        onClick={()=>setOpen(false)}
        negative
      >
        No
      </Button>
      <Button
        onClick={()=>{onYes(); setOpen(false);}}
        positive
      >
        Yes
      </Button>
    </Modal.Actions>
  </Modal>
);
}
