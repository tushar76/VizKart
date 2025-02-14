import React from "react";

const UserStatistics = ({ stats }) => {
  return (
    <div className="user-statistics" style={styles.container}>
      <h2>User Statistics</h2>
      <div className="stats-grid" style={styles.statsGrid}>
        <div className="stat-card" style={styles.statCard}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card" style={styles.statCard}>
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </div>
        <div className="stat-card" style={styles.statCard}>
          <h3>New Signups</h3>
          <p>{stats.newSignups}</p>
        </div>
        <div className="stat-card" style={styles.statCard}>
          <h3>Returning Users</h3>
          <p>{stats.returningUsers}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  },
  statsGrid: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px"
  },
  statCard: {
    background: "#f5f5f5",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    flex: "1"
  }
};

export default UserStatistics;
