import React from 'react';
import ExportButtons from "./ExportButtons";

<ExportButtons events={events} />

const EventTable = ({ events = [] }) => {
  if (events.length === 0) {
    return (
      <div>
        <h2>Event Details</h2>
        <p>No events available to display.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Event Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} aria-label="Event Table">
        <thead>
          <tr>
            {["Event ID", "Description", "Timestamp"].map((header) => (
              <th
                key={header}
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map(({ id, description, timestamp }, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {new Date(timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
