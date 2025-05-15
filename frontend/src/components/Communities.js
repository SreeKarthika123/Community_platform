






import React, { useEffect, useState } from 'react';
// ✅ Correct import
import  { jwtDecode } from 'jwt-decode';

function Communities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCommunity, setNewCommunity] = useState('');
  const [communityMembers, setCommunityMembers] = useState({});
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [filter, setFilter] = useState('all'); // 'all' | 'my' | 'joined'

  // Decode token outside useEffect for global access
  const token = localStorage.getItem('token');
  let currentUserId = null;
  try {
    const decodedToken = token ? jwtDecode(token) : null;
    currentUserId = decodedToken?.userId || decodedToken?.id || decodedToken?._id;
  } catch (err) {
    console.error('Invalid token:', err);
  }

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch('http://localhost:5000/v1/community', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setCommunities(data);

          const membersPromises = data.map((community) =>
            fetch(`http://localhost:5000/v1/community/${community._id}/members`, {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => res.json())
          );

          const membersData = await Promise.all(membersPromises);
          const membersMap = data.reduce((acc, community, i) => {
            acc[community._id] = membersData[i];
            return acc;
          }, {});
          setCommunityMembers(membersMap);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [token]);


  const handleCreateCommunity = async (e) => {
  e.preventDefault();
  if (!newCommunity.trim()) {
    alert('Enter a community name');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/v1/community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCommunity }),
    });

    const created = await res.json();

    if (res.ok) {
      setCommunities((prev) => [...prev, created]);
      setNewCommunity('');
      alert('Community created!');
    } else if (res.status === 400 && created.message.includes('already exists')) {
      // Specific check for duplicate community name
      alert('Community name already exists. Please choose a different name.');
    } else {
      alert(created.message || 'Failed to create community');
    }
  } catch (err) {
    console.error('Network or server error:', err);
    alert('Something went wrong. Please try again later.');
  }
};


  const handleAddMember = async (communityId) => {
    const { name, email, password } = newUser;
    if (!name || !email || !password) return alert('All fields are required');

    try {
      const res = await fetch(`http://localhost:5000/v1/community/${communityId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || 'Failed to add member');

      setCommunityMembers((prev) => ({
        ...prev,
        [communityId]: [...(prev[communityId] || []), data],
      }));
      setNewUser({ name: '', email: '', password: '' });
      alert('User added!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveMember = async (communityId, userId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/v1/community/${communityId}/members/${userId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCommunityMembers((prev) => ({
          ...prev,
          [communityId]: prev[communityId].filter((m) => m.user._id !== userId),
        }));
        alert('User removed!');
      } else {
        alert(data.message || 'You are not authorized to remove this user.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while removing the user.');
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Communities</h2>

        <form onSubmit={handleCreateCommunity} style={styles.form}>
          <input
            type="text"
            placeholder="Community Name"
            value={newCommunity}
            onChange={(e) => setNewCommunity(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Create Community</button>
        </form>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setFilter('all')}
            style={{ ...styles.button, background: filter === 'all' ? '#0056b3' : '#007bff' }}
          >
            All Communities
          </button>
          <button
            onClick={() => setFilter('my')}
            style={{ ...styles.button, background: filter === 'my' ? '#0056b3' : '#007bff', marginLeft: '10px' }}
          >
            My Communities
          </button>
          <button
            onClick={() => setFilter('joined')}
            style={{ ...styles.button, background: filter === 'joined' ? '#0056b3' : '#007bff', marginLeft: '10px' }}
          >
            Joined Communities
          </button>
        </div>

        {communities.length === 0 ? (
          <p>No communities available</p>
        ) : (
          communities
            .filter((community) => {
              if (filter === 'all') return true;
              if (filter === 'my') return community.owner === currentUserId;
              if (filter === 'joined') {
                const members = communityMembers[community._id] || [];
                return (
                  community.owner !== currentUserId &&
                  members.some((m) => m.user._id === currentUserId)
                );
              }
              return true;
            })
            .map((community) => (
              <div key={community._id} style={styles.communityBox}>
                <h3>{community.name}</h3>

                <div style={styles.form}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    style={styles.input}
                  />
                  <button onClick={() => handleAddMember(community._id)} style={styles.button}>
                    Add Member
                  </button>
                </div>

                <h4>Members:</h4>
                <ul style={styles.memberList}>
                  {(communityMembers[community._id] || []).map((member) => (
                    <li key={member.user._id} style={styles.memberItem}>
                      {member.user.name} ({member.user.email})
                      {community.owner === currentUserId &&
                        member.user._id !== currentUserId && (
                          <button
                            onClick={() => handleRemoveMember(community._id, member.user._id)}
                            style={styles.removeBtn}
                          >
                            Remove
                          </button>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

const styles = {
  outer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6a11cb 0%, #f7797d 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '900px',
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    minWidth: '200px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  removeBtn: {
    marginLeft: '10px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  communityBox: {
    borderTop: '1px solid #ddd',
    paddingTop: '15px',
    marginTop: '15px',
  },
  memberList: {
    listStyle: 'none',
    padding: 0,
  },
  memberItem: {
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
  },
  loading: {
    fontSize: '24px',
    color: '#fff',
    marginTop: '100px',
    textAlign: 'center',
    width: '100%',
  },
};

export default Communities;
