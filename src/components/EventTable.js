import React from "react";

const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
};

const cellStyles = {
  border: "1px solid #ddd",
  padding: "5px",
};

const headerStyles = {
  ...cellStyles,
  backgroundColor: "#00f",
  fontWeight: "bold",
};

const EventTable = ({ events = [] }) => {
  return (
    <div>
      <h2>Event Details</h2>
      {events.length > 0 ? (
        <table style={tableStyles} aria-label="Event Table">
          <thead>
            <tr>
              <th style={headerStyles}>Event ID</th>
              <th style={headerStyles}>Description</th>
              <th style={headerStyles}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td style={cellStyles}>{event.id}</td>
                <td style={cellStyles}>{event.description}</td>
                <td style={cellStyles}>
                  {new Date(event.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events available to display.</p>
      )}
    </div>
  );
};

export default EventTable;
