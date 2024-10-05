import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contact submissions from the server
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/contact/all');
        setContacts(response.data.data);
      } catch (error) {
        console.error('Error fetching contact submissions:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contact Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Help</th>
            <th>Message</th>
            <th>Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id}>
              <td>{contact.fullName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.help}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactSubmissions;
