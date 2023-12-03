import React, { Component } from 'react';
import '../style/admin.css'; // Import your CSS for styling

class SeasonCRUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: [],
      name: '',
      start_date: '',
      end_date: '',
    };
  }

  componentDidMount() {
    this.fetchSeasons();
  }

  fetchSeasons = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}season/`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ seasons: data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  handleCreate = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}season/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      }),
    })
      .then(() => {
        this.fetchSeasons();
        this.setState({ name: '', start_date: '', end_date: '' });
      })
      .catch((error) => {
        console.error('Error creating season:', error);
      });
  };

  handleDelete = (seasonId) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}season/${seasonId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        this.fetchSeasons();
      })
      .catch((error) => {
        console.error('Error deleting season:', error);
      });
  };

  render() {
    return (
      <div className="season-crud">
        <h2>Seasons</h2>

        {/* Create Form */}
        <form onSubmit={this.handleCreate} className="create-form">
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={this.state.start_date}
            onChange={(e) => this.setState({ start_date: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            value={this.state.end_date}
            onChange={(e) => this.setState({ end_date: e.target.value })}
          />
          <button type="submit">Create</button>
        </form>

        {/* Seasons Table */}
        <table className="seasons-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.seasons.map((season) => (
              <tr key={season.id}>
                <td>{season.name}</td>
                <td>{season.start_date}</td>
                <td>{season.end_date}</td>
                <td>
                  <button onClick={() => this.handleDelete(season.id)}>Delete</button>
                  {/* Add update button here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SeasonCRUD;