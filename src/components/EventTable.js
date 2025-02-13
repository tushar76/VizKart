
import React, { useMemo } from "react";

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "3px",
  },
  header: {
    backgroundColor: "#00f",
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    color: "#3449E4", 
  },
};

const EventTable = ({ events = [] }) => {
  const eventRows = useMemo(
    () =>
      events.map((event) => (
        <tr key={event.id}>
          <td style={styles.cell}>{event.id}</td>
          <td style={styles.cell}>{event.description}</td>
          <td style={styles.cell}>{new Date(event.timestamp).toLocaleString()}</td>
        </tr>
      )),
    [events]
  );

  return (
    <div>
      <h2 style={styles.title}>Event Details</h2>
      {events.length > 0 ? (
        <table style={styles.table} aria-label="Event Table">
          <thead>
            <tr>
              <th style={{ ...styles.cell, ...styles.header }}>Event ID</th>
              <th style={{ ...styles.cell, ...styles.header }}>Description</th>
              <th style={{ ...styles.cell, ...styles.header }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>{eventRows}</tbody>
        </table>
      ) : (
        <p>No events available to display.</p>
      )}
    </div>
  );
};

export default EventTable;
