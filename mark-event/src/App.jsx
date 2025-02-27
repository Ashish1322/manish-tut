import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "lightblue",
  },
};

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedDate] = useState(null);
  const [selecteEnddData, setSelecteEnddDate] = useState(null);
  const [slots, setSlots] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const handleClick = (e) => {
    setSelectedDate(e.start);
    setSelecteEnddDate(e.end);
    openModal();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newSlot = {
      start: selectedData,
      end: selecteEnddData,
      title: title,
      allDay: true,
      desc: desc,
    };
    setSlots([...slots, newSlot]);
    closeModal();
  };

  const [open2, setOpen2] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (e) => {
    setSelectedEvent(e);
    setOpen2(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Your Events</h1>
      <div style={{ width: "50%" }}>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          events={slots}
          onSelectSlot={handleClick}
          onSelectEvent={handleEventClick}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3>Add Slot Details</h3>
        <p>
          Selected Slot: {selectedData && selectedData.getDate()}/
          {selectedData && selectedData.getMonth() + 1}/
          {selectedData && selectedData.getFullYear()}
        </p>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />
          <br />
          <input
            type="text"
            onChange={(e) => setDesc(e.currentTarget.value)}
            required
          />
          <br />
          <input type="submit" value="Add Event" />
        </form>

        <button onClick={closeModal}>Close Modal</button>
      </Modal>

      <Modal isOpen={open2} style={customStyles} contentLabel="Example Modal">
        <h3>Your Slot Details</h3>
        {selectedEvent != null ? (
          <div>
            <h3>Title : {selectedEvent.title}</h3>
            <p>Desc: {selectedEvent.desc}</p>
            <p>
              Start Time: {selectedEvent.start.getDate()}/
              {selectedEvent.start.getMonth() + 1}/
              {selectedEvent.start.getFullYear()}
            </p>
            <p>
              End Time: {selectedEvent.end.getDate()}/
              {selectedEvent.end.getMonth() + 1}/
              {selectedEvent.end.getFullYear()}
            </p>
          </div>
        ) : null}
        <button onClick={() => setOpen2(false)}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default App;
